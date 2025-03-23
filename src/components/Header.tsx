"use client";

import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [hover, setHover] = useState({ home: false, search: false, user: false });

  return (
    <header className="px-28 py-5 flex justify-between items-center border-b border-white">
      <div className="flex items-center">
        <img src="/logo.png" alt="IT Trip Navigator ロゴ" className="h-20 w-48" />
      </div>
      <nav>
        <ul className="flex text-white items-center">
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
                className="h-6 w-6 mb-1"
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
                className="h-6 w-6 mb-1"
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
                className="h-6 w-6 mb-1"
              />
              <span className="text-sm font-bold">人員TOP</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
