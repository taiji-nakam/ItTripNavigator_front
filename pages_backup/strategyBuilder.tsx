// IT Trip Navigator
// 戦略文書作成　選択時した事例に基づく戦略文書を作成、ダウンロードする
// 前処理：戦略文書の作成と表示
// 後処理：なし

import React from "react";
import { useRouter } from "next/router";
import { useCommon } from "../contexts/commonContext";

const Itnavi: React.FC = () => {
  const router = useRouter();
  const { common } = useCommon();


  return (
    <div className="p-4 max-w-md mx-auto">
      <h2>戦略文書hogehoge</h2>
    </div>
  );
};

export default Itnavi;