import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <div className="clearfix"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img className="logo" src="./images/logo3.png" alt="" />
          </div>
          <div className="col-md-6">
            <div className="sing-up_container">
              <h2>Sign In</h2>
              <form action="#" method="POST">
                <div className="form-group">
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label for="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit">Sign In</button>
                </div>
              </form>
              <div className="separator">
                <span>or</span>
              </div>
              <div className="login-with-google">
                <button>Sign in with Google</button>
              </div>
              <div className="have-account">
                <p>
                  Do you have an account yet? <Link to="/SignUp">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};
export default SignIn;
