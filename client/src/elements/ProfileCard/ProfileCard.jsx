import React from "react";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

import "./ProfileCard.css";

export default function ProfileCard({
  name = "Name",
  whatWork = "whatWork",
  whoAreYou = "whoAreYou",
  content = "content",
  socialLinks = ["#", "#", "#", "#"] /*Mail, Linkedin, Twitter, Github */,
  profileImg,
}) {
  return (
    <div className="profileCardContainer">
      <div className="personData">

        <h1 className="personName">{name}.</h1>
        <h3 className="personWhatWork">{whatWork}</h3>
        <h2 className="personWhoAreYou">{whoAreYou}</h2>
        <p className="person3Content">{content}</p>

        <div className="profileCardSocial">
          <a href={socialLinks[0]}>
            <MailOutlinedIcon sx={{ color: "black", fontSize: "40px" }} />
          </a>

          <a href={socialLinks[1]}>
            <LinkedInIcon sx={{ color: "black", fontSize: "40px" }} />
          </a>

          <a href={socialLinks[2]}>
            <TwitterIcon sx={{ color: "black", fontSize: "40px" }} />
          </a>

          <a href={socialLinks[3]}>
            <GitHubIcon sx={{ color: "black", fontSize: "40px" }} />
          </a>
        </div>
      </div>

      <div className="pfpContainer">
        <img className="avatars" src={profileImg} alt="" />
      </div>
    </div>
  );
}
