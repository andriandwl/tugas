import React from "react";
import { Route, Routes } from "react-router-dom";
// import EditPage from "./components/EditPage";
import HomePage from "./pages/HomePage";
// import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import PostEdit from "./pages/PostEditPage"
import EditPage from "./components/EditPage";
function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
