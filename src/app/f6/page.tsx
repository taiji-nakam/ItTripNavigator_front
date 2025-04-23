"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useCommon } from "../../../contexts/commonContext"

// 追加: 既に使用された画像を追跡するための配列（ページ表示ごとにリセット）
const usedProfileImages: number[] = []

// ランダムなプロフィール画像のパスを返す関数
function getRandomProfileImage(): string {
  // 使用可能な画像の数（1から10）
  const totalImages = 10

  // 全ての画像が使用済みの場合はリセット
  if (usedProfileImages.length >= totalImages) {
    usedProfileImages.length = 0
  }

  // 未使用の画像番号のみを候補とする
  const availableNumbers: number[] = []
  for (let i = 1; i <= totalImages; i++) {
    if (!usedProfileImages.includes(i)) {
      availableNumbers.push(i)
    }
  }

  // 利用可能な画像からランダムに1つ選択
  const randomIndex = Math.floor(Math.random() * availableNumbers.length)
  const selectedNumber = availableNumbers[randomIndex]

  // 使用済みリストに追加
  usedProfileImages.push(selectedNumber)

  // 数字を丸数字に変換する配列
  const circledNumbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"]

  // 対応する画像のパスを返す（0から始まるインデックスなので-1する）
  return `/pfimage${circledNumbers[selectedNumber - 1]}.png`
}

// 人材データの型定義
interface Personnel {
  id: string
  name: string
  title: string
  executiveSummary: string
  summary: string
  industry: string
  career: string
  mindset: string
  supportarea: string
  job: string
  hashtag: string
  imageUrl: string
}

