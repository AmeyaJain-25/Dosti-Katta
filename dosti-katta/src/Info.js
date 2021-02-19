import React from "react";
import "./core/style/home.css"
//Packages-----------------
import { Col, Container, Row } from "react-bootstrap";
import { SiAdobexd } from "react-icons/si"
import { FaGithub, FaLinkedin, FaNodeJs, FaBehanceSquare } from "react-icons/fa"
import { BsHeartFill } from "react-icons/bs"
//Components-----------------
import Menu from "./core/Menu";
//Images-----------------
import dostiKatta from "./dostiKatta.png";


const Info = () => {
    return (
    <Container fluid className="home_page" style={{minHeight: "100vh"}}>
        <Menu />
            <div style={{display: 'flex', justifyContent: "center"}}>
                <img src={dostiKatta} alt="loading..." style={{marginTop: "10px", width: "160px"}}/>
            </div>
        <Container style={{margin: "5x 0px"}}>
            <div style={{margin: "5px", textAlign: "center"}}>
                <a href="https://github.com/AmeyaJain-25/Dosti-Katta" target="_blank" title="Code of Dosti Katta"><FaGithub style={{fontSize: "2em", margin: "5px", color: "#000"}} /></a>
                <a href="https://www.behance.net/gallery/113668161/Dosti-Katta" target="_blank" title="UI of Dosti Katta"><FaBehanceSquare style={{fontSize: "2em", margin: "5px", color: "#0057ff"}} /></a>
            </div>
            <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "0"}}>Made with <BsHeartFill style={{color: "#f44336"}}/> by </h1>
            <Row>
                <Col md="6">
                    <div style={{margin: "15px 80px", textAlign: "center"}}>
                        <h1 style={{fontFamily: "'Skranji', cursive", margin: "0", padding: "0"}}>Ameya</h1>
                        <h1 style={{fontFamily: "'Skranji', cursive", margin: "0", padding: "0"}}>Jain</h1>
                        <FaNodeJs style={{fontSize: "3.2em", marginTop: "5px", color: "#3c873a"}}/>
                        <h2>Web Development</h2>
                        <div>
                            <a href="https://github.com/AmeyaJain-25" target="_blank"><FaGithub style={{fontSize: "2em", margin: "5px", color: "#211F1F"}} /></a>
                            <a href="https://www.linkedin.com/in/ameya-jain-8344611b0/" target="_blank"><FaLinkedin style={{fontSize: "2em", margin: "5px", color: "#006192"}} /></a>
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div style={{margin: "15px 80px", textAlign: "center"}}>
                        <h1 style={{fontFamily: "'Skranji', cursive", margin: "0", padding: "0"}}>Sarthak</h1>
                        <h1 style={{fontFamily: "'Skranji', cursive", margin: "0", padding: "0"}}>Musmade</h1>
                        <SiAdobexd style={{fontSize: "3em", marginTop: "5px", color: "#7b1fa2"}}/>
                        <h2>UI/UX</h2>
                        <div>
                            <a href="https://github.com/Sarthak1812" target="_blank"><FaGithub style={{fontSize: "2em", margin: "5px", color: "#211F1F"}} /></a>
                            <a href="https://www.linkedin.com/in/sarthak-musmade-86467b1b0/" target="_blank"><FaLinkedin style={{fontSize: "2em", margin: "5px", color: "#006192"}} /></a>
                            
                        </div>
                    </div>
                </Col>
            </Row>            
        </Container>
    </Container>
    )
}

export default Info;