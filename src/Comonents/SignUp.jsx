import React, { useEffect, useState } from "react";
import "./SignUp.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateVariable } from "./GlobalSlice";
import Alert from "@mui/material/Alert";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [action, setAction] = useState("Login");
  const [regInput, setRegInput] = useState({
    first_Name: "",
    last_Name: "",
    userName: "",
    password: "",
    mobileNo: 0,
    email: "",
  });
  const [loginInput, setLoginInput] = useState({
    userName: "",
    password: "",
  });
  useEffect(() => {
    setRegInput({
      first_Name: "",
      last_Name: "",
      userName: "",
      password: "",
      mobileNo: 0,
      email: "",
    });
    // setError(""); // Reset errors when switching screen
    // setSuccessMessage(""); // Reset success message
    setLoginInput({
      userName: "",
      password: "",
    });
  }, [action]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (action === "Sign Up") {
      setRegInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (action === "Login") {
      setLoginInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setRegInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (action === "Sign Up") {
      axios
        .post(`http://localhost:8082/stockHolder/registration`, regInput)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
      console.log("Calling registration API");
    }
    if (action === "Login") {
      console.log("Calling Login API");
      axios
        .post(`http://localhost:8082/stockHolder/login`, loginInput, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          navigate("/");
          // dispatch();
          dispatch(updateVariable({ key: "loggedInUser", value: res.data }));
        })
        .catch((err) => {
          setError(err.response.data.message);
          console.log("error: " + err.response.data.message);
        });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            {error != null && (
              <Alert className="alert" severity="error">
                {error}
              </Alert>
            )}
            {action === "Sign Up" && (
              <div className="inputs-group">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    name="first_Name"
                    value={regInput.first_Name}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                    name="last_Name"
                    value={regInput.last_Name}
                  />
                </div>
              </div>
            )}
            <div className="input">
              {/* <img src={PersonOutlineIcon} alt="" /> */}
              <PersonOutlineIcon className="icon" />
              <input
                type="text"
                placeholder="Username"
                onChange={handleChange}
                name="userName"
                value={
                  action === "Sign Up" ? regInput.userName : loginInput.userName
                }
              />
            </div>
            <div className="input">
              {/* <img src="" alt="" /> */}
              <KeyIcon className="icon" />
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={
                  action === "Sign Up" ? regInput.password : loginInput.password
                }
              />
            </div>
            {action === "Sign Up" && (
              <div className="input">
                {/* <img src={PersonOutlineIcon} alt="" /> */}
                <PhoneIcon className="icon" />
                <input
                  type="text"
                  placeholder="Mobile No"
                  onChange={handleChange}
                  name="mobileNo"
                  value={regInput.mobileNo}
                />
              </div>
            )}
            {action === "Sign Up" && (
              <div className="input">
                {/* <img src="" alt="" /> */}
                <MailIcon className="icon" />
                <input
                  type="email"
                  placeholder="Email Id"
                  onChange={handleChange}
                  name="email"
                  value={regInput.email}
                />
              </div>
            )}
          </div>
          {action === "Login" && (
            <div className="forgot-password">
              Forgot Password? <span>Click Here!</span>
            </div>
          )}
          <div className="submit-container">
            <button type="submit" className="submit">
              {action === "Sign Up" ? "Sign Up" : "Login"}
            </button>
          </div>
          {action === "Sign Up" ? (
            <div className="forgot-password">
              Already have an account{" "}
              <span onClick={() => setAction("Login")}> Login!</span>
            </div>
          ) : (
            <div className="forgot-password">
              Don't have an account{" "}
              <span onClick={() => setAction("Sign Up")}>Create Account!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
