import React from 'react'
import HomeBanner from './HomeBanner'
import HomeCards from './HomeCard'
import Divider from '@mui/material/Divider';

const TravelAgenHome = () => {
  return (
      <div style={{ overflow: 'clip' }}>
          <HomeBanner />
          <HomeCards/>
      </div>
  )
}

export default TravelAgenHome