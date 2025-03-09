// IT Trip Navigator
// 事例一覧　前画面の検索条件に一致する事例を表示する​​​
// 前処理：事例一覧を表示する
// 後処理：なし

import React, { useEffect }  from "react";
import { useRouter } from "next/router";
import { useCommon, Common } from "../contexts/commonContext"

const Itnavi: React.FC = () => {
  
  const router = useRouter();
  const { common } = useCommon();

  // **TEST** common が更新されたタイミングで search_id をログに出力
  // useEffect(() => {
  //   if (common) {
  //     console.log("common.search_id:", common.search_id);
  //   } else {
  //     console.log("common is null");
  //   }
  // }, [common]);

  const handleDtlClick = () => {
    // 次の画面 caseDetail へ遷移
    router.push("/caseDetail");
  };


  const handleGoClick = () => {
    // 事例再検索
    router.push("/caseList");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button onClick={handleDtlClick} className="btn btn-primary w-full">
        詳細を見る
      </button>
      <button onClick={handleGoClick} className="btn btn-primary w-full">
        別の事例へGO
      </button>
    </div>
  );
};

export default Itnavi;
