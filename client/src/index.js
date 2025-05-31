import { createRoot } from "react-dom/client";
import React from "react";
import Router from "./router";
import "./style/auth.css"
import "./style/index.css"

const app = createRoot(document.querySelector("#root"))
app.render(
    <React.StrictMode>
        <Router/>
    </React.StrictMode>
)