import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../../auth/helper/index";
import LoginInput from "../../components/LoginInput";
import logoWithSlogan from "../../logoWithSlogan.png";
import "./signup.css";

const Signup = () => {
  //useState---------------
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    error: "",
    success: false,
  });
  const [disableSignup, setDisableSignup] = useState(false);

  const { name, email, username, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //Signup Function---------------
  const onSubmit = (event) => {
    setDisableSignup(true);
    event.preventDefault();
    setValues({ ...values, error: false });
    //API call---------------
    signup({ name, email, username, password })
      .then((data) => {
        setDisableSignup(false);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            username: "",
            error: "",
            password: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in SignUp"));
  };

  //SUCCESS Message---------------
  const successMessage = () => {
    return (
      <div>
        <h3
          style={{
            display: success ? "" : "none",
            fontSize: "1em",
            color: "#00ab66",
            textAlign: "center",
          }}
        >
          New Account Created Successfully
          <br />
          <Link to="/"> Please Login Here</Link>
        </h3>
        {success && <Redirect to="/" />}
      </div>
    );
  };

  //ERROR Message---------------
  const errorMessage = () => {
    return (
      <h3
        style={{
          display: error ? "" : "none",
          fontSize: "1em",
          color: "red",
          textAlign: "center",
        }}
      >
        {error}
      </h3>
    );
  };

  //Signup Page JSX---------------
  const signUpForm = () => {
    return (
      <Container className="themed-container signup_container" fluid>
        <Row>
          <Col md="6" sm="12">
            <Container className="left_container">
              <div className="signup_box">
                <p className="register_text">Register</p>
                <hr />
                <LoginInput
                  labelName="Name"
                  inputType="text"
                  value={name}
                  onChangeEvent={handleChange("name")}
                />
                <LoginInput
                  labelName="Email"
                  inputType="email"
                  value={email}
                  onChangeEvent={handleChange("email")}
                />
                <LoginInput
                  labelName="Username"
                  inputType="text"
                  value={username}
                  onChangeEvent={handleChange("username")}
                />
                <LoginInput
                  labelName="Password"
                  inputType="password"
                  value={password}
                  onChangeEvent={handleChange("password")}
                />
                <p className="strong_password_note">
                  Use 5 or more characters to make a strong Password.
                </p>
                {successMessage()}
                {errorMessage()}
                <Button onClick={onSubmit} className="register_button" disabled={disableSignup}>
                  REGISTER
                </Button>
              </div>
            </Container>
          </Col>
          <Col md="6" sm="12">
            <Container className="right_container">
              <Row className="dostiKatta_name_row">
                <img
                  src={logoWithSlogan}
                  alt="dostiKattaLogo"
                  className="dostiKatta_name"
                />
              </Row>
              <Row className="below_logo">
                <h4>
                  {/* Meet millions of new people from all over the world, wherever
                  you are. Have a good chat, make new friend. */}
                </h4>
              </Row>
              <Row className="signup_note_div">
                <h3 className="signin_note">
                  Already a Member?{" "}
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Sign IN</span>
                  </Link>
                </h3>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      // <div className="container-fluid">
      //   <div className="row" style={{ minHeight: "100vh" }}>
      //     <div className="col-md-5">
      //       <h3 style={{ fontWeight: "bold" }}>
      //         Taste
      //         <span style={{ color: "#0f52ba" }}>Book</span>.
      //       </h3>
      //       <h1
      //         style={{
      //           fontWeight: "bold",
      //           textAlign: "center",
      //           marginTop: "70px",
      //           color: "#fa002f",
      //         }}
      //       >
      //         Sign Up
      //       </h1>
      //       <div
      //         className="text-center"
      //         style={{
      //           padding: "20px",
      //           maxWidth: "70%",
      //           margin: "30px auto 10px auto",
      //         }}
      //       >
      //         <LoginInput
      //           labelName="Name"
      //           inputType="text"
      //           placeholder="Enter Name..."
      //           value={name}
      //           onChangeEvent={handleChange("name")}
      //           style={{
      //             height: "40px",
      //             backgroundColor: "#dfebee",
      //             width: "100%",
      //             padding: "10px",
      //             borderRadius: "12px",
      //             borderStyle: "none",
      //             marginBottom: "20px",
      //           }}
      //         />
      //         <LoginInput
      //           labelName="Email"
      //           inputType="email"
      //           placeholder="Enter Email..."
      //           value={email}
      //           onChangeEvent={handleChange("email")}
      //           style={{
      //             width: "100%",
      //             height: "40px",
      //             backgroundColor: "#dfebee",
      //             padding: "10px",
      //             borderRadius: "12px",
      //             borderStyle: "none",
      //             marginBottom: "20px",
      //           }}
      //         />
      //         <LoginInput
      //           labelName="Username"
      //           inputType="text"
      //           placeholder="Enter Username..."
      //           value={username}
      //           onChangeEvent={handleChange("username")}
      //           style={{
      //             width: "100%",
      //             height: "40px",
      //             backgroundColor: "#dfebee",
      //             padding: "10px",
      //             borderRadius: "12px",
      //             borderStyle: "none",
      //             marginBottom: "20px",
      //           }}
      //         />
      //         <LoginInput
      //           labelName="Password"
      //           inputType="password"
      //           placeholder="Enter Password..."
      //           value={password}
      //           onChangeEvent={handleChange("password")}
      //           style={{
      //             width: "100%",
      //             height: "40px",
      //             backgroundColor: "#dfebee",
      //             width: "100%",
      //             padding: "10px",
      //             borderRadius: "12px",
      //             borderStyle: "none",
      //           }}
      //         />
      //         <p
      //           style={{
      //             color: "#999999",
      //             fontSize: ".7em",
      //             textAlign: "left",
      //           }}
      //         >
      //           Use 5 or more characters to make a strong Password.
      //         </p>
      //         {successMessage()}
      //         {errorMessage()}
      //         <button
      //           onClick={onSubmit}
      //           style={{
      //             borderRadius: "12px",
      //             backgroundColor: "#fa002f",
      //             width: "55%",
      //             color: "#dfebee",
      //             margin: "10px 0",
      //             boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.4)",
      //             fontWeight: "500",
      //           }}
      //           className="btn"
      //         >
      //           Sign Up
      //         </button>
      //         <h6>
      //           <Link
      //             to="/"
      //             style={{
      //               textDecoration: "none",
      //               color: "#999999",
      //               fontSize: ".9em",
      //             }}
      //           >
      //             Already have an account?
      //             <span style={{ color: "blue" }}> Signin here</span>
      //           </Link>
      //         </h6>
      //       </div>
      //     </div>
      //     <div className="col-md-7" style={{ backgroundColor: "#0f52ba" }}>
      //       <div className="text-center">
      //         <img src={homePagePhoto} style={{ marginTop: "100px" }} />
      //         <h1 style={{ fontWeight: "bold", fontSize: "4em" }}>
      //           Taste
      //           <span style={{ color: "white" }}>Book</span>
      //         </h1>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  };

  return <>{signUpForm()}</>;
};

export default Signup;