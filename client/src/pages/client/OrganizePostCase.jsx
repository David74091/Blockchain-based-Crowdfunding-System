import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CaseService from "../../services/case.service";
import OrganizeService from "../../services/organize.service";
import UserService from "../../services/user.service";
import { checkIfImage } from "../../utils";
import { Editor } from "@tinymce/tinymce-react";
import { useStateContext } from "../../context";

const OrganizePostCase = (props) => {
  let { setUserUpdate, setInCampaignPage, currentUser, setCurrentUser } = props;
  //設定步驟
  const [step, setStep] = useState(1);
  const { fetchNumberOfCampaigns } = useStateContext();
  const [bId, setBId] = useState();
  const [userData, setUserData] = useState(currentUser.user);

  useEffect(() => {
    setInCampaignPage(false);

    if (userData.organize) {
      console.log(userData);
    }
  }, []);

  const renderStep1 = () => (
    <div className="flex justify-center w-full">
      <div className="flex flex-col border-2 rounded-lg p-10 w-full mt-10">
        <button className="btn btn-error ml-auto">修改</button>
        <div className="flex flex-col items-center ">
          <img
            src={userData.organize.organizeImage}
            className="h-[200px] rounded-xl shadow-md"
          />
          <div className="font-bold mt-5 text-[1.25rem]">
            {userData.organize.organizeName}
          </div>

          <div className="font-medium mt-5 text-[1rem]">
            {userData.organize.introduction}
          </div>
        </div>
        <div className="divider"></div>
        <button
          className="btn btn-accent ml-auto mr-auto mt-10"
          onClick={handleStep2Click}
        >
          使用此身份進行提案
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div className="flex flex-col form-group border-2 rounded-lg p-4">
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              提案標題<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form2.title}
            name="title"
            type="text"
            className="input input-bordered w-full"
            id="title"
            onChange={(e) => handleForm2Change("title", e)}
          />
        </div>

        <br />

        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              提案描述<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form2.description}
            className="input input-bordered w-full"
            id="description"
            aria-describedby="emailHelp"
            name="description"
            onChange={(e) => handleForm2Change("description", e)}
          />
        </div>

        <br />

        <label className="label">
          <span className="flex abel-text">
            提案類別<div style={{ color: "red" }}>*</div>
          </span>
        </label>
        <div className="pl-10 border-2 rounded-full">
          <div className="w-full">
            <div className="form-control flex flex-row">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="教育"
                  checked={category.includes("教育")}
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text border-r-2 pr-1 ml-1">教育</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="醫療"
                  checked={category.includes("醫療")}
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text border-r-2 pr-1 ml-1">醫療</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="環境"
                  checked={category.includes("環境")}
                  onChange={handleCategoryChange}
                  className="checkbox "
                />
                <span className="label-text border-r-2 pr-1 ml-1">環境</span>
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    value="兒少"
                    onChange={handleCategoryChange}
                    className="checkbox"
                  />
                  <span className="label-text border-r-2 pr-1 ml-1">兒少</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    value="長者"
                    checked={category.includes("長者")}
                    onChange={handleCategoryChange}
                    className="checkbox"
                  />
                  <span className="label-text border-r-2 pr-1 ml-1">長者</span>
                </label>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="人本關懷"
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text border-r-2 pr-1 ml-1">
                  人本關懷
                </span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="動物保育"
                  checked={category.includes("動物保育")}
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text border-r-2 pr-1 ml-1">
                  動物保育
                </span>
              </label>

              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="翻轉人生"
                  checked={category.includes("翻轉人生")}
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text border-r-2 pr-1 ml-1">
                  翻轉人生
                </span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="藝術人文"
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text border-r-2 pr-1 ml-1">
                  藝術人文
                </span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="地方創生"
                  checked={category.includes("地方創生")}
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text border-r-2 pr-1 ml-1">
                  地方創生
                </span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="國際支援"
                  checked={category.includes("國際支援")}
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text ml-1">國際支援</span>
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              目標金額<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form2.target}
            name="target"
            type="number"
            step="100"
            className="input input-bordered w-full"
            id="target"
            onChange={(e) => handleForm2Change("target", e)}
          />
        </div>

        <br />

        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              有效日期<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form2.deadline}
            name="deadline"
            type="date"
            className="input input-bordered w-full"
            id="deadline"
            onChange={(e) => handleForm2Change("deadline", e)}
          />
        </div>

        <br />

        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              提案封面<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form2.image}
            name="image"
            type="text"
            className="input input-bordered w-full"
            id="image"
            onChange={(e) => handleForm2Change("image", e)}
          />
        </div>

        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              提案介紹<div style={{ color: "red" }}>*</div>
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
        <br />

        <div className="ml-auto grid gap-4 grid-cols-2">
          <button className="btn btn-error" onClick={handlePrev}>
            上一步
          </button>
          <button className="btn btn-accent" onClick={handleNext}>
            下一步
          </button>
        </div>

        <br />
        <br />
        {message && (
          <div className="alert alert-warning" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
  const [category, setCategory] = useState([]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    //category 的狀態中與 value 相等的元素從陣列中移除，並更新 category 狀態為移除後的新陣列。
    //例如，如果 category 狀態是 ['A', 'B', 'C']，且 value 為 'B'，那麼這行程式碼會返回新陣列 ['A', 'C']，並且將其設定回 category 狀態中。
    if (checked) {
      setCategory([...category, value]);
    } else {
      setCategory(category.filter((categoryItem) => categoryItem !== value));
    }
    setForm2((prevForm2) => ({ ...prevForm2, category: [...category, value] }));
    console.log(category);
  };

  const [details, setDetails] = useState("");

  const handleEditorChange = (details, editor) => {
    setDetails(details);
    setForm2({ ...form2, ["details"]: details });
  };
  const renderStep3 = () => (
    <div className="flex flex-col form-group border-2 rounded-lg p-4">
      <div className="container mx-auto p-4">
        <h1 className="font-[2rem] font-bold mb-4 text-accent">提案契約書</h1>
        <div className="divider"></div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">一、提案人</h2>
          <p className="mb-4">(一) 提案人需年滿18歲。</p>
          <p className="mb-4">(二) 提案人需為具有完全行為能力之自然人。</p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">二、回饋及執行</h2>
          <p className="mb-4">(一) 提案人應依照回饋內容及時間執行回饋事項。</p>
          <p className="mb-4">
            (二)
            若提案人無法達成回饋目標，應先行通知贊助人，並與贊助人協商處理。
          </p>
          <p className="mb-4">
            (三) 回饋執行期間，提案人應將資訊公開至區塊鏈募款平台專案頁面。
          </p>
          <p className="mb-4">
            (四) 提案人應在募資成功後的14天內開始回饋事項的執行。
          </p>
          <p className="mb-4">
            (五)
            提案人應在回饋執行期間，每月至少更新一次【進度分享】，將資訊公開至區塊鏈募款平台專案頁面。
          </p>
          <p className="mb-4">
            (六)
            若回饋執行進度延誤，或回饋內容有所變更，提案人應於第一時間內更新【進度分享】，將資訊公開至區塊鏈募款平台專案頁面。贊助人若因內容變更，而要求變更贊助或退款，提案人不得拒絕或扣除部分費用。
          </p>
          <p className="mb-4">
            (七)
            提案人所提所有專案，由提案人自行負責，與本平台無關，若所提專案與其他平台重複，或有其他經本平台評估，需停止募資之專案，本平台可以隨時下架處理。
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">三、相關費用支付</h2>
          <p className="mb-4">
            (一)
            刊載於區塊鏈募款平台的公益集資案到期後，只要達到或超過提案人設定的集資金額，區塊鏈募款平台將自動收取募得總金額8%費用為專案上架費，雙方若有其他約定，需在開始集資前另行議定之。
          </p>
          <p className="mb-4">
            (二)
            如集資案件到期後，未達到提案人設定之集資金額，區塊鏈募款平台將不收取任何上架費，並於收到金流服務公司撥款後之7至10個工作天(不包含例假日及國定假日)，將集資金額退還予該案之贊助人，惟每筆退款產生之金流手續費，由贊助人自行吸收。此筆費用為支付予金流服務公司之用，而非進入區塊鏈募款平台帳戶裡。
          </p>
          <p className="mb-4">
            (三)
            專案集資成功後，區塊鏈募款平台將於收到匯款資料後的7至10個工作天內(不包含例假及國定假日)，將款項以匯款方式匯予提案人指定之受款帳戶。
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            四、內容授權與智慧財產權確保
          </h2>
          <p className="mb-4">
            (一)
            提案人上載、傳送或提供物件資料或其他相關資料至區塊鏈募款平台時，視為提案人已授權區塊鏈募款平台得以利用、儲存及刊載該等資料，以供特定或不特定之使用者搜尋及瀏覽，並視為提案人已授權區塊鏈募款平台得經由平面或電子形式，重製、散布、公開播送、公開上映、改作、編輯、公開發行、公開發表、或公開傳輸該等資料。
          </p>
          <p className="mb-4">
            (二)
            提案人上載、傳送或提供物件資料或其他相關資料至區塊鏈募款平台時，應擔保其有上載、傳送或提供該等資料之權利，若該等資料涉有第三人之智慧財產權，提案人保證已取得合法使用之權利，並已取得於區塊鏈募款平台上使用、公開、播放或公開傳輸該等資料之授權，以免造成區塊鏈募款平台因此受有損害。
          </p>
          <p className="mb-4">
            (三)
            如有第三人侵犯區塊鏈募款平台或其使用者的智慧財產權，提案人應協助區塊鏈募款平台或其使用者進行維權。
          </p>
          <p className="mb-4">
            (四)
            若提案人上載、傳送或提供物件資料或其他相關資料至區塊鏈募款平台，導致區塊鏈募款平台或其使用者受有損害，提案人應負賠償責任。
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">五、個資保護</h2>
          <p className="mb-4">
            (一)
            提案人上載、傳送或提供物件資料或其他相關資料至區塊鏈募款平台時，應遵守相關個資保護法規，不得非法蒐集、處理、使用或揭露他人之個人資料，並遵守區塊鏈募款平台之隱私權政策。
          </p>
          <p className="mb-4">
            (二)
            若提案人因違反個資保護法規，導致區塊鏈募款平台或其使用者受有損害，提案人應負賠償責任。
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">六、違約責任</h2>
          <p className="mb-4">
            (一)
            若提案人違反本契約書之規定，區塊鏈募款平台得隨時終止提案人在區塊鏈募款平台的資格，並要求提案人賠償因此所生之損害。
          </p>
          <p className="mb-4">
            (二)
            若提案人違反本契約書之規定，導致區塊鏈募款平台或其使用者受有損害，提案人應負賠償責任。
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">七、準據法及管轄法院</h2>
          <p className="mb-4">
            (一)
            本契約書之解釋及適用，以及與本契約書有關之爭議，應依照中華民國法律規定。
          </p>
          <p className="mb-4">
            (二)
            若有關本契約書之爭議，雙方同意以台灣臺北地方法院為第一審管轄法院。
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">八、其他</h2>
          <p className="mb-4">
            (一)
            本契約書為區塊鏈募款平台之通則，若與提案人間有其他特別約定，應以該特別約定為準。
          </p>
          <p className="mb-4">
            (二) 本契約書之條款如有任何部分無效，不影響其他部分之效力。
          </p>
          <p className="mb-4">
            (三)
            區塊鏈募款平台保留隨時修改本契約書之權利，修改後之內容將公告於區塊鏈募款平台網站，不另行通知。提案人應不定期查閱本契約書，以確保其權益。
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="mr-auto mt-4">
        <label className="label cursor-pointer">
          <input
            onChange={handleCheckboxChange}
            checked={isChecked}
            type="checkbox"
            className="checkbox"
          />
          <span
            style={{ fontSize: "1.25rem", fontWeight: "600" }}
            className="ml-2 label-text"
          >
            我已清楚提案流程與規範
          </span>
        </label>
      </div>
      <div className="ml-auto grid gap-4 grid-cols-2">
        <button className="btn btn-error" onClick={handlePrev}>
          上一步
        </button>
        <button
          className={`btn btn-accent ${btnLoading ? "loading" : ""}`}
          onClick={postCase}
        >
          {!btnLoading ? "送出提案" : ""}
        </button>
      </div>
    </div>
  );
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleNext = () => {
    if (step == 1) {
      if (
        form1.organizeName == "" ||
        organizeImage == null ||
        form1.personName == "" ||
        form1.idNumber == "" ||
        form1.phoneNumber == "" ||
        form1.email == "" ||
        form1.introduction == ""
      ) {
        alert("請填寫第一步驟裡所有的欄位");
        return;
      } else {
        setStep(step + 1);
      }
    } else if (step == 2) {
      if (
        form2.title == "" ||
        form2.description == "" ||
        form2.target == "" ||
        form2.image == "" ||
        form2.details == ""
      ) {
        alert("請填寫第二步驟裡所有的欄位");
        return;
      } else {
        setStep(step + 1);
      }
    }

    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };
  //設定步驟1的身份圖片
  const [organizeImage, setorganizeImage] = useState(null);

  let [form1, setForm1] = useState({
    organizeName: "",
    personName: "",
    idNumber: "",
    phoneNumber: "",
    email: "",
    introduction: "",
  });

  const handleForm1Change = (formName, e) => {
    setForm1({ ...form1, [formName]: e.target.value });
  };

  let [form2, setForm2] = useState({
    title: "",
    description: "",
    category: [],
    target: "",
    deadline: "",
    image: "",
    details: "",
  });
  const handleForm2Change = (formName, e) => {
    setForm2({ ...form2, [formName]: e.target.value });
    console.log(form2);
  };

  let [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  //step1處理提案身份照片
  const handleorganizeImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      setorganizeImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  //step1刪除圖片按鈕點擊事件
  const deletImage = () => {
    setorganizeImage(null);
    setImagePreviewUrl(null);
  };

  //   const handleChangeTitle = (e) => {
  //     setTitle(e.target.value);
  //   };
  //   const handleChangeDesciption = (e) => {
  //     setDescription(e.target.value);
  //   };
  //   const handleChangeTarget = (e) => {
  //     setTarget(e.target.value);
  //   };
  //   const handleChangeDeadline = (e) => {
  //     setDeadline(e.target.value);
  //   };
  //   const handleChangeImage = (e) => {
  //     setImage(e.target.value);
  //   };
  //btn loading動畫
  const [btnLoading, setBtnLoading] = useState(false);

  // 首先，檢查isChecked變量，如果用戶未勾選同意條款，則直接返回提示。
  // 檢查圖片URL是否有效，如果無效則提示並返回。
  // 使用try-catch語句依次執行創建身份、創建案例、將案例添加到身份以及將身份添加到用戶的操作。如果有任何錯誤，將顯示一個一般性的錯誤消息並輸出具體的錯誤日誌。
  const postCase = async (e) => {
    if (!isChecked) {
      alert("請閱讀完合約後勾選同意方框");
      return;
    }

    e.preventDefault();
    checkIfImage(form2.image, async (exists) => {
      if (!exists) {
        alert("請提供有效網址");
        setForm2({ ...form2, image: "" });
        return;
      }

      setBtnLoading(true);

      try {
        const organizeId = userData.organize._id;

        const caseResponse = await CaseService.postCase(
          form2.title,
          form2.description,
          category,
          form2.target,
          form2.deadline,
          form2.image,
          form2.details,
          currentUser.user._id,
          organizeId
        );
        console.log("1.caseResponse:", caseResponse);

        await OrganizeService.pushCase(organizeId, caseResponse._id);
        console.log("2.Case pushed to Organize");

        await UserService.addOrganize(currentUser.user._id, organizeId);
        console.log("3.Organize added to user");

        const userResponse = await UserService.getCurrentUser(
          currentUser.user._id
        );
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        console.log("4.新獲取的用戶資訊：", userResponse.data);
        setCurrentUser(userResponse.data);

        alert("提案身份及提案已創建，請等待管理員審核");
      } catch (error) {
        console.log("創建提案身份或提案失敗", error);
        alert("無法上傳");
      } finally {
        setBtnLoading(false);
      }
    });
  };

  const handleStep1Click = () => {
    setStep(1);
  };
  const handleStep2Click = () => {
    setStep(2);
  };
  const handleStep3Click = () => {
    if (
      form2.title == "" ||
      form2.description == "" ||
      form2.target == "" ||
      form2.image == ""
    ) {
      alert("請完成步驟2的表單");
      return;
    }
    setStep(3);
  };

  return (
    <div className="flex items-center w-full justify-center opacity-0 transition-opacity duration-500 animate-fade-in-forwards">
      <div className="max-w-[60vw] w-full" style={{ padding: "3rem" }}>
        {/* 進圖條 */}
        <ul className="steps w-full mb-4">
          <li
            className="step step-accent cursor-pointer"
            onClick={handleStep1Click}
          >
            提案身份確認
          </li>
          <li
            className={
              step == 2
                ? "step step-accent cursor-pointer"
                : step == 3
                ? "step step-accent cursor-pointer"
                : "step cursor-pointer"
            }
            onClick={handleStep2Click}
          >
            提案內容
          </li>
          <li
            className={
              step == 3
                ? "step step-accent cursor-pointer"
                : "step cursor-pointer"
            }
            onClick={handleStep3Click}
          >
            提案合約
          </li>
        </ul>
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default OrganizePostCase;
