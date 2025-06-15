


const LoginApi = async (userData) => {
    const apiUrl = process.env.REACT_APP_API_URL
    try{
        console.log("Sending data:", userData)
        const response = await fetch(`${apiUrl}/api/login` , {
            method: "POST" , 
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(userData),
            credentials: "include"
        })

        const data = await response.json()

        if(!response.ok){
            console.error("Server error response: " , {
                status: response.status,
                message: data.error || "Unknown server error"
            })
            throw new Error(data.error)
        }

        localStorage.setItem("userID" , data.user.id)

        console.log("Success: " , data)
        return {
            success: true,
            user: data.user
        }
    }catch(error){
        console.error("Fetch error: ", error);
        const errorMessages = {
            "Invalid password": "Invalid password",
            "Email and password are required": "Please fill in all fields",
            "Invalid email format": "Please enter a valid email address",
            "User not found": "User not found",
            "Database error": "Database error. Please try later"
        };

        const resultError = errorMessages[error.message] || "Login failed. Please try again"

        return {
            success: false,
            message: resultError
        }
    }
}
export default LoginApi