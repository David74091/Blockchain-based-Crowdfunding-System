import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { arrowBack } from "../../assets";
import { CustomAlert } from "../../components";

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

  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = () => {
    AuthService.register(username, email, password, roles)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false); // Hide the custom alert after a delay
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error);
      });
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleArrowBackClick = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-row h-[1000px] bg-base-100">
      {showAlert && <CustomAlert message="註冊成功" type="sucess" />}
      <div className="flex flex-col items-center w-1/2 animate-fade-in-from-left-forwards opacity-0 -translate-x-16 relative">
        <div
          className="cursor-pointer absolute top-20 left-[31%]"
          onClick={handleArrowBackClick}
        >
          <img src={arrowBack} />
        </div>
        <div className="mt-64 ml-20 ">
          <div className="font-medium text-3xl">
            讓我們開始您的區塊鏈募款體驗
          </div>
          <div className="mt-8 ml-1">簡單註冊立即開始</div>
        </div>
      </div>

      <div
        style={{ padding: "3rem" }}
        className="flex justify-center w-1/2 col-md-12 w-[600px] container mx-auto rounded-tl-[60px] bg-white shadow-md relative"
      >
        <div className="max-w-[400px] w-full">
          <div>
            <div className="flex justify-end mb-40">
              <button className="btn btn-ghost" onClick={handleLoginClick}>
                已註冊？ 立即登入
              </button>
            </div>
            <div>
              {message && <div className="alert alert-danger">{message}</div>}
              <label htmlFor="username">名稱:</label>
              <input
                onChange={handleChangeUsername}
                type="text"
                className="form-control mt-1"
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
                className="form-control mt-1"
                name="email"
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">密碼:</label>
              <input
                onChange={handleChangePassword}
                type="password"
                className="form-control mt-1"
                name="password"
              />
            </div>
            <br />
            <div>
              <label htmlFor="role">身份:</label>
              <div className="flex gap-2 justify-center mt-1">
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
            <br />
            <br />
            <div className="divider absolute left-0 right-0 mt-20"></div>

            <div className="flex justify-end">
              <button
                onClick={handleRegister}
                className="w-[6rem] btn btn-primary mt-40"
              >
                <span>註冊</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
