import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { arrowBack } from "../../assets";

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
        console.log(error);
        setMessage(error);
      });
  };

  const handleArrowBackClick = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-row h-[1000px] bg-base-100">
      <div className="flex flex-col w-1/2 ">
        <div className="cursor-pointer" onClick={handleArrowBackClick}>
          <img src={arrowBack} />
        </div>
        <div className="mt-64 ml-20 ">
          <div className="font-medium text-3xl">開始你的區塊鏈募款體驗</div>
          <div className="mt-8">簡單註冊立即開始</div>
        </div>
      </div>

      <div
        style={{ padding: "3rem" }}
        className="flex justify-center w-1/2 col-md-12 w-[600px] container mx-auto rounded-tl-[60px] bg-white shadow-md"
      >
        <div className="max-w-[400px] w-full">
          <div className="mt-52">
            <div>
              {message && <div className="alert alert-danger">{message}</div>}
              <label htmlFor="username">名稱:</label>
              <input
                onChange={handleChangeUsername}
                type="text"
                className="form-control"
                name="username"
                onFocus={true}
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
              <div className="flex gap-2 justify-center">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">提案人</span>
                    <input
                      type="radio"
                      name="role"
                      value="proposer"
                      className="radio checked:bg-error"
                      onChange={handleChangeRole}
                      checked={roles === "proposer"}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">捐款人</span>
                    <input
                      type="radio"
                      name="role"
                      value="donor"
                      className="radio checked:bg-info"
                      onChange={handleChangeRole}
                      checked={roles === "donor"}
                    />
                  </label>
                </div>
              </div>
            </div>
            <br />
            <button
              onClick={handleRegister}
              className="btn btn-primary btn-block mt-10"
            >
              <span>註冊</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
