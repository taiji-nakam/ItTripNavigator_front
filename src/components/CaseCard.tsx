"use client"

import type React from "react"

type CaseCardProps = {
  title: string
  description: string
  onClick: () => void
}

const CaseCard: React.FC<CaseCardProps> = ({ title, description, onClick }) => {
  return (
    // 👇 変更: ホバー効果を追加し、カード全体をクリック可能に
    <div className="bg-white p-6 rounded-lg shadow transition-colors hover:bg-blue-50 cursor-pointer" onClick={onClick}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {/* 👇 変更: 区切り線を追加して視覚的に分ける */}
      <hr className="border-gray-200 mb-3" />
      {/* 👇 変更: 行間を広げて読みやすく */}
      <p className="text-sm text-gray-700 mb-2 leading-relaxed">{description}</p>
      {/* 👇 変更: クリックイベントをdivに移動し、スタイルを調整 */}
      <p className="text-right text-xs text-gray-400 mt-4 hover:underline">続きを読む</p>
    </div>
  )
}

export default CaseCard

