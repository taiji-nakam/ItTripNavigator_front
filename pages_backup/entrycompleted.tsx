// IT Trip Navigator
// エージェント相談受付　受け付けた旨を表示する
// 前処理：なし
// 後処理：なし

import React from "react";
import { useRouter } from "next/router";
import { useCommon } from "../contexts/commonContext";

const Itnavi: React.FC = () => {
  const router = useRouter();
  const { common } = useCommon();


  return (
    <div className="p-4 max-w-md mx-auto">
      <h2>ご相談ありがとうございますhogehoge</h2>
    </div>
  );
};

export default Itnavi;