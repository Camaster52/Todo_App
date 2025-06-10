import { motion , AnimatePresence } from "framer-motion"
import { useState } from "react"

const Main = ({handleAddTask , onShowTaskForm , handleCancelTask , isTaskFormOpen }) => {

    const [inputValue, setInputValue] = useState("")
    const isInputEmpty = !inputValue.trim()

    const handleSubmit = async () => {
        const { success } = await handleAddTask(inputValue)
        if (success) {
            setInputValue("")
        }
    }
    
    const taskAnimation = {
        hidden: {
            x: -400,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {type: "spring" , damping: 15, stiffness: 150}
        },
        exit: {
            opacity: 0
        }
    }

    const btnAnimation = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {type: "spring" , damping: 7, stiffness: 14 , delay: 1.3}
        }
    }

    return(
        <>
            <motion.button variants={btnAnimation} animate="visible" initial="hidden"  onClick={() => onShowTaskForm()} className="addTask-title">Add task</motion.button>
            <div className="addTask">
                <AnimatePresence>
                    {isTaskFormOpen && (
                        <motion.div className="addTaskCont" variants={taskAnimation} animate = "visible" initial = "hidden" exit="exit">
                            <textarea onChange={(e) => setInputValue(e.target.value)} type="text" className="addTask__input"/>
                            <div className="addTask__actionButtons">
                                <button 
                                    className={isInputEmpty ? 'error-style' : 'addTask__actionButtons-add'} 
                                    value={inputValue} 
                                    disabled={!inputValue.trim()} 
                                    onClick={() => handleSubmit()}
                                >
                                    add
                                </button>
                                <button className="addTask__actionButtons-cancel" onClick={() => handleCancelTask()}>cancel</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
export default Main