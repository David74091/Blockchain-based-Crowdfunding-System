import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useStateContext } from "../context";
import CaseService from "../services/case.service";
import MessageService from "../services/message.service";
import { searchIcon } from "../assets";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const [userData, setUserData] = useState();

  let { setCaseData, setLoading, currentUser, setCurrentUser } = props;

  useEffect(() => {
    console.log("Using effect.");
    setLoading(true);
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    MessageService.getAllTrue()
      .then((data) => {
        console.log("Data", data.data);
        setCaseData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("Using effect.");
    setLoading(true);
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    // 获取用户数据
    AuthService.getUserData(_id)
      .then((data) => {
        console.log("User data", data.data);
        setUserData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

  const renderUserImage = () => {
    if (currentUser && userData) {
      return (
        <img
          src={userData.picture}
          className="h-10 w-10 rounded-full"
          alt="user-avatar"
        />
      );
    }
  };
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    CaseService.getCaseByName(searchInput, selectedValue)
      .then((data) => {
        console.log("searchInput: ", searchInput);
        console.log("資料在此: ", data);
        setCaseData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const { connect, address } = useStateContext();

  const navigate = useNavigate;
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    window.alert("登出成功");
    navigate("/");
  };

  return (
    <div class="navbar bg-base-200 h-[100px] font-['Quicksand']">
      <div class="flex-1">
        <Link to="/" class="btn btn-ghost normal-case text-xl">
          區塊鏈募款-Demo
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="w-[600px] h-[3.5rem] bg-white rounded-full flex flex-row p-1 mr-4">
          <button className="btn btn-ghost " onClick={handleSearch}>
            <img src={searchIcon} />
          </button>
          <input
            type="text"
            value={searchInput}
            onChange={handleChange}
            placeholder="搜尋提案"
            className="input w-[270px] ml-1"
          />
          <div className="flex-1"></div>
          <div className="dropdown w-[10rem] ">
            <select
              className="select rounded-full w-full bg-mycolor text-white pl-10 shadow-myshadow"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">提案類別</option>
              <option value="教育">教育</option>
              <option value="醫療">醫療</option>
              <option value="環境">環境</option>
              <option value="兒少">兒少</option>
              <option value="長者">長者</option>
              <option value="人本關懷">人本關懷</option>
              <option value="動物保育">動物保育</option>
              <option value="翻轉人生">翻轉人生</option>
              <option value="藝術人文">藝術人文</option>
              <option value="地方創生">地方創生</option>
              <option value="國際支援">國際支援</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
            <Link to="/">瀏覽提案</Link>
          </li>

          {/* {currentUser && currentUser.role && ( */}
          {/* // currentUser.user.role != "admin" && */}

          {/* )} */}
          {currentUser &&
            currentUser.user.role &&
            currentUser.user.role === "admin" && (
              <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
                <Link className="nav-link" to="/admincheckcase">
                  審核提案
                </Link>
              </li>
            )}
          {currentUser &&
            currentUser.user.role &&
            currentUser.user.role === "proposer" && (
              <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
                <Link className="nav-link" to="/clientpostcase">
                  發布提案
                </Link>
              </li>
            )}
          <div class="flex">
            {!currentUser && (
              <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
                <Link className="nav-link" to="/login">
                  登入
                </Link>
              </li>
            )}
            <div className="flex items-center">
              <div className="border-l border-indigo-600 my-auto mx-2 h-7"></div>
            </div>
            {currentUser && userData && (
              <div className="dropdown dropdown-end" onClick={handleClick}>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xl">
                    <img src={userData.picture} alt="user avatar" />
                  </div>
                </label>
                {isOpen && (
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-[8rem]"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        個人資料
                      </Link>
                    </li>
                    <li>
                      <Link to="/organize" className="justify-between">
                        提案身份
                      </Link>
                    </li>
                    <li>
                      <Link to="/profilecases">我的提案</Link>
                    </li>
                    <li>
                      <a>捐款紀錄</a>
                    </li>
                  </ul>
                )}
              </div>
            )}

            {currentUser && (
              <li className="nav-item font-medium text-[rgba(112,121,139,1)]">
                <Link onClick={handleLogout} className="nav-link" to="/">
                  登出
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item font-bold leading-[normal] text-[rgba(96,1,211,1)]">
                <Link className="nav-link" to="/register">
                  註冊
                </Link>
              </li>
            )}
          </div>

          {/* {currentUser &&
              currentUser.user.role &&
              currentUser.user.role === "proposer" &&
              address && (
                <li className="nav-item">
                  <Link className="nav-link" to="/postcase">
                    發布提案
                  </Link>
                </li>
              )} */}
          {/* {currentUser && currentUser.user.role === "donor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/donate">
                  捐款
                </Link>
              </li>
            )} */}
          {currentUser &&
            currentUser.user.role &&
            currentUser.user.role == "admin" && (
              <li className="nav-item ml-[20px] font-medium text-[rgba(112,121,139,1)]">
                <button
                  className="btn btn-outline btn-info"
                  onClick={() => {
                    connect();
                  }}
                >
                  {address ? "已連接錢包" : "連接錢包"}
                </button>
              </li>
            )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
