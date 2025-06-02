import { ReactComponent as Menu } from "../../../assets/img/icons8-гамбургер-меню.svg"
import { useState } from "react";
import LogOut from "../api/logOut.jsx"
import { useNavigate } from 'react-router-dom';
import { motion , AnimatePresence } from "framer-motion"

const Header = ({ setIsLoggedIn }) => {

    const navigate = useNavigate()

    const logOut = async () => {
        try{
            const response = await LogOut()

            if(response.success){
                setIsLoggedIn(false)
                navigate("/auth" , {replace: true})
            }else{
                setIsLoggedIn(true)
                console.error("Error in log out" , response)
            }
        }catch(error){
            console.error("Fetch error: " , error)
        }
    }

    const headerAnimation = {
        hidden: {
            y: -130,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {type: "spring" , damping: 7, stiffness: 14}
        }
    }

    const menuAnimation = {
        hidden: {
            x: -450,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {type: "spring" , damping: 20, stiffness: 110}
        },
        exit: {
            x: -900,
            opacity: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 60,
            }
        }
    }

    const [isOpen , setIsOpen] = useState(false)

    return(
        <div className="main-content">

        <motion.header variants={headerAnimation} initial = "hidden" animate = "visible"  className="header">
            <button onClick={() => setIsOpen(true)} className="header__svgButtonMenu">
                <Menu className="header__svgButton-menu"/>
            </button>

            <AnimatePresence>
                { isOpen && (
                    <motion.div variants={menuAnimation} initial = "hidden" animate = "visible" exit="exit" className="header__openTasks">
                        <button onClick={() => setIsOpen(false)} className="header__closeTasks">&times;</button>
                        <div className="header__openTasksContTitle">
                            <p className="header__openTasksContTitle-title">Tasks</p>
                        </div>
                        <div>
                            
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <h1 className="header__title">Todo App</h1>
            <button className="header__svgButtonExit" onClick={logOut}>
                <svg className="header__svgButton-exit"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 12H9" stroke="#ffffff"strokeWidth="2"strokeLinecap="round"/>
                </svg>
            </button>
        </motion.header>
        </div>
    )
}
export default Header