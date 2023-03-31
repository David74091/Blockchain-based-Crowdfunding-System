import React, { useState } from "react";
import { useStateContext } from "../context";
import { calculateBarPercentage, daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
  pId,
}) => {
  const { donate, getDonations, contract, address } = useStateContext();
  const remainingDays = daysLeft(deadline);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let checkEnabled = true;
  if (remainingDays <= 0) {
    checkEnabled = false;
  }
  const handleDonate = async () => {
    setIsLoading(true);

    await donate(pId, amount);

    navigate("/");
    setIsLoading(false);
  };
  return (
    // <div className="container pm-50">
    //   <div className="">
    //     <img src={image} alt="fund" className="w-50" />
    //   </div>
    //   <div className="card " style={{ width: "50rem" }}>
    //     <div className="card-body" align="center">
    //       <h5 className="card-title">{title}</h5>
    //       <p className="card-text">{description}</p>
    //       <div>
    //         <button className="btn btn-primary">目標金額: {target}</button>
    //       </div>
    //       <div className="progress " style={{ marginTop: "20px" }}>
    //         <div
    //           className="progress-bar progress-bar-striped bg-success"
    //           role="progressbar"
    //           style={{
    //             width: `${calculateBarPercentage(target, amountCollected)}%`,
    //           }}
    //           aria-valuenow="10"
    //           aria-valuemin="0"
    //           aria-valuemax="100"
    //         >{`已募款金額：${amountCollected}/${target}`}</div>
    //       </div>
    //       <p className="card-text">創建者錢包:{owner}</p>
    //       <input
    //         type="number"
    //         placeholder="ETH 0.1"
    //         step="0.01"
    //         value={amount}
    //         onChange={(e) => setAmount(e.target.value)}
    //       />
    //       <button className="btn btn-danger" onClick={handleDonate}>
    //         立即捐款
    //       </button>
    //     </div>
    //   </div>
    //   <br />
    //   <br />
    //   <br />
    //   <br />
    //   <br />
    //   <br />
    // </div>
    <div>
      {checkEnabled && (
        //沒有過期的提案
        <div
          className="card w-96 bg-base-100 shadow-xl cursor-pointer"
          onClick={handleClick}
        >
          <figure>
            <img
              className="w-full h-[240px] object-cover"
              src={image}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-[24px] truncate">{title}</h1>
            <h2 className="text-[16px] truncate">{description}</h2>
            <p className="text-[8px] truncate w-[150px]">提案者 {owner}</p>
            <div>
              <p className="mt-[10px] text-[8px]">需求金額: {target} ETH</p>
              <p className=" text-[8px]">已募金額: {amountCollected} ETH</p>
              <progress
                className="progress progress-info w-100 mt-[5px]"
                value={`${calculateBarPercentage(target, amountCollected)}`}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-row">
              <p className="text-[8px] text-[#808191]">
                倒數 {remainingDays} 天
              </p>
              <p className="text-[8px] text-[#808191] text-right">
                {`${calculateBarPercentage(target, amountCollected)}%`}
              </p>
            </div>
          </div>
        </div>
      )}

      {!checkEnabled && (
        //已經過期的提案
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              className="w-full h-[240px] object-cover opacity-30"
              src={image}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="flex relative">
              <h1 className="card-title text-[24px] opacity-40 truncate">
                {title}
              </h1>
            </div>
            <span className="indicator-item badge absolute top-0 right-0 text-[20px] h-[30px]">
              提案已到期
            </span>
            <h2 className="text-[16px] opacity-40 truncate">{description}</h2>
            <p className="text-[8px] truncate w-[150px] opacity-40">
              提案者 {owner}
            </p>
            <div className="opacity-40">
              <p className="mt-[10px] text-[8px]">需求金額: {target} ETH</p>
              <p className=" text-[8px]">已募金額: {amountCollected} ETH</p>
              <progress
                className="progress progress-info w-100 mt-[5px]"
                value={`${calculateBarPercentage(target, amountCollected)}`}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-row">
              <p className="text-[8px] opacity-40">已到期</p>
              <p className="text-[8px] text-right text-[#808191] opacity-40">
                {`${calculateBarPercentage(target, amountCollected)}%`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundCard;
