import React from "react";
import Lottie from "react-lottie-player";
import { Sidebar } from "../../components";
import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import diaryLottie from "../../assets/lottieSvg/diaryLottie.json";

import "./Home.css";

export default function Home() {
  var navigate = useNavigate();
  return (
    <>
      <div className="home-container">
        <Sidebar />
        <div className="home-heading">
          <Lottie
            className="diary-woman-svg"
            animationData={diaryLottie}
            loop
            play
          />
          <div className="home-title-container">
            <div className="home-title">SENTIMO</div>
            <div className="home-title-desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
              similique!
            </div>
            <div className="sign-in-button-container">
              {/* LOG IN */}
              <Button
                variant="outlined"
                size="large"
                startIcon={<LoginIcon />}
                onClick={() => {
                  navigate("/login", { replace: true });
                }}
              >
                LOG IN
              </Button>
              
              {/* SIGN UP (REGISTER) */}
              <Button
                variant="outlined"
                size="large"
                endIcon={<LoginIcon />}
                onClick={() => {
                  navigate("/register", { replace: true });
                }}
              >
                SIGN UP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
