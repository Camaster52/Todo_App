import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoginApi from "../api/loginApi";
import { useNavigate } from 'react-router-dom';
import React from "react";

const Login = ({setIsLoggedIn}) => {

    const navigate = useNavigate()
    const [serverErr , setServerErr] = useState()

    const { register, handleSubmit , watch , reset ,  formState: { errors } } = useForm({mode: "onChange"});
    const watchPassword = watch("password")

    const onSubmit = async (data) => {
        try{
            setServerErr("")
            const result = await LoginApi(data)
            if(result.success){
                setIsLoggedIn(true)
                navigate("/index" , {replace: true})
                console.log("SUCCESS LOG IN")
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
            <h1 className="log-side__title-text">Log In</h1>
            { serverErr && <p className="sign-side__apiError">{serverErr}</p>}
            <form className="log-side__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="log-side__form-content">
                    <label className="log-side__form-title">Email:</label>
                    <input name="email" className="log-side__form-input" type="email" {...register("email" , {   
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })} />
                    {errors.email && <p className="log-side__form-emailError">{errors.email.message}</p>}
                </div>

                <div className="log-side__form-content">
                    <label className="log-side__form-title">Password:</label>
                    <input name="password" className="log-side__form-input" type="password"  {...register("password" , {
                        required: "This field is required" ,
                        minLength: {
                            value: 8,
                            message: "Password is too short"
                        },
                        maxLength: {
                            value: 128,
                            message: "Password is too long"
                        },
                    })}/>
                    {errors.password && <p className="log-side__form-emailError">{errors.password.message}</p>}
                </div>

                <div className="log-side__form-content">
                    <label className="log-side__form-title">Repeat password:</label>
                    <input name="repeatPassword" className="log-side__form-input" type="password" {...register("repeatPassword" , {
                        required: "Repeat your password",
                        validate: (value) => 
                            value === watchPassword || "Passwords do not match"
                    })}/>
                    {errors.repeatPassword && <p className="log-side__form-emailError">{errors.repeatPassword.message}</p>}
                    <div className="log-side__form-btnCont">
                        <button className="log-side__form-button" type="submit">Login</button>
                    </div>
                </div>

            </form>
        </>
    )
}
export default Login