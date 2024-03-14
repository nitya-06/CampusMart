import React from "react";
import "./Contact.css";
import Button from "@mui/material/Button";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:kanad0420@gmail.com">
        <Button>Contact: kanad0420@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
