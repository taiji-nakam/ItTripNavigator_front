// IT Trip Navigator
// データ入力　戦略文書作成orエージェント相談前にユーザ情報を入力する
// 前処理：commn.actionTypeの内容によって遷移先を制限する
// 後処理：なし

import React from "react";
import { useRouter } from "next/router";
import { useCommon } from "../contexts/commonContext";

const Itnavi: React.FC = () => {
  const router = useRouter();
  const { common } = useCommon();

  const handleStrategyClick = () => {
    // 次の画面 strategyBuilder へ遷移
    router.push("/strategyBuilder");
  };

  const handleAgentClick = () => {
    // 次の画面 entrycompleted へ遷移
    router.push("/entrycompleted");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {common?.actionType === 0 && (
        <button onClick={handleStrategyClick} className="btn btn-primary w-full">
          戦略文書出力
        </button>
      )}
      {common?.actionType === 1 && (
        <button onClick={handleAgentClick} className="btn btn-primary w-full">
          エージェント相談
        </button>
      )}
    </div>
  );
};

export default Itnavi;