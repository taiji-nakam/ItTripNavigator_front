// F2 事例検索情報入力
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Dropdown from "../../components/Dropdown"
import Link from "next/link"
import { useCommon } from "../../../contexts/commonContext"
import Image from "next/image" // img の警告回避用

// # 型定義追加（any回避用）
type DropdownItem = {
  id: string;
  name: string;
};

type IndustryItem = { industry_id: number; industry_name: string };
type CompanySizeItem = { company_size_id: number; company_size_name: string };
type DepartmentItem = { department_id: number; department_name: string };
type ThemeItem = { theme_id: number; theme_name: string };

type CaseItem = {
  case_id: number;
  case_name: string;
  case_summary: string;
};

// # 代表事例選択時のAPIレスポンス型
type SearchCaseResponse = {
  search_id: number;
  search_id_sub: number;
};

const Itnavi: React.FC = () => {
  const router = useRouter()
  const [isSearchHover, setIsSearchHover] = useState(false)
  const [industryId, setIndustryId] = useState("")
  const [companySizeId, setCompanySizeId] = useState("")
  const [departmentId, setDepartmentId] = useState("")
  const [themeId, setThemeId] = useState("")
  const { common, setCommon } = useCommon()

  const [industryItems, setIndustryItems] = useState<DropdownItem[]>([])
  const [companySizeItems, setCompanySizeItems] = useState<DropdownItem[]>([])
  const [departmentItems, setDepartmentItems] = useState<DropdownItem[]>([])
  const [themeItems, setThemeItems] = useState<DropdownItem[]>([])
  const [featuredCases, setFeaturedCases] = useState<CaseItem[]>([])

  useEffect(() => {
    // 画面表示時処理
    // common debug
    if (common) {
      console.log("common.search_id:", common.search_id)
      console.log("common.search_id:", common.search_id_sub)
    } else {
      console.log("common is null")
    }

    // # Action:/allIssues​
    const fetchAllIssues = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/allIssues`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error("Failed to fetch issues data")
        }

        const json = await res.json()

        // ドロップダウンのアイテムを設定
        setIndustryItems(
          json.industry.map((item: IndustryItem) => ({
            id: item.industry_id.toString(),
            name: item.industry_name,
          }))
        )

        setCompanySizeItems(
          json.company_size.map((item: CompanySizeItem) => ({
            id: item.company_size_id.toString(),
            name: item.company_size_name,
          }))
        )

        setDepartmentItems(
          json.department.map((item: DepartmentItem) => ({
            id: item.department_id.toString(),
            name: item.department_name,
          }))
        )

        setThemeItems(
          json.theme.map((item: ThemeItem) => ({
            id: item.theme_id.toString(),
            name: item.theme_name,
          }))
        )
      } catch (error) {
        console.error("Error fetching issues data:", error)
      }
    }

    // # Action:/cases/featured
    const fetchFeaturedCases = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cases/featured`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error("Failed to fetch featured cases")
        }

        const json = await res.json()
        setFeaturedCases(json)
      } catch (error) {
        console.error("Error fetching featured cases:", error)
      }
    }

    fetchAllIssues()
    fetchFeaturedCases()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // # 検索ボタン押下時の処理
  const handleGoClick = async () => {
    try {
      // # Action:/searchCase
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/searchCase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_id: common?.search_id ?? null,
          search_id_sub: common?.search_id_sub ?? null,
          industry_id: industryId ? Number.parseInt(industryId) : null,
          company_size_id: companySizeId ? Number.parseInt(companySizeId) : null,
          department_id: departmentId ? Number.parseInt(departmentId) : null,
          theme_id: themeId ? Number.parseInt(themeId) : null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit search parameters")
      }

      const data: SearchCaseResponse = await response.json()

      // # common更新
      setCommon((prev) => ({
        ...prev,
        search_id: data.search_id,
        search_id_sub: data.search_id_sub,
        industry_id: industryId ? Number.parseInt(industryId) : 0,
        company_size_id: companySizeId ? Number.parseInt(companySizeId) : 0,
        department_id: departmentId ? Number.parseInt(departmentId) : 0,
        theme_id: themeId ? Number.parseInt(themeId) : 0,
      }))

      const searchParams = new URLSearchParams({
        industry_id: industryId,
        company_size_id: companySizeId,
        department_id: departmentId,
        theme_id: themeId,
      })

      router.push(`/f3?${searchParams.toString()}`)
    } catch (error) {
      console.error("Error submitting search:", error)
    }
  }

  // # 代表事例選択時の処理（searchCaseDirect）
  const handleCaseClick = async (caseId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/searchCaseDirect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_id: common?.search_id ?? null,
          search_id_sub: common?.search_id_sub ?? null,
          case_id: caseId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to register direct case search")
      }

      const data: SearchCaseResponse = await response.json()

      // # common更新（search_id, search_id_sub）
      setCommon((prev) => ({
        ...prev,
        search_id: data.search_id,
        search_id_sub: data.search_id_sub,
      }))

      router.push(`/f4?case_id=${caseId}`)
    } catch (error) {
      console.error("Error selecting featured case:", error)
    }
  }

  return (
    <>
      <section className="section-container">
        {/* タイトル */}
        <h2 className="section-title">事例検索</h2>

        {/* レイアウト：左タイトル・右プルダウン */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* 左：代表的な事例ボックス */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {featuredCases.length > 0 ? (
              featuredCases.map((caseItem: CaseItem) => (
                <div key={caseItem.case_id} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-center mb-4">{caseItem.case_name}</h3>
                  <hr className="border-gray-300 mb-4" />
                  <p className="text-sm text-gray-700">{caseItem.case_summary}</p>
                  <button
                    onClick={() => handleCaseClick(caseItem.case_id)}
                    className="text-right text-xs text-gray-700 mt-4 cursor-pointer hover:text-gray-600 transition"
                  >
                    続きを読む
                  </button>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-center mb-4">クラウドERP導入による業務効率化とデータ活用</h3>
                  <hr className="border-gray-300 mb-4" />
                  <p className="text-sm text-gray-700">
                    製造・販売・在庫・会計などの業務システムをクラウドERPに統合し、リアルタイムのデータ活用と業務効率化を実現
                  </p>
                  <Link href="/f4">
                    <p className="text-right text-xs text-gray-700 mt-4 cursor-pointer hover:text-gray-600 transition">
                      続きを読む
                    </p>
                  </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-center mb-4">
                    ゼロトラストセキュリティの導入による情報漏洩対策
                  </h3>
                  <hr className="border-gray-300 mb-4" />
                  <p className="text-sm text-gray-700">
                    社内外からのアクセスをゼロトラストモデルに移行し、セキュリティリスクを最小化
                  </p>
                  <Link href="/f4">
                    <p className="text-right text-xs text-gray-700 mt-4 cursor-pointer hover:text-gray-600 transition">
                      続きを読む
                    </p>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* 右：プルダウン + 検索ボタン */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <Dropdown label="業界を指定する" selected={industryId} onSelect={setIndustryId} items={industryItems} />
            <Dropdown label="売上規模を指定する" selected={companySizeId} onSelect={setCompanySizeId} items={companySizeItems} />
            <Dropdown label="部署を指定する" selected={departmentId} onSelect={setDepartmentId} items={departmentItems} />
            <Dropdown label="テーマを指定する" selected={themeId} onSelect={setThemeId} items={themeItems} />

            {/* # 共通クラスでシンプル化 */}
            <button
              onClick={handleGoClick}
              onMouseEnter={() => setIsSearchHover(true)}
              onMouseLeave={() => setIsSearchHover(false)}
              className="btn"
            >
              <Image
                src={isSearchHover ? "/icon-searchbtn-hover.png" : "/icon-searchbtn.png"}
                alt="検索"
                width={24}
                height={24}
              />
              事例を検索する
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Itnavi
