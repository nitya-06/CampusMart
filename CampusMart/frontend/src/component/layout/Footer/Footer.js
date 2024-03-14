import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download our app for android and IOS mobile phones</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>E-COMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2023 &copy; Nityanand Kumar</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a
          href="https://www.youtube.com/@nityanandkumar6341"
          target="_blank"
          rel="noreferrer"
        >
          Youtube
        </a>
        <a
          href="https://www.facebook.com/nityanand.kumar.7140497/"
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
        <a
          href="https://www.linkedin.com/in/nityanand-kumar-186907241/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
