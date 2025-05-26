import { createRoot } from "react-dom/client";
import React from "react";
import AddUserPage from "./components/layout/regPage/addUserPage";
import "./style/style.css"

const app = createRoot(document.querySelector("#root"))
app.render(
    <React.StrictMode>
        <AddUserPage/>
    </React.StrictMode>
)