import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";

const Login = () => {

    const { register, handleSubmit , watch , reset ,  formState: { errors } } = useForm({mode: "onChange"});
    const watchPassword = watch("password")

    const onSubmit = (data) => {
        console.log(data)
        reset()
    }

    return(
        <>
            <h1 className="log-side__title-text">Log In</h1>
            <form className="log-side__form" onSubmit={handleSubmit(onSubmit)}>
                <label className="log-side__form-title">Email:</label>
                <input name="email" className="log-side__form-input" type="email" {...register("email" , {   
                    required: "This field is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    }
                })} />
                {errors.email && <p className="log-side__form-emailError">{errors.email.message}</p>}

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

                <label className="log-side__form-title">Repeat password:</label>
                <input name="repeatPassword" className="log-side__form-input" type="password" {...register("repeatPassword" , {
                    required: "Repeat your password",
                    validate: (value) => 
                        value === watchPassword || "The passwords do not match"
                })}/>
                {errors.repeatPassword && <p className="log-side__form-emailError">{errors.repeatPassword.message}</p>}
                
                <button className="log-side__form-button" type="submit">Login</button>
            </form>
        </>
    )
}
export default Login