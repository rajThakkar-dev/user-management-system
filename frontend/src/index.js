import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <div style={{ margin: 0, padding: 0 }}>
            <App />
        </div>
    </BrowserRouter>
);
