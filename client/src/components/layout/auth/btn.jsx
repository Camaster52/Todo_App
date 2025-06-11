import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Btn = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "signup", label: "Sign Up" },
    { id: "login", label: "Log In" }
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '300px'
      }}>
        <div style={{
          display: 'flex',
          position: 'relative'
        }}>
          {tabs.map(tab => (
            <button
              className="nav_buttons"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab.id ? '#7F00FF' : '#ffffff',
                fontSize: '1.1rem',
                padding: '10px',
                flex: 1,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 2
              }}
            >
              {tab.label}
            </button>
          ))}
          
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: `${100 / tabs.length}%`,
              height: '2px',
              background: '#7F00FF',
              zIndex: 1
            }}
            animate={{
              x: activeTab === "login" ? '100%' : '0%',
            }}
            transition={{ 
              type: "spring",  
              stiffness: 400,
              damping: 25
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Btn