import React, {lazy} from "react";
import { Sidebar } from "./../../components";
import { data } from './aboutUsdata.js';
import { Slide } from "react-awesome-reveal";

import "./AboutUs.css";

import dakshImg from '../../assets/avatars/daksh_avatar.png'
import ishwarImg from '../../assets/avatars/ishwar_avatar.png'
import shirazImg from '../../assets/avatars/shiraz_avatar.png'
import { ProfileCard } from "./../../elements";
// const ProfileCard = lazy(() => import("./../../elements"));

export default function AboutUs() {
  return (
    //make about us card in components and make 3 of them here
    <div className="aboutUsBody">
      <Sidebar />
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

        <Slide triggerOnce direction="up">
        <div className="profileCard" style={{ border: 1 }}>
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
