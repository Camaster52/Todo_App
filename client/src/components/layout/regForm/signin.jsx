import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";

const Signin = () => {

    const { register, handleSubmit } = useForm();
    

    return(
        <>
            <h1 className="sign-side__title-text">Sign Up</h1>
            <form className="sign-side__form" onSubmit={handleSubmit}>
                <label className="sign-side__form-title">Email:</label>
                <input className="sign-side__form-input" type="email" {...register("email")} />
                
                <label className="sign-side__form-title">Password:</label>
                <input className="sign-side__form-input" type="password" />
                
                <button className="sign-side__form-button" type="submit">Create Account</button>
            </form>
        </>
    )
}
export default Signin