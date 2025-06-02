import { motion } from "framer-motion";

const Footer = () => {

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
    return(
        <motion.footer variants = {footerAnimation} initial = "hidden" animate = "visible" className="footer">
            <div className="line"></div>
            <p className="footer__copyright">© 2025 Todo App by Filin Gleb</p>
            <p className="footer__myGitHub">My GitHub <a className="footer__link" href="https://github.com/Camaster52" target="_blank">Camaster52</a></p>
            
        </motion.footer>
    )
}
export default Footer