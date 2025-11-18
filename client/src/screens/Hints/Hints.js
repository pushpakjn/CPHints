import React, { useState, useEffect } from "react";
import Axios from "axios";
import NavBar from "../../components/Navbar";
import { Container, Row, Dropdown, Button } from "react-bootstrap";
import HintPanel from "./HintPanel";
import "./Hints.css";
import BACKEND_URL from "../../constants";
import LoadingComponent from "../../components/loadingComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Hints = () => {
  const { state } = useLocation();   // contains qid, qname, platform, qlink1
  const navigate = useNavigate();

  const [hints, setHints] = useState([]); // all hints list
  const [sort, setSort] = useState("Latest Hints");
  const [limit, setLimit] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  // -------------------------
  // Infinite Scroll
  // -------------------------
  const handleInfiniteScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) >= scrollable) {
      setLimit((prev) => prev + 12);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  // -------------------------
  // Fetch hints on initial load + infinite scroll
  // -------------------------
  useEffect(() => {
    const fetchHints = async () => {
      try {
        const res = await Axios.post(`${BACKEND_URL}/hints/gethints/`, {
          qid: state.qid,
          limit: limit,
          offset: 0,
        });

        setIsLoading(false);
        setHints(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error("There was an error fetching the hints");
      }
    };

    fetchHints();
  }, [limit, state.qid]);

  // -------------------------
  // Fetch hints AFTER sort changes
  // -------------------------
  useEffect(() => {
    const fetchSortedHints = async () => {
      const endpoint = sort === "Latest Hints" ? "gethints" : "getHintsByVotes";

      try {
        const res = await Axios.post(`${BACKEND_URL}/hints/${endpoint}/`, {
          qid: state.qid,
          limit: 12,
          offset: 0,
        });

        // Very important: Replace, do NOT append → avoids duplicates
        setLimit(12);
        setHints(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error("Error fetching sorted hints");
      }
    };

    fetchSortedHints();
  }, [sort, state.qid]);

  return (
    <>
      <div style={{ backgroundColor: "#0F131A" }} className="min-vh-100">
        <NavBar bg="black" />

        <Container>
          {/* Question Header */}
          <div className="my-3">
            <a href={state.qlink1} target="__blank" id="link-title">
              <h2>{state.qname}</h2>
              <h4>{state.platform}</h4>
            </a>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end my-4">
            <Button
              variant="outline-primary-white"
              onClick={() => navigate("/contribute", { state: { qlink: state.qlink1 } })}
            >
              Add Hint
            </Button>

            <div style={{ width: "15%" }}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  className="text-primary-white border"
                >
                  {sort}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("Latest Hints")}>
                    Latest Hints
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("Most Upvoted")}>
                    Most Upvoted
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {/* Hints List */}
          <Row className="border-top border-dark">
            {isLoading ? (
              <LoadingComponent height="500px" lSize="30px" />
            ) : (
              hints.map((hint, idx) => (
                <HintPanel bgColor="#1A1D24" key={idx} hintData={hint} />
              ))
            )}
          </Row>
        </Container>
      </div>

      <ToastContainer theme="dark" limit={3} />
    </>
  );
};

export default Hints;
