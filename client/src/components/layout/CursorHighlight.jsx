import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const CursorHighlight = () => {
    const size = 50
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    useEffect( () => {
        const mouseMove = (event) => {
            x.set(event.clientX - size / 2)
            y.set(event.clientY - size / 2)
        }
        window.addEventListener("mousemove" , mouseMove)
        return () => window.removeEventListener("mousemove" , mouseMove)
    } , [])
    
    return (
    <motion.div
        style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: size,
            height: size,
            borderRadius: "50%",
            background: "rgb(255, 0, 0)",
            pointerEvents: "none",
            x,
            y,
            zIndex: 10,
            filter: "blur(30px)"
        }}
        animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.5, 0.8],
        }}
        transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
        }}
        />
    )
}
export default CursorHighlight