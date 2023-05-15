import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
const Page1 = lazy(() => import("./CampaignDetailPage/Page1"));
const Page2 = lazy(() => import("./CampaignDetailPage/Page2"));
const Page3 = lazy(() => import("./CampaignDetailPage/Page3"));
const Page4 = lazy(() => import("./CampaignDetailPage/Page4"));
import AuthService from "../../services/auth.service";
import CaseService from "../../services/case.service";
import DonationService from "../../services/donation.service";

import { loveIcon, arrowBack, withdraw, form } from "../../assets";
import { calculateBarPercentage, daysLeft } from "../../utils";

import { PageLoading, DonationAlert, CustomAlert } from "../../components";

const CampaignDetails = ({
  setInCampaignPage,
  triggerScroll,
  setTriggerScroll,
  admin,
}) => {
  const buttonRef = useRef(null);
  const scrollRef = useRef(null);

  const [hasLoaded, setHasLoaded] = useState(false);

  const { state } = useLocation();

  const navigate = useNavigate();

  // const { donate, getDonations, contract, address } = useStateContext();
  const [pageLoading, setPageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [donations, setDonations] = useState(null);
  const [showDonationAlert, setShowDonationAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [donationAlertCallback, setDonationAlertCallback] = useState(null);
  const [alertAmount, setAlertAmount] = useState();
  //按鈕loading

  function useMultiState(initialState, callback) {
    const [state1, setState1] = useState(initialState);

    const updateState1 = (key, value) => {
      setState1((prevState) => {
        const newState = { ...prevState, [key]: value };
        if (callback) {
          callback(newState);
        }
        return newState;
      });
    };

    return [state1, updateState1];
  }

  const [btnLoading, setBtnLoading] = useMultiState({
    message: false,
    reply: false,
    100: false,
    500: false,
    1000: false,
    5000: false,
  });

  //處理捐款按鈕點擊事件
  const handleDonation = async (amount) => {
    if (donations.totalAmount >= state.target) {
      alert("已超過募款金額");
      return;
    }
    setAlertAmount(amount);
    setShowDonationAlert(true);
    // 將捐款邏輯移到單獨的函數中
    const proceedDonation = async () => {
      setBtnLoading({ [amount]: true });
      setShowDonationAlert(false);
      try {
        await DonationService.pushDonation(
          state._id,
          currentUser.user._id,
          amount
        );
        setShowAlert(true);
      } catch (error) {
        console.log("捐款失敗", error);
      } finally {
        setBtnLoading({ [amount]: false });
        setTimeout(() => {
          setShowAlert(false);
          window.location.reload(); // Hide the custom alert after a delay
        }, 1500);
      }
    };

    // 傳遞proceedDonation作為回調函數
    setDonationAlertCallback(() => proceedDonation);
  };

  //處理提案人頭像點擊事件
  const handlesOrganizClick = () => {
    navigate("/organizeInfo");
  };

  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const [completeDonation, setCompleteDonation] = useState(false);

  const remainingDays = daysLeft(state.deadline);

  useEffect(() => {
    setInCampaignPage(false);
    const fetchDonations = async () => {
      try {
        setPageLoading(true);
        const data = await CaseService.getAllDonations(state._id);
        setDonations(data.data);
      } catch (err) {
        console.log("campaign獲取捐款名單失敗", err);
      } finally {
        setPageLoading(false);
        setHasLoaded(true); // Set hasLoaded to true when fetchDonations is done
      }
    };

    fetchDonations();
  }, []);
  console.log("triggerScroll", triggerScroll);

  useEffect(() => {
    if (
      hasLoaded &&
      !pageLoading &&
      buttonRef.current &&
      scrollRef.current &&
      triggerScroll
    ) {
      requestAnimationFrame(() => {
        buttonRef.current.click();
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
        setTriggerScroll(false); // Reset the triggerScroll state
      });
    }
  }, [hasLoaded, pageLoading, buttonRef, scrollRef, triggerScroll]);

  //確認募款金額是否已經超過目標金額
  useEffect(() => {
    if (donations?.totalAmount >= state.target) {
      setCompleteDonation(true);
    }
  }, [donations]);

  //從mongodb裡抓資料
  if (pageLoading) {
    return <PageLoading />;
  }

  const handlePageClick = (number) => () => {
    setPageNumber(number);
    console.log(pageNumber);
  };

  const handleWithdrawClick = () => {
    window.open(
      `https://mumbai.polygonscan.com/tx/0x48af25aa9fcea2bb4dd2dabe22359f0951fc6149b72cdf5678fdca6a80878eb7`
    );
  };
  const handleFormClick = () => {
    window.open(`https://mumbai.polygonscan.com/tx/${state.hash}`);
  };

  console.log("state", state);

  return (
    <div className="relative flex justify-center opacity-0 transition-opacity duration-500 animate-fade-in-forwards">
      {showAlert && <CustomAlert message="捐款成功" type="sucess" />}
      {showDonationAlert && (
        <DonationAlert
          onClose={() => setShowDonationAlert(false)}
          onConfirm={donationAlertCallback}
          amount={alertAmount}
        />
      )}

      <div className="flex flex-row w-[1080px]">
        <div className="mt-5 w-4/6">
          <div className="flex flex-col">
            <div className="flex content-center items-center">
              {admin && (
                <Link to="/admincheckcase">
                  <img className="absolute top-5 left-10" src={arrowBack} />
                </Link>
              )}
              <h1 className="text-mycolor text-[2.5rem] font-medium">
                {state.title}
              </h1>

              {[...new Set(state.category)].map((category) => (
                <button className="badge badge-accent ml-2">{category}</button>
              ))}
            </div>
            <div className="">{state.description}</div>
          </div>
          <div className="divider"></div>
          <div className="h-[450px] w-full flex flex-col mt-10">
            <div className="flex w-full">
              <div className="w-full h-full rounded-xl" ref={scrollRef}>
                <img
                  src={state.image}
                  alt="campaign"
                  className="object-cover rounded-xl h-full w-full"
                />
              </div>

              {/* <div className="w-3/6 ml-10">
                <div className="flex flex-col ">
                  <div className="flex flex-row mb-3">
                    <div className="text-mycolor ">提案人：</div>
                    {state.organize.organizeName}
                  </div>
                  <div className="flex flex-row">
                    目標：NT
                    <div className="text-mycolor">
                      ${new Intl.NumberFormat().format(state.target)}
                    </div>
                  </div>
                  <div className="flex flex-row mt-1">
                    已募：NT
                    {donations && donations.totalAmount && (
                      <div className="text-mycolor">
                        ${new Intl.NumberFormat().format(donations.totalAmount)}
                      </div>
                    )}
                  </div>

                  <div className="relative w-full h-[15px] bg-gray-200 mt-2 flex-2 rounded-md">
                    <div
                      className="absolute h-full bg-[#65C3C8] rounded-md"
                      style={
                        donations && {
                          width: `${calculateBarPercentage(
                            state.target,
                            donations.totalAmount
                          )}%`,
                          maxWidth: "100%",
                        }
                      }
                    ></div>
                  </div>
                  <div className="mt-2">截止日期：{state.deadline}</div>
                  <div className="mt-1">剩餘時間：{remainingDays}天</div>
                </div>
              </div> */}
            </div>
            {state.organize.organizeImage && (
              <div
                onClick={handlesOrganizClick}
                className="flex flex-row items-center mt-3 mb-2 cursor-pointer"
              >
                <div className="m-2 rounded-full h-[40px] w-[40px]">
                  <img
                    className="rounded-full object-contain h-[40px] w-[40px]"
                    src={state.organize.organizeImage}
                  />
                </div>
                <div className="text-[1.25rem] font-medium">
                  {state.organize.organizeName}
                </div>

                <div className=" text-mycolor ml-2 text-[1.25rem]">提案</div>
              </div>
            )}
          </div>
          <div className="divider mt-20"></div>

          {/* //下半部分 */}

          <div className="flex flex-col mt-6">
            <div className="tabs w-full flex justify-center ">
              <a
                className={`tab tab-lg tab-lifted${
                  pageNumber === 1 ? " tab-active" : ""
                }`}
                onClick={handlePageClick(1)}
              >
                專案內容
              </a>
              <az
                className={`tab tab-lg tab-lifted${
                  pageNumber === 2 ? " tab-active" : ""
                }`}
                onClick={handlePageClick(2)}
                ref={buttonRef}
              >
                進度分享
              </az>
              <a
                className={`tab tab-lg tab-lifted${
                  pageNumber === 3 ? " tab-active" : ""
                }`}
                onClick={handlePageClick(3)}
              >
                問與答
              </a>
              <a
                className={`tab tab-lg tab-lifted${
                  pageNumber === 4 ? " tab-active" : ""
                }`}
                onClick={handlePageClick(4)}
              >
                捐款名單
              </a>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {pageNumber === 1 && <Page1 state={state} />}
              {pageNumber === 2 && <Page2 state={state} />}
              {pageNumber === 3 && (
                <Page3 state={state} currentUser={currentUser} />
              )}
              {pageNumber === 4 && (
                <Page4 state={state} currentUser={currentUser} />
              )}
            </Suspense>
          </div>
        </div>
        {/* 右半邊 */}

        <div className="w-2/6 flex flex-col mt-[228px] ml-8 rounded-xl shadow-xl max-h-[1200px]">
          <div className="mx-4 mt-[2rem]">
            <div className="flex flex-col ">
              <div className="flex flex-row">
                <div className="flex">
                  <div className="mt-2 font-light text-gray-500 mr-1">已募</div>
                  {donations && donations.totalAmount && (
                    <div className="text-mycolor text-[1.5rem] font-bold">
                      ${new Intl.NumberFormat().format(donations.totalAmount)}
                    </div>
                  )}
                </div>
                <div className="flex ">
                  <div className="mt-2 ml-1 font-light text-gray- mr-1">
                    目標
                  </div>

                  <div className="text-mycolor mt-2 text-gray-500	">
                    ${new Intl.NumberFormat().format(state.target)}
                  </div>
                  <div className="mt-2 ml-1 font-light text-gray-500"> NT</div>
                </div>
              </div>

              <div className="relative w-full h-[5px] bg-gray-200 mt-3 flex-2 rounded-md">
                <div
                  className="absolute h-full bg-[#65C3C8] rounded-md"
                  style={
                    donations && {
                      width: `${calculateBarPercentage(
                        state.target,
                        donations.totalAmount
                      )}%`,
                      maxWidth: "100%",
                    }
                  }
                ></div>
              </div>
              <div className="flex justify-between mt-3 text-[0.75rem] text-gray-500">
                <div>{donations && donations.donorsByTime.length} 筆捐款</div>
                <div>{state.deadline} 截止</div>
              </div>

              <div className="divider"></div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="">
                <div className="flex flex-col items-center gap-3">
                  <div className="mt-3 font-bold text-[1.5rem]">NT $100</div>
                  <button
                    className={`px-5 btn btn-accent text-[1.1rem] ${
                      btnLoading[100] ? "loading" : ""
                    }`}
                    onClick={() => handleDonation(100)}
                    disabled={completeDonation}
                  >
                    {completeDonation ? "募款結束" : "捐款"}
                  </button>
                  <div className="flex gap-1 mb-3 text-[0.75rem] text-gray-500">
                    {donations && donations.donorsByAmount && (
                      <>{donations.donorsByAmount[100].length} 人捐款</>
                    )}
                  </div>
                </div>
                <div className="divider"></div>
              </div>

              <div className="">
                <div className="flex flex-col items-center gap-3">
                  <div className="mt-3 font-bold text-[1.5rem]">NT $500</div>
                  <button
                    className={`px-5 btn btn-accent text-[1.1rem] ${
                      btnLoading[500] ? "loading" : ""
                    }`}
                    onClick={() => handleDonation(500)}
                    disabled={completeDonation}
                  >
                    {completeDonation ? "募款結束" : "捐款"}
                  </button>
                  <div className="flex flex-row gap-1 mb-3 text-[0.75rem] text-gray-500">
                    {donations && donations.donorsByAmount && (
                      <>{donations.donorsByAmount[500].length} 人捐款</>
                    )}
                  </div>
                </div>
                <div className="divider"></div>
              </div>

              <div className="">
                <div className="flex flex-col items-center gap-3">
                  <div className="mt-3 font-bold text-[1.5rem]">NT $1000</div>
                  <button
                    className={`px-5 btn btn-accent text-[1.1rem] ${
                      btnLoading[1000] ? "loading" : ""
                    }`}
                    onClick={() => handleDonation(1000)}
                    disabled={completeDonation}
                  >
                    {completeDonation ? "募款結束" : "捐款"}
                  </button>
                  <div className="flex flex-row gap-1 mb-3 text-[0.75rem] text-gray-500">
                    {donations && donations.donorsByAmount && (
                      <>{donations.donorsByAmount[1000].length} 人捐款</>
                    )}
                  </div>
                </div>
                <div className="divider"></div>
              </div>

              <div className="mb-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="mt-3 font-bold text-[1.5rem]">NT $5000</div>
                  <button
                    className={`px-5 btn btn-accent text-[1.1rem] ${
                      btnLoading[5000] ? "loading" : ""
                    }`}
                    onClick={() => handleDonation(5000)}
                    disabled={completeDonation}
                  >
                    {completeDonation ? "募款結束" : "捐款"}
                  </button>
                  <div className="flex gap-1 mb-3 text-[0.75rem] text-gray-500">
                    {donations && donations.donorsByAmount && (
                      <>{donations.donorsByAmount[5000].length} 人捐款</>
                    )}
                  </div>
                  <div className="divider"></div>
                  <div className="flex flex-col gap-3">
                    <div className="font-bold text-[1.25rem] mb-2">
                      區塊鏈紀錄專區
                    </div>
                    <div>
                      <button class="btn btn-info" onClick={handleFormClick}>
                        <img src={form} className="h-[30px] mr-1" />
                        發起紀錄
                      </button>
                    </div>
                    <div>
                      <button
                        class="btn btn-info "
                        onClick={handleWithdrawClick}
                      >
                        <img src={withdraw} className="h-[30px] mb-2 mr-1" />
                        提領紀錄
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <br />
          <div className="border-2 rounded">
            <div className="flex flex-col items-center gap-3">
              <div className="mt-3 font-bold text-[1.5rem]">NT $100</div>
              <button
                className={`px-5 btn btn-primary text-[1.1rem] ${
                  btnLoading[100] ? "loading" : ""
                }`}
                onClick={() => handleDonation(100)}
                disabled={completeDonation}
              >
                {completeDonation ? "募款結束" : "捐款"}
              </button>
              <div className="flex gap-1 mb-3">
                {donations && donations.donorsByAmount && (
                  <>
                    <img src={loveIcon} />
                    {donations.donorsByAmount[100].length}人捐款
                  </>
                )}
              </div>
            </div>
          </div>
          <br />
          <div className="border-2 rounded">
            <div className="flex flex-col items-center gap-3">
              <div className="mt-3 font-bold text-[1.5rem]">NT $500</div>
              <button
                className={`px-5 btn btn-primary text-[1.1rem] ${
                  btnLoading[500] ? "loading" : ""
                }`}
                onClick={() => handleDonation(500)}
                disabled={completeDonation}
              >
                {completeDonation ? "募款結束" : "捐款"}
              </button>
              <div className="flex gap-1 mb-3">
                {donations && donations.donorsByAmount && (
                  <>
                    <img src={loveIcon} />
                    {donations.donorsByAmount[500].length}人捐款
                  </>
                )}
              </div>
            </div>
          </div>
          <br />
          <div className="border-2 rounded">
            <div className="flex flex-col items-center gap-3">
              <div className="mt-3 font-bold text-[1.5rem]">NT $1000</div>
              <button
                className={`px-5 btn btn-primary text-[1.1rem] ${
                  btnLoading[1000] ? "loading" : ""
                }`}
                onClick={() => handleDonation(1000)}
                disabled={completeDonation}
              >
                {completeDonation ? "募款結束" : "捐款"}
              </button>
              <div className="flex gap-1 mb-3">
                {donations && donations.donorsByAmount && (
                  <>
                    <img src={loveIcon} />
                    {donations.donorsByAmount[1000].length}人捐款
                  </>
                )}
              </div>
            </div>
          </div>
          <br />
          <div className="border-2 rounded">
            <div className="flex flex-col items-center gap-3">
              <div className="mt-3 font-bold text-[1.5rem]">NT $5000</div>
              <button
                className={`px-5 btn btn-primary text-[1.1rem] ${
                  btnLoading[5000] ? "loading" : ""
                }`}
                onClick={() => handleDonation(5000)}
                disabled={completeDonation}
              >
                {completeDonation ? "募款結束" : "捐款"}
              </button>
              <div className="flex gap-1 mb-3">
                {donations && donations.donorsByAmount && (
                  <>
                    <img src={loveIcon} />
                    {donations.donorsByAmount[5000].length}人捐款
                  </>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
