import React from "react";
import { ProfileCard } from "./../../elements";
import { Sidebar } from "./../../components";

export default function AboutUs() {
  return (
    //make about us card in components and make 3 of them here
    <div className="aboutUsBody">
      <Sidebar />
      <div className="card">
        <ProfileCard />
      </div>
    </div>
  );
}
