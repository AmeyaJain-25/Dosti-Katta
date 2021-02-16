import React, { useState } from "react";
import "./style/createPost.css";
//Packages-----------------
import { Button, Col, Container, Row } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
//Function importing-----------------
import { isAuthenticated } from "../auth/helper";
import { createPost } from "./helper/PostHelper";
//Components-----------------
import Menu from "./Menu";


const CreatePost = (props) => {
  //useState---------------
  const [disableCreatePost, setDisableCreatePost] = useState(false);
  const [values, setValues] = useState({
    title: "",
    body: "",
    photo: "",
    formData: "",
  });

  const { user, token } = isAuthenticated();  

  const { title, body, photo, formData } = values;

  //Toast Messages---------------
  const successNotify = (successMessage) => toast.success(successMessage, {
    position: "top-center",
    autoClose: 5000,
    draggablePercent: 60,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  const errorNotify = (errorMessage) => toast.error(errorMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  //Create Post Function---------------
  const postData = (event) => {
    setDisableCreatePost(true);
    if (!title || !body) {
      errorNotify("Please enter Title and Description for your post.");
      setDisableCreatePost(false);
      return;
    } else {
      formData.set("title", title);
      formData.set("body", body);
      formData.set("photo", photo);
      event.preventDefault();
      //API call---------------
      createPost(user._id, token, formData)
        .then((data) => {
          setDisableCreatePost(false);
          if (data.data.error) {
            errorNotify(data.data.error);
          } else {
            successNotify("Post Created Successfully!");
            // props.history.push("/home");
            setValues({
              ...values,
              title: "",
              body: "",
              photo: "",
              formData: "",
            });
            setTimeout(() => {
              props.history.goBack()
            }, 3000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // formData.set(name, value);
    setValues({ ...values, [name]: value, formData: new FormData() });
  };

  return (
    <Container className="themed-container create_post_container" fluid style={{ padding: "0" }} >
      <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{maxWidth: "300px"}}
      />
      <Menu />
      <Row className="create_post" style={{ margin: "0" }}>
        <div className="create_post_div">
          <Row className="top_row">
            <Col xs="10" className="col">
              <input
                type="text"
                placeholder="Post Title"
                name="title"
                value={title}
                onChange={handleChange("title")}
                className="title_input"
              />
            </Col>
            <Col xs="2" className="col">
              <div className="file_input_div">
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  name="photo"
                  accept="image/png, image/jpeg"
                  // capture="camera"
                  placeholder="Choose a file"
                  className="file_input"
                />
                {/* <span>Add Image</span> */}
              </div>
            </Col>
          </Row>
          <Row>
            <textarea
              type="text"
              placeholder="Description"
              name="body"
              value={body}
              onChange={handleChange("body")}
              className="body_input"
            />
          </Row>
        </div>
        <Button className="create_post_button" onClick={postData} disabled={disableCreatePost}>
          POST
        </Button>
      </Row>
    </Container>
    // <div className="container-fluid">
    //   <Menu />

    //   <form>
    //     <div
    //       style={{
    //         margin: "10px auto",
    //         padding: "20px",
    //         maxWidth: "550px",
    //         textAlign: "center",
    //       }}
    //     >
    //       <h1
    //         style={{
    //           fontWeight: "bold",
    //           textAlign: "center",
    //           margin: "40px 0",
    //           color: "#fa002f",
    //         }}
    //       >
    //         Create Post
    //       </h1>
    //       {successMessage()}
    //       {errorMessage()}
    //       {!success && (
    //         <div>
    //           <input
    //             type="text"
    //             placeholder="Enter Title"
    //             name="title"
    //             value={title}
    //             onChange={handleChange("title")}
    //             style={{
    //               width: "100%",
    //               height: "40px",
    //               backgroundColor: "#dfebee",
    //               padding: "10px",
    //               borderRadius: "12px",
    //               borderStyle: "none",
    //               marginBottom: "20px",
    //             }}
    //           />
    //           <textarea
    //             type="text"
    //             placeholder="Body"
    //             name="body"
    //             value={body}
    //             onChange={handleChange("body")}
    //             style={{
    //               width: "100%",
    //               minHeight: "150px",
    //               backgroundColor: "#dfebee",
    //               padding: "10px",
    //               borderRadius: "12px",
    //               borderStyle: "none",
    //               marginBottom: "20px",
    //             }}
    //           />
    //           <div
    //             style={{
    //               height: "100px",
    //               width: "100px",
    //               borderRadius: "100px",
    //               backgroundImage:
    //                 "linear-gradient(to bottom, #2590EB 50%, #FFFFFF 50%)",
    //               backgroundSize: "100% 200%",
    //             }}
    //           >
    //             <input
    //               onChange={handleChange("photo")}
    //               type="file"
    //               name="photo"
    //               accept="image/*"
    //               capture="camera"
    //               placeholder="Choose a file"
    //               style={{
    //                 width: "100%",
    //                 height: "40px",
    //                 backgroundColor: "#dfebee",
    //                 padding: "10px",
    //                 borderRadius: "12px",
    //                 opacity: "0",
    //                 borderStyle: "none",
    //                 marginBottom: "20px",
    //                 height: "200px",
    //                 width: "200px",
    //                 borderRadius: "100px",
    //                 backgroundImage:
    //                   "linear-gradient(to bottom, #2590EB 50%, #FFFFFF 50%)",
    //                 backgroundSize: "100% 200%",
    //               }}
    //             />
    //           </div>{" "}
    //         </div>
    //       )}
    //       <button
    //         className="btn"
    //         style={{
    //           display: success ? "none" : "",
    //           borderRadius: "200px",
    //           backgroundColor: "#fa002f",
    //           color: "#dfebee",
    //           margin: "10px 0",
    //           boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.4)",
    //           fontWeight: "500",
    //           fontSize: "1.5em",
    //         }}
    //         onClick={postData}
    //       >
    //         Submit Post
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default CreatePost;