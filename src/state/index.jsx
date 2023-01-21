import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    messages: [],
    currentUserID: "",
    deliverMessageTo: [],
    allOfYourMessages: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
          },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.currentUserID = action.payload.user._id
          },

          setLogOut: (state, action) =>{
            state.user = ""
            state.token = null
            state.currentUserID = null
            state.deliverMessageTo = []
            state.allOfYourMessages = []          

          },

          setDeliverMessageTo: (state,action) =>{
            state.deliverMessageTo = action.payload

          },

         setAllOfYourMessages: (state, action) =>{
            state.allOfYourMessages = action.payload

          }

          
    }

})

export const {setLogin, setMode, setLogOut,setDeliverMessageTo, setAllOfYourMessages} = authSlice.actions;
export default authSlice.reducer;