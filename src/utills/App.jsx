import { Route, Routes } from "react-router-dom";
import AuthForm from "./authform";

function App() {
  return (
    <div className="bg-slate-300 w-screen h-screen flex justify-center items-center ">
      <Routes>
        <Route path="/"></Route>
        <Route path="/signin" element={<AuthForm type={"signin"} />}></Route>
        <Route path="/signup" element={<AuthForm type={"signup"} />}></Route>
        <Route path="*" element={"NOT FOUND"}></Route>
      </Routes>
    </div>
  );
}

export default App;
