import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import axios from "axios";

import BACKEND_URL from "../../constants";
import { ToastContainer, toast } from "react-toastify";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const ReviewItem = (props) => {
  const hintDetails = props.props;
  const qlink1 = useRef(null);
  const qlink2 = useRef(null);
  const platform = useRef(null);
  const qname = useRef(null);
  const hint1 = useRef();
  const hint2 = useRef();
  const hint3 = useRef();
  const hint4 = useRef();
  const hint5 = useRef();
  const handleAccept = async (thid) => {
    const hint = [
      hint1.current.value,
      hint2.current.value,
      hint3.current.value,
      hint4.current.value,
      hint5.current.value,
    ];
    const data = {
      qlink1: qlink1.current.value,
      qlink2: qlink2.current.value,
      qname: qname.current.value,
      platform: platform.current.value,
      hints: hint,
      uid: hintDetails.uid,
      thid,
      created_at: hintDetails.created_at,
    };
    const res = await axios.post(`${BACKEND_URL}/review/approve/${thid}`, data);
    if (res.status === 200) {
      toast.success("Hint approved");
    } else {
      toast.error("There was some problem approving the hint");
    }
  };
  const handleReject = async (thid) => {
    const res = await axios.delete(`${BACKEND_URL}/review/reject/${thid}`);
    if (res.status === 200) {
      toast.success("Hint rejected");
    } else {
      toast.error("There was some problem rejecting the hint");
    }
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Link 1</InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          ref={qlink1}
          defaultValue={hintDetails.qlink}
        />
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Link 2</InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          ref={qlink2}
        />
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Question Name
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          ref={qname}
        />
      </InputGroup>
      <br />
      <div className="mb-5">
        <Form.Select aria-label="Default select example" ref={platform}>
          <option>Platform</option>
          <option value="Codeforces">Codeforces</option>
          <option value="Leetcode">Leetcode</option>
          <option value="Coding Ninjas">Coding Ninjas</option>
          <option value="GeeksforGeeks">GeeksforGeeks</option>
          <option value="CSES">CSES</option>
        </Form.Select>
      </div>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Hint #1</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Hint 1
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                ref={hint1}
                defaultValue={hintDetails.hints[0]}
              />
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Hint #2</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Hint 2
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                ref={hint2}
                defaultValue={hintDetails.hints[1]}
              />
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Hint #3</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Hint 3
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                ref={hint3}
                defaultValue={hintDetails.hints[2]}
              />
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Hint #4</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Hint 4
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                ref={hint4}
                defaultValue={hintDetails.hints[3]}
              />
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Hint #5</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Hint 5
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                ref={hint5}
                defaultValue={hintDetails.hints[4]}
              />
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button
        className="mt-4"
        variant="success"
        onClick={() => handleAccept(hintDetails.thid)}
      >
        Accept
      </Button>{" "}
      <Button
        className="mt-4"
        variant="danger"
        onClick={() => handleReject(hintDetails.thid)}
      >
        Reject
      </Button>{" "}
      <ToastContainer />
    </div>
  );
};

export default ReviewItem;
