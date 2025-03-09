// IT Trip Navigator
// 事例検索　選択肢から検索条件を指定し、事例検索へ進む​​​
// 前処理：なし
// 後処理：検索IDを発行しContextに保存する

import React, { useEffect }  from "react";
import { useRouter } from "next/router";
import { useCommon, Common } from "../contexts/commonContext"

const Itnavi: React.FC = () => {
  
  const { setCommon } = useCommon();
  const router = useRouter();

  const handleGoClick = () => {
    // (Sample)search_id セット
    setCommon({ search_id: 1 });
    // 次の画面 caseList へ遷移
    router.push("/caseList");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button onClick={handleGoClick} className="btn btn-primary w-full">
        事例へGO
      </button>
    </div>
  );
};

export default Itnavi;
