import React, { useState, useEffect } from "react";
import { useStateContext } from "../../context";

const CashFlowDashBoard = () => {
  const { getCampaigns } = useStateContext();
  const [blockChainData, setBlockChainData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCampaigns();
        setBlockChainData(data);
        console.log("區塊鏈資訊：", data);
      } catch (error) {
        console.log("取得區塊鏈上資訊失敗!", error);
      }
    };
    fetchData();
  }, []);

  return <div></div>;
};

export default CashFlowDashBoard;