export default function F6Page() {
  const router = useRouter()
  const { common, setCommon } = useCommon()

  // APIから取得した人材データの状態
  const [personnelList, setPersonnelList] = useState<Personnel[]>([])

  // 変更箇所1: 選択された人材IDを配列から単一の文字列に変更
  const [selectedPersonnelId, setSelectedPersonnelId] = useState<string | null>(null)

  // 人材IDと画像パスのマッピングを保持するステート変数
  const [profileImageMap, setProfileImageMap] = useState<Record<string, string>>({})

  // 初回レンダリングを追跡するためのref
  const isInitialRender = useRef(true)

  // コンポーネントマウント時に使用済み画像リストをリセット
  useEffect(() => {
    // ページ表示時に使用済み画像リストをリセット
    usedProfileImages.length = 0

    // 初回レンダリングフラグをリセット
    isInitialRender.current = true

    // 画像マッピングをクリア
    setProfileImageMap({})
  }, [])

  // ページ表示時に API を呼び出して人材データを取得する
  useEffect(() => {
    async function fetchPersonnel() {
      if (!common) {
        console.log("common が設定されていません")
        return
      }
      const search_id = common.search_id
      const search_id_sub = common.search_id_sub

      if (!search_id || !search_id_sub) {
        console.log("common の search_id, search_id_sub が不足しています")
        return
      }
      const endpoint =
        process.env.NEXT_PUBLIC_API_ENDPOINT + `/searchResults?search_id=${search_id}&search_id_sub=${search_id_sub}`
      console.log("Fetching personnel from:", endpoint)

      try {
        const res = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()
        if (res.status === 200) {
          setPersonnelList(data)
        } else {
          alert(data.message)
        }
      } catch (error: unknown) {
        console.error("Error fetching personnel data:", error)
        alert("人材データ取得でエラーが発生しました: " + String(error))
      }
    }
    fetchPersonnel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 人材データが取得されたら、各人材に画像を割り当てる
  useEffect(() => {
    if (personnelList.length > 0 && isInitialRender.current) {
      const newImageMap: Record<string, string> = {}

      // 各人材にランダムな画像を割り当てる
      personnelList.forEach((person) => {
        if (person.id && !newImageMap[person.id]) {
          newImageMap[person.id] = getRandomProfileImage()
        }
      })

      setProfileImageMap(newImageMap)
      isInitialRender.current = false
    }
  }, [personnelList])

  // フィルタリング：
  //  - person.id が空なら除外
  //  - person.summary が空文字 or "No" or "undefined"（大小無視）なら除外
  const filteredPersonnel = personnelList.filter((person) => {
    const hasId = person.id && person.id.trim() !== ""

    const normalizedSummary = person.summary?.trim().toLowerCase() || ""
    // summary が空文字、"no"、または"undefined" の場合は除外
    const isSummaryValid = normalizedSummary !== "" && normalizedSummary !== "no" && normalizedSummary !== "undefined"

    return hasId && isSummaryValid
  })

  // 変更箇所2: 人材の選択処理を単一選択に変更
  const selectPersonnel = (id: string) => {
    // 既に選択されている場合は選択解除、そうでなければ新しく選択
    setSelectedPersonnelId(selectedPersonnelId === id ? null : id)
  }

  // 変更箇所3: エージェントに相談ボタンのクリックハンドラを修正
  const handleConsultClick = async () => {
    if (selectedPersonnelId) {
      console.log("選択された人材:", selectedPersonnelId)
      const payload = {
        search_id: common?.search_id,
        search_id_sub: common?.search_id_sub,
        talent_id: Number.parseInt(selectedPersonnelId),
      }

      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/setTalent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (res.status === 200) {
          // API から戻ってきた search_id_sub を common に更新
          setCommon((prev) => ({ ...prev, search_id_sub: data }))
          setCommon((prev) => ({ ...prev, actionType: 1 })) //エージェントへ相談モードでf8へ遷移
          router.push("/f8?mode=consult")
        } else {
          alert("SearchTalent API error: " + data.message)
        }
      } catch (error: unknown) {
        console.error("Error calling searchTalent API:", error)
        alert("検索履歴登録でエラーが発生しました: " + String(error))
      }
    } else {
      alert("人材を選択してください")
    }
  }

  return (
    <div className="min-h-screen pb-10 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 pt-8">
        <h1 className="text-3xl font-bold mb-16 text-[#2D2D2D] text-center">プロ人材スキルサマリー</h1>

        {/* 関連情報の表示 */}
        {common?.search_mode === 0 && common?.caseTitle && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">関連事例:</h2>
            <p className="font-medium">{common.caseTitle}</p>
            {common.caseCompanySummary && (
              <p className="text-sm text-gray-600">企業概要: {common.caseCompanySummary}</p>
            )}
            {common.caseChallenge && <p className="text-sm text-gray-600">課題: {common.caseChallenge}</p>}
          </div>
        )}
        {common?.search_mode === 1 && common?.job_name && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">選択された職種:</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{common.job_name}</span>
            </div>
          </div>
        )}

        {/* 人材一覧パネル */}
        <div className="bg-white p-6 rounded-lg shadow-md text-[#2D2D2D]">
          <div className="grid grid-cols-1 gap-8">
            {filteredPersonnel.length > 0 ? (
              filteredPersonnel.map((person) => {
                // 画像パスをマッピングから取得（なければプレースホルダー）
                const profileImagePath = profileImageMap[person.id] || "/placeholder.svg"

                // マインドセット
                const mindsetIsEmpty = !person.mindset || person.mindset.trim() === ""
                const displayMindset = mindsetIsEmpty && person.job ? person.job : person.mindset
                const mindsetTitle = mindsetIsEmpty && person.job ? "保有職種" : "マインドセット"

                // 経歴
                const careerIsEmpty = !person.career || person.career.trim() === ""
                const displayCareer = careerIsEmpty && person.job ? person.job : person.career
                const careerTitle = careerIsEmpty && person.job ? "保有職種" : "経歴"

                // 支援可能領域
                const supportIsEmpty = !person.supportarea || person.supportarea.trim() === ""
                const displaySupport = supportIsEmpty && person.job ? person.job : person.supportarea
                const supportTitle = supportIsEmpty && person.job ? "保有職種" : "支援可能領域"

                // 変更箇所4: 選択状態の判定を変更
                const isSelected = selectedPersonnelId === person.id

                return (
                  <div
                    key={person.id}
                    className={`border rounded-lg p-6 cursor-pointer transition-all ${
                      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => selectPersonnel(person.id)}
                  >
                    {/* タイトルとプロフィール写真を同じ行に配置 */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-center md:text-left">{person.name}</h2>

                      {/* プロフィール写真 - タイトルと同じ行に配置 */}
                      <div className="w-24 h-24 mt-4 md:mt-0">
                        <img
                          src={profileImagePath || "/placeholder.svg"}
                          alt={`${person.name} のプロフィール写真`}
                          className="w-full h-full object-cover rounded-lg shadow-sm"
                          onError={(e) => {
                            // エラー時のフォールバック
                            e.currentTarget.src = "/diverse-group-city.png"
                          }}
                        />
                      </div>
                    </div>

                    {/* エグゼクティブサマリー - 写真の下に移動したので、ここは全幅で表示 */}
                    <div className="mb-6">
                      <h3 className="text-blue-500 font-medium mb-2">エグゼクティブサマリー</h3>
                      <p className="mb-4">{person.summary}</p>
                    </div>

                    {/* 3列のスキル情報 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-200 p-4 rounded">
                        <h3 className="text-center font-bold mb-4">{mindsetTitle}</h3>
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
                        <h3 className="text-center font-bold mb-4">{careerTitle}</h3>
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
                        <h3 className="text-center font-bold mb-4">{supportTitle}</h3>
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
                )
              })
            ) : (
              <p>該当する人材がありません</p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-16">
          {/* 変更箇所5: ボタンの無効化条件を変更 */}
          <button className="action-button" onClick={handleConsultClick} disabled={!selectedPersonnelId}>
            <span className="link-text">選択中の人材に関してエージェントに相談</span>
          </button>

          {/* 事例詳細に戻るボタン */}
          <button className="action-button" onClick={() => router.push("/f4")}>
            <span className="link-text">事例詳細に戻る</span>
          </button>
        </div>
      </div>

      {/* ボタンスタイル */}
      <style jsx>{`
        .action-button {
          background-color: white;
          border: 5px solid #ddd;
          border-radius: 20px;
          padding: 15px;
          text-align: center;
          width: 250px;
          min-height: 100px;
          text-decoration: none;
          color: #333;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .action-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          border-color: #4a90e2;
          background-color: #f8f9fa;
        }
        .action-button:hover .link-text {
          color: #4a90e2;
        }
        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
          border-color: #ddd;
        }
        .link-text {
          display: block;
          color: rgb(11, 11, 11);
          font-size: 16px;
          margin-top: 10px;
          width: 100%;
          text-align: center;
          transition: color 0.3s ease;
        }
      `}</style>
    </div>
  )
}
