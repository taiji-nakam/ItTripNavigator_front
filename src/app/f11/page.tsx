"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "../../components/Dropdown";
import CaseCard from "../../components/CaseCard";
import { useCommon } from "../../../contexts/commonContext";

// ハードコーディングした選択肢定義
const timingOptions = [
  { id: "中期計画を立てたい", name: "中期計画を立てたい（3〜5年後を見据えたビジョン検討）" },
  { id: "来期の施策にDXを盛り込みたい", name: "来期の施策にDXを盛り込みたい" },
  { id: "新しいビジネスやサービスを立ち上げたい", name: "新しいビジネスやサービスを立ち上げたい" },
  { id: "今ある業務をデジタル化したい", name: "今ある業務をデジタル化したい" },
  { id: "急な課題・トラブルを解決したい", name: "急な課題・トラブルを解決したい（例：ツール導入や業務停止対策）" },
  { id: "その他", name: "その他" },
];
const domainOptions = [
  { id: "業務効率化", name: "業務効率化" },
  { id: "顧客接点強化", name: "顧客接点強化" },
  { id: "データ活用", name: "データ活用" },
  { id: "働き方改革", name: "働き方改革" },
  { id: "システム刷新", name: "システム刷新" },
  { id: "セキュリティ対応", name: "セキュリティ対応" },
  { id: "その他", name: "その他" },
];

const F11Page: React.FC = () => {
  const router = useRouter();
  const { common, setCommon } = useCommon();

  // 各選択値のステート
  const [selectedTiming, setSelectedTiming] = useState<string>(common?.timing || "");
  const [selectedDomain, setSelectedDomain] = useState<string>(common?.domain || "");
  const [freeWord, setFreeWord] = useState<string>(common?.free_word || "");
  const [caseList, setCaseList] = useState<any[]>([]);
  const [advice, setAdvice] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  // モーダル表示用状態（処理中のメッセージ）
  const [loadingMessage, setLoadingMessage] = useState("");

  // メイン処理
  const handleSearch = async () => {
    const payload: any = {
      timing: selectedTiming || undefined,
      domain: selectedDomain || undefined,
      free_word: freeWord || undefined,
    };
    try {
      setLoadingMessage("処理中です。しばらくお待ちください");
      // 検索API
      const resSearch = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/dxAdvice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const sd = await resSearch.json();
      if (resSearch.status === 200) {
        // common更新
        setCommon(prev => ({
          ...prev,
          search_id: sd.search_id,
          search_id_sub: sd.search_id_sub
        }));
 
        // アドバイスとプロンプトをセット
        setAdvice(sd.advice || "");
        setPrompt(sd.prompt || "");
        
        // 事例リストを更新
        setCaseList(sd.cases);
      } else {
        alert(sd.message);
      }
    } catch (e) {
      console.error(e);
      alert("検索中にエラーが発生しました。");
    } finally {
        setLoadingMessage("");
    }
  };

  // 詳細への遷移
  const handleDetail = async (caseId: number) => {
    const payload = { search_id: common?.search_id, search_id_sub: common?.search_id_sub, case_id: caseId };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/case`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (res.status === 200) {
        setCommon(prev => ({ ...prev, search_id: d.search_id, search_id_sub: d.search_id_sub }));
        router.push('/f4');
      } else alert(d.message);
    } catch (e) {
      console.error(e);
      alert("ケース詳細取得でエラーが発生しました。");
    }
  };

  return (
    <section className="section-container">
      {loadingMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            {loadingMessage}
          </div>
        </div>
      )}
      <h2 className="section-title">DX実践に向かって踏み出しましょう！！</h2>
      <p className="mb-4 text-gray-600">
        検討フェーズや解決したい課題に応じたアドバイスや事例が検索できます
      </p>
  
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左側：フィルタ */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <Dropdown
            label="タイミングを選択する"
            selected={selectedTiming}
            onSelect={(v: string) => setSelectedTiming(v)}
            items={timingOptions}
          />
          <Dropdown
            label="解決したい領域を選択する"
            selected={selectedDomain}
            onSelect={(v: string) => setSelectedDomain(v)}
            items={domainOptions}
          />
          <div className="flex flex-col">
            <label htmlFor="freeWord" className="font-medium">
              より具体的な課題を入力（任意）
            </label>
            <textarea
              id="freeWord"
              rows={4}
              value={freeWord}
              onChange={(e) => setFreeWord(e.target.value)}
              placeholder={
                "例：顧客データを活用するよう求められている\n受発注がFAX中心。自動化を検討したい\n社内のコミュニケーションが分断されていて、ツール導入を考えている"
              }
              className="mt-1 border rounded p-2"
            />
          </div>
          <button className="btn mt-4" onClick={handleSearch}>
            進め方を調べる
          </button>
        </div>
  
        {/* 右側：アドバイス＋事例一覧 */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {/* アドバイス表示 */}
          {advice && (
            <div className="p-4 bg-white rounded shadow border border-gray-200">
              <h3 className="text-lg font-bold mb-2 text-gray-800">ご提案</h3>
              <p className="whitespace-pre-line text-sm text-gray-700">{advice}</p>
            </div>
          )}
  
          {/* プロンプト表示（参考キーワード） */}
          {prompt && (
            <div className="p-3 border-l-4 text-gray-700 text-xs rounded">
              <p className="mb-1 font-semibold">参考キーワード（ 類似事例の特徴 ）</p>
              <pre className="whitespace-pre-wrap">{prompt}</pre>
            </div>
          )}
  
          {/* 事例一覧 */}
          {caseList.length > 0 ? (
            caseList.map((item, index) => (
              <CaseCard
                key={item.id || index}
                title={item.title || "（タイトル未設定）"}
                description={item.summary}
                onClick={() => handleDetail(Number(item.id))}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500"></p>
          )}
        </div>
      </div>
  
      <style jsx>{`
        .section-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }
        .modal-content {
          background-color: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-size: 1.5rem;
          text-align: center;
        }
      `}</style>
    </section>
  );
};

export default F11Page;
