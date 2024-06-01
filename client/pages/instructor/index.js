import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre>*/}

    {courses &&
        courses.map((course) => (
          <>
          <div class="container">

          <div class="row">
              <div class="col-6 col-md-1">              
                <Avatar
                    size={80}
                    src={course.image ? course.image.Location : "/course.png"}
                  />
                </div>
                <div class="col-6 col-md-6">
                    <div className="row">
                      <div className="col">
                        <Link
                          href={`/instructor/course/view/${course.slug}`}
                          className="pointer"
                          
                        >
                          <div className="mt-2 text-primary">
                            <h5 className="pt-2">{course.name}</h5>
                          </div>
                        </Link>
                        <p style={{ marginTop: "-10px" }}>
                          {course.lessons.length} Lessons
                        </p>

                        {course.lessons.length < 5 ? (
                          <p style={myStyle} className="text-warning">
                            At least 5 lessons are required to publish a course
                          </p>
                        ) : course.published ? (
                          <p style={myStyle} className="text-success">
                            Your course is live in the marketplace
                          </p>
                        ) : (
                          <p style={myStyle} className="text-success">
                            Your course is ready to be published
                          </p>
                        )}
                      </div>
                  </div>
                
                </div>
                <div class="col-6 col-md-4">
                {course.published ? (
                          <div>
                            <CheckCircleOutlined className="h5 pointer text-success" />
                          </div>
                        ) : (
                          <div>
                            <CloseCircleOutlined className="h5 pointer text-warning" />
                          </div>
                        )}
                  </div>
            </div>
          </div>
          <hr></hr>
          </>
        ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;
