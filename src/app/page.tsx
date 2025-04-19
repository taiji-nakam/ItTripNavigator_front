// F1 Top
"use client";

import React from "react";
import Link from "next/link";

const Itnavi: React.FC = () => {
  const [isCaseHover, setIsCaseHover] = React.useState(false);
  const [isHumanHover, setIsHumanHover] = React.useState(false);

  return (
    <>
      <section className="section-container">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* 上段：キャッチコピー + 画像 */}
          <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-10 gap-8">
            {/* テキスト側 */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-snug mb-4">
                <span className="whitespace-nowrap block">デジタル変革のヒントを</span>
                <span className="block">今すぐ探そう</span>
              </h1>
              <p className="text-white text-base sm:text-lg font-bold">
                他社事例紹介からあなたのDX推進を支援します
              </p>
            </div>

            {/* 画像側 */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src="/photo.png"
                alt="地図と端末"
                className="rounded-xl border-6 border-white shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md"
              />
            </div>
          </div>

          {/* 下段：ボタン3つに拡張 */}
          <div className="flex flex-col md:flex-row gap-4 w-full justify-between md:gap-6 py-10">
            <Link href="/f2" className="w-full md:w-1/3">
              <button
                className="btn text-sm sm:text-base"
                onMouseEnter={() => setIsCaseHover(true)}
                onMouseLeave={() => setIsCaseHover(false)}
              >
                <img 
                  src={isCaseHover ? "/icon-case-hover.png" : "/icon-case.png"}
                  alt="事例アイコン" 
                />
                他社のデジタル事例が見る
              </button>
            </Link>

            <Link href="/f7" className="w-full md:w-1/3">
              <button
                className="btn text-sm sm:text-base"
                onMouseEnter={() => setIsHumanHover(true)}
                onMouseLeave={() => setIsHumanHover(false)}
              >
                <img 
                  src={isHumanHover ? "/icon-case-hover.png" : "/icon-case.png"}
                  alt="人材アイコン" 
                />
                具体的な人材が見る
              </button>
            </Link>

            <Link href="/f4" className="w-full md:w-1/3">
              <button className="btn text-sm sm:text-base">
                <img 
                  src="/icon-case.png"
                  alt="検討状況アイコン" 
                />
                検討状況に合わせて見る
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Itnavi;
