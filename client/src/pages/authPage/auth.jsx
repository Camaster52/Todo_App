import AddUserPage from "../../components/layout/auth/addUserPage";
import { useEffect } from "react";

const Auth = ({ setIsLoggedIn }) => {
    return(
        <AddUserPage setIsLoggedIn={setIsLoggedIn}/>
    )
}
export default Auth