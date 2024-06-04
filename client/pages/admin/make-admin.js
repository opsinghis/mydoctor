import { useContext, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import {
  FormOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";
import AuthorTerms from "../../components/modal/AuthorTerms";
import { Context } from "../../context";
import { useRouter } from "next/router";

const BecomeAdmin = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // router
  const router = useRouter();

  const makeAdmin= async () => {
    setLoading(true);
    console.log("make admin");
      try {
      const { data } = await axios.post("/api/admin/make-admin");
      setLoading(false);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      toast("Congrats! You are now an admin.");
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast("Error occured. Try again.");
    }
  };

  return (
    <UserRoute>
      {/* <h1 className="jumbotron text-center square">Become Instructor</h1> */}

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <FormOutlined className="h2" />
              <br />
              {/* <h4>Setup payouts to publish courses on Code Continue</h4>
              <p>...</p> */}
              {console.log("is the user not admin", user && user.role && !user.role.includes("Admin"))}

              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                size="large"
                onClick={makeAdmin}
                disabled={
                  (user && user.role && user.role.includes("Admin")) || loading
                }
                
                loading={loading}
              >
                Add User As Admin
              </Button>

              <p className="text-muted">
                <small>
                  <span
                    onClick={() => setShowModal(true)}
                    className="pointer text-danger"
                  >
                    Why write on doctrain.com?
                  </span>
                </small>
              </p>
            </div>
          </div>
        </div>

        <AuthorTerms showModal={showModal} setShowModal={setShowModal} />
      </div>
    </UserRoute>
  );
};

export default BecomeAdmin;
