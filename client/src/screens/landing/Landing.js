import React, { useState, useEffect } from "react";
import { Col, Row, Toast } from "react-bootstrap";
import Img from "react-bootstrap/Image";
import code_editor from "../../assets/images/code_editor.png";
import { Container, Stack } from "react-bootstrap";
// import Typist from "react-typist";
import { TypeAnimation } from "react-type-animation";
import { InputGroup, Button, Form } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import NavBar from "../../components/Navbar";
import starbg from "./starbg.jpg";
import Timeline from "../../components/Timeline";
import { useNavigate } from "react-router-dom";

import StatsCard from "./StatsCard";
import "./landing.css";
import { ToastContainer } from "react-toastify";

const Landing = () => {
  const navigate = useNavigate();
  const [searchQuery, setsearchQuery] = useState("");
  const [isBackgroundLoaded, setBackgroundLoaded] = useState(false);
  const [landingbg, setLandingbg] = useState(starbg);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const starBgImage = new Image();
    starBgImage.src = starbg;

    starBgImage.onload = () => {
      // Image has finished loading
      setLandingbg(starbg); // Set the landingbg to starbg
      setBackgroundLoaded(true); // Set background as loaded
      setLoading(false); // Mark loading as false
    };
  }, []);

  return (
    <>
      {isLoading ? ( // Show black image until starbg image has loaded
        <div
          style={{
            backgroundSize: "cover",
            background: "black", // Set black as the background color
            width: "100vw",
            height: "100vh",
          }}
        ></div>
      ) : (
        <div
          className="landing"
          style={{
            backgroundImage: `url(${landingbg})`,
            backgroundSize: "contain !important",
          }}
        >
          <NavBar bg="" />

          <Container style={{ marginTop: "5%" }}>
            <div>
              {/* <Typist>
                <h1 className="main-heading text-white">Stuck on a problem?</h1>
              </Typist> */}
              <br></br>
              <TypeAnimation
  sequence={[
    'Stuck on a problem?',
    1000, 
  ]}
  wrapper="h1"
  className="main-heading text-white"
  speed={50}
  repeat={0} // This makes it type only once
/>
<br></br>
<br></br>
              <InputGroup className="search-bar mb-5 " size="lg">
                <Form.Control
                  placeholder="Enter problem name or link"
                  aria-label="Enter problem name or link"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setsearchQuery(e.target.value)}
                />
                <Button
                  variant="outline-lg-purple"
                  id="button-addon2"
                  onClick={() => {
                    const param = `/problems?q=${searchQuery}`;
                    navigate(param);
                  }}
                >
                  Search
                </Button>
              </InputGroup>
              <Row className="title-text">
                <Col xs={12} md={6}>
                  <Stack className="mt-5">
                    <h1 className="text-purplee three-lines">Get some hints</h1>
                    <h1 className="text-lg-purple three-lines">
                      Share some hints
                    </h1>
                    <h1 className="text-primary-300 three-lines">
                      Help grow the community
                    </h1>
                  </Stack>
                </Col>
                <Col xs={12} md={6}>
                  <Img src={code_editor} fluid rounded />
                </Col>
              </Row>
            </div>
          </Container>
          <div style={{ backgroundColor: "#000" }} className="py-5">
            <div className="py-4 mx-auto">
              <StatsCard />
            </div>

            <div className="text-white">
              <h1 className="text-heading text-white mb-lg-2">How it works?</h1>
              <Timeline />
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Landing;
