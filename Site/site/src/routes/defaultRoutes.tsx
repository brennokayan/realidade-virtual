import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { Suspense } from "react";
import PrivateRoutes from "./privateRoutes";
import { UserPage } from "../pages/UserPage";
import { UpdateFilePage } from "../pages/updateFile";
import { UpdateUrlPage } from "../pages/updateUrl";
import { UpdateWallPage } from "../pages/updateWall";
import { UpdateLightPage } from "../pages/updateLight";
import { CreateAccountPage } from "../pages/createAccount";

export function DefaultRoutes() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<h1>Carregando ...</h1>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} /> 
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<UserPage />} />
              <Route path="/update" element={<UpdateFilePage />} />
              <Route path="/update-url" element={<UpdateUrlPage />} />
              <Route path="/update-wall" element={<UpdateWallPage />} />
              <Route path="/update-light" element={<UpdateLightPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
