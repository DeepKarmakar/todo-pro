import React, { useContext, useState, useEffect } from "react";
import { auth, provider } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const loginWithEmail = (email, password) =>
    new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

  function loginWithGmail() {
    return auth.signInWithPopup(provider);
  }

  function logOut() {
    return auth.signOut();
  }

  const resetPassword = (email) =>
    new Promise((resolve, reject) => {
      auth
        .sendPasswordResetEmail(email)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

  const value = {
    currentUser,
    loginWithEmail,
    loginWithGmail,
    signup,
    logOut,
    resetPassword,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      debugger;
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
