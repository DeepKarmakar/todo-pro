import React, { useState } from "react";
import "./login.scss";
import { useAuth } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const { loginWithEmail, loginWithGmail } = useAuth();
  const history = useHistory();

  const handleOnchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // async function handleEmailLogin(e) {
  //   e.preventDefault();
  //   try {
  //     // setError("")
  //     // setLoading(true)
  //     await loginWithEmail(user.email, user.password);
  //     history.push("/");
  //   } catch {
  //     console.log("eror");
  //     // setError("Failed to log in")
  //   }

  // }

  const handleEmailLogin = (e) => {
    setLoader(true);
    e.preventDefault();
    loginWithEmail(user.email, user.password)
      .then((res) => {
        setLoader(false);
        history.push("/");
      })
      .catch((err) => {
        setLoader(false);
        toast.error(err.message);
      });
  };

  async function handleGmailLogin() {
    try {
      await loginWithGmail();
      history.push("/");
    } catch {
      toast.error("Error occurd, try again");
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <h1>Login to Todo Pro</h1>
        <br />
        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="inp"
            name="email"
            onChange={(event) => handleOnchange(event)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="inp"
            name="password"
            onChange={(event) => handleOnchange(event)}
            required
          />
          <div className="d-flex justify-content-between align-center">
            <input type="submit" value="Login" className="btn" />
            {loader && <div className="loader"></div>}
            <Link to="/resetpassword">Forgot Password?</Link>
          </div>
          <br />
          <p>
            Don't have account? <Link to="/signup">SignUp</Link>{" "}
          </p>
        </form>
        <div className="or-divider">
          <span>OR</span>
        </div>
        <button onClick={handleGmailLogin}>login with google</button>
      </div>
    </div>
  );
};

export default Login;
