import { Route , Routes , BrowserRouter , Navigate } from "react-router-dom";
import { useState , useEffect } from "react";
import Auth from "./pages/authPage/auth";
import Index from "./pages/indexPage/index";

const Router = () => {

    const [isLoggedIn , setIsLoggedIn] = useState(false)


    useEffect(() => {
        const checkJWT = async (JWT) => {
            try{
                const response = await fetch("http://localhost:8080/api/checkJWT" , {
                    method: "GET",
                    credentials: "include"
                })

                const data = await response.json()

                if(!response.ok){
                    setIsLoggedIn(false)
                    console.error("Invalid token: " , data.message)
                    throw new Error(data.message)
                }
                if(response.ok){
                    setIsLoggedIn(true)
                }

                console.log("Success: " , data.result)
                return({ 
                    success: true, 
                })
            }catch(error){
                setIsLoggedIn(false)
                console.error("Token error: " , error.message)
                return({
                    success: false
                })
            }
        }
        checkJWT()
    } , [])

    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = { isLoggedIn ? <Navigate to= "/index" replace/> : <Navigate to= "/auth" replace/>}/>
                <Route  path = "/auth" element = { isLoggedIn ? <Navigate to = "/index" replace/> : <Auth setIsLoggedIn={setIsLoggedIn}/> }/>
                <Route path = "/index" element = { isLoggedIn ? <Index setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/auth" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router