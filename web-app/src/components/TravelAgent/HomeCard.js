
import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeCards = () => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <Card sx={{ backgroundColor: '#0e0569', mt: '30px' }}>
      <Typography variant="h2" color='white' mt={4} >
        Get to Know us
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CardMedia
            component="img" 
            src="/logo.png"
            alt="Live from space album cover"
          />
        </Grid>
        <Grid item xs={9} paddingRight={15} data-aos="fade-right" data-aos-duration="1000">
          <Typography variant="h6" sx={{ textAlign: 'justify', mt: '35px', fontStyle: 'italic' }} color='white' paragraph>
            Welcome to Travelers! We're your dedicated partners in making your train travel experience smooth, convenient, and memorable.
            we are passionate about simplifying your journey. We're a team of travel enthusiasts who understand the importance of hassle-free train reservations. With years of experience in the travel industry, we've designed a platform with you in mind.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default HomeCards