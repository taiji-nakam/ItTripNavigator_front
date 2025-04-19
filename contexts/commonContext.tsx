"use client"

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react"

// 🔹 検索条件の型（selectionとしてまとめる）
// export type SearchConditions = {
//   industry_id: number;
//   company_size_id: number;
//   department_id: number;
//   theme_id: number;
// };

// 🔹 共通データの型（search_idはSearchConditions型へ変更）
export type Common = {
  // selection?: SearchConditions;  // ← ここが変更点
  search_id?: number;
  search_id_sub?: number;
  actionType?: number;
  document_id?: number;
  industry_id?: number;
  company_size_id?: number;
  department_id?: number;
  theme_id?: number;
  search_mode?:number;
  job_name?: string;
  caseTitle?: string;
  caseCompanySummary?:string;
  caseChallenge?:string;
  timing?:string;
  domain?:string;
  free_word?:string;
};

// Context の型
type CommonContextType = {
  common: Common | null
  setCommon: Dispatch<SetStateAction<Common | null>>
}

// Context作成
const CommonContext = createContext<CommonContextType | undefined>(undefined)

// Provider コンポーネント
export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [common, setCommon] = useState<Common | null>({
    // 初期値を0で埋めた検索条件で設定
    // selection: {
    //   industry_id: 0,
    //   company_size_id: 0,
    //   department_id: 0,
    //   theme_id: 0,
    // },
    search_id: 0,
    search_id_sub: 0,
    actionType: 0,
    document_id: 0,
    industry_id: 0,
    company_size_id: 0,
    department_id: 0,
    theme_id: 0,
    search_mode: 0,
    job_name: "",
    caseTitle: "",
    caseCompanySummary: "",
    caseChallenge: "",
    timing:"",
    domain:"",
    free_word:"",
  });

  return <CommonContext.Provider value={{ common, setCommon }}>{children}</CommonContext.Provider>
}

// Hook
export const useCommon = () => {
  const context = useContext(CommonContext)
  if (!context) {
    throw new Error("useCommon must be used within a CommonProvider")
  }
  return context
}
