import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MessageService from "../../services/message.service";
import AuthService from "../../services/auth.service";
import { useStateContext } from "../../context";

import { loveIcon } from "../../assets";
import { calculateBarPercentage, daysLeft } from "../../utils";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  //按鈕loading
  const [btnLoading, setBtnLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const remainingDays = daysLeft(state.deadline);

  const [reply, setReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(null);

  const handleReplyClick = (messageId) => {
    setShowReplyInput(showReplyInput === messageId ? null : messageId);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
    console.log(reply);
  };

  const handleReplyPost = async (messageId) => {
    try {
      await MessageService.postReply(messageId, reply);

      console.log("成功回覆");

      // 調用 getMessage 更新留言列表
      MessageService.getMessage(state._id)
        .then((response) => {
          setMessages(response.data);
          console.log("message here:", response.data);
          // 清空回覆輸入框
          setReply("");
          // 隱藏回覆輸入框
          setShowReplyInput(null);
        })
        .catch((error) => {
          console.log("抓取留言失敗 ", error);
        });
    } catch (err) {
      console.log("回覆失敗", err);
    }
  };

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  function timeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const secondsPast = (now - then) / 1000;

    if (secondsPast < 60) {
      return `${parseInt(secondsPast)} 秒前`;
    }
    if (secondsPast < 3600) {
      return `${parseInt(secondsPast / 60)} 分鐘前`;
    }
    if (secondsPast < 86400) {
      return `${parseInt(secondsPast / 3600)} 小時前`;
    }
    if (secondsPast < 2592000) {
      return `${parseInt(secondsPast / 86400)} 天前`;
    }
    return then.toLocaleDateString();
  }

  useEffect(() => {
    MessageService.getMessage(state._id)
      .then((response) => {
        setMessages(response.data);
        console.log("message here:", messages[0].reply[0].message);
      })
      .catch((error) => {
        console.log("抓取留言失敗 ", error);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);
  //從mongodb裡抓資料
  if (pageLoading) {
    return (
      <div className="w-full h-[720px] flex flex-col justify-center items-center">
        <progress className="progress progress-accent w-56 "></progress>
        <h1 className="mt-3">請稍等...</h1>
      </div>
    );
  }
  // const handleDonate = async () => {
  //   setIsLoading(true);

  //   await donate(state.pId, amount);

  //   navigate("/");
  //   setIsLoading(false);
  // };

  const handlePageClick = (number) => () => {
    setPageNumber(number);
    console.log(pageNumber);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageClick = async () => {
    setBtnLoading(true);
    try {
      await MessageService.postMessage(
        message,
        state._id,
        currentUser.user._id
      );

      console.log("成功留言");

      // 調用 getMessage 更新留言列表
      MessageService.getMessage(state._id)
        .then((response) => {
          setMessages(response.data);
          console.log("message here:", response.data);
        })
        .catch((error) => {
          console.log("抓取留言失敗 ", error);
        })
        .finally(() => {
          setBtnLoading(false);
        });
    } catch (error) {
      alert("留言失敗");
      console.log("留言失敗", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-row max-w-[1024px]">
        <div className="mt-10 w-3/4">
          <div className="flex flex-col">
            <div className="flex content-center items-center">
              <h1 style={{ fontSize: "2rem" }} className="text-mycolor ">
                {state.title}
              </h1>

              {state.category.map((categoies) => (
                <button className="badge badge-accent ml-2">{categoies}</button>
              ))}
            </div>
            <h1 className="mt-3">{state.description}</h1>
          </div>
          <div className="divider"></div>
          <div className="h-[250px] w-full flex md:flex-row flex-col mt-10">
            <div className="flex w-full">
              <div className="w-3/6 rounded-xl">
                <img
                  src={state.image}
                  alt="campaign"
                  className="object-cover rounded-xl h-full w-full"
                />
              </div>

              <div className="w-3/6 ml-10">
                <div className="flex flex-col ">
                  <div className="flex flex-row mb-3">
                    <div className="text-mycolor ">提案人：</div>
                    {state.organizeName}
                  </div>
                  <div className="flex flex-row">
                    目標：NT<div className="text-mycolor">$100,000</div>
                  </div>
                  <div className="flex flex-row mt-1">
                    已募：NT<div className="text-mycolor">$8,600</div>
                  </div>
                  <div className="relative w-full h-[15px] bg-gray-200 mt-2 flex-2 rounded-md">
                    <div
                      className="absolute h-full bg-accent rounded-md"
                      style={{
                        // width: `${calculateBarPercentage(
                        //   state.target,
                        //   state.amountCollected
                        // )}%`,
                        width: "8.6%",
                        maxWidth: "100%",
                      }}
                    ></div>
                  </div>
                  <div className="mt-2">截止日期：{state.deadline}</div>
                  <div className="mt-1">剩餘時間：{remainingDays}天</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-10">
            <div className="tabs w-full flex justify-center">
              <a
                className={`tab tab-lg tab-lifted${
                  pageNumber === 1 ? " tab-active" : ""
                }`}
                onClick={handlePageClick(1)}
              >
                專案內容
              </a>
              <a
                className={`tab tab-lg tab-lifted${
                  pageNumber === 2 ? " tab-active" : ""
                }`}
                onClick={handlePageClick(2)}
              >
                進度分享
              </a>
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

            {pageNumber == 1 && (
              <div className="shadow rounded">
                <div className="mt-[20px] flex">
                  <p
                    dangerouslySetInnerHTML={{ __html: state.details }}
                    className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify"
                  ></p>
                </div>
              </div>
            )}
            {pageNumber == 2 && (
              <div class="bg-white rounded-lg shadow p-8">
                <h1 class="text-2xl font-bold mb-4">
                  國防科技大學 K12 教育計畫
                </h1>
                <div class="flex items-center mb-8">
                  <div class="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={state.organizeImage}
                      alt="Avatar"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="text-gray-500 text-sm">
                    由{" "}
                    <span class="text-blue-500 font-medium">國防科技大學</span>{" "}
                    發起
                  </p>
                </div>
                <div class="mb-6">
                  <h2 class="text-lg font-bold mb-2">計畫簡介</h2>
                  <p class="text-gray-600 text-sm">
                    本計畫旨在提供高中職學生更多機會接觸科技、學習程式設計，培養具備專業技能的未來科技人才。
                  </p>
                </div>
                <div class="mb-6">
                  <h2 class="text-lg font-bold mb-2">募資目標</h2>
                  <p class="text-gray-600 text-sm">
                    新台幣{" "}
                    <span class="text-blue-500 font-medium">100,000</span>
                  </p>
                  <div class="relative pt-1">
                    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: "50%" }}
                        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      ></div>
                    </div>
                    <div class="flex mb-4 justify-between text-xs">
                      <div>
                        <span class="text-blue-500 font-medium">NT$ 0</span>
                      </div>
                      <div>
                        <span class="text-blue-500 font-medium">
                          NT$ 100,000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-gray-500 text-sm">剩餘時間：</p>
                    <p class="text-blue-500 font-bold text-sm">18 天</p>
                  </div>
                  <button class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium">
                    贊助專案
                  </button>
                </div>
              </div>
            )}
            {pageNumber == 3 && (
              <div className="h-[1280px]">
                <h4 className="font-epilogue font-semibold text-lg text-black uppercase mb-4">
                  {`問與答(${messages.length})`}
                </h4>
                <div className="w-full max-w-xl flex flex-col justify-center items-center mx-auto space-y-6">
                  <textarea
                    className="textarea textarea-bordered max-w-xl w-full resize-none border rounded-md p-2"
                    placeholder="請輸入問題"
                    value={message}
                    onChange={handleMessageChange}
                  ></textarea>
                  <button
                    className={`btn  btn-accent ${
                      btnLoading ? "loading" : ""
                    } self-end px-4 py-2 mt-2 ml-auto text-white bg-blue-600 rounded-md hover:bg-blue-700`}
                    onClick={handleMessageClick}
                  >
                    {!btnLoading ? "送出" : ""}
                  </button>
                  <h2 className="text-xl">留言列表：</h2>
                  {messages
                    .slice()
                    .reverse()
                    .map((message) => {
                      const messageTimeDifference = timeAgo(message.createAt);
                      const replyTimeDifference = message.reply[0]
                        ? timeAgo(message.reply[0].createAt)
                        : "";

                      return (
                        <div
                          key={message._id}
                          className="w-full md:w-[360px] my-4 relative"
                        >
                          <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                            <img
                              className="w-12 h-12 rounded-full"
                              src={message.userId.picture}
                              alt=""
                              width="48"
                              height="48"
                            />
                            <div className="w-full flex flex-col justify-between">
                              <div className="flex justify-between items-start">
                                <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                  {message.userId.username}
                                </p>
                                {!message.reply[0] &&
                                  currentUser.user._id ==
                                    state.proposer._id && (
                                    <button
                                      className="text-sm text-blue-500 dark:text-blue-300 hover:underline focus:outline-none"
                                      onClick={() =>
                                        handleReplyClick(message._id)
                                      }
                                    >
                                      回覆
                                    </button>
                                  )}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400">
                                {message.message}
                              </p>
                            </div>
                          </div>
                          <div className="static">
                            <p className="text-xs text-gray-500 dark:text-gray-300 ml-4">
                              {messageTimeDifference}
                            </p>
                            {showReplyInput === message._id && (
                              <div className="mt-2">
                                <textarea
                                  className="textarea textarea-bordered max-w-xl w-full resize-none border rounded-md p-2"
                                  placeholder="請輸入回覆"
                                  onChange={handleReplyChange}
                                  value={reply}
                                ></textarea>
                                <button
                                  className="btn btn-accent self-end px-4 py-2 mt-2 ml-auto text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                  onClick={() => handleReplyPost(message._id)}
                                >
                                  送出回覆
                                </button>
                              </div>
                            )}
                            {message.reply[0] && (
                              <div className="ml-8 relative">
                                <div className="absolute top-0  w-0.5 h-full bg-gray-300"></div>
                                <div className="">
                                  <div className="mt-4">
                                    <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                                      <img
                                        className="w-10 h-10 rounded-full"
                                        src={state.organizeImage}
                                        alt=""
                                        width="40"
                                        height="40"
                                      />
                                      <div className="w-full flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                          <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                            {state.organizeName}
                                          </p>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                          {message.reply[0].message}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-300 ml-4">
                                      {replyTimeDifference}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/4 flex flex-col mt-10 ml-8">
          <div className="border-2 rounded">
            <div className="flex flex-col items-center mt-4 mb-2">
              <div
                style={{ fontSize: "1.25rem" }}
                className="font-semibold text-mycolor"
              >
                提案人
              </div>
              <div className="m-2 rounded">
                <img className="rounded " src={state.organizeImage} />
              </div>
              <div>{state.organizeName}</div>
            </div>
          </div>
          <br />
          <div className="border-2 rounded">
            <div className="flex flex-col items-center gap-3">
              <div className="mt-3 font-bold text-[1.5rem]">NT $100</div>
              <button className="px-5 btn btn-primary text-[1.1rem]">
                捐 款
              </button>
              <div className="flex gap-1 mb-3">
                <img src={loveIcon} />
                0人捐款
              </div>
            </div>
          </div>
          <br />
          <div className="border-2 rounded">
            <div className="flex flex-col items-center gap-3">
              <div className="mt-3 font-bold text-[1.5rem]">NT $500</div>
              <button className="px-5 btn btn-primary text-[1.1rem]">
                捐 款
              </button>
              <div className="flex gap-1 mb-3">
                <img src={loveIcon} />
                0人捐款
              </div>
            </div>
          </div>
          <br />
          <div className="border-2 rounded">
            <div className="flex flex-col items-center gap-3">
              <div className="mt-3 font-bold text-[1.5rem]">NT $1000</div>
              <button className="px-5 btn btn-primary text-[1.1rem]">
                捐 款
              </button>
              <div className="flex gap-1 mb-3">
                <img src={loveIcon} />
                0人捐款
              </div>
            </div>
          </div>
          <br />
          <div className="border-2 rounded">
            <div className="flex flex-col items-center gap-3">
              <div className="mt-3 font-bold text-[1.5rem]">NT $5000</div>
              <button className="px-5 btn btn-primary text-[1.1rem]">
                捐 款
              </button>
              <div className="flex gap-1 mb-3">
                <img src={loveIcon} />
                0人捐款
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
