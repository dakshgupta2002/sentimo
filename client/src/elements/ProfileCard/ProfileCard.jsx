import React from "react";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Divider from '@mui/material/Divider';

import "./ProfileCard.css";

export default function ProfileCard({
  name = "Name",
  whatWork = "What Work do you do",
  whoAreYou = "Who Are You",
  content = "More about you",
  socialLinks = ["#", "#", "#", "#"] /*Mail, Linkedin, Twitter, Github */,
  profileImg,
}) {
  return (
    <div className="profileCardContainer">
      <div className="personData">

        <div className="personWhatWork small-text">{whatWork}</div>
        <div className="personName">{name}.</div>
        <Divider /> 
        <div className="personWhoAreYou medium-text">{whoAreYou}</div>
        <div className="personContent small-text">{content}</div>
      
        <div className="profileCardSocial">
          <a href={socialLinks[0]}>
            <MailOutlinedIcon sx={{ color: "black", fontSize: "40px" }} />
          </a>

          <a href={socialLinks[1]}>
            <LinkedInIcon sx={{ color: "black", fontSize: "40px" }} />
          </a>

          <a href={socialLinks[2]}>
            <InstagramIcon sx={{ color: "black", fontSize: "40px" }} />
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
