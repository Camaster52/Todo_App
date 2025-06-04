import CursorHighlight from "../../components/layout/CursorHighlight"
import Header from "../../components/layout/index/header"
import Main from "../../components/layout/index/main"
import Footer from "../../components/layout/index/footer"
import { useState } from "react"

const Index = ({ setIsLoggedIn }) => {

    const [isTaskFormOpen , setIsTaskFormOpen] = useState(false)
    const onShowTaskForm = () => {
        setIsTaskFormOpen(true)
    }
    const handleCancelTask =() => {
        setIsTaskFormOpen(false)
    }


    const handleAddTask = (taskText) => {
        if (!taskText.trim()) return
        setIsTaskFormOpen(false)







        
    }

    return(
        <>
            <CursorHighlight/>
            <Header setIsLoggedIn={setIsLoggedIn}/>

            <Main 
                isTaskFormOpen={isTaskFormOpen} 
                handleCancelTask={handleCancelTask} 
                onShowTaskForm={onShowTaskForm} 
                handleAddTask={handleAddTask}
            />

            <Footer/>
        </>
    )
}
export default Index