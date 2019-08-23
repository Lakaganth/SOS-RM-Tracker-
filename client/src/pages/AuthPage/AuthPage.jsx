import React from "react";
import SigninRM from "../../components/auth/SigninRM";
import SignupRM from "../../components/auth/SignupRM";

import "./AuthPage.scss";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <SigninRM />
      <SignupRM />
    </div>
  );
};

export default AuthPage;
