import { useState } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const CourseCreate = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  // router
  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {

    setPreview(window.URL.createObjectURL(e.target.files[0]));
    
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    // resize
      Resizer.default.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      //Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        const { data } = await axios.post(`/api/course/upload-image`, {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async () => {
    console.log("handle image remove");
  
    try {
      // console.log(values);
      setValues({ ...values, loading: true });
      const res = await axios.post(`/api/course/remove-image`, { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const { data } = await axios.post(`/api/course/create-course`, {
        ...values,
        image,
      });
      toast("Great! Now you can start adding lessons");
      console.log("course created :" , data);
      router.push("/instructor");
    }catch (err){
      toast(err.response.data);
    }
    console.log(values);
  };


  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Create Course</h1>
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr/>
      <pre>{JSON.stringify(image, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;