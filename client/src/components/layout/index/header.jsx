import { ReactComponent as Menu } from "../../../assets/img/icons8-гамбургер-меню.svg"
import { motion } from "framer-motion"

const Header = () => {

    return(
        <motion.header className="header">
            <Menu className="header__menuSvg"/>
            <h1 className="header__title">Todo App</h1>
            <svg className="header__exit"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="exit-path"/>
                <path d="M13 12H9" stroke="#ffffff"strokeWidth="2"strokeLinecap="round"/>
            </svg>
        </motion.header>
    )
}
export default Header