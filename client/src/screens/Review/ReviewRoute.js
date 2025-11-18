import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Review from "./Review";
import BACKEND_URL from "../../constants";

const ReviewRouter = () => {
  const [hints, setHints] = useState([]);
  const [isAuthorised, setIsAuthorised] = useState(-1);

  const navigate = useNavigate();

  const getHints = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/review/`);
      setHints(res.data);
      setIsAuthorised(1);
    } catch (e) {
      setIsAuthorised(0);
    }
  };

  useEffect(() => {
    // 🔥 Set token JUST BEFORE API call
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    getHints();
  }, []);

  // Loading
  if (isAuthorised === -1) return <p>Loading...</p>;

  // If authorised
  if (isAuthorised === 1) {
    return <Review hints={hints} isAuthorised={isAuthorised} />;
  }

  // If not admin
  if (isAuthorised === 0) {
    navigate("/");
    return null;
  }
};

export default ReviewRouter;
