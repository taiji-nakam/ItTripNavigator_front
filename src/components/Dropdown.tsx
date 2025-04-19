"use client";

import type React from "react" // 👈 変更: useRef, useEffect を追加
import { useState, useMemo, useRef, useEffect } from "react"



interface DropdownItem {
  id: string;  // 選択値 (id) は文字列で持つ
  name: string;
}

type DropdownProps = {
  label: string;
  selected?: string;        // 選択中のIDを親から受け取る
  items: DropdownItem[];    // 選択肢のリスト
  onSelect: (id: string) => void; 
};

const Dropdown: React.FC<DropdownProps> = ({ label, selected, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

   // 👇 追加: ドロップダウン要素への参照を作成
  const dropdownRef = useRef<HTMLDivElement>(null)

   // 👇 追加: ドロップダウン外のクリックを検知するためのイベントリスナー
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
   // 👆 追加: useEffect ここまで


  // ★ selected ID と items から表示用の name を導き出す
  const displayText = useMemo(() => {
    if (!selected) {
      return label; // 何も選択されていない場合はラベル表示
    }
    // selected(文字列)と item.id が一致する要素を検索
    const matchedItem = items.find(item => item.id === selected);
    return matchedItem ? matchedItem.name : label;
  }, [selected, items, label]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {" "}
      {/* 👈 変更: ref属性を追加 */}
      <button
        onClick={toggleDropdown}
        className="w-full px-20 py-5 bg-white rounded-lg shadow text-gray-700 font-semibold flex justify-between items-center"
      >
        {displayText}
        <img
          src={isOpen ? "/icon-up.png" : "/icon-down.png"}
          alt="トグル"
          className="w-7 h-7 ml-2"
        />
      </button>

      {isOpen && (
        <div className="top-full left-0 w-full bg-white rounded-lg shadow mt-2 z-10">
          <ul className="max-h-none overflow-visible">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="p-4 border-b border-gray-200 hover:bg-gray-500 hover:text-white cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
