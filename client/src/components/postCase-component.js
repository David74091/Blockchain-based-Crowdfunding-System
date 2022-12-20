import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CaseService from "../services/case.service";

const PostCaseComponent = (props) => {
  let { currentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [need, setNeed] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeNeed = (e) => {
    setNeed(e.target.value);
  };
  const postCase = () => {
    CaseService.post(title, description, need)
      .then(() => {
        window.alert("New case has been created.");
        navigate("/case");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before posting a new course.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "proposer" && (
        <div>
          <p>Only instrcutors can post new courses.</p>
        </div>
      )}
      {currentUser && currentUser.user.role === "proposer" && (
        <div className="form-group">
          <label for="exampleforTitle">標題</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
          />
          <br />
          <label for="exampleforContent">描述</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
          />
          <br />
          <label for="exampleforPrice">需求金額</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangeNeed}
          />
          <br />
          <button className="btn btn-primary" onClick={postCase}>
            發布
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCaseComponent;
