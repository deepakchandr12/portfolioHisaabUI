import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import NavBar from "./Comonents/NavBar";
import Home from "./Comonents/Home";
import About from "./Comonents/About";
import Contact from "./Comonents/Contact";
import AddStock from "./Comonents/AddStock";
import AddCategory from "./Comonents/AddCategory";
import SignUp from "./Comonents/SignUp";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateVariable } from "./Comonents/GlobalSlice";
import Logout from "./Comonents/Logout";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading
  useEffect(() => {
    console.log("Inside use effect app js");
    if (location.pathname === "/logout") return;
    axios
      .get(`http://localhost:8082/stockHolder/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoggedIn(true);
        console.log(res.data);
        dispatch(updateVariable({ key: "loggedInUser", value: res.data }));
      })
      .catch((e) => {
        console.log(e);
        setIsLoggedIn(false);
        dispatch(updateVariable({ key: "loggedInUser", value: null }));
      });
  });
  let routeElements = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/addStock",
      element: <AddStock />,
    },
    {
      path: "/addCategory",
      element: <AddCategory />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/login",
      element: <SignUp />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
  ]);
  if (isLoggedIn === null) return <div>Loading...</div>;
  return (
    <div className="App">
      {console.log("isLogged in: " + isLoggedIn)}
      {isLoggedIn ? (
        <div>
          {location.pathname !== "/logout" && (
            <NavBar onLogout={() => setIsLoggedIn(false)} />
          )}
          <div style={{ marginTop: location.pathname !== "/logout" ? 64 : 0 }}>
            {routeElements}
          </div>
        </div>
      ) : (
        <SignUp />
      )}
    </div>
  );
}

export default App;
