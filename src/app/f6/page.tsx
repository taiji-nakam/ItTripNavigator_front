"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCommon } from "../../../contexts/commonContext";

// 人材データの型定義（APIから取得される項目に合わせて、必要なキーのみ定義）
interface Personnel {
  id: string;
  name: string;
  title: string;
  executiveSummary: string;
  summary: string;
  industry: string;
  career: string;
  mindset: string;
  supportarea: string;
  job: string;
  hashtag: string;
  imageUrl: string;
}

export default function F6Page() {
  const router = useRouter();
  const { common,setCommon } = useCommon();

  // APIから取得した人材データの状態
  const [personnelList, setPersonnelList] = useState<Personnel[]>([]);
  // 選択された人材IDの配列
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>([]);

  // ページ表示時に API を呼び出して人材データを取得する
  useEffect(() => {
    async function fetchPersonnel() {
      if (!common) {
        console.log("common が設定されていません");
        return;
      }
      const search_id = common.search_id;
      const search_id_sub = common.search_id_sub;

      if (!search_id || !search_id_sub) {
        console.log("common の search_id, search_id_sub が不足しています");
        return;
      }
      const endpoint =
        process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/searchResults?search_id=${search_id}&search_id_sub=${search_id_sub}`;
      console.log("Fetching personnel from:", endpoint);

      try {
        const res = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.status === 200) {
          setPersonnelList(data);
        } else {
          alert(data.message);
        }
      } catch (error: unknown) {
        console.error("Error fetching personnel data:", error);
        alert("人材データ取得でエラーが発生しました: " + String(error));
      }
    }
    fetchPersonnel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // フィルタリング：
  //  - person.id が空なら除外
  //  - person.summary が空文字 or "No" or "undefined"（大小無視）なら除外
  const filteredPersonnel = personnelList.filter((person) => {
    const hasId = person.id && person.id.trim() !== "";

    const normalizedSummary = person.summary?.trim().toLowerCase() || "";
    // summary が空文字、"no"、または"undefined" の場合は除外
    const isSummaryValid =
      normalizedSummary !== "" &&
      normalizedSummary !== "no" &&
      normalizedSummary !== "undefined";

    return hasId && isSummaryValid;
  });

  // 人材の選択/解除用の処理
  const togglePersonnelSelection = (id: string) => {
    if (selectedPersonnel.includes(id)) {
      setSelectedPersonnel(selectedPersonnel.filter((pid) => pid !== id));
    } else {
      setSelectedPersonnel([...selectedPersonnel, id]);
    }
  };

  // エージェントに相談ボタンのクリックハンドラを async 関数に修正
  const handleConsultClick = async () => {
    if (selectedPersonnel && selectedPersonnel.length > 0) {
      console.log("選択された人材:", selectedPersonnel);
      const payload = {
        search_id: common?.search_id,
        search_id_sub: common?.search_id_sub,
        talent_id: parseInt(selectedPersonnel[0])
      };

      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/setTalent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.status === 200) {
          // API から戻ってきた search_id_sub を common に更新
          setCommon((prev) => ({ ...prev, search_id_sub: data }));
          setCommon(prev => ({ ...prev, actionType: 1 }));  //エージェントへ相談モードでf8へ遷移
          router.push("/f8?mode=consult");
        } else {
          alert("SearchTalent API error: " + data.message);
        }
      } catch (error: unknown) {
        console.error("Error calling searchTalent API:", error);
        alert("検索履歴登録でエラーが発生しました: " + String(error));
      }
    } else {
      alert("人材を選択してください");
    }
  };

  return (
    <div className="min-h-screen pb-10 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 pt-8">
        <h1 className="text-3xl font-bold mb-8 text-[#2D2D2D] text-center">
          プロ人材スキルサマリー
        </h1>

        {/* 関連情報の表示 */}
        {common?.search_mode === 0 && common?.caseTitle && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">関連事例:</h2>
            <p className="font-medium">{common.caseTitle}</p>
            {common.caseCompanySummary && (
              <p className="text-sm text-gray-600">企業概要: {common.caseCompanySummary}</p>
            )}
            {common.caseChallenge && (
              <p className="text-sm text-gray-600">課題: {common.caseChallenge}</p>
            )}
          </div>
        )}
        {common?.search_mode === 1 && common?.job_name && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">選択された職種:</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {common.job_name}
              </span>
            </div>
          </div>
        )}

        {/* 人材一覧パネル */}
        <div className="bg-white p-6 rounded-lg shadow-md text-[#2D2D2D]">
          <div className="grid grid-cols-1 gap-8">
            {filteredPersonnel.length > 0 ? (
              filteredPersonnel.map((person) => {
                // マインドセット
                const mindsetIsEmpty =
                  !person.mindset || person.mindset.trim() === "";
                const displayMindset =
                  mindsetIsEmpty && person.job
                    ? person.job
                    : person.mindset;
                const mindsetTitle =
                  mindsetIsEmpty && person.job ? "保有職種" : "マインドセット";

                // 経歴
                const careerIsEmpty =
                  !person.career || person.career.trim() === "";
                const displayCareer =
                  careerIsEmpty && person.job
                    ? person.job
                    : person.career;
                const careerTitle =
                  careerIsEmpty && person.job ? "保有職種" : "経歴";

                // 支援可能領域
                const supportIsEmpty =
                  !person.supportarea || person.supportarea.trim() === "";
                const displaySupport =
                  supportIsEmpty && person.job
                    ? person.job
                    : person.supportarea;
                const supportTitle =
                  supportIsEmpty && person.job ? "保有職種" : "支援可能領域";

                return (
                  <div
                    key={person.id}
                    className={`border rounded-lg p-6 cursor-pointer transition-all ${
                      selectedPersonnel.includes(person.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => togglePersonnelSelection(person.id)}
                  >
                    {/* タイトル表示 */}
                    <h2 className="text-xl font-bold mb-4 text-center">
                      {person.name}
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6">
                      {/* 左側：プロフィール写真 */}
                      <div className="md:w-1/5">
                        {/* <img
                          src={person.imageUrl || "/placeholder.svg"}
                          alt={`${person.name} のプロフィール写真`}
                          className="w-full aspect-square object-cover"
                        /> */}
                      </div>

                      {/* 右側：エグゼクティブサマリー */}
                      <div className="md:w-4/5">
                        <h3 className="text-blue-500 font-medium mb-2">
                          エグゼクティブサマリー
                        </h3>
                        <p className="mb-4">{person.summary}</p>
                      </div>
                    </div>

                    {/* 3列のスキル情報 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-200 p-4 rounded">
                        <h3 className="text-center font-bold mb-4">
                          {mindsetTitle}
                        </h3>
                        <div className="text-sm">
                          {displayMindset
                            ? displayMindset.split("\n").map((item, index) => (
                                <p key={index} className="mb-2">
                                  {item}
                                </p>
                              ))
                            : null}
                        </div>
                      </div>

                      <div className="bg-blue-200 p-4 rounded">
                        <h3 className="text-center font-bold mb-4">
                          {careerTitle}
                        </h3>
                        <div className="text-sm">
                          {displayCareer
                            ? displayCareer.split("\n").map((item, index) => (
                                <p key={index} className="mb-2">
                                  {item}
                                </p>
                              ))
                            : null}
                        </div>
                      </div>

                      <div className="bg-blue-200 p-4 rounded">
                        <h3 className="text-center font-bold mb-4">
                          {supportTitle}
                        </h3>
                        <div className="text-sm">
                          {displaySupport
                            ? displaySupport.split("\n").map((item, index) => (
                                <p key={index} className="mb-2">
                                  {item}
                                </p>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>

                    {/* ※Hiprotech表記 */}
                    <div className="text-right text-xs text-gray-500 mt-4">
                      ※Hiprotechの独自情報に基づく架空の人材です
                    </div>
                  </div>
                );
              })
            ) : (
              <p>該当する人材がありません</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="action-button"
            onClick={handleConsultClick}
            disabled={selectedPersonnel.length === 0}
          >
            <span className="link-text">
              選択中の人材に関してエージェントに相談
            </span>
          </button>
        </div>
      </div>

      {/* ボタンスタイル */}
      <style jsx>{`
        .action-button {
          background-color: white;
          border: 5px solid #ddd;
          border-radius: 20px;
          padding: 20px;
          text-align: center;
          width: 250px;
          text-decoration: none;
          color: #333;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        .action-button:hover {
          border-color: #b22222;
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .link-text {
          display: block;
          color: rgb(11, 11, 11);
          font-size: 16px;
          text-align: center;
          width: 100%;
        }
      `}</style>
    </div>
  );
}