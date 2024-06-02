import Link from "next/link";
import { TwitterOutlined } from "@ant-design/icons";

const Footer = () => (
  <div
    className="container-fluid footer mt-5"
    style={{ borderTop: "1px solid #333" }}
  >
    <footer className="pt-2 pb-2">
      <div className="row">
        <div className="col-md-1">
          <Link href="/">
                          <img
                style={{ marginTop: "-10px" }}
                className="img-fluid mb-2"
                src="/images/logo/medicine-symbol-logo.png"
                alt="doctrain Logo"
              />
          </Link>

          <small className="ml-2 d-block mb-3 text-muted">
            &copy; {new Date().getFullYear()}
          </small>
        </div>

        <div className="col-md-4">
          <h5>Doctrain Continue</h5>
          <p class="h6"><small>
            Join thousands of students at Doctrain and become part of a
            vibrant community. Learn the pass your exams development or become an
            instructor and teach others by creating courses.
            </small></p>
        
        </div>

        <div className="col-md-4">
          <h5 className="pb-1">Become an instructor</h5>
          <p class="h6"><small>
            The only eLearning marketplace that offers 70% revenue to it's
            instructors. Get paid directly to your bank account, every 48 hours.
            Are you ready to create your first course?
            </small></p>
          <Link href="/user/become-instructor" legacyBehavior>
            Become Instructor
          </Link>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
