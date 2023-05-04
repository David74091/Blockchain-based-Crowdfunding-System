import React, { useState, useEffect, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import UpdateService from "../../services/update.service";
const UpdatePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  const [updateData, setUpdateData] = useState();

  let [form, setForm] = useState({
    title: "",
    details: "",
  });

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const data = await UpdateService.getUpdate(state._id);
        setUpdateData(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUpdate();
  }, []);

  console.log(updateData);

  const handleFormChange = (formName, e) => {
    setForm({ ...form, [formName]: e.target.value });
    console.log(form);
  };
  const handleEditorChange = (details, editor) => {
    setDetails(details);
    setForm({ ...form, ["details"]: details });
  };

  const handleClick = async () => {
    try {
      await UpdateService.postUpdate(state._id, form.title, form.details);
      alert("更新成功");
      window.location.reload();
    } catch (err) {
      alert("失敗");
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center ">
        <div className="mt-10 font-bold text-[2rem]">之前的更新：</div>
        <div>
          {updateData &&
            updateData
              .map((update) => {
                return (
                  <div className="flex flex-col border-2 rounded-2xl p-4 gap-2 mt-10">
                    <div>
                      {new Date(update.date).toLocaleString("zh-TW", {
                        timeZone: "Asia/Taipei",
                      })}
                    </div>
                    <div className="font-bold text-[2rem]">{update.title}</div>

                    <div className="divider"></div>
                    <div className="flex">
                      <p
                        dangerouslySetInnerHTML={{ __html: update.detail }}
                        className="reset-heading-styles"
                      ></p>
                    </div>
                  </div>
                );
              })
              .reverse()}
        </div>
        <div className="flex flex-col form-group border-2 rounded-lg p-10 mt-10 max-w-[1280px]">
          <div className="w-full max-w-">
            <label className="label">
              <span className="flex abel-text">
                更新標題<div style={{ color: "red" }}>*</div>
              </span>
            </label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
              onChange={(e) => handleFormChange("title", e)}
            />
          </div>

          <br />
          <div className="w-full max-w-">
            <label className="label">
              <span className="flex abel-text">
                更新內文<div style={{ color: "red" }}>*</div>
              </span>
            </label>
            <Editor
              apiKey="l6bke7fwg8cl802x8oy76223gddk3sj0ksi4bwucln0eseq5"
              value={details}
              onEditorChange={handleEditorChange}
              init={{
                required: true,
              }}
            />
          </div>
          <div className="mt-10 w-full flex justify-end">
            <button className="btn btn-primary w-[6rem]" onClick={handleClick}>
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
