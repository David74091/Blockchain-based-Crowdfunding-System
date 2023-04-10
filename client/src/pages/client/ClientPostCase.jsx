import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CaseService from "../../services/case.service";
import OrganizeService from "../../services/organize.service";
import UserService from "../../services/user.service";
import { checkIfImage } from "../../utils";
import { Editor } from "@tinymce/tinymce-react";

const ClientPoastCase = (props) => {
  let { setUserUpdate } = props;
  //設定步驟
  const [step, setStep] = useState(1);

  const renderStep1 = () => (
    <div>
      <div className="form-group border-2 rounded-lg p-4">
        <div className="flex">
          提案單位照片
          <div style={{ color: "red" }}>*</div>
          <label class="fileInput">
            <div class="ml-20">
              <buttn className="btn btn-accent">
                {organizeImage && "更換照片"}
                {!organizeImage && "請選擇圖檔"}
                <input
                  hidden
                  accept="image/*"
                  id="organizeImage"
                  name="organizeImage"
                  required
                  type="file"
                  onChange={handleorganizeImageUpload}
                />
              </buttn>
            </div>
          </label>
          <div className="ml-auto">
            {organizeImage && (
              <button className="btn btn-error" onClick={deletImage}>
                移除照片
              </button>
            )}
          </div>
        </div>
        {organizeImage && <img src={organizeImage} alt="Preview" />} <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              提案單位名稱<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form1.organizeName}
            type="text"
            className="input input-bordered w-full"
            required
            id="organizeName"
            name="organizeName"
            onChange={(e) => handleForm1Change("organizeName", e)}
          />
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              聯絡人姓名<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form1.personName}
            type="text"
            required
            className="input input-bordered w-full"
            id="personName"
            name="personName"
            onChange={(e) => handleForm1Change("personName", e)}
          />
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              身分證字號/統一編號<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form1.idNumber}
            type="text"
            required
            className="input input-bordered w-full"
            id="idNumber"
            name="idNumber"
            onChange={(e) => handleForm1Change("idNumber", e)}
          />
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              聯絡電話<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form1.phoneNumber}
            type="number"
            required
            className="input input-bordered w-full"
            id="phoneNumber"
            name="phoneNumber"
            onChange={(e) => handleForm1Change("phoneNumber", e)}
          />
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              E-mail<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <input
            value={form1.email}
            type="email"
            required
            className="input input-bordered w-full"
            id="email"
            name="email"
            onChange={(e) => handleForm1Change("email", e)}
          />
          <label className="label">
            <span className="label-text-alt">
              <div style={{ color: "gray" }}>
                請確實填寫，Email為平台聯絡您的主要方式
              </div>
            </span>
          </label>
        </div>
        <br />
        <div className="w-full max-w-">
          <label className="label">
            <span className="flex abel-text">
              自我介紹<div style={{ color: "red" }}>*</div>
            </span>
          </label>
          <textarea
            value={form1.introduction}
            type="text"
            required
            className="input input-bordered w-full"
            id="introduction"
            name="introduction"
            onChange={(e) => handleForm1Change("introduction", e)}
          />
          <label className="label">
            <span className="label-text-alt">
              <div style={{ color: "gray" }}>簡短介紹以便贊助人了解您</div>
            </span>
          </label>
        </div>
        <br />
        {message && (
          <div className="alert alert-warning" role="alert">
            {message}
          </div>
        )}
        <div className="flex">
          <button className="btn btn-accent ml-auto" onClick={handleNext}>
            下一步
          </button>
        </div>
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
            className="form-control"
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
            className="form-control"
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
              <span className="label-text">教育</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                value="醫療"
                checked={category.includes("醫療")}
                onChange={handleCategoryChange}
                className="checkbox"
              />
              <span className="label-text">醫療</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                value="環境"
                checked={category.includes("環境")}
                onChange={handleCategoryChange}
                className="checkbox"
              />
              <span className="label-text">環境</span>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="兒少"
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text">兒少</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  value="長者"
                  checked={category.includes("長者")}
                  onChange={handleCategoryChange}
                  className="checkbox"
                />
                <span className="label-text">長者</span>
              </label>
            </label>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                value="人本關懷"
                onChange={handleCategoryChange}
                className="checkbox"
              />
              <span className="label-text">人本關懷</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                value="動物保育"
                checked={category.includes("動物保育")}
                onChange={handleCategoryChange}
                className="checkbox"
              />
              <span className="label-text">動物保育</span>
            </label>

            <label className="label cursor-pointer">
              <input
                type="checkbox"
                value="翻轉人生"
                checked={category.includes("翻轉人生")}
                onChange={handleCategoryChange}
                className="checkbox"
              />
              <span className="label-text">翻轉人生</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                value="藝術人文"
                onChange={handleCategoryChange}
                className="checkbox"
              />
              <span className="label-text">藝術人文</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                value="地方創生"
                checked={category.includes("地方創生")}
                onChange={handleCategoryChange}
                className="checkbox"
              />
              <span className="label-text">地方創生</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                value="國際支援"
                checked={category.includes("國際支援")}
                onChange={handleCategoryChange}
                className="checkbox"
              />
              <span className="label-text">國際支援</span>
            </label>
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
            className="form-control"
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
            className="form-control"
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
            className="form-control"
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
      <p className="mt-4 ">
        當您在區塊鏈上發起專案時，請先閱讀並同意下述「區塊鏈群募平台提案合約」的所有內容。區塊鏈會在您撰寫完提案內容時，要求您務必詳閱合約內容後才可送出，本專案送出後，將由專人與您連絡。若您對本合約的內容有任何疑問，歡迎來信(客服信箱service@gmail.com)與我們聯絡。
      </p>
      <div className="divider"></div>

      <h1 className="mb-4" style={{ fontSize: "2rem", color: "orange" }}>
        區塊鏈群眾募資平台提案合約
      </h1>
      <p>
        提案人為辦理集資專案，需付費使用區塊鏈集資平台提供之網站空間，向第三人提出贊助邀約。若專案諮詢至已進行撰寫之程度，亦將另酌收費用。其雙方權利與義務等相關事宜如下述，提案人完成提案並勾選「同意提案合約」時，即表示已閱讀、暸解、並同意以下所有約定條款之內容。
        一、集資專案申請資格
        (一)提案人必須是具備完全行為能力的自然人，或合法登記的法人或團體。若提案者為未滿十八歲之自然人，應由其法定代理人閱讀、暸解、並同意區塊鏈群募平台提案合約
        (以下簡稱「本合約」)之所有約定內容，及其修改後之內容，始得開始使用或繼續使用本服務。
        (二)提案人應依本服務所訂之方式，完成註冊及認證，始能成為會員，並開始提案。註冊程序包括詳實填寫個人資料、提供註冊流程中所要求之相關文件或資料。
        (三)
        提案人應擔保其所提供的所有資料，均具正確、即時、合法性，且不得以第三人之名義申請集資專案；如提案人所提供的資料事後有變更，應立即更新並公告。如提案人未即時提供資料、未按指定方式提供資料、所提供之資料不正確或與事實不符，區塊鏈得不經事先通知，隨時拒絕、或暫停對該提案人提供全部或部分之服務。
        (四)提案人所提之專案，若受助人或贊助人為不特定公眾對象，提案人需在專案中主動揭露公益勸募字號。
        二、禁止集資事項 (一)禁止以資金、股份或有價證券作為給予贊助人之回饋。
        (二)禁止具博弈性質之競賽、抽獎，及永久的會員資格。
        (三)禁止鼓吹色情、暴力、具殺傷力之武器、組裝方式及組成零件、仇恨或歧視特定及不特定族群，及一切違法之內容。
        (四)禁止對身體產生生理傷害和依賴性之菸草製品、管制藥品及其用具。
        (五)禁止任何宣稱使用於診斷、治療、減輕、直接預防人類疾病、調節生育，或足以影響人類身體結構及機能之藥物，包含所有藥品之原料、製劑及達成其主要功能之儀器、器械、用具、物質、軟體、體外試劑及其相關物品，包含保健食品。
        (六)禁止政治獻金。 (七)禁止其他經平台判斷之不當內容。
        (八)禁止於度度客募資期間，於另一個平台，或其他任何通路、管道等，募資同一標的，若經平台發現，無須事先告知提案人，可直接移除專案。
        三、集資平台服務 (一)
        區塊鏈提供網路集資平台服務，供提案人自行刊載內容進行集資。專案集資期間，區塊鏈提供平台供贊助內容刊載、代收贊助款項，並記錄贊助者所選回饋項目與金額。
        (二)提案人應完整刊載之專案內容，包含：
        (1)專案說明影片(3分鐘以內較佳，1分50秒更完美) (2)集資金額目標和集資期間
        (3)專案介紹文案及照片，或相關平面設計│圖像化資訊
        (4)贊助金額級距設定及回饋項目 (三
        )dodoker上所刊載之物件、說明內容、影音檔案等所有相關資料，均係由提案人自行提供、上載、及發布，並由本服務系統刊載於網站上，提案者應擔保其內容之真實性、正確性、合法性、即時性等。dodoker就刊載內容之真實性、正確性、合法性、即時性等並無審查之義務，亦不負任何明示或默示之承諾或擔保。提案人所刊載之物件、說明內容、影音檔案等所有相關資料，如有違反法令、違背公序良俗、侵害第三人權益、或有違反本合約之虞之情形，dodoker得不經事先通知，直接加以移除、使之無法被存取或被閱讀、或採取其他限制性措施。
        (四)透過dodoker所進行之專案集資與回饋項目，應由提案人自行負責回饋之磋商及履行。dodoker認為必要時，得就提案人提供之資料、所刊載之物件、內容介紹、影音檔案等相關資料、以及與集資相關之事項說明等，要求提案人就其所涉及之疑義或爭議，即時提出說明及有關資料。
        (五)贊助人可於專案集資期間，要求退款或變更贊助項目，惟募資截止前48小時(不含周休二日及國定假日)，贊助人不得要求退款。如贊助人於專案結束後要求退款或變更贊助項目，將交由提案人自行衡量可否，並自行處理退款，概與dodoker無涉；如需將其款項轉贊助於其他專案，必須經由贊助人同意，並將其個資交由另一個專案的提案人處理。
        (六)若回饋執行進度延誤，或回饋內容有所變更，提案人應於第一時間內更新【進度分享】，將資訊公開至dodoker專案頁面。贊助人若因內容變更，而要求變更贊助或退款，提案人不得拒絕或扣除部分費用。
        (七)提案人所提所有專案，由提案人自行負責，與本平台無關，若所提專案與其他平台重複，或有其他經本平台評估，需停止募資之專案，本平台可以隨時下架處理。
        四、相關費用支付
        (一)刊載於dodoker的公益集資案到期後，只要達到或超過提案人設定的集資金額，dodoker將自動收取募得總金額8%費用為專案上架費，雙方若有其他約定，需在開始集資前另行議定之。
        (二)如集資案件到期後，未達到提案人設定之集資金額，dodoker
        將不收取任何上架費，並於收到金流服務公司撥款後之7至10個工作天(不包含例假日及國定假日)，將集資金額退還予該案之贊助人，惟每筆退款產生之金流手續費，由贊助人自行吸收。此筆費用為支付予金流服務公司之用，而非進入dodoker帳戶裡。
        (三)專案集資成功後，dodoker將於收到匯款資料後的7至10
        個工作天內(不包含例假及國定假日)，將款項以匯款方式匯予提案人指定之受款帳戶。
        五、內容授權與智慧財產權確保
        (一)提案人上載、傳送或提供物件資料或其他相關資料至dodoker時，視為提案人已授權dodoker得以利用、儲存及刊載該等資料，以供特定或不特定之使用者搜尋及瀏覽，並視為提案人已授權dodoker得經由平面或電子形式，重製、散布、公開播送、公開上映、改作、編輯、公開發行、公開發表、或公開傳輸該等資料。
        (二)提案人上載、傳送或提供物件資料或其他相關資料至dodoker時，應擔保其有上載、傳送或提供該等資料之權利，若該等資料涉有第三人之智慧財產權，提案人保證已取得合法使用之權利，並已取得於台灣地區(含台、澎、金、馬等外島地區)公開發表、公開播送及公開傳輸等權利。若因提案人提供之內容致使有相關之智慧財產權和法律問題時，提案人須自行負擔責任，概與dodoker無涉。
        六、使用期間專屬授權
        除dodoker書面同意者外，提案人不得提供第三人或其他群眾募資平台，進行相同或近似內容之展示。
        七、損害賠償違約金
        任何dodoker平台使用者如違反本合約中任何一條之條文，以致dodoker受損或提案人取得不當所得，應以dodoker
        所受損害(含律師費用)或提案人所受利益，兩者取其高，作為給付
        dodoker之損害賠償金。 八、其他
        (一)書面：本合約得以電子文件形式代替書面文件形式。
        (二)送達：本合約得以電子郵件為送達方式。
        (三)合約解釋、補充協議及疑義解釋：本合約條文如有未盡事宜，經雙方同意得以附件補充之，如有任何疑義應由雙方本善意互助互信之原則協商處理。
        (四)合意準據法與管轄：本合約以中華民國為準據法，並同意以台灣台北地方法院為第一審管轄法院。
        (五)本合約以電子文件形式行之，或勾選「同意提案合約」時，即視為已閱讀、暸解、並同意以上約定條款的所有內容。
      </p>
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
  //設定步驟1的單位圖片
  const [organizeImage, setorganizeImage] = useState(null);

  let { currentUser, setCurrentUser } = props;
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
  //step1處理提案單位照片
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

  const postCase = async (e) => {
    if (isChecked == true) {
      e.preventDefault();
      checkIfImage(form2.image, async (exists) => {
        if (exists) {
          setBtnLoading(true);
          try {
            const response = await OrganizeService.createOrganize(
              currentUser.user._id,
              organizeImage,
              form1.organizeName,
              form1.personName,
              form1.idNumber,
              form1.phoneNumber,
              form1.email,
              form1.introduction
            );
            const organizeId = response._id;
            try {
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
              console.log("caseResponse:", caseResponse);
              try {
                await OrganizeService.pushCase(organizeId, caseResponse._id);
                try {
                  UserService.addOrganize(currentUser.user._id, organizeId)
                    .then(() => {
                      UserService.getCurrentUser(currentUser.user._id)
                        .then((response) => {
                          localStorage.setItem(
                            "user",
                            JSON.stringify(response.data)
                          );
                          console.log("新獲取的用戶資訊：", response.data);
                          setCurrentUser(response.data);
                          alert("提案組織及提案已創建，請等待管理員審核");
                        })
                        .catch((error) => {
                          console.log("獲取新用戶資訊失敗", error);
                        });
                    })
                    .catch((error) => {
                      console.log("User新增organizeg失敗", error);
                    });
                } catch (error) {
                  console.log(error);
                }
              } catch (error) {
                console.log("推送提案進組織失敗", error);
              }
            } catch (error) {
              console.log("創建提案失敗", error);
            }
          } catch (error) {
            console.log(error);
            alert("無法上傳");
          } finally {
            setBtnLoading(false);
          }
        } else {
          alert("請提供有效網址");
          setForm2({ ...form2, image: "" });
        }
      });
    } else {
      alert("請閱讀完合約後勾選同意方框");
    }
  };

  const handleStep1Click = () => {
    setStep(1);
  };
  const handleStep2Click = () => {
    if (
      form1.organizeName == "" ||
      organizeImage == null ||
      form1.personName == "" ||
      form1.idNumber == "" ||
      form1.phoneNumber == "" ||
      form1.email == "" ||
      form1.introduction == ""
    ) {
      alert("請完成步驟1的表單");
      return;
    }
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
    <div style={{ padding: "3rem" }}>
      {/* 進圖條 */}
      <ul className="steps w-full mb-4">
        <li
          className="step step-info cursor-pointer"
          onClick={handleStep1Click}
        >
          個人資料填寫
        </li>
        <li
          className={
            step == 2
              ? "step step-info cursor-pointer"
              : step == 3
              ? "step step-info cursor-pointer"
              : "step cursor-pointer"
          }
          onClick={handleStep2Click}
        >
          提案內容
        </li>
        <li
          className={
            step == 3 ? "step step-info cursor-pointer" : "step cursor-pointer"
          }
          onClick={handleStep3Click}
        >
          提案合約
        </li>
      </ul>
      {renderCurrentStep()}
    </div>
  );
};

export default ClientPoastCase;
