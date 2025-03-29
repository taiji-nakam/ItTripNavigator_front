// IT Trip Navigator
// 事例詳細　前画面で指定された事例の詳細を表示する​​​
// 前処理：事例詳細を表示する
// 後処理：なし

import React, { useEffect }  from "react";
import { useRouter } from "next/router";
import { useCommon, Common } from "../contexts/commonContext"

const Itnavi: React.FC = () => {
  
  const router = useRouter();
  const { common, setCommon } = useCommon();

  const handleStrategyClick = () => {
    // Common.actionType = 0
    setCommon({ actionType: 0 });
    // 次の画面 entryForm へ遷移
    router.push("/entryForm");
  };


  const handleAgentClick = () => {
    // Common.mode = 1
    setCommon({ actionType: 1 });
    // 次の画面 entryForm へ遷移
    router.push("/entryForm");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button onClick={handleStrategyClick} className="btn btn-primary w-full">
        戦略文書DL
      </button>
      <button onClick={handleAgentClick} className="btn btn-primary w-full">
        エージェントに人材の相談をする
      </button>
    </div>
  );
};

export default Itnavi;
