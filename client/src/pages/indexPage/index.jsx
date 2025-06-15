import CursorHighlight from "../../components/layout/CursorHighlight"
import Header from "../../components/layout/index/header"
import Main from "../../components/layout/index/main"
import Footer from "../../components/layout/index/footer"
import { useState , useEffect } from "react"

const Index = ({ setIsLoggedIn }) => {

    const [tasks , setTasks] = useState([])
    const [isTaskFormOpen , setIsTaskFormOpen] = useState(false)

    const onShowTaskForm = () => {
        setIsTaskFormOpen(true)
    }
    const handleCancelTask =() => {
        setIsTaskFormOpen(false)
    }

    const handleAddTask = async (taskText) => {
        if (!taskText.trim()) return
        const userID = localStorage.getItem("userID")
        const apiUrl = process.env.REACT_APP_API_URL
        if (!userID) {
            console.error("User ID not found in localStorage");
            return 
        }
        try{
            const response = await fetch(`${apiUrl}/api/createTask` , {
                method: "POST" , 
                headers: { 'Content-Type': 'application/json' } , 
                body: JSON.stringify( { text: taskText , userID: userID } )
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            console.info("Success add: " , result)
            setTasks(prevTasks => [...prevTasks, {
                id: result.id || Date.now(), 
                text: taskText
            }])
            
            setIsTaskFormOpen(false)
            return {success: true}
        }catch(error){
            console.error("Error saving tasks: ", error)
            return {success: false}
        }
    }

    
    const deleteTask = async (text) => {
        const userID = localStorage.getItem("userID")
        const apiUrl = process.env.REACT_APP_API_URL
        try{
            const response = await fetch(`${apiUrl}/api/deleteTask` , {
                method: "POST" , 
                headers: { 'Content-Type': 'application/json' } , 
                body: JSON.stringify( { text: text , userID: userID } )
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            console.info("Success delete: " , result)
            return {success: true}
        }catch(error){
            console.error("Delete task error: ", error)
            return {success: false}
        }
    }


    const fetchTasks = async () => {
        const userID = localStorage.getItem("userID")
        const apiUrl = process.env.REACT_APP_API_URL
        if (!userID) {
            console.error("User ID not found")
            return
        }
        try {
            const response = await fetch(`${apiUrl}/api/getTasks?userID=${userID}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            if (data.success) {
                setTasks(data.result)
            }
        } catch (error) {
            console.error("Error fetching tasks:", error)
        }
    };
    useEffect(() => {
        fetchTasks()
    }, []);

    return(
        <>
            <CursorHighlight/>

            <Header 
                setTasks={setTasks} 
                tasks={tasks} 
                setIsLoggedIn={setIsLoggedIn}
                deleteTask={deleteTask}
            />

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