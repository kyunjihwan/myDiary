import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Nav from "./components/Nav";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { isAuthReady, user } = useAuthContext();
  console.log(user);
  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Home /> : <Navigate replace={true} to={"/login"} />
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate replace={true} to={"/"} />}
            />
            <Route
              path="/signup"
              element={
                !user ? <Signup /> : <Navigate replace={true} to={"/"} />
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        "loading..."
      )}
    </div>
  );
}

export default App;
