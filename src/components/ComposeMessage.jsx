import React, {useState} from 'react'
import {Box, Typography,Button,Container, Divider} from "@mui/material"



import Alert from '@mui/material/Alert';

import TransitionsModal from "../components/TransitionsModal"






const ComposeMessage = () => {
    

    
    return (
    <Container  sx={{display: "flex"}}>
   
        
        <Box sx={{flexDirection: "space-between", p: "20px"}}>
        <TransitionsModal />
        
        
        </Box>


    </Container>


    

  )
}

export default ComposeMessage

   