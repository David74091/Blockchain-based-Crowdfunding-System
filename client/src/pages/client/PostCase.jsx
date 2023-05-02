import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../../context";
import { checkIfImage } from "../../utils";
import { Loader } from "../../components/index";

const PostCase = (props) => {
  let { currentUser, setInCampaignPage } = props;
  let [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  useEffect(() => {
    setInCampaignPage(false);
  }, []);

  return (
    <div style={{ padding: "3rem" }} className="w-[600px] container mx-auto">
      {!currentUser && (
        <div>
          <p>You must login first before posting a new Case.</p>
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
          <p>Only instrcutors can post new Cases.</p>
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
            onChange={(e) => handleFormFieldChange("title", e)}
          />
          <br />
          <label for="exampleforContent">描述</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={(e) => handleFormFieldChange("description", e)}
          />
          <br />
          <label for="exampleforPrice">需求金額</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={(e) => handleFormFieldChange("target", e)}
          />
          <br />
          <label for="exampleforDeadline">有限期限</label>
          <input
            name="deadline"
            type="date"
            className="form-control"
            id="exampleforDeadline"
            onChange={(e) => handleFormFieldChange("deadline", e)}
          />
          <br />
          <label for="exampleforImage">圖片網址</label>
          <input
            name="image"
            type="text"
            className="form-control"
            id="exampleforImage"
            onChange={(e) => handleFormFieldChange("image", e)}
          />
          <br />
          <button
            className="btn btn-primary place-content-center btn-block"
            onClick={handleSubmit}
          >
            發布提案
          </button>
          {isLoading && <Loader />}
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

export default PostCase;
