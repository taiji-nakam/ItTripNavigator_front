// IT Trip Navigator
// サービスTop　事例検索or人員状況を選択する​​​
// 前処理：なし
"use client";

import React from "react";
import Link from "next/link";

const Itnavi: React.FC = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  // console.log("API_BASE_URL:", API_BASE_URL);
  const [isHomeHover, setIsHomeHover] = React.useState(false);
  const [isSearchHover, setIsSearchHover] = React.useState(false);
  const [isUserHover, setIsUserHover] = React.useState(false);
  const [isCaseHover, setIsCaseHover] = React.useState(false);
  const [isHumanHover, setIsHumanHover] = React.useState(false);

  return (
    <>
      <header className="px-29 py-5 flex justify-between items-center border-b border-white">
        {/* ロゴ部分 */}
        <div className="flex items-center">
          <img src="/logo.png" alt="IT Trip Navigator ロゴ" className="h-20 w-48"/>
        </div>
        {/* ナビメニュー */}
        <nav>
          <ul className="flex space-x-12 text-white items-center">
            <li className="flex flex-col items-center ">
              <Link href="/" className="flex flex-col items-center hover:text-gray-500"
                onMouseEnter={() => setIsHomeHover(true)}
                onMouseLeave={() => setIsHomeHover(false)}
              >
                <img 
                  src={isHomeHover ? "/icon-home-hover.png" : "/icon-home.png"}
                  alt="ホーム" 
                  className="h-6 w-6 mb-1" />
                <span className="text-sm font-bold">ホーム</span>
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link href="/f2" className="flex flex-col items-center hover:text-gray-500"
                onMouseEnter={() => setIsSearchHover(true)}
                onMouseLeave={() => setIsSearchHover(false)}
              >
                <img 
                  src={isSearchHover ? "/icon-search-hover.png" : "/icon-search.png"}
                  alt="事例検索" 
                  className="h-6 w-6 mb-1" />
                <span className="text-sm font-bold">事例検索</span>
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link href="/f7" className="flex flex-col items-center hover:text-gray-500"
                onMouseEnter={() => setIsUserHover(true)}
                onMouseLeave={() => setIsUserHover(false)}
              >
                <img 
                  src={isUserHover ? "/icon-user-hover.png" : "/icon-user.png"}
                  alt="人員TOP" 
                  className="h-6 w-6 mb-1" />
                <span className="text-sm font-bold">人員TOP</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="px-29 py-5">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* 上段：キャッチコピー + 画像 */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-8">
            {/* キャッチコピー */}
            <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 leading-snug mb-4">
                デジタル変革を<br />
                簡単に、早く、正確に
              </h2>
              <p className="text-white text-lg font-bold">
                事例紹介からあなたのDX推進を支援します
              </p>
            </div>
            {/* 画像 */}
            <div className="md:w-1/2 flex justify-end">
              <img
                src="/photo.png"
                alt="地図と端末"
                className="rounded-xl border-6 border-white shadow-lg max-w-sm"
              />
            </div>
          </div>
          {/* 下段：ボタン2つ横並び */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:px-[117] justify-between md:gap-[70px]">
            <Link href="/f2" className="w-full md:w-[488px]">
              <button className="flex justify-center items-center rounded-lg px-6 py-3 bg-white text-gray-500 font-semibold w-full hover:bg-gray-500 hover:text-white cursor-pointer"
                onMouseEnter={() => setIsCaseHover(true)}
                onMouseLeave={() => setIsCaseHover(false)}
              >
                <img 
                  src={isCaseHover ? "/icon-case-hover.png" : "/icon-case.png"}
                  alt="事例アイコン" 
                  className="w-6 h-6 mr-3" />
                他社のデジタル事例が見たい
              </button>
            </Link>
            <Link href="/f7" className="w-full md:w-[488px]">
              <button className="flex justify-center items-center rounded-lg px-6 py-3 bg-white text-gray-500 font-semibold w-full hover:bg-gray-500 hover:text-white cursor-pointer"
                onMouseEnter={() => setIsHumanHover(true)}
                onMouseLeave={() => setIsHumanHover(false)}
              >
                <img 
                  src={isHumanHover ? "/icon-case-hover.png" : "/icon-case.png"}
                  alt="事例アイコン" 
                  className="w-6 h-6 mr-3" />
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
