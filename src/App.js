import "./App.scss";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/login";
import { useStateValue } from "./StateProvider";
import { AuthProvider } from "./context/authContext";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./components/signup/SignUp";
import ResetPassword from "./components/resetPassword/ResetPassword";

function App() {
  console.log(useStateValue());

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/resetpassword" component={ResetPassword} />
          {/* <Redirect from="*" to="/" /> */}
        </AuthProvider>
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        transition={Slide}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
