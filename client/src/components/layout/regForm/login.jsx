import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";

const Login = () => {

    const { register, handleSubmit } = useForm();
    

    return(
        <>
            <h1 className="log-side__title-text">Log In</h1>
                <form className="log-side__form" onSubmit={handleSubmit}>
                <label className="log-side__form-title">Email:</label>
                <input className="log-side__form-input" type="email" {...register("email")} />
                
                <label className="log-side__form-title">Password:</label>
                <input className="log-side__form-input" type="password" />
                <label className="log-side__form-title">Repeat password:</label>
                <input className="log-side__form-input" type="password" />
                
                <button className="log-side__form-button" type="submit">Login</button>
            </form>
        </>
    )
}
export default Login