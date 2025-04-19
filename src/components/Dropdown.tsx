"use client"

import type React from "react"
import { useState, useMemo, useRef, useEffect } from "react"

interface DropdownItem {
  id: string // 選択値 (id) は文字列で持つ
  name: string
}

type DropdownProps = {
  label: string
  selected?: string // 選択中のIDを親から受け取る
  items: DropdownItem[] // 選択肢のリスト
  onSelect: (id: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ label, selected, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  // ドロップダウン要素への参照を作成
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ドロップダウン外のクリックを検知するためのイベントリスナー
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // dropdownRefが存在し、クリックされた要素がドロップダウン内でない場合
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // ドロップダウンが開いている時だけイベントリスナーを追加
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // クリーンアップ関数
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen]) // isOpenの状態が変わった時だけ実行

  // ★ selected ID と items から表示用の name を導き出す
  const displayText = useMemo(() => {
    if (!selected) {
      return label // 何も選択されていない場合はラベル表示
    }
    // selected(文字列)と item.id が一致する要素を検索
    const matchedItem = items.find((item) => item.id === selected)
    return matchedItem ? matchedItem.name : label
  }, [selected, items, label])

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (id: string) => {
    onSelect(id)
    setIsOpen(false)
  }

  return (
    // 👇 変更: marginを追加
    <div className="relative mb-2" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        // 👇 変更: パディングを調整し、テキストサイズを小さくして横一行に収める
        className="w-full px-4 py-3 bg-white rounded-lg shadow text-gray-700 font-semibold flex justify-between items-center text-sm"
      >
        {/* 👇 変更: テキストを横一行に収めるためにtruncateを追加し、選択状態を強調 */}
        <span className={`truncate ${selected ? "font-bold text-gray-900" : "text-gray-500"}`}>{displayText}</span>
        <img
          src={isOpen ? "/icon-up.png" : "/icon-down.png"}
          alt="トグル"
          // 👇 変更: アイコンサイズを調整
          className="w-5 h-5 ml-1 flex-shrink-0"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-auto min-w-full max-w-xs bg-white rounded-lg shadow mt-1 z-10">
          {/* 👇 変更: スクロール可能な高さ制限を追加 */}
          <ul className="max-h-48 overflow-y-auto">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.id)}
                // 変更箇所2: truncateを削除し、ツールチップを追加
                className="p-3 text-sm border-b border-gray-200 hover:bg-gray-500 hover:text-white cursor-pointer"
                title={item.name} // 変更箇所3: ツールチップとして全文を表示
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
