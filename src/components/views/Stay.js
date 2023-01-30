import {Route,Routes} from "react-router-dom"
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Authorized } from "./Authorized";
import { NavBar } from "../nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";


export const Stay = () => {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" element={
      <Authorized>
        <>
          <NavBar />
          <ApplicationViews />
        </>
      </Authorized>
    } />
  </Routes>
}