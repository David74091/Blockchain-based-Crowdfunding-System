import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/auth.service";

const Login = (props) => {
  let { currentUser, setCurrentUser, setInCampaignPage } = props;
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  useEffect(() => {
    setInCampaignPage(false);
  }, []);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        window.alert("登入成功");
        setCurrentUser(AuthService.getCurrentUser());
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div>
      <div className="w-full h-full">幹你娘</div>
      <div
        style={{ padding: "3rem" }}
        className="col-md-12 w-[600px] container mx-auto"
      >
        <div>
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">信箱</label>
            <input
              onChange={handleChangeEmail}
              type="text"
              className="form-control"
              name="email"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input
              onChange={handleChangePassword}
              type="password"
              className="form-control"
              name="password"
            />
          </div>
          <br />
          <div className="form-group">
            <button onClick={handleLogin} className="btn btn-primary btn-block">
              <span>登入</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
