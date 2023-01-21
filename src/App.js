import React, {useState} from 'react'
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Register from "./scenes/Register";
import Layout from './scenes/layout';
import Messages from "./scenes/Messages/Messages"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {Box, useMediaQuery} from '@mui/material'





function App() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen]= useState(true);
  const mode = useSelector((state) => state.persistedReducer.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
     
     <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<Messages />} />
            
            

            </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
