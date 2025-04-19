"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Dropdown from "../../components/Dropdown"
import CaseCard from "../../components/CaseCard"
import { useCommon } from "../../../contexts/commonContext"

// 各選択肢の型定義
type IndustryItem = { industry_id: number; industry_name: string }
type CompanySizeItem = { company_size_id: number; company_size_name: string }
type DepartmentItem = { department_id: number; department_name: string }
type ThemeItem = { theme_id: number; theme_name: string }

type IssueOptions = {
  industry: IndustryItem[]
  company_size: CompanySizeItem[]
  department: DepartmentItem[]
  theme: ThemeItem[]
}

type CaseItem = {
  case_id: number
  case_name: string
  case_summary: string
}

const F3Page: React.FC = () => {
  const router = useRouter()
  const { common, setCommon } = useCommon()

  // ドロップダウン選択肢の状態
  const [options, setOptions] = useState<IssueOptions>({
    industry: [],
    company_size: [],
    department: [],
    theme: [],
  })

  // ドロップダウンの選択値（初期値は common に保存されている値があればそれを使用）
  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    common?.industry_id ? common.industry_id.toString() : "",
  )
  const [selectedCompanySize, setSelectedCompanySize] = useState<string>(
    common?.company_size_id ? common.company_size_id.toString() : "",
  )
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    common?.department_id ? common.department_id.toString() : "",
  )
  const [selectedTheme, setSelectedTheme] = useState<string>(common?.theme_id ? common.theme_id.toString() : "")

  // [追加] common の各値が変化したら、local state を更新してドロップダウン表示を再同期
  useEffect(() => {
    setSelectedIndustry(common?.industry_id ? common.industry_id.toString() : "")
    setSelectedCompanySize(common?.company_size_id ? common.company_size_id.toString() : "")
    setSelectedDepartment(common?.department_id ? common.department_id.toString() : "")
    setSelectedTheme(common?.theme_id ? common.theme_id.toString() : "")
  }, [common?.industry_id, common?.company_size_id, common?.department_id, common?.theme_id])

  // 事例リストの状態
  const [caseList, setCaseList] = useState<CaseItem[]>([])

  // 初回ロード時： /allIssues API を呼び出して選択肢をセットする
  useEffect(() => {
    async function fetchOptions() {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + "/allIssues"
      try {
        const res = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()
        setOptions({
          industry: data.industry || [],
          company_size: data.company_size || [],
          department: data.department || [],
          theme: data.theme || [],
        })
      } catch (error: unknown) {
        console.error("Error fetching issue options:", error)
        alert("選択肢データの取得でエラーが発生しました: " + String(error))
      }
    }
    fetchOptions()
  }, [])

  // 画面表示時 /cases API を呼び出して事例リストを取得する
  useEffect(() => {
    async function fetchCaseList() {
      if (!common) {
        console.log("common が設定されていません")
        return
      }
      const endpoint =
        process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/cases?search_id=${common.search_id}&search_id_sub=${common.search_id_sub}`
      try {
        const res = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()
        if (res.status === 200) {
          setCaseList(data)
        } else {
          alert(data.message)
        }
      } catch (error: unknown) {
        console.error("Error fetching case list:", error)
        alert("事例リスト取得でエラーが発生しました: " + String(error))
      }
    }
    fetchCaseList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ドロップダウンの変更時：選択値を common に更新
  const handleDropdownChange = () => {
    setCommon((prev) => ({
      ...prev,
      industry_id: selectedIndustry ? Number.parseInt(selectedIndustry) : 0,
      company_size_id: selectedCompanySize ? Number.parseInt(selectedCompanySize) : 0,
      department_id: selectedDepartment ? Number.parseInt(selectedDepartment) : 0,
      theme_id: selectedTheme ? Number.parseInt(selectedTheme) : 0,
    }))
  }

  // 「事例を再検索する」ボタン押下時の処理
  const handleSearchCase = async () => {
    // payload を作成
    const payload = {
      search_id: common?.search_id,
      search_id_sub: common?.search_id_sub,
      industry_id: selectedIndustry ? Number.parseInt(selectedIndustry) : undefined,
      company_size_id: selectedCompanySize ? Number.parseInt(selectedCompanySize) : undefined,
      department_id: selectedDepartment ? Number.parseInt(selectedDepartment) : undefined,
      theme_id: selectedTheme ? Number.parseInt(selectedTheme) : undefined,
      case_id: null,
    }
    try {
      // ① /searchCase API（POST）を呼び出す
      const resSearch = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/searchCase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const searchData = await resSearch.json()
      if (resSearch.status === 200) {
        // ② common を更新
        setCommon((prev) => ({
          ...prev,
          search_id: searchData.search_id,
          search_id_sub: searchData.search_id_sub,
          industry_id: selectedIndustry ? Number.parseInt(selectedIndustry) : 0,
          company_size_id: selectedCompanySize ? Number.parseInt(selectedCompanySize) : 0,
          department_id: selectedDepartment ? Number.parseInt(selectedDepartment) : 0,
          theme_id: selectedTheme ? Number.parseInt(selectedTheme) : 0,
        }))

        // ③ /cases API（GET）を呼び出して、事例リストを再取得する
        const endpointCases =
          process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/cases?search_id=${searchData.search_id}&search_id_sub=${searchData.search_id_sub}`
        const resCases = await fetch(endpointCases, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const caseData = await resCases.json()
        if (resCases.status === 200) {
          setCaseList(caseData)
        } else if (resCases.status === 404) {
          alert("条件に該当する事例がありません。\n条件を変更してお試しください。")
        } else {
          alert(caseData.message)
        }
      } else {
        alert("SearchCase API error: " + searchData.message)
      }
    } catch (error: unknown) {
      console.error("Error in searchCase API:", error)
      alert("SearchCase API 呼び出しでエラーが発生しました: " + String(error))
    }
  }

  // CaseCard の「続きを読む」がクリックされた場合の処理
  const handleDtlClick = async (caseId: number) => {
    const payload = {
      search_id: common?.search_id,
      search_id_sub: common?.search_id_sub,
      case_id: caseId,
    }
    console.log(payload)
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.status === 200) {
        setCommon((prev) => ({ ...prev, search_id: data.search_id }))
        setCommon((prev) => ({ ...prev, search_id_sub: data.search_id_sub }))
        router.push("/f4")
      } else {
        alert("Case更新エラー: " + data.message)
      }
    } catch (error: unknown) {
      console.error("Error updating case:", error)
      alert("ケース更新でエラーが発生しました: " + String(error))
    }
  }

  return (
    <section className="section-container">
      <h2 className="section-title">事例一覧</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左側：各種ドロップダウン */}
        <div className="flex flex-col gap-2 w-full md:w-1/5">
          <Dropdown
            label="業界を指定する"
            selected={selectedIndustry}
            onSelect={(value: string) => {
              setSelectedIndustry(value)
              handleDropdownChange()
            }}
            items={options.industry.map((item) => ({
              id: item.industry_id.toString(),
              name: item.industry_name,
            }))}
          />
          <Dropdown
            label="売上規模を指定する"
            selected={selectedCompanySize}
            onSelect={(value: string) => {
              setSelectedCompanySize(value)
              handleDropdownChange()
            }}
            items={options.company_size.map((item) => ({
              id: item.company_size_id.toString(),
              name: item.company_size_name,
            }))}
          />
          <Dropdown
            label="部署を指定する"
            selected={selectedDepartment}
            onSelect={(value: string) => {
              setSelectedDepartment(value)
              handleDropdownChange()
            }}
            items={options.department.map((item) => ({
              id: item.department_id.toString(),
              name: item.department_name,
            }))}
          />
          <Dropdown
            label="テーマを指定する"
            selected={selectedTheme}
            onSelect={(value: string) => {
              setSelectedTheme(value)
              handleDropdownChange()
            }}
            items={options.theme.map((item) => ({
              id: item.theme_id.toString(),
              name: item.theme_name,
            }))}
          />
          <button
            className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm flex justify-center items-center transition-colors"
            onClick={handleSearchCase}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            事例を再検索する
          </button>
        </div>

        {/* 右側：事例一覧 */}
        {/* 👇 変更: 事例一覧の間隔を広げる */}
        <div className="flex flex-col gap-6 w-full md:w-4/5">
          {caseList.length > 0 ? (
            caseList
              .slice(0, 10)
              .map((item) => (
                <CaseCard
                  key={item.case_id}
                  title={item.case_name}
                  description={item.case_summary}
                  onClick={() => handleDtlClick(item.case_id)}
                />
              ))
          ) : (
            <p>該当する事例がありません</p>
          )}
        </div>
        {/* 👆 変更: 事例一覧の間隔を広げるここまで */}
      </div>
      <style jsx>{`
        .section-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </section>
  )
}

export default F3Page


