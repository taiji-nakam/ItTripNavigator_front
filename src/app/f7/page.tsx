"use client";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCommon } from "../../../contexts/commonContext";

// 職種情報の型定義
interface JobCategory {
  job_id: number;
  job_name: string;
}

export default function F7Page() {
  const router = useRouter();
  const { common, setCommon } = useCommon();

  // 職種情報を保持する状態
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
  // 選択された職種ID（単一選択・文字列）
  const [selectedJob, setSelectedJob] = useState<string>("");

  // ① ページ表示時に /job API を呼び出して職種情報を取得する
  useEffect(() => {
    async function fetchJobCategories() {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + "/job";
      try {
        const res = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        if (res.status === 200) {
          setJobCategories(data);
        } else {
          alert("職種情報 API error: " + data.message);
        }
      } catch (error: unknown) {
        console.error("Error fetching job categories:", error);
        alert("職種情報の取得でエラーが発生しました: " + String(error));
      }
    }
    fetchJobCategories();
  }, []);

  // 職種の選択（単一選択）
  const toggleJobSelection = (id: string) => {
    if (selectedJob === id) {
      setSelectedJob("");
    } else {
      setSelectedJob(id);
    }
  };

  // ② 選択中のプロ人材に関してエージェントに相談ボタン押下時の処理
  const handleSearch = async () => {
    if (!selectedJob) {
      alert("職種を選択してください");
      return;
    }
    // 選択された職種の名称を取得
    const selectedJobObj = jobCategories.find(
      (job) => job.job_id.toString() === selectedJob
    );
    const selectedJobName = selectedJobObj ? selectedJobObj.job_name : "";

    // payload の作成（search_id, search_id_sub は空文字で OK）
    const payload = {
      search_id: null,
      search_id_sub: null,
      job_id: parseInt(selectedJob)
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/searchTalent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.status === 200) {
        // API から戻ってきた search_id, search_id_sub を common に更新
        setCommon((prev) => ({
          ...prev,
          search_id: data.search_id,
          search_id_sub: data.search_id_sub,
          search_mode: 1,
          job_name: selectedJobName
        }));
        router.push("/f6");
      } else {
        alert("SearchTalent API error: " + data.message);
      }
    } catch (error: unknown) {
      console.error("Error calling searchTalent API:", error);
      alert("検索履歴登録でエラーが発生しました: " + String(error));
    }
  };

  return (
    <div className="min-h-screen bg-[#BFBDBD] text-[#2D2D2D] flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 pt-8 pb-10">
        {/* タイトルとサブタイトル */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-left">プロ人材検索</h1>
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 flex-shrink-0 text-blue-500">
              {/* 必要であれば DartIcon コンポーネントを配置 */}
            </div>
            <h2 className="text-2xl font-bold">16,000人の人材DBから的確なプロ人材をご紹介</h2>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {jobCategories.map((job) => (
              <div
                key={job.job_id}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onClick={() => toggleJobSelection(job.job_id.toString())}
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                    selectedJob === job.job_id.toString()
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-gray-400"
                  }`}
                >
                  {selectedJob === job.job_id.toString() && <CheckCircle size={16} />}
                </div>
                <span className="text-lg">{job.job_name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="action-button" onClick={handleSearch} disabled={!selectedJob}>
            <span className="link-text">選択中のプロ人材をエージェントに相談</span>
          </button>
        </div>
      </div>

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
          position: relative;
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
