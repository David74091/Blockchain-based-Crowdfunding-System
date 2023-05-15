import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { CustomAlert, PageLoading } from "../../components";

const ProfileComponent = (props) => {
  let { currentUser, setCurrentUser, setInCampaignPage } = props;

  //alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [alertIcon, setAlertIcon] = useState();
  const [btnLoading, setBtnLoading] = useState(false);

  const [Loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({
    _id: "",
    email: "",
    username: "",
    phoneNumber: "",
    birth: "",
    sex: "",
    address: "",
  });
  const [picture, setPicture] = useState(null);
  const handleFormChange = (formName, e) => {
    setForm({ ...form, [formName]: e.target.value });
    console.log(form);
  };

  const handleModify = async () => {
    setBtnLoading(true);
    UserService.updateUser(form, picture)
      .then((data) => {
        setAlertMessage("修改成功");
        setAlertIcon("sucess");
        setAlertType("sucess");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          window.location.reload();
        }, [1500]);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setAlertMessage("修改失敗");
        setAlertIcon("error");
        setAlertType("error");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, [1500]);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      setPicture(reader.result);
    };
    reader.readAsDataURL(file);
  };
  //step1刪除圖片按鈕點擊事件
  const deletPicture = () => {
    setPicture(null);
    setPicturePreviewUrl(null);
  };

  useEffect(() => {
    setInCampaignPage(false);
    setLoading(true);
    AuthService.getUserData(currentUser.user._id)
      .then((data) => {
        setUserData(data.data);
        setPicture(userData.picture);
        console.log("userData:", userData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentUser]);

  useEffect(() => {
    if (userData) {
      setForm({
        _id: userData._id || "",
        email: userData.email || "",
        username: userData.username || "",
        phoneNumber: userData.phoneNumber || "",
        birth: userData.birth || "",
        sex: userData.sex || "",
        address: userData.address || "",
      });
      if (userData.picture) {
        setPicture(userData.picture);
      }
    }
  }, [userData]);

  if (Loading) {
    return <PageLoading />;
  }
  return (
    <div
      style={{ padding: "3rem" }}
      className="flex flex-col items-center w-full opacity-0 transition-opacity duration-500 animate-fade-in-forwards"
    >
      {showAlert && (
        <CustomAlert message={alertMessage} type={alertType} icon={alertIcon} />
      )}
      <div className="flex flex-col form-group border-2 rounded-lg p-4 max-w-[900px] w-full">
        <div className="flex">
          <label className="label">
            <span className="flex abel-text">用戶頭像</span>
          </label>
          <label class="fileInput">
            <div class="ml-20">
              <buttn className="btn btn-accent">
                {picture && "更換照片"}
                {!picture && "請選擇圖檔"}
                <input
                  hidden
                  accept="image/*"
                  id="organizeImage"
                  name="organizeImage"
                  required
                  type="file"
                  onChange={handlePictureUpload}
                />
              </buttn>
            </div>
          </label>
          <div className="ml-auto">
            {picture && (
              <button className="btn btn-error" onClick={deletPicture}>
                移除照片
              </button>
            )}
          </div>
        </div>
        {picture && (
          <div className="avatar">
            <div className="w-36 rounded border-2 rounded-md">
              <img src={picture} alt="profile picture" />
            </div>
          </div>
        )}
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              電子郵件<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form.email}
            type="text"
            required
            className="input input-bordered w-full"
            id="email"
            name="email"
            onChange={(e) => handleFormChange("email", e)}
          />
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              顯示名稱<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form.username}
            type="text"
            required
            className="input input-bordered w-full"
            id="username"
            name="username"
            onChange={(e) => handleFormChange("username", e)}
          />
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">手機號碼</span>
          </label>
          <input
            value={form.phoneNumber}
            type="text"
            className="input input-bordered w-full"
            id="phoneNumber"
            name="phoneNumber"
            onChange={(e) => handleFormChange("phoneNumber", e)}
          />
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">生日</span>
          </label>
          <input
            value={form.birth}
            type="date"
            className="input input-bordered w-full"
            id="birth"
            name="birth"
            onChange={(e) => handleFormChange("birth", e)}
          />
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">性別</span>
          </label>
          <div className="flex">
            <label className="label">
              <input
                value="male"
                type="radio"
                name="radio-1"
                className="radio"
                checked={form.sex === "male"}
                onChange={(e) => handleFormChange("sex", e)}
              />
              <span className="label-text">男性</span>
            </label>
            <label className="label">
              <input
                value="female"
                type="radio"
                name="radio-1"
                className="radio"
                checked={form.sex === "female"}
                onChange={(e) => handleFormChange("sex", e)}
              />
              <span className="label-text">女性</span>
            </label>
            <label className="label">
              <input
                value="other"
                type="radio"
                name="radio-1"
                className="radio"
                checked={form.sex === "other"}
                onChange={(e) => handleFormChange("sex", e)}
              />
              <span className="label-text">其他</span>
            </label>
          </div>
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">聯絡地址</span>
          </label>
          <input
            value={form.address}
            type="text"
            className="input input-bordered w-full"
            id="address"
            name="address"
            onChange={(e) => handleFormChange("address", e)}
          />
        </div>
        <br />
        <button
          disabled={Loading}
          className={`btn btn-error ml-auto ${
            btnLoading ? "loading" : ""
          } w-[100px]`}
          onClick={handleModify}
        >
          {btnLoading ? "" : "修改"}
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
