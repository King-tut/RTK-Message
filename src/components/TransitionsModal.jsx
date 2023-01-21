import * as React from 'react';
import {useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TextareaAutosize} from "@mui/base"
import { Formik } from "formik";
import * as yup from "yup";
import CreateIcon from "@mui/icons-material/Create"
import {useSelector, useDispatch} from "react-redux";
import MessageArea from "../components/MessageArea"
import {useGetSendingMessagesMutation,useGetUserQuery,useGetUserMessageQuery} from "../state/api"
import Alert from '@mui/material/Alert';
import {setAllOfYourMessages, setDeliverMessageTo} from "../state"
import { useTheme } from '@mui/material';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(refetch) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //const userName = useSelector((state)=> state.persistedReducer.deliverMessageTo.deliverMessageTo[0]) || []
    //const reciever = useSelector((state)=> state.persistedReducer.deliverMessageTo?.deliverMessageTo[1]) || []
    const [isIconClicked, setIsIconClicked ] = useState(false)
    //const sender = useSelector((state) => state.persistedReducer.user._id)
    const senderName = useSelector((state) => state.persistedReducer.user.firstName)
    const dispatch = useDispatch();
    const [getSendingMessages] = useGetSendingMessagesMutation()
    const [success, setIsSuccess] = useState(false)
    const userID = useSelector((state)=> state.persistedReducer.user._id)
  //console.log(typeof(userID))
  //const wholeState = useSelector((state) => state )
  const {data, isLoading} = useGetUserQuery(userID)
  console.log(`THis is the one I want to test ${data}`)
  const theme = useTheme()
  const [isCompose, setIsCompose] = useState(false)
 const [uName, setuName] = useState("")
 const [reciever, setReciever] = useState("")
 const [sender, setSender] = useState("")
 //const {getUserMessages} = useGetUserMessageQuery()

    const handleFormSubmit = async (values,onSubmitProps) =>{
        const messageObject  = {
            to: reciever,
            from: userID,
            subject: values.subject,
            text: values.message,
            fromString: senderName
        }
       const res =  await getSendingMessages(messageObject)
        
       if(res){
        onSubmitProps.resetForm()
        setIsSuccess(true)
        //let ans  =   res
        console.log(`New New ${res.data}`)
        refetch(userID)
        
        
        
          }
         
    }


    const handleNameClick = (e) =>{
      const val = e.target.value
      const uID = e.target.id
      setIsCompose(true)
      setuName(val)// this is the other userName variable
      setReciever(uID)
      console.log(`From inside the callback ${uName}`)
      dispatch(setDeliverMessageTo({
        deliverMessageTo: [val,uID]
    }))
  }

 


  return (
    <div>
      <Button onClick={handleOpen}>Message</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <>
          {
        data?.map((ele)=>
          
          (
            <Button id={ele._id} key={ele._id} onClick={handleNameClick} value={ele.firstName}> {ele.firstName}</Button>
          )
        )
      }
      </>
          <Formik
initialValues={{ message: '', subject: ''}}

onSubmit={handleFormSubmit}
>
{({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  
    }) => (
  <form onSubmit={handleSubmit}>
     <Typography>TO : {uName}</Typography>
 
 RE: <input
      type="text"
      name="subject"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.subject}
      sx={{flexDirection: "space-between"}}
    />
  <Typography>New Message</Typography>
    <input
      type="text"
      name="message"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.message}
      sx={{height:"40%"}}
      
    />
    
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </form>
)}
</Formik> 
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

