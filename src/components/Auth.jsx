import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Role from "../components/Role";
import { getUserLogged, putAccessToken } from "../utils/api";

const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));

function Auth() {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    async function getUserLogin() {
      const { data } = await getUserLogged();

      setAuthedUser(data);
      setInitializing(false);
    }

    getUserLogin();
  });

  const loginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    if (data.name === "nimda") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
    navigate("/");
  };

  if (initializing) {
    return null;
  }
  if (authedUser === null) {
    return (
      <main>
        <Routes>
          <Route
            path="/login"
            element={<Login loginSuccess={loginSuccess} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    );
  }
  return (
    <div>
      <Role authedUser={authedUser} logout={onLogout} />
    </div>
  );
}

export default Auth;
