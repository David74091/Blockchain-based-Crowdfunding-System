import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DisplayCases, PageLoading } from "../../components";
import { notion } from "../../assets";

const Home = (props) => {
  let {
    setOnHome,
    onHome,
    currentUser,
    setCurrentUser,
    caseData,
    Loading,
    setInCampaignPage,
  } = props;
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    setInCampaignPage(false);
    const fadeInElement = document.querySelector(".transition-opacity");
    setTimeout(() => {
      fadeInElement.classList.add("opacity-100");
    }, 500); // 从 100 改为 500
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center h-1280px w-full mt-40 opacity-0 transition-opacity duration-500 animate-fade-in-forwards">
        <div className="h-2/3 flex flex-col items-center">
          <button className="btn btn-secondary">
            <img src={notion} />
          </button>
          <br />
          <br />
          <p className="text-5xl font-bold">現在就在區塊鏈上</p>
          <br />
          <br />
          <p className="text-5xl font-bold">捐款或募款</p>
          <br />
          <br />

          <p className="text-[1rem] font-light">享受金流的完全透明</p>
        </div>
        <div className="h-1/3 mt-10">
          <Link
            to="/register"
            class="btn btn-secondary text-xl w-[150px] h-[70px]"
          >
            立即開始
          </Link>
        </div>
      </div>
      {/* The following code will be animated when scrolled */}
      <div
        className={`divider mt-80 ${
          isScrolled ? "animate-fade-in-from-left" : "opacity-0 -translate-x-16"
        }`}
      ></div>
      <div className="mt-20">
        <div
          className={`ml-24 ${
            isScrolled
              ? "animate-fade-in-from-left"
              : "opacity-0 -translate-x-16"
          }`}
        >
          <p className="font-light text-[1rem]">怎麼運作？</p>
        </div>
        <div
          className={`ml-24 mt-4 ${
            isScrolled
              ? "animate-fade-in-from-left"
              : "opacity-0 -translate-x-16"
          }`}
        >
          <p className="text-3xl font-bold">在平台上捐款</p>
          <br />
          <p className="text-3xl font-bold">迅速驗證至區塊鏈</p>
        </div>
        <ul
          className={`steps w-[600px] mt-16 ${
            isScrolled
              ? "animate-fade-in-from-left"
              : "opacity-0 -translate-x-16"
          }`}
        >
          <li className="step step-secondary">
            <p className="text-xl font-bold ">捐款</p>
            <p className="font-light text-[0.5rem] mt-2">
              使用區塊鏈錢包
              <br />
              或使用傳統金流
            </p>
          </li>
          <li className="step step-secondary">
            <p className="text-xl font-bold ">驗證</p>
            <p className="font-light text-[0.5rem] mt-2">
              我們將捐款轉換成USDT
              <br />
              並捐款給該提案
            </p>
          </li>
          <li className="step step-secondary">
            <p className="text-xl font-bold ">查看</p>
            <p className="font-light text-[0.5rem] mt-2">
              在區塊鏈上查看該捐款金流
              <br />
              或其他任何的金流
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Home;
