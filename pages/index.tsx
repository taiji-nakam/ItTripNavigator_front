// IT Trip Navigator
// サービスTop　事例検索or人員状況を選択する​​​
// 前処理：なし

import React from "react";
import Link from "next/link";

const Itnavi: React.FC = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  // console.log("API_BASE_URL:", API_BASE_URL);

  return (
    // tailwindとDaisyuの適用テスト→削除してOKです
    <div className="p-4">
      {/* Tailwind CSS のボックス */}
      <div className="w-full max-w-md bg-orange-500 rounded-lg p-6 mb-4 shadow-md mt-4">
        <h2 className="text-lg font-semibold text-center">
          Tailwind.css適用OK
        </h2>
      </div>
      {/* daisyUI のカード */}
      <div className="card w-full max-w-md bg-base-200 rounded-lg shadow-md mb-4 mt-4">
        <div className="card-body p-6">
          <Link href="/userForm" className="w-full">
            <h1 className="card-title text-2xl font-bold text-center">
              他社のデジタル事例が見たい
            </h1>
          </Link>
        </div>
      </div>
      <div className="card w-full max-w-md bg-base-200 rounded-lg shadow-md mb-4 mt-4">
        <div className="card-body p-6">
          <Link href="/position" className="w-full">
            <h1 className="card-title text-2xl font-bold text-center">
              具体的な人材が見たい
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Itnavi;
