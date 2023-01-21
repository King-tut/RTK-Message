import React,{useEffect, useState, useRef} from 'react'
import {TextareaAutosize} from "@mui/base"

import {  useDispatch, useSelector} from 'react-redux';
import {Box,Typography,Divider, Button} from "@mui/material"
import { useTheme } from '@mui/material';
import ComposeMessage from '../../components/ComposeMessage';
//import MessageArea from "../../components/MessageArea"<MessageArea />
import { useGetUserMessageQuery } from '../../state/api';
import { setAllOfYourMessages } from '../../state';
import TransitionsModal from '../../components/TransitionsModal';


const Messages = () => {
  
  const id = useSelector((state)=> state.persistedReducer.user._id)
  const dispatch = useDispatch();
  const theme = useTheme()
  

  
    const res =  useGetUserMessageQuery(id, {refetchOnFocus:true});
    
    if(res){
      console.log(`SUGAR ${res.data}`)
    }
  
    

  
  
  
  

  
    return (
      <Box sx={{display: "flex", height: "100%vh"}}>
        <Box>
        
        </Box>
        <Box >
    
    {
      
    res.data?.map((ele) => (
        <Box key={ele._id} 
        sx={{backgroundColor: theme.palette.grey[300], 
             m:"20px", 
             opacity:0.5,
             width: "100%"
            }} 
        
        >
          <h2 >From {ele.fromString}</h2>
          <h3 >RE: {ele.subject}</h3>
        <h5 >{ele.text}</h5>
        <Button>Delete</Button>
        <Button>Read</Button>
        </Box>
      ))
     
    }


      </Box> 
        
      <TransitionsModal  />
      </Box>
      
    )
  }

  
  

  
    

  
  
  


export default Messages