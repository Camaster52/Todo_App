import { motion , AnimatePresence } from "framer-motion";
import { useState } from "react";

const Footer = () => {

    const [isOpenModal , setIsOpenModal] = useState(false)

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
    };
    return(
        <>
            <motion.footer variants = {footerAnimation} initial = "hidden" animate = "visible"  className="footer">
                <div className="line"></div>
                <p className="footer__copyright">© 2025 Todo App by <span className="footer__copyright-name">Filin Gleb</span></p>
                <p className="footer__myGitHub">My GitHub <a className="footer__link" href="https://github.com/Camaster52" target="_blank">Camaster52</a></p>
                <button onClick={() => {setIsOpenModal(true)}} className="footer__support">Feedback</button>
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
                                <form className="modal__form">
                                    <label className="modal__form-nameTitle">Your name:</label>
                                    <input className="modal__form-nameInput" type="text" placeholder="Enter your name..."/>
                                    <label className="modal__form-problemTitle">Describe the problem:</label>
                                    <textarea className="modal__form-problemInput" placeholder="Enter your problem..."/>

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