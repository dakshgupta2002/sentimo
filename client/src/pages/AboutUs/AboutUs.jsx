import React from "react";
import { ProfileCard } from "./../../elements";
import { Sidebar } from "./../../components";

import './AboutUs.css';

const ishwarImg = require("./../../assets/avatars/ishwar_avatar.png");

export default function AboutUs() {
  return (
    //make about us card in components and make 3 of them here
    <div className="aboutUsBody">
      <Sidebar />
      <div className="profileCard">
        <ProfileCard profileImg={ishwarImg}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia esse mollitia, tempore eveniet delectus nisi sit, laborum molestias dolorum voluptate ipsum. Voluptatum illum nobis blanditiis ratione magni laudantium ad."/>
      </div>
    </div>
  );
}
