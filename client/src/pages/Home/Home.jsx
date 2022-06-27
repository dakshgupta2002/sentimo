import React from "react";
import { Slide, Fade } from "react-awesome-reveal";
import Lottie from "react-lottie-player";
import { Sidebar } from "../../components";
import landingPageAnimation from "../../assets/lottieSvg/landingPageAnimation.json";
import confusedGuy from "../../assets/lottieSvg/confused.json";
import answers from "../../assets/lottieSvg/answers.json";
import Filter1RoundedIcon from "@mui/icons-material/Filter1Rounded";
import Filter2RoundedIcon from "@mui/icons-material/Filter2Rounded";
import Filter3RoundedIcon from "@mui/icons-material/Filter3Rounded";

import "./Home.css";

/* TODO: 
1. Fonts change
2. Images change
3. Icons check if ok or change
4. Content Check and Changeks
*/

export default function Home() {
  return (
    <div className="home-container">
      <Fade>
        <Sidebar />
      </Fade>

      {/* HEADING SENTIMO AND ONE LINER */}
      <Fade direction="up" cascade triggerOnce>
        <div className="home-heading">
          <Lottie
            className="lottie-animation"
            animationData={landingPageAnimation}
            loop
            play
          />

          <div className="home-title-container">
            <div className="home-title popup-anim text--center">SENTIMO</div>
            <div className="home-title-desc popup-anim text--center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
              similique!
            </div>
          </div>
        </div>
      </Fade>

      {/* CONFUSED PERSON AND QUESTIONS */}
      <Slide direction="right" cascade triggerOnce>
        <div className="confused-point-container">
          <div className="confused-points">
            <div className="confused-header">Questions</div>
            <div className="confused-point">
              ❓Tired and exhausted from your entire day's work?
            </div>
            <div className="confused-point">
              ❓Or did something exciting and fascinating happen?
            </div>

            {/* TODO: Some issue with this 3rd div. Shifted to a bit right need to check */}
            <div className="confused-point">
              ❓Lest you're fearful or sad about anything?
            </div>
          </div>
          <Lottie
            className="lottie-animation"
            animationData={confusedGuy}
            loop
            play
          />
        </div>
      </Slide>

      <Slide direction="left" cascade triggerOnce>
        <div className="solution-container">
          <div className="confused-lottie">
            <Lottie
              style={{alignSelf: "center"}}
              animationData={answers}
              loop
              play
            />
          </div>
          <div className="confused-points">
            <div className="confused-header">Answers</div>
            <div className="confused-point">
              ✅ Do not stress yourself out as you can pour your heart out to us
              and we won't judge you at all!
            </div>
            <div className="confused-point">
              ✅ This is your personalised diary and you can keep all types of
              notes you want to!
            </div>
            <div className="confused-point">
              ✅ Instead, we'll recommend you entertainment material according
              to your mood.
            </div>
          </div>
        </div>
      </Slide>

      {/* TODO: CHANGE ICON IMAGES */}
      <Slide direction="right" cascade triggerOnce>
        <div className="how-it-works-container">
          <div className="how-it-works-header">HOW IT WORKS !</div>

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
      </Slide>

      <Slide direction="left" cascade triggerOnce>
        <div className="extra-features-container">
          <div className="extra-features-heading">benefits</div>
          <div className="extra-features">
            <div className="extra-features-content">
              <Filter1RoundedIcon sx={{ fontSize: "3rem" }} />
              Wanna see how you feel throughout the week or so, we have your
              personalised statistics on display too!
            </div>
            <div className="extra-features-content">
              <Filter2RoundedIcon sx={{ fontSize: "3rem" }} />
              Scared about your privacy? Don't worry! You can opt to protect
              your notes via Face Lock also.
            </div>
            <div className="extra-features-content">
              <Filter3RoundedIcon sx={{ fontSize: "3rem" }} />
              Feeling lethargic to type it out? You can also speak out your
              feelings in a minute.
            </div>
          </div>
        </div>
      </Slide>

      <Fade triggerOnce>
        <footer className="text--center">Footer</footer>
      </Fade>
    </div>
  );
}
