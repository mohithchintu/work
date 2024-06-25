import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import AboutUs from "./pages/AboutUs";
import { AuthProvider } from "./auth/AuthContext";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Library from "./pages/Library";
import ProtectedRoutes from "./auth/ProtectedRoutes";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div className="p-5">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<AboutUs />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/library" element={<Library />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
