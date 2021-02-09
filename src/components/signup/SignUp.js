import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signup } = useAuth();
  const history = useHistory();

  const handleOnchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    signup(user.email, user.password)
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign Up to Todo Pro</h1>
        <br />
        <form onSubmit={handleLogin}>
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
          <input type="submit" value="Signup" className="btn" />
          <p>
            Already have account? <Link to="/login">Login</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
