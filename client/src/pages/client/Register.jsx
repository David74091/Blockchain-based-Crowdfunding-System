import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [roles, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, roles)
      .then(() => {
        window.alert("註冊成功");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div
      style={{ padding: "3rem" }}
      className="col-md-12 w-[600px] container mx-auto"
    >
      <div>
        <div>
          {message && <div className="alert alert-danger">{message}</div>}
          <label htmlFor="username">暱稱:</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">信箱:</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼:</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div>
          <label htmlFor="role">身份:</label>

          <select
            onChange={handleChangeRole}
            className="form-select"
            name="roles"
            aria-label="Default select example"
            defaultValue={"default"}
          >
            <option value="default" disabled>
              選擇身份
            </option>
            <option value="donor">捐款人</option>
            <option value="proposer">提案人</option>
            <option value="admin">管理員</option>
          </select>
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary btn-block">
          <span>註冊</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
