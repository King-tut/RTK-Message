import React,{useEffect, useState, useRef} from 'react'
import {TextareaAutosize} from "@mui/base"

import {  useDispatch, useSelector} from 'react-redux';
import {Box,Typography,Divider, Button, Icon} from "@mui/material"
import { useTheme } from '@mui/material';
import ComposeMessage from '../../components/ComposeMessage';
//import MessageArea from "../../components/MessageArea"<MessageArea />
import { useGetUserMessageQuery, 
  useUpdateMessageToSeenMutation,
  useDeleteMessageMutation } from '../../state/api';
import { setAllOfYourMessages, setNotificationsCount } from '../../state';
import TransitionsModal from '../../components/TransitionsModal';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import Badge from '@mui/material/Badge';
import FlexBetween from '../../components/FlexBetween';



const Messages = () => {
  
  const id = useSelector((state)=> state.persistedReducer.user._id)
  const unreadMessages = useSelector((state)=> state.persistedReducer.notificationsCount.notificationsCount)
  const dispatch = useDispatch();
  const theme = useTheme()
  const [isSeen, setIsSeen] = useState(null);
  //const [unreadCount, setUnreadCount] = useState(unreadMessages)
  
  

  
    const res =  useGetUserMessageQuery(id, {refetchOnFocus:true});
    let arr = res.data || []
       
    const ref = useRef(null)
    const [update, isLoading] = useUpdateMessageToSeenMutation();
    let count = 0
    const [del, {isDeleted}] = useDeleteMessageMutation()

    useEffect(()=>{
      if(res){
        
       
        dispatch(setNotificationsCount({
          notificationsCount: res.data?.length
        }))
      }

    },[])

    for(let obj of arr){
      if(!obj.seen){
        count += 1
      }
    }

    const styles = {
      fontSize: "50px",
      readcolor: {
        backgroundColor: "red"
      }
    }
    
    
  
    const handleRead = (payload) =>{
      
        
       update(payload)
      console.log(`This is the ele ID`) 
       
             
      }

      const handleMarkAll = () =>{
        const allReadButtons = document.getElementsByClassName("read-btn")
        for(let ele of allReadButtons){
          ele.remove();

        }
        //setUnreadCount(0)
      }


      const handleDelete = (payload) =>{
        del(payload)

      }
  
  
  
  

  
    return (
      <Box sx={{display: "flex", height: "100%vh"}}>
        <Box sx={{flexDirection: "row"}}>
        <Typography sx={{flexDirection: "row-reverse", text:"bold", fontSize: "20px"}}>Unread Messages <Badge color="info" badgeContent={count}></Badge></Typography>
        <Button onClick={handleMarkAll}>Mark All as Read</Button>
        </Box>
        <Box >
    
    {
      
    res.data?.map((ele) => (
        <Box key={ele._id} 
          
          sx={{ backgroundColor: ele.seen ? "white" : theme.palette.grey[500], 
          m:"50px", 
          opacity: 0.5,
          width: "100%",
          borderRadius: "5px",
          p: "1.15rem"


            }} 
        
        >
          <h2>From {ele.fromString}</h2>
          <h3 >RE: {ele.subject}</h3>
        <h5 >{ele.text}</h5>
        <FlexBetween>
        <IconButton onClick={() => handleDelete(ele)}>
        <DeleteIcon /> 
        <Typography>Delete</Typography>
        </IconButton>

        
        
        
        
        <IconButton id={ele._id} 
        className="read-btn" 
        onClick={(e) => handleRead(ele)}
        sx={{display: ele.seen ? "none" : null}}
        >
        <MarkEmailReadRoundedIcon />
        <Typography>Read</Typography>
        </IconButton>
        </FlexBetween>
        </Box>
      ))
     
    }


      </Box> 
        <Box >
        
        <TransitionsModal  />
      
        </Box>
      
      </Box>
      
    )
  }

  
  

  
    

  
  
  


export default Messages