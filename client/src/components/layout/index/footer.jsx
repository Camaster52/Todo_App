import { motion , AnimatePresence } from "framer-motion";
import { useState } from "react";
import SendFeedback from "../api/sendFeedback";

const Footer = () => {

    const [isOpenModal , setIsOpenModal] = useState(false)
    const [inputValue , setInputValue] = useState("")
    const [inputValueName , setInputValueName] = useState("")

    const footerAnimation = {
        hidden: {
            y: 130,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {type: "spring" , damping: 7, stiffness: 14}
        }
    }

    const modalAnimation = {
        hidden: {
            y: -800,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {type: "spring" , damping: 10, stiffness: 45}
        },
        exit: {
            y: -400,
            opacity: 0
        }
    }

    const overlayAnimation = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    const footerItems = [
        { id: 1, content: (
            <p className="footer__copyright">
                © 2025 Todo App by <span className="footer__copyright-name">Filin Gleb</span>
            </p>
        )},
        { id: 2, content: (
            <p className="footer__myGitHub">
                My GitHub <a className="footer__link" href="https://github.com/Camaster52" target="_blank">Camaster52</a>
            </p>
        )},
        { id: 3, content: (
            <button 
                onClick={() => setIsOpenModal(true)} 
                className="footer__support"
            >
                Feedback
            </button>
        )}
    ]

    const footerItemsAnimation = {
        hidden: {
            y: 130,
            opacity: 0
        },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {type: "spring" , damping: 10, stiffness: 50 , delay: i * 0.5}
        })
    }


    const sendFeedback = async (e) => {
        e.preventDefault();
        try{
            const response = await SendFeedback({problem: inputValue, name: inputValueName})
            const result = await response.json()

            if(result.success){
                setInputValue('')
                setInputValueName('')
            }

        }catch(error){
            console.error("Feedback error: " , error.message)
        }
    }

    return(
        <>
            <motion.footer variants = {footerAnimation} initial = "hidden" animate = "visible"  className="footer">
                <div className="line"></div>
                {footerItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        custom={index}  
                        variants={footerItemsAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        {item.content}
                    </motion.div>
                ))}
            </motion.footer>

            <AnimatePresence>
                { isOpenModal && (
                    <>
                        <motion.div variants={overlayAnimation} initial="hidden" animate="visible" exit="hidden" className="modal">
                            <motion.div variants={modalAnimation} initial="hidden" animate="visible" exit="exit" className="modal-content">   
                                <div className="modal__closeAndTitle">
                                    <h2 className="modal__title">Feedback:</h2>
                                    <button onClick={() => {setIsOpenModal(false)}} className="modal__closeModal">&times;</button>
                                </div>
                                <form className="modal__form" onSubmit={sendFeedback}>
                                    <label className="modal__form-nameTitle">Your name:</label>
                                    <input value={inputValueName} onChange={(e) => setInputValueName(e.target.value)} className="modal__form-nameInput" type="text" placeholder="Name" required/>
                                    <label className="modal__form-problemTitle">Describe the problem:</label>
                                    <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="modal__form-problemInput" placeholder="Problem" required/>

                                    <div className="modal__form-submit">
                                        <button className="modal__form-submitBtn" type="submit">Send</button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
export default Footer