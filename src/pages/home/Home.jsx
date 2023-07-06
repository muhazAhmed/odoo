import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Link to="/customer-data">
        <Button variant="contained">Customer</Button>
      </Link>
    </div>
  );
};

export default Home;
