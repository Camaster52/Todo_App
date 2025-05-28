


const LoginApi = async (userData) => {
    try{
        const response = await fetch("http://localhost:8080/api/login" , {
            method: "POST" , 
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(userData),
            credentials: "include"
        })

        const data = await response.json()

        if(!response.ok){
            const serverError = data.message || "Unknown server error"
            throw new Error(serverError)
        }

        return {
            success: true,
            user: data.user
        }
    }catch(error){
        let err = "Registration failed. Please try again";
        if(error.message.includes("Email and password are required")){
            err = "Please fill in all fields";
        }else if(error.message.includes("User not found")){
            err = "User not found";
        }else if(error.message.includes("Invalid password")){
            err = "Invalid password";
        }else if(error.message.includes("Invalid email format")){
            err = "Invalid email format";
        }
        return {
            success: false,
            message: err
        }
    }
}
export default LoginApi