import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import UpdateService from "../../services/update.service";
import { PageLoading, CustomAlert } from "../../components";

const UpdatePage = ({ setTriggerScroll }) => {
  const buttonRef = useRef(null);

  const { state } = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  const [updateData, setUpdateData] = useState();
  const [btnLoading, setBtnLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertIcon, setAlertIcon] = useState("");

  // 更新
  const [editingUpdateId, setEditingUpdateId] = useState(null);
  const [editingTitle, setEditingTitle] = useState(null);
  const [editingDetails, setEditingDetails] = useState({}); // 新增一个 state 用于存储编辑详细信息的状态
  const [originalUpdate, setOriginalUpdate] = useState(null);

  const handleEditTitleChange = (id, newValue) => {
    setUpdateData(
      updateData.map((update) =>
        update._id === id ? { ...update, title: newValue || "" } : update
      )
    );
  };

  const handleSaveEdit = async (id) => {
    const updatedTitle = updateData.find((update) => update._id === id).title;
    try {
      console.log(id, updatedTitle, editingDetails[id]);
      await UpdateService.putUpdate(id, updatedTitle, editingDetails[id]);

      setEditingUpdateId(null);
      setEditingTitle(null);
      setEditingDetails((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });

      setAlertMessage("修改成功");
      setAlertType("sucess");
      setAlertIcon("sucess");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      setAlertMessage("修改失敗");
      setAlertType("error");
      setAlertIcon("error");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    }
  };

  const handleCancelEdit = () => {
    if (originalUpdate) {
      setUpdateData(
        updateData.map((update) =>
          update._id === originalUpdate._id ? originalUpdate : update
        )
      );
    }
    setEditingUpdateId(null);
    setEditingTitle(null); // 添加这一行
    setOriginalUpdate(null);
  };

  let [form, setForm] = useState({
    title: "",
    details: "",
  });

  useEffect(() => {
    setTriggerScroll(true);
    setPageLoading(true);
    const fetchUpdate = async () => {
      try {
        const data = await UpdateService.getUpdate(state._id);
        setUpdateData(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setPageLoading(false);
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
    setBtnLoading(true);
    try {
      await UpdateService.postUpdate(state._id, form.title, form.details);

      setShowAlert(true);
      setAlertMessage("發布更新成功");
      setAlertType("sucess");
      setAlertIcon("sucess");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
      setShowAlert(true);

      setAlertMessage("發布更新失敗");
      setAlertType("error");
      setAlertIcon("error");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleImageClick = () => {
    navigate(state.title, { state: state });
  };

  if (pageLoading) {
    return <PageLoading />;
  }

  const handleEditClick = (id) => {
    const updateToEdit = updateData.find((update) => update._id === id);
    setOriginalUpdate({ ...updateToEdit });
    setEditingUpdateId(id);
    setEditingTitle(updateToEdit._id);
    setEditingDetails((prevState) => ({
      ...prevState,
      [id]: updateToEdit.detail,
    }));
  };

  const handleUpdateChange = (id, newValue) => {
    setEditingDetails((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showAlert && (
        <CustomAlert message={alertMessage} type={alertType} icon={alertIcon} />
      )}
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="font-light text-[0.5rem]">點擊查看更新</div>
          <img
            onClick={handleImageClick}
            className="h-[100px] rounded-xl cursor-pointer"
            src={state.image}
          />
        </div>

        <h1 className="text-4xl font-bold mt-8">
          {state.title}
          <br />
          更新管理
        </h1>
        <h1 className="text-4xl font-bold mb-8"></h1>
      </div>

      <div className="divider"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-base-100 shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">之前的更新</h2>
          <div className="divider"></div>
          {updateData &&
            updateData
              .map((update) => (
                <div className="border-b-2 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                  <div className="flex">
                    {editingTitle === update._id ? (
                      <>
                        <input
                          className="form-control w-full border rounded-lg px-3 py-2"
                          value={update.title}
                          onChange={(e) =>
                            handleEditTitleChange(update._id, e.target.value)
                          }
                        />
                        <button
                          className="btn btn-ghost ml-2"
                          onClick={handleCancelEdit}
                        >
                          取消
                        </button>
                        <button
                          className="btn btn-primary ml-2"
                          onClick={() => handleSaveEdit(update._id)}
                        >
                          保存
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold">
                          {update.title}
                        </h3>
                        <button
                          className="btn btn-ghost ml-auto"
                          onClick={() => {
                            setEditingTitle(update._id);
                            handleEditClick(update._id);
                          }}
                        >
                          修改
                        </button>
                      </>
                    )}
                  </div>
                  <p className="text-gray-500">
                    {new Date(update.date).toLocaleString("zh-TW", {
                      timeZone: "Asia/Taipei",
                    })}
                  </p>
                  {editingUpdateId === update._id ? (
                    <Editor
                      apiKey="l6bke7fwg8cl802x8oy76223gddk3sj0ksi4bwucln0eseq5"
                      value={editingDetails[update._id] ?? update.detail}
                      onEditorChange={(details, editor) =>
                        handleUpdateChange(update._id, details)
                      }
                      init={{
                        required: true,
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: update.detail }}
                    ></div>
                  )}
                </div>
              ))
              .reverse()}
        </div>
        <div className="bg-base-100 shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">新增更新</h2>
          <div className="divider"></div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              更新標題<span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              type="text"
              className="form-control w-full border rounded-lg px-3 py-2"
              id="title"
              onChange={(e) => handleFormChange("title", e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              更新內文<span className="text-red-500">*</span>
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
          <div className="text-right">
            <button
              className={`btn btn-primary ${
                btnLoading ? "loading" : ""
              } font-semibold py-2 px-4 rounded-lg`}
              onClick={handleClick}
            >
              {btnLoading ? "" : "送出"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
