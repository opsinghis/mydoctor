import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import course from "../../../server/models/course";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      )}
      <h1 className="jumbotron text-center square">User dashboard</h1>

      {/* show list of courses */}

      {courses &&
        courses.map((course) => (
          <div key={course._id} className="media pt-2 pb-1">
              <div className="row">
                <div className="col-md-1">
                <Avatar
                  size={80}
                  shape="square"
                  src={course.image ? course.image.Location : "/course.png"}
                />
                </div>
                <div className="col-md-4">
                  <div class="row">
                  <div className="col">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="pointer"
                  >                   
                      <h5 className="mt-2 text-primary">{course.name}</h5>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>
                    {course.lessons.length} lessons
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}
                  >
                    By {course.instructor.name}
                  </p>
                </div>

                  </div>
                </div>
                <div className="col-md-7 mt-3">
                <Link href={`/user/course/${course.slug}`}>  
                      <PlayCircleOutlined className="h2 pointer text-primary" />
                  </Link>
                </div>
              </div>
            </div>
        ))}
    </UserRoute>
  );
};

export default UserIndex;
