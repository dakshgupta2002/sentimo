import React from "react";
import Lottie from "react-lottie-player";
import { Sidebar } from "../../components";
import landingPageAnimation from "../../assets/lottieSvg/landingPageAnimation.json";
import whatWeDoAnimation from "../../assets/lottieSvg/whatWeDoAnimation.json";

import "./Home.css";

export default function Home() {
  document.body.style.overflow = "scroll";
  
  return (
    <>
      <div className="home-container">
        <Sidebar />
        <div className="home-heading">
          <Lottie
            animationData={landingPageAnimation}
            loop
            play
          />
          <div className="home-title-container">
            <div className="home-title popup-anim">SENTIMO</div>
            <div className="home-title-desc popup-anim">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
              similique!
            </div>
          </div>
        </div>

        <div className="home-diary-info-container">
          <div className="home-diary-info-heading home-title">What We Do?</div>
            <div className="home-diary-info">
              <div className="problem-list">
                <ul>
                  <li>Problem Solve-1</li>
                  <li>Problem Solve-2</li>
                  <li>Problem Solve-3</li>
                </ul>
              </div>

            <div className="diary-info-svg">
              <Lottie
                className="what-we-do-lottie"
                animationData={whatWeDoAnimation}
                loop
                play
              />
            </div>

              <div className="problem-list">
                <ul>
                  <li>Problem Solve-1</li>
                  <li>Problem Solve-2</li>
                  <li>Problem Solve-3</li>
                </ul>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
