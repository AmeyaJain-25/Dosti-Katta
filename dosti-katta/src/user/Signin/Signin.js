import React, { useState } from "react";
import "./signin.css";
//Packages-----------------
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
//Function importing-----------------
import { signin, authenticate, isAuthenticated } from "../../auth/helper/index";
//Components-----------------
import LoginInput from "../../components/LoginInput";
//Images-----------------
import logoWithSlogan from "../../logoWithSlogan.png"

const Signin = () => {
  //useState---------------
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    username: "",
    loading: false,
    didRedirect: false,
  });
  const [disableSignin, setDisableSignin] = useState(false);

  const { email, password, username, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //Signin Function---------------
  const onSubmit = (event) => {
    setDisableSignin(true);
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    //API call---------------
    signin({ email, password, username })
      .then((data) => {
        setDisableSignin(false);
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            didRedirect: false,
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              error: false,
              loading: false,
              email: "",
              username: "",
              error: "",
            });
          });
        }
      })
      .catch(console.log("Sign In Failed"));
  };

  //Perform Redirect---------------
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/home" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/home" />;
    }
  };

  //LOADING Message---------------
  const loadingMessage = () => {
    return (
      loading && (
        <h2
          style={{
            display: loading ? "" : "none",
            fontSize: "1em",
            color: "#00ab66",
            textAlign: "center",
          }}
        >
          Loading......!
        </h2>
      )
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

  //Signin Page JSX---------------
  const signInForm = () => {
    return (
      <Container className="themed-container signin_container" fluid>
        <Row>
          <Col md="7" sm="12">
            <Container className="signin_left_container">
              <Row>
                <img
                  src={logoWithSlogan}
                  alt="dostiKattaLogo"
                  className="dostiKatta_name"
                />
              </Row>
              <Row className="below_logo">
                <h4>
                  Meet millions of new people from all over the world and connect with them to make new friends.
                </h4>
              </Row>
            </Container>
          </Col>
          <Col md="5" sm="12">
            <Container className="signin_right_container">
              <Row className="signup_note_div">
                <h3 className="signup_note">
                  Not a Member?{" "}
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <span>Sign UP</span>
                  </Link>
                </h3>
              </Row>
              <Row>
                <div className="signin_signin_box">
                  <LoginInput
                    labelName="Email"
                    inputType="email"
                    value={email}
                    onChangeEvent={handleChange("email")}
                  />
                  <h5 style={{ color: "black", textAlign: "center" }}>Or</h5>
                  <LoginInput
                    labelName="Username"
                    inputType="username"
                    value={username}
                    onChangeEvent={handleChange("username")}
                  />
                  <LoginInput
                    labelName="Password"
                    inputType="password"
                    value={password}
                    onChangeEvent={handleChange("password")}
                  />
                  {loadingMessage()}
                  {errorMessage()}
                  <Button onClick={onSubmit} className="signin_button" disabled={disableSignin}>
                    SIGN IN
                  </Button>
                </div>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      // <div className="container-fluid">
      //   <div className="row" style={{ minHeight: "100vh" }}>
      //     <div className="col-md-7" style={{ backgroundColor: "#0f52ba" }}>
      //       <div className="text-center">
      //         <img src={homePagePhoto} style={{ marginTop: "100px" }} />
      //         <h1 style={{ fontWeight: "bold", fontSize: "4em" }}>
      //           Taste
      //           <span style={{ color: "white" }}>Book</span>
      //         </h1>
      //       </div>
      //     </div>
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
      //         Sign In
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
      //           labelName="Email"
      //           inputType="email"
      //           value={email}
      //           onChangeEvent={handleChange("email")}
      //         />
      //         <h5 style={{ color: "crimson", margin: "0", padding: "0" }}>
      //           Or
      //         </h5>
      //         <LoginInput
      //           labelName="Username"
      //           inputType="username"
      //           value={username}
      //           onChangeEvent={handleChange("username")}
      //         />
      //         <LoginInput
      //           labelName="Password"
      //           inputType="password"
      //           value={password}
      //           onChangeEvent={handleChange("password")}
      //         />
      //         {loadingMessage()}
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
      //           Sign In
      //         </button>
      //         <h6>
      //           <Link
      //             to="/signup"
      //             style={{
      //               textDecoration: "none",
      //               color: "#999999",
      //               fontSize: ".9em",
      //             }}
      //           >
      //             New User?
      //             <span style={{ color: "blue" }}> Signup instead</span>
      //           </Link>
      //         </h6>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  };

  return (
    <>
      {signInForm()}
      {performRedirect()}
    </>
  );
};

export default Signin;

//Perform Redirect