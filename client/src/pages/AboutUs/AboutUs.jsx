import React from "react";
import { ProfileCard } from "./../../elements";
import { Sidebar } from "./../../components";
import { data } from './aboutUsdata.js';
import { Fade, Slide } from "react-awesome-reveal";

import "./AboutUs.css";

import dakshImg from '../../assets/avatars/daksh_avatar.png'
import ishwarImg from '../../assets/avatars/ishwar_avatar.png'
import shirazImg from '../../assets/avatars/shiraz_avatar.png'

export default function AboutUs() {
  return (
    //make about us card in components and make 3 of them here
    <div className="aboutUsBody">
      <Fade>
      <Sidebar />
      </Fade>
      <div className="profileCardParent">
        <Slide direction="up" triggerOnce>
        <div className="profileCard">
          <ProfileCard
            name={data?.daksh?.name}
            whatWork={data?.daksh?.whatWork}
            whoAreYou={data?.daksh?.whoAreYou}
            content={data?.daksh?.content}
            socialLinks={data?.daksh?.socialLinks}
            profileImg={dakshImg}
          />
        </div>
        </Slide>

        <Slide triggerOnce direction="up">Icon
        <div className="profileCard" style={{ backgroundColor: "#DFF6FF" }}>
        <ProfileCard
            name={data?.ishwar?.name}
            whatWork={data?.ishwar?.whatWork}
            whoAreYou={data?.ishwar?.whoAreYou}
            content={data?.ishwar?.content}
            socialLinks={data?.ishwar?.socialLinks}
            profileImg={ishwarImg}
            />
        </div>
        </Slide>

      <Slide direction="up" triggerOnce>
        <div className="profileCard">
        <ProfileCard
            name={data?.shiraz?.name}
            whatWork={data?.shiraz?.whatWork}
            whoAreYou={data?.shiraz?.whoAreYou}
            content={data?.shiraz?.content}
            socialLinks={data?.shiraz?.socialLinks}
            profileImg={shirazImg}
          />
        </div>
        </Slide>
      </div>
    </div>
  );
}
