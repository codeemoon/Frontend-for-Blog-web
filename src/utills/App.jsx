import { Route, Routes } from "react-router-dom";
import AuthForm from "./authform";
import Navbar from "../component/navbar";
import Homepage from "../component/homepage";

function App() {
  return (
    <div className="bg-slate-300 w-screen h-screen ">
      <Routes>
        <Route path="/" element={<Navbar/>}> 
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/signin" element={<AuthForm type={"signin"} />}></Route>
        <Route path="/signup" element={<AuthForm type={"signup"} />}></Route> 
        </Route>         
        <Route path="*" element={"NOT FOUND"}></Route>
      </Routes>
    </div>
  );
}

export default App;
