import React from "react";


const SignupApi = async (userData) => {
    const apiUrl = process.env.REACT_APP_API_URL
    try{
        console.log("Sending data:", userData)
        const response = await fetch(`${apiUrl}/api/signup` , {
            method: "POST", 
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
            "User with this email already exists": "This email is already registered",
            "Email and password are required": "Please fill in all fields",
            "Invalid email format": "Please enter a valid email address",
            "The password does not meet the requirements": "Password must be at least 8 characters",
        };

        const resultError = errorMessages[error.message] || "Registration failed. Please try again"

        return {
            success: false,
            message: resultError
        }
    }
}
export default SignupApi