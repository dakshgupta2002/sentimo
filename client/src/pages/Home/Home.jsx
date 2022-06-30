import React from "react";
import { Slide, Fade } from "react-awesome-reveal";
import Filter1RoundedIcon from "@mui/icons-material/Filter1Rounded";
import Filter2RoundedIcon from "@mui/icons-material/Filter2Rounded";
import Filter3RoundedIcon from "@mui/icons-material/Filter3Rounded";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import { Sidebar } from "../../components";
import landingPageAnimation from "../../assets/lottieSvg/landingPageAnimation.json";
// import confusedGuy from "../../assets/lottieSvg/confused.json";
import answers from "../../assets/lottieSvg/answers.json";
import thinking from "../../assets/images/thinking.svg"

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
      <div className="confused-point-container">
        <Fade triggerOnce>
          <div className="confused-points">
            <div className="confused-header text--center">Questions</div>
            <div className="confused-point">
              ❓Tired and exhausted from your entire day's work?
            </div>
            <div className="confused-point">
              ❓Or did something exciting and fascinating happen?
            </div>

            <div className="confused-point">
              ❓Lest you're fearful or sad about anything?
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
            <div className="confused-header text--center">Answers</div>
            <div className="confused-point">
              💡 Do not stress yourself out as you can pour your heart out to us
              and we won't judge you at all!
            </div>
            <div className="confused-point">
              💡 This is your personalised diary and you can keep all types of
              notes you want to!
            </div>
            <div className="confused-point">
              💡 Instead, we'll recommend you entertainment material according
              to your mood.
            </div>
          </div>
        </Fade>
      </div>

      {/* TODO: CHANGE ICON IMAGES */}
      <div className="how-it-works-container">
        <Fade triggerOnce>
          <div className="how-it-works-header text--center">HOW IT WORKS !</div>
        </Fade>
        <Fade triggerOnce>
          <div className="how-it-works-steps">
            <div className="step">
              <img
                className="icon"
                src={`https://images.unsplash.com/photo-1651936716950-7aca46b99653?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbm5lY3QlMjBkZXZpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60`}
                alt=""
              ></img>

              <div className="step-header">CONNECT DEVICE</div>
              <div className="step-content">
                One step login/signup to unlocking doors to complete emotional
                regeneration!
              </div>
            </div>

            <div className="step">
              <img
                className="icon"
                src={`https://images.unsplash.com/photo-1578269174936-2709b6aeb913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJvcGh5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60`}
                alt=""
              ></img>

              <div className="step-header">That's It</div>
              <div className="step-content">
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
