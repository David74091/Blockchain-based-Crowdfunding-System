import React, { useState, useRef, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { arrowBack } from "../../assets";
import { CustomAlert } from "../../components";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [roles, setRole] = useState("proposer");
  let [message, setMessage] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
    setBtnLoading(true);
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
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleArrowBackClick = () => {
    navigate("/");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
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

        <div className="mt-40 ml-20 ">
          <div className="font-bold text-[3rem] mb-2">註冊</div>
          <div className="divider"></div>
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
            </div>{" "}
            {message && <div className="alert alert-danger">{message}</div>}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-[1rem]">名稱：</span>
              </label>
              <input
                onChange={handleChangeUsername}
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="UserName"
                ref={inputRef}
              />
              <br />
              <label className="label">
                <span className="label-text text-[1rem]">信箱：</span>
              </label>
              <input
                onChange={handleChangeEmail}
                type="email"
                className="input input-bordered w-full max-w-xs"
                name="email"
              />
              <br />
              <label className="label">
                <span className="label-text text-[1rem]">密碼：</span>
              </label>
              <input
                onChange={handleChangePassword}
                type="password"
                className="input input-bordered w-full max-w-xs"
                name="password"
                onKeyDown={handleKeyPress}
              />
            </div>
            <br />
            <br />
            <br />
            <div className="divider absolute left-0 right-0 mt-20"></div>
            <div className="flex justify-end">
              <button
                onClick={handleRegister}
                className={`w-[6rem] btn btn-primary mt-40 ${
                  btnLoading ? "loading" : ""
                }`}
              >
                <span>{btnLoading ? "" : "註冊"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
