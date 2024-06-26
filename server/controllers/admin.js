import User from "../models/user.js";
import Course from "../models/course.js";
import Support from "../models/support.js";
//import SES from "aws-sdk/clients/ses";
import AWS from "aws-sdk";
import { enrollIssueResolved } from "../utils/email.js";

import Stripe from 'stripe';



// aws config
// const ses = new SES({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
//   apiVersion: process.env.AWS_API_VERSION,
// });

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const ses = new AWS.SES(awsConfig);

//const stripe = require("stripe")(process.env.STRIPE_SECRET);
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const currentAdmin = async (req, res) => {
  try {
    let user = await User.findById(req.auth._id).select("-password").exec();
    if (!user.role.includes("Admin")) {
      res.sendStatus(403);
    } else {
      res.json({
        ok: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const listUsers = async (req, res) => {
  const users = await User.find({})
    .select("-password")
    .populate("courses", "_id slug name")
    .exec();
  res.json(users);
};

export const refreshUserStatus = async (req, res) => {
  try {
    const { userId, courseUrl } = req.body;
    const slug = courseUrl.split("/").pop().split(";")[0];

    const user = await User.findById(userId).exec();
    // find course based on course url/slug submitted by user
    const course = await Course.findOne({ slug }).exec();

    // if no stripesession return
    if (!user || !user.stripesession || !user.stripesession.id)
      return res.json({ message: "User has no stripe session" });
    // retrieve stripe session
    const session = await stripe.checkout.sessions.retrieve(
      user.stripesession.id
    );
    // if session payment status is paid, push course to user's courses []
    if (session.payment_status === "paid") {
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { courses: course._id },
        $set: { stripesession: {} },
      }).exec();
      // then send email to user that it has been resolved
      const params = enrollIssueResolved(user.name, user.email);
      // send
      const emailSent = ses.sendEmail(params).promise();
      emailSent
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    res.json({
      message: "Stripe session is refreshed and sent success email to user",
      course,
    });
  } catch (err) {
    console.log(err);
  }
};

export const allIssues = async (req, res) => {
  const all = await Support.find()
    .populate("postedBy", "_id name email")
    .exec();
  res.json(all);
};

export const removeIssue = async (req, res) => {
  try {
    const resolved = await Support.findByIdAndRemove(req.params.issueId).exec();
    // console.log("__resolved__", resolved);
    return res.json(resolved);
  } catch (err) {
    console.log(err);
  }
};


export const makeAdmin= async (req, res) => {
  console.log("make admin controller called");
try {
  let updated = await User.findByIdAndUpdate(
    req.auth._id,
    {
      $addToSet: { role: "Admin" },
    },
    { new: true }
  ).exec();
  res.json(updated);
} catch (err) {
  console.log(err);
  return res.status(400).send("Error occured. Try again.");
}
};

export const removeAdmin= async (req, res) => {
  try {
    const user = await User.findById(req.auth._id).exec();
    if (user.role.includes("Admin")) {
      let updated = await User.findByIdAndUpdate(
        req.auth._id,
        {
          $pull: { role: "Admin" },
        },
        { new: true }
      ).exec();
      res.json(updated);
    }

  } catch (err) {
    console.log(err);
    return res.status(400).send("Error occured. Try again.");
  }
  };
