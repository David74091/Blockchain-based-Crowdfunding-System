import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import CaseService from "../../services/case.service";
import MessageService from "../../services/message.service";
import AuthService from "../../services/auth.service";
import { useStateContext } from "../../context";
import {
  CountBox,
  CustomButton,
  Loader,
  StripeBuyButton,
} from "../../components";
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
  const [organizeData, setOrganizeData] = useState(null);

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
    if (contract) fetchDonators();
    console.log("Using effect.");
    // let _id;
    // if (currentUser) {
    //   _id = currentUser.user._id;
    // } else {
    //   _id = "";
    // }
    CaseService.getCaseByName(state.title)
      .then((data) => {
        // console.log("這是mongodb的資料", data.data);
        setOrganizeData(data.data);
        console.log("資料在此", state.proposer._id, currentUser.user._id);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log("看來抓取mongodb資料失敗了", err);
      });
  }, [contract, address]);

  useEffect(() => {
    MessageService.getMessage(state._id)
      .then((response) => {
        setMessages(response.data);
        console.log("message here:", messages[0].reply[0].message);
      })
      .catch((error) => {
        console.log("抓取留言失敗 ", error);
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
    <div>
      <div className="flex justify-center">
        <h1 style={{ fontSize: "2rem" }}>{state.title}</h1>
      </div>
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
              提案單位
            </h4>
            <StripeBuyButton />

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={organizeData.organizeImage}
                  alt="user"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
              </div>
              <h1>{organizeData.organizeName}</h1>
              <div>
                {organizeData.introduction}
                {/* <h4 className="font-epilogue font-semibold text-[14px] text-black break-all">
                  {state.owner}
                </h4> */}
              </div>
            </div>
          </div>
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
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
                提案介紹
              </h4>
              <div className="mt-[20px] flex">
                <p
                  dangerouslySetInnerHTML={{ __html: state.details }}
                  className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify"
                ></p>
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
                                currentUser.user._id == state.proposer._id && (
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
    </div>
  );
};

export default CampaignDetails;
