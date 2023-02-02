import React from 'react'
import { Box } from '@mui/system'

const Dashboard = () => {
    const styles ={
        d1:{
            height: "100px",
            backgroundColor: "red",
            display: "flex-between"
        },
        main:{
            backgroundImage: "../public/assets/landing-page.jpg",
        }
    }
  return (
    <div style={styles.main} id="main">
        <div style={styles.d1} className="d1"></div>
        <div className="d2"></div>
        <div className="d3"></div>
    </div>
  )
}

export default Dashboard