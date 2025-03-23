"use client";

import React from "react";
import Link from "next/link";

const Itnavi: React.FC = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  // console.log("API_BASE_URL:", API_BASE_URL);
  const [isCaseHover, setIsCaseHover] = React.useState(false);
  const [isHumanHover, setIsHumanHover] = React.useState(false);

  return (
    <>
      <section className="section-container">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* 上段：キャッチコピー + 画像 */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-8">
            <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-5xl font-bold text-gray-800 leading-snug mb-4">
                デジタル変革を<br />
                簡単に、早く、正確に
              </h1>
              <p className="text-white text-lg font-bold">
                事例紹介からあなたのDX推進を支援します
              </p>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <img
                src="/photo.png"
                alt="地図と端末"
                className="rounded-xl border-6 border-white shadow-lg max-w-lg"
              />
            </div>
          </div>

          {/* 下段：ボタン2つ横並び */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:px-[117] justify-between md:gap-[70px] py-20">
            <Link href="/f2" className="w-full md:w-[488px]">
              <button
                className="btn"
                onMouseEnter={() => setIsCaseHover(true)}
                onMouseLeave={() => setIsCaseHover(false)}
              >
                <img 
                  src={isCaseHover ? "/icon-case-hover.png" : "/icon-case.png"}
                  alt="事例アイコン" 
                />
                他社のデジタル事例が見たい
              </button>
            </Link>
            <Link href="/f7" className="w-full md:w-[488px]">
              <button
                className="btn"
                onMouseEnter={() => setIsHumanHover(true)}
                onMouseLeave={() => setIsHumanHover(false)}
              >
                <img 
                  src={isHumanHover ? "/icon-case-hover.png" : "/icon-case.png"}
                  alt="事例アイコン" 
                />
                具体的な人材が見たい
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Itnavi;
