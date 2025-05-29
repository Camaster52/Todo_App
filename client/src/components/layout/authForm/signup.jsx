import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SignupApi from "../api/signupApi";
import { useNavigate } from 'react-router-dom';
import React from "react";

const Signup = () => {

    const navigate = useNavigate()
    const [serverErr , setServerErr] = useState(null)

    const { register, handleSubmit , reset , formState: {errors} } = useForm();

    
    const onSubmit = async (data) => {
        try{
            setServerErr("")
            const result = await SignupApi(data)
            if(result.success){
                navigate("/index" , {replace: true})
                console.log("SUCCESS SIGN UP ")
            }else{
                setServerErr(result.message)
            }
            reset()
        }catch(error){
            console.error("Error in submit: " , error)
            setServerErr("An unexpected error occurred")
        }
    }

    return(
        <>
            <h1 className="sign-side__title-text">Sign Up</h1>
            { serverErr && <p className="sign-side__apiError">{serverErr}</p>}
            <form className="sign-side__form" onSubmit={handleSubmit(onSubmit)}>
                <label className="sign-side__form-title">Email:</label>
                <input className="sign-side__form-input" type="email" {...register("email" , {
                    required: "This field is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    }
                })} />
                {errors.email && <p className="log-side__form-emailError">{errors.email.message}</p>}
                
                <label className="sign-side__form-title">Password:</label>
                <input className="sign-side__form-input" type="password" {...register("password" , {
                    required: "This field is required",
                    minLength: {
                        value: 8,
                        message: "Password is too short"
                    },
                    maxLength: {
                        value: 128,
                        message: "Password is too long"
                    }
                })}/>
                {errors.password && <p className="log-side__form-emailError">{errors.password.message}</p>}

                <button className="sign-side__form-button" type="submit">Create Account</button>
            </form>
        </>
    )
}
export default Signup