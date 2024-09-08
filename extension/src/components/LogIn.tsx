import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, keyframes } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { getUserInfo } from '../controllers/UserInfo';
import axios from 'axios';

// Keyframes for the text rotation animation
const rotateText = keyframes`
  0%, 10% {
    opacity: 0;
    transform: translateY(-20px);
  }
  15%, 65% {
    opacity: 1;
    transform: translateY(0);
  }
  90%, 100% {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const Login: React.FC = () => {
  const [isAlternate, setIsAlternate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAlternate((prev) => !prev);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const { id, email } = await getUserInfo();
      
      await axios.post("http://localhost:3000/users", {
        googleId: id,
        email: email,
      });
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        width: '320px',
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        p: 2,
        border: '1px solid #ccc',
        boxShadow: 2,
        backgroundColor: '#f9f9f9',
        position: 'relative',
        textAlign: 'center',
        margin: 'auto', 
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 1, 
          fontWeight: 'bold',
          color: '#3a9ffc',
        }}
      >
        Careless Whisperer
      </Typography>
      <Box sx={{ color: '#757575', mb: 3, mt: 2 }}>
        <Typography variant="subtitle1" component="div">
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Your&nbsp;
            <strong>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  animation: `${rotateText} 3s infinite`,
                  width: '60px',
                  textAlign: 'center',
                }}
              >
                {isAlternate ? 'assistant' : 'writer'}
              </Box>
            </strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            for things that&nbsp;
            <strong>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  animation: `${rotateText} 3s infinite`,
                  width: '50px',
                  textAlign: 'center',
                }}
              >
                {isAlternate ? 'do' : "don't"}
              </Box>
            </strong>
            &nbsp;matter
          </span>
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{
          padding: '10px 20px',
          textTransform: 'none',
          fontSize: '16px',
          bgcolor: '#4285F4',
          '&:hover': {
            bgcolor: '#2a5dbf',
          },
          mt: 2,
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
};

export default Login;