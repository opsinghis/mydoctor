import {useState, useEffect} from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";

const Index = ({ courses }) => {


  return (
    <>
      <div  className="jumbotron text-center bg-primary square">
        Online Doctors Training Marketplace
      </div>
      <p>from MyDoctors team</p>
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

export default Index;
