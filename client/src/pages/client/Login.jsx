import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/auth.service";
import { arrowBack } from "../../assets";
import { CustomAlert } from "../../components";

const Login = (props) => {
  let { currentUser, setCurrentUser, setInCampaignPage } = props;
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    setInCampaignPage(false);
  }, []);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  //focus

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    setBtnLoading(true);
    AuthService.login(email, password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        setShowAlert(true); // Show the custom alert

        setCurrentUser(AuthService.getCurrentUser());
        setTimeout(() => {
          setShowAlert(false); // Hide the custom alert after a delay
          navigate("/CampaignPage");
        }, 1000);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleArrowBackClick = () => {
    navigate("/");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-row h-[1000px] bg-base-100">
      {showAlert && <CustomAlert message="登入成功" type="succes" />}
      <div className="flex flex-col items-center w-1/2 animate-fade-in-from-left-forwards opacity-0 -translate-x-16 relative">
        <div
          className="cursor-pointer absolute top-20 left-[31%]"
          onClick={handleArrowBackClick}
        >
          <img src={arrowBack} />
        </div>

        <div className="mt-40 ml-20 ">
          <div className="font-bold text-[3rem] mb-2">登入</div>
          <div className="divider"></div>
          <div className="font-medium text-3xl">歡迎回來</div>
          <div className="mt-8 ml-1">立即登入並開始您的區塊鏈募款體驗</div>
        </div>
      </div>
      <div
        style={{ padding: "3rem" }}
        className="flex justify-center w-1/2 col-md-12 w-[600px] container mx-auto rounded-tl-[60px] bg-white shadow-md relative"
      >
        <div className="max-w-[400px] w-full">
          <div>
            <div className="flex justify-end mb-40">
              <button className="btn btn-ghost" onClick={handleRegisterClick}>
                沒帳號？ 立即註冊
              </button>
            </div>
            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-[1rem]">信箱：</span>
              </label>
              <input
                onChange={handleChangeEmail}
                type="text"
                ref={inputRef}
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
            <div className="divider absolute left-0 right-0 mt-20"></div>

            <div className="flex justify-end">
              <button
                onClick={handleLogin}
                className={`w-[6rem] btn btn-primary mt-40 ${
                  btnLoading ? " loading" : ""
                }`}
              >
                <span>{btnLoading ? "" : "登入"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
