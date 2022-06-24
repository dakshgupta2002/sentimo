import React from "react";
import Lottie from "react-lottie-player";
import { Sidebar } from "../../components";
import landingPageAnimation from "../../assets/lottieSvg/landingPageAnimation.json";
import confusedGuy from "../../assets/lottieSvg/confused.json";
import whatWeDoAnimation from "../../assets/lottieSvg/whatWeDoAnimation.json";
import homebgStart from "./../../assets/images/homebgStart.webp";

import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-heading">
        <Lottie animationData={landingPageAnimation} loop play />

        <div className="home-title-container">
          <div className="home-title popup-anim">SENTIMO</div>
          <div className="home-title-desc popup-anim">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
            similique!
          </div>
        </div>
      </div>

      <div className="confused-point-container">
        <div className="confused-points">
          <div className="confused-header">Question</div>
          <div className="confused-point">
            Tired and exhausted from your entire day's work?
          </div>
          <div className="confused-point">
            Or did something exciting and fascinating happen?
          </div>
          <div className="confused-point">
            Lest you're fearful or sad about anything?
          </div>
        </div>
        <div className="confused-lottie">
          <Lottie animationData={confusedGuy} loop play />
        </div>
      </div>

      <div className="how-it-works-container">
        <div className="how-it-works-header">HOW IT WORKS</div>

        <div className="how-it-works-steps">
          <div className="step">
            <img
              className="icon"
              src={`https://images.unsplash.com/photo-1651936716950-7aca46b99653?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbm5lY3QlMjBkZXZpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60`}
              alt=""
            ></img>

            <div className="step-header">CONNECT DEVICE</div>
            <div className="step-content">
              Need username and password ... big bi gbi gbibi more big big big
              line other one small
            </div>
          </div>

          <div className="step">
            <img
              className="icon"
              src={`https://images.unsplash.com/photo-1578269174936-2709b6aeb913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJvcGh5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60`}
              alt=""
            ></img>

            <div className="step-header">DONEE</div>
            <div className="step-content">Yes get started with diary ...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
