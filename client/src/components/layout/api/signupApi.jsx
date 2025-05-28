import React from "react";


const SignupApi = async (userData) => {
    try{
        const response = await fetch("http://localhost:8080/api/signup" , {
            method: "POST", 
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(userData),
            credentials: "include"
        })

        const data = await response.json()
        
        if(!response.ok){
            const serverError = data.message || "Unknown server error"
            throw new Error(serverError)
        }

        console.log("Success" , data)
        return {
            success: true,
            user: data.user
        }
    }
    catch(error){
        let err = "Registration failed. Please try again";
        if(error.message.includes("User with this email already exists")){
            err = "This email is already registered"
        }else if(error.message.includes("Email and password are required")){
            err = "Please fill in all fields";
        }else if(error.message.includes("Invalid email format")){
            err = "Please enter a valid email address";
        }else if(error.message.includes("The password does not meet the requirements")){
           err = "Password must be at least 8 characters";
        }
        return {
            success: false,
            message: err
        }
    }
}
export default SignupApi