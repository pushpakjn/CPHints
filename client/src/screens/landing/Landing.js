// import { Container } from '@chakra-ui/react'
import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import code_editor from "../../assets/images/code_editor.png";
import { Container, Stack } from "react-bootstrap";
import LogoCard from "../../components/LogoCard";
import Typist from "react-typist";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Quotes from '../../components/Quotes';
import NavBar from "../../components/Navbar";
import starbg from './starbg.jpg';
import Timeline from '../../components/Timeline';
// import forces from '../../assets/images/forces.png';

          
const Landing = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  const responsive_quote = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  return (
    <div style={{backgroundSize:"cover",backgroundImage:`url(${starbg})`}}>
      <NavBar bg="" />
    
    
    
      <Container style={{ marginTop: "5%" }}>
        <div>
          <Typist>
            <h1 className="text-white" style={{ fontSize: "3.5rem" }}>
              Stuck on a problem?
            </h1>
          </Typist>
          <InputGroup
            className="mb-5 "
            size="lg"
            style={{ width: "50%", margin: "auto" }}
          >
            <Form.Control
              placeholder="Enter problem name or link"
              aria-label="Enter problem name or link"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-lg-purple" id="button-addon2">
              Search
            </Button>
          </InputGroup>
          <Row style={{ height: "72vh",marginTop:"140px"}}>
            <Col style={{marginTop:"50px"}}>
              <Stack className="mt-5" >
                <h1 className="text-purplee">Get some hints</h1>
                <h1 className='text-lg-purple'>Share some hints</h1>
                <h1 className='text-primary-300'>Help grow the community</h1>
              </Stack>
            </Col>
            <Col>
              <Image src={code_editor} fluid rounded />
            </Col>
          </Row>
        </div>
       
        
      </Container>
      <div className="text-white" style={{backgroundColor:"#000"} }  >
          <h1 className="text-purplee">You can browse hints from </h1>
          <Carousel
          /*
          swipeable={false}
          draggable={false}
          */
          responsive={responsive}
          ssr
          autoPlay={true}
          slidesToSlide={1}
          infinite
          containerClass="container-with-dots"
          itemClass="image-item"
          className="mt-5"
        >
              <LogoCard  title="Codeforces" />
              <LogoCard title="Leetcode" />
              <LogoCard title="SDE Sheet" />
              <LogoCard title="CSES" />

          
        </Carousel>
        {/* <Typist> */}
            <h1 className="text-white" style={{ fontSize: "3.5rem", marginTop:"100px" } }>
              How it works?
            </h1>
          {/* </Typist> */}
        <Timeline/>
        </div>

    
    </div>
  );
};

export default Landing;