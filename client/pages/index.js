import { withRouter } from "next/router";
import {useState, useEffect} from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import Head from "next/head";

const Index = ({ courses, router }) => {
  const head = () => (
    <Head>
      <title>
        World-Leading Medical Education  |{" "}
        {process.env.APP_NAME}
      </title>
      <meta
        name="description"
        content="World-Leading Medical Education  Courses Free and Paid"
      />
      <link rel="canonical" href={`${process.env.DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`World-Leading Medical Education  | ${process.env.APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`World-Leading Medical Education  | Free and Paid | ${process.env.APP_NAME}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.DOMAIN}/default.jpg`} />
      <meta property="og:site_name" content={process.env.APP_NAME} />
      <meta property="og:image" content={`${process.env.DOMAIN}/default.jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${process.env.DOMAIN}/default.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
    </Head>
  );

  return (
    <>
    {head()}
      <div  className="jumbotron text-center bg-primary square">
        Online Doctors Training Marketplace
      </div>
      <div className="container-fluid">
        <div className="row pt-2">


  
        {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard key={course._id} course={course} />
              {/*<pre>{JSON.stringify(course, null, 4)}</pre> */}
            </div>
        ))}
 
      </div>
      </div>

    </>
    
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`http://localhost:8000/api/courses`);
  console.log("DATA LENGTH =====> ", data.length);
  return {
    props: {
      courses: data,
    },
  };
}

export default withRouter(Index);
