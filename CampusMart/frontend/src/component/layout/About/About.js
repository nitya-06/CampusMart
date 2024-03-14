import React from "react";
import "./aboutSection.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/kumar610nityanand/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dbaja6syc/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703864047/avatar/iknkarmklfzlv7x1xy5g.jpg?_s=public-apps"
              alt="Founder"
            />
            <Typography>Nityanand Kumar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @NityanandKumar. Only for the
              purpose to learn MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/channel/UC4_movIrbk0szvkLZmtyiXg"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>
            <a
              href="https://www.instagram.com/kumar610nityanand/"
              target="blank"
            >
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a
              href="https://www.linkedin.com/in/nityanand-kumar-186907241/"
              target="blank"
            >
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
