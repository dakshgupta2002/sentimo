import React from "react";
import { Fade } from "react-awesome-reveal";
import Filter1RoundedIcon from "@mui/icons-material/Filter1Rounded";
import Filter2RoundedIcon from "@mui/icons-material/Filter2Rounded";
import Filter3RoundedIcon from "@mui/icons-material/Filter3Rounded";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import { Sidebar } from "../../components";
import landingPageAnimation from "../../assets/lottieSvg/landingPageAnimation.json";
import answers from "../../assets/lottieSvg/answers.json";
import thinking from "../../assets/images/thinking.svg"
import writing from "../../assets/images/writing.svg"
import join from "../../assets/images/join.svg"
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Sidebar />
      <footer className="text--center" style={{paddingTop: "10px", paddingBottom: "10px"}}>
        <Link to="/aboutUs" style={{color: "#fff", textDecoration: "none"}}>About the Developers</Link>
      </footer>
          
      {/* HEADING SENTIMO AND ONE LINER */}
      <Fade triggerOnce>
        <div className="home-heading">
          <Lottie
            className="lottie-animation"
            animationData={landingPageAnimation}
            loop
            play
          />

          <div className="home-title-container">
            <div className="home-title popup-anim text--center">SENTIMO</div>
            <div className="home-title-desc popup-anim text--left">
              Write down your deep down feelings in our secure note app.
              <br /> <br />
              Watch the movies that match your sentiments and reduce time
              surfing OTTs.
            </div>
          </div>
        </div>
      </Fade>

      {/* CONFUSED PERSON AND QUESTIONS */}
      <div className="confused-point-container altText">
        <Fade triggerOnce>
          <div className="confused-points">
            <div className="confused-header text--center">Questions</div>
            <div className="confused-point">
              <span className="emotesBullet">❓</span> Tired and exhausted from your entire day's work?
            </div>
            <div className="confused-point">
              <span className="emotesBullet">❓</span> Or did something exciting and fascinating happen?
            </div>

            <div className="confused-point">
              <span className="emotesBullet">❓</span> Lest you're fearful or sad about anything?
            </div>
          </div>
        </Fade>

        <Fade triggerOnce>
        {/* <Lottie
          className="lottie-animation"
          animationData={confusedGuy}
          loop
          play
        /> */}
        <img src={thinking} alt="" className="lottie-animation" />
        </Fade>
      </div>

      <div className="solution-container">
        <div className="confused-lottie lottie-animation">
        <Fade triggerOnce>
          <Lottie
            style={{ alignSelf: "center" }}
            animationData={answers}
            loop
            play
          />
          </Fade>
        </div>
        <Fade triggerOnce>
          <div className="confused-points">
            <div className="confused-header text--center">Solutions</div>
            <div className="confused-point">
              <span className="emotesBullet">💡</span> Do not stress yourself out as you can pour your heart out to us
              and we won't judge you at all!
            </div>
            <div className="confused-point">
              <span className="emotesBullet">💡</span> This is your personalised diary and you can keep all types of
              notes you want to!
            </div>
            <div className="confused-point">
              <span className="emotesBullet">💡</span> Instead, we'll recommend you entertainment material according
              to your mood.
            </div>
          </div>
        </Fade>
      </div>

      {/* TODO: CHANGE ICON IMAGES */}
      <div className="how-it-works-container altText">
        <Fade triggerOnce>
          <div className="how-it-works-header text--center">HOW IT WORKS !</div>
        </Fade>
        <Fade triggerOnce>
          <div className="how-it-works-steps">
            <div className="step">
              <img
                className="icon"
                src={writing}
                alt=""
              ></img>

              <div className="step-header text--center">CONNECT DEVICE</div>
              <div className="step-content text--center">
                One step login/signup to unlocking doors to complete emotional
                regeneration!
              </div>
            </div>

            <div className="step">
              <img
                className="icon"
                src={join}
                alt=""
              ></img>

              <div className="step-header text--center">That's It</div>
              <div className="step-content text--center">
                Start writing your diaries and watch movies at your lowest points of life!
              </div>
            </div>
          </div>
        </Fade>
      </div>

      <div className="extra-features-container">
        <Fade triggerOnce>
          <div className="extra-features-heading">benefits</div>
        </Fade>
        <div className="extra-features">
          <Fade triggerOnce>
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
              Surf only the movies filtered specially for you to cheer up at the
              moments you need love the most.
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
