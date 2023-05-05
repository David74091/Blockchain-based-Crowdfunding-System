import React, { useState, useEffect } from "react";
import MessageService from "../../../services/message.service";
import { PageLoading } from "../../../components";

const Page3 = ({ state, currentUser }) => {
  const [message, setMessage] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showReplyInput, setShowReplyInput] = useState(null);
  const [reply, setReply] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
    console.log(reply);
  };
  const handleReplyClick = (messageId) => {
    setShowReplyInput(showReplyInput === messageId ? null : messageId);
  };

  const handleMessageClick = async () => {
    setBtnLoading("message", true);
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
          setBtnLoading("message", false);
        });
    } catch (error) {
      alert("留言失敗");
      console.log("留言失敗", error);
    }
  };

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
  });

  const handleReplyPost = async (messageId) => {
    setBtnLoading("reply", true);
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
    } finally {
      setBtnLoading("reply", false);
    }
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
    const fetchMessage = async () => {
      try {
        console.log("Page3 start meeages");
        setPageLoading(true);
        const response = await MessageService.getMessage(state._id);
        setMessages(response.data);
      } catch (err) {
        console.log("Page3 fetch meeages faile", err);
      } finally {
        console.log("Inside finally block");
        setPageLoading(false);
      }
    };
    fetchMessage();
  }, []);

  if (pageLoading) {
    return <PageLoading />;
  }
  return (
    <div className="flex flex-col items-start h-[1280px] max-w-[1024px] mt-10">
      <div className="w-full max-w-xl flex flex-col justify-center items-start space-y-6">
        <textarea
          className="textarea textarea-bordered max-w-xl w-full resize-none border rounded-md p-2"
          placeholder="留下問題或鼓勵"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        <button
          className={`btn btn-primary ${
            btnLoading.message ? "loading" : ""
          } self-end px-4 py-2 mt-3 ml-auto hover:text-[#291334] focus:text-[#291334]`}
          onClick={handleMessageClick}
        >
          {!btnLoading.message ? "送出" : ""}
        </button>
        <h2 className="text-[1.25rem] font-bold">
          {`留言列表(${messages.length})`}
        </h2>
        {messages
          .slice()
          .reverse()
          .map((message) => {
            const messageTimeDifference = timeAgo(message.createAt);
            const replyTimeDifference = message.reply[0]
              ? timeAgo(message.reply[0].createAt)
              : "";

            return (
              <div key={message._id} className="w-full  mt-5 relative ">
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={message.userId.picture} />
                    </div>
                  </div>
                  <div className="chat-header">
                    {message.userId.username}
                    <time className="text-xs opacity-50 ml-2">
                      {messageTimeDifference}
                    </time>
                  </div>
                  <div className="chat-bubble chat-bubble-secondary">
                    {message.message}
                  </div>
                  {!message.reply[0] &&
                    currentUser?.user?._id == state.proposer._id && (
                      <button
                        className="chat-footer opacity-50"
                        onClick={() => handleReplyClick(message._id)}
                      >
                        回覆
                      </button>
                    )}
                </div>
                {/* <div className="flex items-start space-x-4">
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
                        currentUser?.user?._id == state.proposer._id && (
                          <button
                            className="text-sm text-blue-500 dark:text-blue-300 hover:underline focus:outline-none"
                            onClick={() => handleReplyClick(message._id)}
                          >
                            回覆
                          </button>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 text-gray-300">
                      ● {messageTimeDifference}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {message.message}
                    </p>
                  </div>
                </div> */}
                <div className="static">
                  {showReplyInput === message._id && (
                    <div className="mt-2">
                      <textarea
                        className="textarea textarea-bordered max-w-xl w-full resize-none border rounded-md p-2"
                        placeholder="請輸入回覆"
                        onChange={handleReplyChange}
                        value={reply}
                      ></textarea>
                      <button
                        className={`btn btn-primary ${
                          btnLoading.reply ? "loading" : ""
                        } self-end px-4 py-2 mt-2 ml-[470px]`}
                        onClick={() => handleReplyPost(message._id)}
                      >
                        {!btnLoading.reply ? "送出回覆" : ""}
                      </button>
                    </div>
                  )}
                  {message.reply[0] && (
                    <div className="chat chat-end">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img src={state.organize.organizeImage} />
                        </div>
                      </div>
                      <div className="chat-header">
                        {state.organize.organizeName}
                        <time className="text-xs opacity-50 ml-2">
                          {messageTimeDifference}
                        </time>
                      </div>
                      <div className="chat-bubble chat-bubble-error">
                        {message.reply[0].message}
                      </div>
                    </div>
                    // <div className="ml-8 relative">
                    //   <div className="absolute top-0 w-0.5 h-full bg-gray-300"></div>
                    //   <div className="">
                    //     <div className="mt-4">
                    //       <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                    //         <img
                    //           className="w-10 h-10 rounded-full"
                    //           src={state.organize.organizeImage}
                    //           alt=""
                    //           width="40"
                    //           height="40"
                    //         />
                    //         <div className="w-full flex flex-col justify-between">
                    //           <div className="flex justify-between items-start">
                    //             <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    //            {state.organize.organizeImage}
                    //             </p>
                    //           </div>
                    //           <p className="text-gray-600 dark:text-gray-400">
                    //             {message.reply[0].message}
                    //           </p>
                    //         </div>
                    //       </div>
                    //       <p className="text-xs text-gray-500 dark:text-gray-300 ml-4">
                    //         {replyTimeDifference}
                    //       </p>
                    //     </div>
                    //   </div>
                    // </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Page3;
