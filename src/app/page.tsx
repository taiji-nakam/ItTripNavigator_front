// F1 Top
"use client"

import React from "react"
import Link from "next/link"

const Itnavi: React.FC = () => {
  const [isCaseHover, setIsCaseHover] = React.useState(false)
  const [isHumanHover, setIsHumanHover] = React.useState(false)
  // 追加: 検討フェーズボタン用のホバー状態
  const [isPhaseHover, setIsPhaseHover] = React.useState(false)

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
              <p className="text-white text-base sm:text-lg font-bold">他社事例紹介からあなたのDX推進を支援します</p>
            </div>

            {/* 画像側 - 変更: 白枠を削除 */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src="/photo.png"
                alt="地図と端末"
                className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md"
              />
            </div>
          </div>

          {/* 垂直階層型レイアウト */}
          <div className="flex flex-col w-full gap-6 py-10">
            {/* 変更: ボタン名称を「検討フェーズに合わせて探す」に変更し、ホバー効果を追加 */}
            <Link href="/f11" className="w-full">
              <button
                className="btn text-sm sm:text-base py-6"
                onMouseEnter={() => setIsPhaseHover(true)}
                onMouseLeave={() => setIsPhaseHover(false)}
              >
                <img src={isPhaseHover ? "/icon-case-hover.png" : "/icon-case.png"} alt="検討フェーズアイコン" />
                目的に合わせて探す
              </button>
            </Link>

            {/* 下部に2つのボタンを横並びで小さく配置 */}
            <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
              <Link href="/f2" className="w-full md:w-1/2">
                <button
                  className="btn text-sm sm:text-base"
                  onMouseEnter={() => setIsCaseHover(true)}
                  onMouseLeave={() => setIsCaseHover(false)}
                >
                  <img src={isCaseHover ? "/icon-case-hover.png" : "/icon-case.png"} alt="事例アイコン" />
                  他社のデジタル事例を探す
                </button>
              </Link>

              <Link href="/f7" className="w-full md:w-1/2">
                <button
                  className="btn text-sm sm:text-base"
                  onMouseEnter={() => setIsHumanHover(true)}
                  onMouseLeave={() => setIsHumanHover(false)}
                >
                  <img src={isHumanHover ? "/icon-case-hover.png" : "/icon-case.png"} alt="人材アイコン" />
                  具体的な人材を探す
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Itnavi
