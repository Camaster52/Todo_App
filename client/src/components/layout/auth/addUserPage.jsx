import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Btn from "./btn";
import CursorHighlight from "../CursorHighlight";
import Signup from "../authForm/signup";
import Login from "../authForm/login";

const AddUserPage = ({setIsLoggedIn}) => {
    const [activeTab, setActiveTab] = useState("signup");
    
    const flipAnimation = {
        rotateY: activeTab === "login" ? 180 : 0,
        transition: { duration: 0.6 }
    };

    return (
        <div className="sign-container">
        <CursorHighlight/>
        <motion.div 
            className="sign-3Danimate" 
            style={{ perspective: "1000px" }}
            initial={{ opacity: 0, y: -220 }}
            animate={{ 
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 27 }
            }}
        >
            <motion.div 
            className="sign-side" 
            animate={flipAnimation}
            style={{ transformStyle: "preserve-3d" }}
            >
            <div style={{
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotateY(0deg)",
                visibility: activeTab === "signup" ? "visible" : "hidden"
          }}>
                <Btn activeTab={activeTab} setActiveTab={setActiveTab} />
                <Signup setIsLoggedIn={setIsLoggedIn}/>
            </div>

        
            <div style={{
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotateY(180deg)",
                visibility: activeTab === "login" ? "visible" : "hidden"
            }}>
                <Btn activeTab={activeTab} setActiveTab={setActiveTab} />
                <Login setIsLoggedIn={setIsLoggedIn}/>
            </div>
            </motion.div>
        </motion.div>
        </div>
  );
};
export default AddUserPage;