import { BrowserRouter, Routes, Route } from "react-router-dom";
import Siginin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Siginin />} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
