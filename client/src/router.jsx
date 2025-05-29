import { Route , Routes , BrowserRouter , Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Auth from "./pages/authPage/auth";
import Index from "./pages/indexPage/index";

const Router = () => {

    const [isLoggedIn , setIsLoggedIn] = useState(false)

    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = { isLoggedIn ? <Navigate to= "/index" replace/> : <Navigate to= "/auth" replace/>}/>
                <Route  path = "/auth" element = { isLoggedIn ? <Navigate to = "/index" replace/> : <Auth setIsLoggedIn={setIsLoggedIn}/> }/>
                <Route path = "/index" element = { isLoggedIn ? <Index/> : <Navigate to="/auth" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router