import { Route , Routes , BrowserRouter , Navigate } from "react-router-dom";
import { useState , useEffect } from "react";
import Auth from "./pages/authPage/auth";
import Index from "./pages/indexPage/index";

const Router = () => {

    const [isLoggedIn , setIsLoggedIn] = useState(false)


    useEffect(() => {
        const checkJWT = async () => {
            const apiUrl = process.env.REACT_APP_API_URL
            try{
                const response = await fetch(`${apiUrl}/api/checkJWT` , {
                    method: "GET",
                    credentials: "include"
                })

                const data = await response.json()

                if(!response.ok){
                    setIsLoggedIn(false)
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
                console.info("Token error: " , error.message)
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