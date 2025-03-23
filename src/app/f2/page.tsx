"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ドロップダウン項目の型
interface DropdownItem {
  id: string;
  name: string;
}

type DropdownProps = {
  label: string;
  items: DropdownItem[];
  onSelect: (id: string) => void;
};

//ドロップダウン
const Dropdown: React.FC<DropdownProps> = ({ label, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (id: string, name: string) => {
    setSelectedItem(name);
    setIsOpen(false);
    onSelect(id);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full px-20 py-5 bg-white rounded-lg shadow text-gray-700 font-semibold flex justify-between items-center"
      >
        {selectedItem || label}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow mt-2 z-10">
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.id, item.name)}
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

const Itnavi: React.FC = () => {
  const router = useRouter();
  const [isSearchBtnHover, setIsSearchBtnHover] = useState(false);
  const [isHomeHover, setIsHomeHover] = React.useState(false);
  const [isSearchHover, setIsSearchHover] = React.useState(false);
  const [isUserHover, setIsUserHover] = React.useState(false);

  const [industryId, setIndustryId] = useState("");
  const [companySizeId, setCompanySizeId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [themeId, setThemeId] = useState("");

  const handleGoClick = () => {
    const searchParams = new URLSearchParams({
      industry_id: industryId,
      company_size_id: companySizeId,
      department_id: departmentId,
      theme_id: themeId,
    });
    router.push(`/f3?${searchParams.toString()}`);
  };

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
      <section className="px-29 py-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">事例検索</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* 左側：タイトルボックス */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {/* タイトルボックス 1 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-center mb-4">タイトル XXX</h3>
              <hr className="border-gray-300 mb-4" />
              <p className="text-sm text-gray-700">
                DX推進プロジェクトが・・・XXXXXXXXXXXXX<br />
                XXXXXXXXXXXXXXXXXXXXXXXXXXX
              </p>
              <p className="text-right text-xs text-gray-400 mt-4">続きを読む</p>
            </div>
            {/* タイトルボックス 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-center mb-4">タイトル XXX</h3>
              <hr className="border-gray-300 mb-4" />
              <p className="text-sm text-gray-700">
                DX推進プロジェクトが・・・XXXXXXXXXXXXX<br />
                XXXXXXXXXXXXXXXXXXXXXXXXXXX
              </p>
              <p className="text-right text-xs text-gray-400 mt-4">続きを読む</p>
            </div>
          </div>
          {/* 右側：カスタムプルダウン4つ */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <Dropdown label="業界を指定する" onSelect={setIndustryId} items={[
              { id: "1", name: "製造業" },
              { id: "2", name: "流通・小売業" },
              { id: "3", name: "建設不動産業" },
              { id: "4", name: "指定なし" },
            ]} />
            <Dropdown label="売上規模を指定する" onSelect={setCompanySizeId} items={[
              { id: "1", name: "〜50億円" },
              { id: "2", name: "50億円〜100億円" },
              { id: "3", name: "指定なし" },
            ]} />
            <Dropdown label="部署を指定する" onSelect={setDepartmentId} items={[
              { id: "1", name: "情報システム部" },
              { id: "2", name: "人事部" },
              { id: "3", name: "指定しない" },
            ]} />
            <Dropdown label="テーマを指定する" onSelect={setThemeId} items={[
              { id: "1", name: "DX" },
              { id: "2", name: "ITインフラ" },
              { id: "3", name: "指定しない" },
            ]} />
            {/* 検索ボタン */}
            <button
              onClick={handleGoClick}
              onMouseEnter={() => setIsSearchBtnHover(true)}
              onMouseLeave={() => setIsSearchBtnHover(false)}
              className={`flex items-center justify-center p-4 rounded-lg shadow font-semibold border-3 w-full md:w-auto 
                ${isSearchBtnHover ? "bg-gray-500 text-white" : "bg-white text-gray-500"} border-gray-500`}
            >
              <img
                src={isSearchBtnHover ? "/icon-searchbtn-hover.png" : "/icon-searchbtn.png"}
                alt="検索"
                className="w-5 h-5 mr-2"
              />
              事例を検索する
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Itnavi;
