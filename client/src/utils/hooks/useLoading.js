import { useState } from "react";
import { Hearts, ThreeCircles, ThreeDots, Rings, Puff } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loaderContainerStyle = {
    position: 'absolute',
    top: '0px',
    height: '100vh',
    width: '100vw',
    zIndex: '3000',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const setErrorMessage = (message) => {
    setError(message);
  }

  const LoadingScreen = () => {
    return (
      <>
        {loading ?
          <div style={loaderContainerStyle}>
            <Rings
              height="200"
              width="200"
              color="#303846"
              ariaLabel='loading'
            />
          </div>
          : null}
      </>
    )
  }
  return { loading, setLoading, error, setErrorMessage, LoadingScreen };
}