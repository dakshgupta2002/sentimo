import { Typography } from "@mui/material";
import { useState } from "react";
import { Rings } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const useLoading = () => {
  
  const loaderContainerStyle = {
    position: 'fixed',
    top: '0px',
    height: '100vh',
    width: '100vw',
    zIndex: '3000',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 'none'
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const LoadingScreen = () => {
    return (
      <>
        {loading ?
          <div style={loaderContainerStyle}>
            <Rings
              height="200"
              width="200"
              color="#FDFBF9"
              ariaLabel='loading'
            />

            <Typography component={'h1'} sx={{color: '#FDFBF9'}}>{error}...</Typography>
          </div>
          : null}
      </>
    )
  }
  return { loading, setLoading, error, setError, LoadingScreen };
}