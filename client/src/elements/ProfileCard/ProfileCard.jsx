import React from "react";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function ProfileCard({
  name = "Name",
  whatWork = "whatWork",
  whoAreYou = "whoAreYou",
  content = "content",
  socialLinks = ["#", "#", "#", "#"], /*Mail, Linkedin, Twitter, Github */
}) {
  return (
    <div className="profileCardContainer">
      <div className="personData">
        <h1 className="large-text">{name}.</h1>
        <h3>{whatWork}</h3>
        <h4>{whoAreYou}</h4>
        <p>{content}</p>
        <div className="profileCardSocial">

          <a href={socialLinks[0]}>
            <MailOutlinedIcon />
          </a>

          <a href={socialLinks[1]}>
            <LinkedInIcon />
          </a>

          <a href={socialLinks[2]}>
            <TwitterIcon />
          </a>

          <a href={socialLinks[3]}>
            <GitHubIcon />
          </a>
        </div>
      </div>

      <div className="pfp-container"></div>
    </div>
  );
}
