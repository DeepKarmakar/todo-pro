import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { resetPassword } = useAuth();
  const history = useHistory();

  const handleOnchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    resetPassword(user.email)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Reset Password</h1>
        <br />
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="inp"
            name="email"
            onChange={(event) => handleOnchange(event)}
            required
          />
          <input type="submit" value="Reset Password" className="btn" />
          <br />
          <p>
            Don't have account? <Link to="/signup">SignUp</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
