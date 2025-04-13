"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

// 人材データの型定義
interface Personnel {
  id: string
  name: string
  title: string
  executiveSummary: string
  tags: string[]
  mindset: string[]
  experience: string[]
  supportAreas: string[]
  imageUrl: string
}

export default function PersonnelSkillSummaryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URLから遷移元と関連データを取得
  const source = searchParams.get("source") // 'f4' または undefined (f7からの場合)
  const caseId = searchParams.get("caseId")
  const caseTitle = searchParams.get("caseTitle")
  const caseIndustry = searchParams.get("caseIndustry")
  const caseChallenge = searchParams.get("caseChallenge")
  const caseSolution = searchParams.get("caseSolution")

  // f7からの場合の選択された職種ID
  const jobIdsFromF7 = searchParams.get("jobIds")?.split(",") || []
  const jobNamesFromF7 = searchParams.get("jobNames")
    ? decodeURIComponent(searchParams.get("jobNames") || "").split(",")
    : []

  // 表示する職種名（sourceによって異なる）
  const displayJobNames = source === "f4" ? ["セキュリティエンジニア/コンサルタント"] : jobNamesFromF7

  // 静的なサンプルデータ（UIデモ用）
  const samplePersonnel: Personnel[] = [
    {
      id: "1",
      name: "鈴木 一郎",
      title: "製造業の基幹システム刷新を牽引できるプロジェクトマネージャー",
      executiveSummary:
        "製造業の基幹システム刷新PMとして、要件定義から運用移行まで一貫支援。業務プロセス最適化やベンダー管理、リスクマネジメントに強みを持ち、システム刷新の成功を牽引。円滑なプロジェクト推進を実現し、事業成長に貢献。",
      tags: ["#ITコンサル/PM・PMO", "#製造業", "#ERP"],
      mindset: [
        "・顧客価値を最優先に考え、粘り強く成果を追求",
        "・課題を自ら発見し、論理的に解決へ導く",
        "・業界特性を理解し、柔軟かつ適応力の高い対応を行う",
        "・新しい技術や知識に対し、探求心を持ち継続的に学ぶ",
        "・関係者との信頼関係を重視し、誠実で円滑な協力を促す",
      ],
      experience: [
        "・大学卒業（情報工学専攻）：IT基盤やシステム開発を学ぶ",
        "・SIerに入社：基幹システム開発に従事し、要件定義や設計を担当。",
        "・大手製造業向けSE：業務改革やシステム刷新プロジェクトを主導。",
        "・ITコンサル企業に転職：ERP導入や業務プロセス最適化を支援。",
        "・フリーランスとして独立：各業界で基幹システム刷新PMとして活動中。",
      ],
      supportAreas: [
        "・基幹システム刷新のPM支援：SIerや社内SEの経験を活かし、要件定義から運用移行まで統括。ただし、細かなプログラミング作業は担当不可。",
        "・業務プロセス最適化：製造業の業務改革プロジェクトを主導し、実践的な改善提案が可能。ただし、単独での業務コンサル対応範囲外。",
        "・ベンダー選定・管理：ITコンサルの経験から、RFP作成や契約交渉、進捗管理を支援。",
        "・リスクマネジメント：大規模システム導入の失敗経験を基に、リスク予測と対策立案を実施。",
        "・ステークホルダー調整・合意形成：社内SE時代に各部門と調整し、スムーズな導入を実現。",
      ],
      imageUrl: "/images/personnel-1.png",
    },
    {
      id: "2",
      name: "佐藤 次郎",
      title: "セキュリティ対策とゼロトラストモデル導入のスペシャリスト",
      executiveSummary:
        "企業のセキュリティ体制強化に特化したコンサルタント。ゼロトラストセキュリティモデルの設計と導入、ID管理の一元化、セキュリティポリシーの策定と運用に強み。グローバル企業での経験を活かし、複雑な環境下でも効果的なセキュリティ対策を実現。",
      tags: ["#セキュリティエンジニア/コンサルタント", "#ゼロトラスト", "#ID管理"],
      mindset: [
        "・セキュリティとユーザビリティのバランスを重視",
        "・常に最新の脅威情報を収集し、先回りした対策を検討",
        "・ビジネス目標を理解し、過剰対策を避けた適切なセキュリティ設計",
        "・組織文化を尊重し、受け入れられやすいセキュリティ施策を提案",
        "・教育と啓発活動を通じて、セキュリティ文化の醸成を支援",
      ],
      experience: [
        "・情報セキュリティ専攻の修士課程修了：最新のセキュリティ技術を研究",
        "・大手SIerのセキュリティ部門：多様な業界のセキュリティ対策を担当",
        "・グローバル企業のCISOオフィス：全社セキュリティ戦略の立案と実行",
        "・セキュリティコンサルティング企業：ゼロトラストモデル導入プロジェクトをリード",
        "・独立コンサルタント：企業のセキュリティ体制構築と運用改善を支援",
      ],
      supportAreas: [
        "・ゼロトラストセキュリティモデルの設計と導入：境界防御からID中心のセキュリティへの移行を支援",
        "・ID管理とアクセス制御の最適化：適切な認証・認可の仕組み構築によるセキュリティ強化",
        "・セキュリティポリシーの策定：組織の実情に合わせた実効性の高いポリシー作成",
        "・インシデント対応計画の策定：セキュリティ事故発生時の対応手順と体制の整備",
        "・セキュリティ教育・啓発活動：従業員のセキュリティ意識向上プログラムの設計と実施",
      ],
      imageUrl: "/images/personnel-2.png",
    },
    {
      id: "3",
      name: "田中 三郎",
      title: "クラウドセキュリティとコンプライアンス対応のエキスパート",
      executiveSummary:
        "クラウド環境のセキュリティ設計と監査に精通したスペシャリスト。AWS/Azure/GCPなどのマルチクラウド環境におけるセキュリティ対策とコンプライアンス対応が強み。DevSecOpsの導入支援や自動化されたセキュリティ監視体制の構築を通じて、安全なクラウド活用を実現。",
      tags: ["#セキュリティエンジニア/コンサルタント", "#クラウドセキュリティ", "#コンプライアンス"],
      mindset: [
        "・セキュリティを開発プロセスの一部として組み込む発想",
        "・自動化と効率化を重視し、持続可能なセキュリティ体制を構築",
        "・リスクベースアプローチによる優先順位付けと資源の最適配分",
        "・法規制の背景と意図を理解し、形式的ではなく本質的な対応を追求",
        "・技術と運用の両面からセキュリティを捉え、総合的な対策を設計",
      ],
      experience: [
        "・コンピュータサイエンス専攻：セキュリティと暗号理論を学ぶ",
        "・クラウドプロバイダーのセキュリティチーム：クラウドサービスのセキュリティ設計",
        "・金融機関のIT部門：規制対応とセキュリティ監査の経験",
        "・セキュリティコンサルティング：様々な業界のクラウド移行時のセキュリティ対策を支援",
        "・独立コンサルタント：DevSecOps導入とクラウドセキュリティガバナンス構築を専門に活動",
      ],
      supportAreas: [
        "・クラウドセキュリティアーキテクチャの設計：安全なクラウド環境の構築と運用",
        "・セキュリティコンプライアンス対応：GDPR、PCI DSS、NIST等の規制対応支援",
        "・DevSecOpsの導入支援：開発パイプラインへのセキュリティ統合と自動化",
        "・クラウドセキュリティ監査：設定ミスや脆弱性の検出と改善提案",
        "・セキュリティ監視体制の構築：インシデント検知と対応プロセスの確立",
      ],
      imageUrl: "/images/personnel-3.png",
    },
  ]

  // 選択された人材を管理する状態
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>([])

  // 人材の選択/選択解除を処理する関数
  const togglePersonnelSelection = (id: string) => {
    if (selectedPersonnel.includes(id)) {
      setSelectedPersonnel(selectedPersonnel.filter((personId) => personId !== id))
    } else {
      setSelectedPersonnel([...selectedPersonnel, id])
    }
  }

  // エージェント相談ボタンのクリックハンドラ - F8ページに遷移
  const handleConsultClick = () => {
    if (selectedPersonnel.length > 0) {
      // デバッグ用コンソールログ
      console.log("F8ページへ遷移します")

      // Next.jsのルーターを使用して遷移
      router.push("/f8?mode=consult")
    } else {
      alert("人材を選択してください")
    }
  }

  return (
    <div className="min-h-screen pb-10 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 pt-8">
        <h1 className="text-3xl font-bold mb-8 text-[#2D2D2D] text-center">プロ人材スキルサマリー</h1>

        {/* 事例情報の表示（F4からの遷移の場合） */}
        {source === "f4" && caseTitle && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">関連事例:</h2>
            <p className="font-medium">{caseTitle}</p>
            {caseIndustry && <p className="text-sm text-gray-600">業種: {caseIndustry}</p>}
            {caseChallenge && <p className="text-sm text-gray-600">課題: {caseChallenge}</p>}
          </div>
        )}

        {/* 選択された職種の表示 */}
        {displayJobNames.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">選択された職種:</h2>
            <div className="flex flex-wrap gap-2">
              {displayJobNames.map((name, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md text-[#2D2D2D]">
          <div className="grid grid-cols-1 gap-8">
            {samplePersonnel.map((person) => (
              <div
                key={person.id}
                className={`border rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPersonnel.includes(person.id) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => togglePersonnelSelection(person.id)}
              >
                {/* タイトル */}
                <h2 className="text-xl font-bold mb-4 text-center">{person.title}</h2>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* 左側：プロフィール写真 */}
                  <div className="md:w-1/5">
                    <img
                      src={person.imageUrl || "/placeholder.svg"}
                      alt={`${person.name}のプロフィール写真`}
                      className="w-full aspect-square object-cover"
                    />
                  </div>

                  {/* 右側：エグゼクティブサマリー */}
                  <div className="md:w-4/5">
                    <h3 className="text-blue-500 font-medium mb-2">エグゼクティブサマリー</h3>
                    <p className="mb-4">{person.executiveSummary}</p>

                    {/* マッチ度表示（f4経由の場合のみ） */}
                    {source === "f4" && (
                      <div className="mt-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          マッチ度: {Math.round(70 + Math.random() * 20)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3列のスキル情報 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {/* マインドセット */}
                  <div className="bg-blue-200 p-4 rounded">
                    <h3 className="text-center font-bold mb-4">マインドセット</h3>
                    <div className="text-sm">
                      {person.mindset.map((item, index) => (
                        <p key={index} className="mb-2">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* 経歴 */}
                  <div className="bg-blue-200 p-4 rounded">
                    <h3 className="text-center font-bold mb-4">経歴</h3>
                    <div className="text-sm">
                      {person.experience.map((item, index) => (
                        <p key={index} className="mb-2">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* 支援可能領域 */}
                  <div className="bg-blue-200 p-4 rounded">
                    <h3 className="text-center font-bold mb-4">支援可能領域</h3>
                    <div className="text-sm">
                      {person.supportAreas.map((item, index) => (
                        <p key={index} className="mb-2">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hiprotechの表記 */}
                <div className="text-right text-xs text-gray-500 mt-4">
                  ※Hiprotechの独自の情報をもとにした架空の人材です
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="action-button" onClick={handleConsultClick} disabled={selectedPersonnel.length === 0}>
            <span className="link-text">選択中の人材に関してエージェントに相談</span>
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
