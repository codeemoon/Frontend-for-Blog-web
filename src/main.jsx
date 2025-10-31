import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./utills/App"; 
import { BrowserRouter } from "react-router-dom";
import { Toaster  } from "react-hot-toast"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster/>
  </BrowserRouter>
);
