"use client";

import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  // 各アイコンのホバー状態を管理
  const [hover, setHover] = useState({ home: false, search: false, user: false });

  // モバイルメニューの開閉状態を管理
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="px-6 sm:px-28 py-5 flex justify-between items-center border-b border-white">
      {/* ロゴ部分 */}
      <div className="flex items-center">
        <img src="/logo.png" alt="IT Trip Navigator ロゴ" className="h-14 sm:h-20 w-auto" />
      </div>

      {/* ハンバーガーメニュー（モバイル表示） */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <img src="/icon-menu.png" alt="メニュー" className="w-8 h-8" />
        </button>
      </div>

      {/* デスクトップ用ナビゲーション（md以上で表示） */}
      <nav className="hidden md:flex">
        <ul className="flex text-white items-center space-x-12">
          {/* ホーム */}
          <li
            onMouseEnter={() => setHover({ ...hover, home: true })}
            onMouseLeave={() => setHover({ ...hover, home: false })}
            className="flex flex-col items-center hover:text-gray-500"
          >
            <Link href="/" className="flex flex-col items-center">
              <img
                src={hover.home ? "/icon-home-hover.png" : "/icon-home.png"}
                alt="ホーム"
                className="h-8 w-8 mb-1"
              />
              <span className="text-sm font-bold">ホーム</span>
            </Link>
          </li>

          {/* 事例検索 */}
          <li
            onMouseEnter={() => setHover({ ...hover, search: true })}
            onMouseLeave={() => setHover({ ...hover, search: false })}
            className="flex flex-col items-center hover:text-gray-500 px-10"
          >
            <Link href="/f2" className="flex flex-col items-center">
              <img
                src={hover.search ? "/icon-search-hover.png" : "/icon-search.png"}
                alt="事例検索"
                className="h-8 w-8 mb-1"
              />
              <span className="text-sm font-bold">事例検索</span>
            </Link>
          </li>

          {/* 人員TOP */}
          <li
            onMouseEnter={() => setHover({ ...hover, user: true })}
            onMouseLeave={() => setHover({ ...hover, user: false })}
            className="flex flex-col items-center hover:text-gray-500"
          >
            <Link href="/f7" className="flex flex-col items-center">
              <img
                src={hover.user ? "/icon-user-hover.png" : "/icon-user.png"}
                alt="人員TOP"
                className="h-8 w-8 mb-1"
              />
              <span className="text-sm font-bold">人員TOP</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* モバイル用メニュー（ハンバーガーで展開） */}
      {isOpen && (
        <nav className="md:hidden absolute top-20 left-0 w-full bg-gray-500 text-white py-4 z-50">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link href="/" onClick={toggleMenu} className="font-bold">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/f2" onClick={toggleMenu} className="font-bold">
                事例検索
              </Link>
            </li>
            <li>
              <Link href="/f7" onClick={toggleMenu} className="font-bold">
                人員TOP
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
