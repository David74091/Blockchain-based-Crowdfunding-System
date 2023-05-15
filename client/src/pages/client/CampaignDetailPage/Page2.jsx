import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateService from "../../../services/update.service";

const Page2 = ({ state }) => {
  const [updateData, setUpdateData] = useState();
  const navigate = useNavigate();

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
  const handleClick = () => {
    navigate("/UpdatePage", { state: state });
    console.log("Navigation called successfully");
  };
  return (
    <div class="flex flex-col max-w-[1024px] mt-10">
      {updateData &&
        updateData
          .map((data) => {
            return (
              <div class="max-w-[1024px]">
                <div class="font-bold text-[2rem]">{data.title}</div>
                <div className="text-gray-400">
                  {new Date(data.date).toLocaleString("zh-TW", {
                    timeZone: "Asia/Taipei",
                  })}
                </div>
                <p
                  dangerouslySetInnerHTML={{ __html: data.detail }}
                  className="mt-2"
                ></p>
                <div className="divider"></div>
              </div>
            );
          })
          .reverse()}
    </div>
  );
};

export default Page2;
