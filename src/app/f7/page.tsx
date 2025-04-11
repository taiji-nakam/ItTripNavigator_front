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
  // 選択された職種のIDを管理
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])

  // 職種の選択/選択解除を処理する関数
  const toggleJobSelection = (id: string) => {
    if (selectedJobs.includes(id)) {
      setSelectedJobs(selectedJobs.filter((jobId) => jobId !== id))
    } else {
      setSelectedJobs([...selectedJobs, id])
    }
  }

  // 検索ボタンのクリックハンドラ - personnel-skill-summaryページに遷移するように変更
  const handleSearch = () => {
    if (selectedJobs.length > 0) {
      // 選択された職種の名前を取得
      const selectedJobNames = selectedJobs
        .map((id) => jobCategories.find((job) => job.id === id)?.name)
        .filter(Boolean) as string[]

      // 選択された職種IDと名前をクエリパラメータとして渡す
      router.push(
        `/personnel-skill-summary?jobIds=${selectedJobs.join(",")}&jobNames=${encodeURIComponent(
          selectedJobNames.join(","),
        )}`,
      )
    } else {
      alert("職種を選択してください")
    }
  }

  return (
    <div className="min-h-screen bg-[#BFBDBD] text-[#2D2D2D] flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 pt-8 pb-10">
        <h1 className="text-3xl font-bold mb-8 text-center">プロ人材検索</h1>

        <div className="flex items-center mb-8 justify-center">
          <div className="w-10 h-10 mr-3 flex-shrink-0 text-blue-500">
            <DartIcon size={40} />
          </div>
          <h2 className="text-2xl font-bold">16,000人の人材DBから的確なプロ人材をご紹介</h2>
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
                    selectedJobs.includes(job.id) ? "bg-blue-500 border-blue-500 text-white" : "border-gray-400"
                  }`}
                >
                  {selectedJobs.includes(job.id) && <CheckCircle size={16} />}
                </div>
                <span className="text-lg">{job.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-white border-2 border-gray-300 text-[#2D2D2D] py-3 px-6 rounded-full font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSearch}
            disabled={selectedJobs.length === 0}
          >
            選択中のプロ人材をエージェントに相談
          </button>
        </div>
      </div>
    </div>
  )
}
