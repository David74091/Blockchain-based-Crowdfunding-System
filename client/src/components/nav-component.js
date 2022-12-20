import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { FundraisingPlatformContext } from "../context/FundraisingPlatformContext";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate;
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    window.alert("登出成功");
    navigate("/");
  };

  const { connectWallet, currentAccount } = useContext(
    FundraisingPlatformContext
  );

  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    首頁
                  </Link>
                </li>
                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      註冊
                    </Link>
                  </li>
                )}
                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      登入
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="/">
                      登出
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      設定
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/case">
                      案子
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role === "proposer" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/postcase">
                      發布案子
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role === "donor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/donate">
                      捐款
                    </Link>
                  </li>
                )}
                {!currentAccount ? (
                  <li>
                    <button className="btn btn-primary" onClick={connectWallet}>
                      連接錢包
                    </button>
                  </li>
                ) : (
                  <p>已連接錢包</p>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
