"use client"
import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// ダーツのSVGアイコンコンポーネント
const DartIcon = ({ size = 40, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" />
    <path d="M16.24 7.76l4.24-4.24" />
    <path d="M18 2l-6 6" />
    <path d="M14 6l-4 4" />
  </svg>
)

// 職種のリストを画像の順序に合わせて並び替え
const jobCategories = [
  { id: "1", name: "ビジネスアーキテクト" },
  { id: "2", name: "ITコンサルタント/PM" },
  { id: "3", name: "PO/PdM" },
  { id: "4", name: "業務システム開発エンジニア" },
  { id: "5", name: "WEBサービス開発エンジニア" },
  { id: "6", name: "NW/SV/DBエンジニア" },
  { id: "7", name: "クラウドエンジニア" },
  { id: "8", name: "セキュリティエンジニア/コンサルタント" },
  { id: "9", name: "データサイエンティスト/アナリスト" },
  { id: "10", name: "データ基盤エンジニア" },
  { id: "11", name: "AI/機械学習エンジニア" },
  { id: "12", name: "IoTエンジニア" },
  { id: "13", name: "UI/UXデザイナー/コンサルタント" },
  { id: "14", name: "デジタルマーケター" },
]

export default function ProSearchPage() {
  const router = useRouter()
  // 選択された職種のIDを管理（単一選択のため、配列ではなく単一の文字列に変更）
  const [selectedJob, setSelectedJob] = useState<string>("")

  // 職種の選択/選択解除を処理する関数（単一選択に修正）
  const toggleJobSelection = (id: string) => {
    // 既に選択されている職種をクリックした場合は選択解除
    if (selectedJob === id) {
      setSelectedJob("")
    } else {
      // それ以外の場合は新しい職種を選択（以前の選択は自動的にクリアされる）
      setSelectedJob(id)
    }
  }

  // 検索ボタンのクリックハンドラ - f6ページに遷移するように変更
  const handleSearch = () => {
    if (selectedJob) {
      // 選択された職種の名前を取得
      const selectedJobName = jobCategories.find((job) => job.id === selectedJob)?.name || ""

      // 選択された職種IDと名前をクエリパラメータとして渡す
      router.push(`/f6?jobIds=${selectedJob}&jobNames=${encodeURIComponent(selectedJobName)}`)
    } else {
      alert("職種を選択してください")
    }
  }

  return (
    <div className="min-h-screen bg-[#BFBDBD] text-[#2D2D2D] flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 pt-8 pb-10">
        {/* タイトルとサブタイトルを左揃えに変更 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-left">プロ人材検索</h1>

          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 flex-shrink-0 text-blue-500">
              <DartIcon size={40} />
            </div>
            <h2 className="text-2xl font-bold">16,000人の人材DBから的確なプロ人材をご紹介</h2>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {jobCategories.map((job) => (
              <div
                key={job.id}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onClick={() => toggleJobSelection(job.id)}
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                    selectedJob === job.id ? "bg-blue-500 border-blue-500 text-white" : "border-gray-400"
                  }`}
                >
                  {selectedJob === job.id && <CheckCircle size={16} />}
                </div>
                <span className="text-lg">{job.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          {/* ボタンのスタイルを他のページと統一 */}
          <button className="action-button" onClick={handleSearch} disabled={!selectedJob}>
            <span className="link-text">選択中のプロ人材をエージェントに相談</span>
          </button>
        </div>
      </div>

      {/* 他のページと統一したボタンスタイル */}
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
  )
}

