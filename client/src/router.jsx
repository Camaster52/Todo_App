import { Route , Routes , BrowserRouter , Navigate } from "react-router-dom";
import Auth from "./pages/authPage/auth";
import Index from "./pages/indexPage/index";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = { <Navigate to= "/auth" replace/> }/>
                <Route path = "/auth" element = { <Auth/> }/>
                <Route path = "/index" element = { <Index/> }/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router