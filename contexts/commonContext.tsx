"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 🔹 検索条件の型（search_idとしてまとめる）
export type SearchConditions = {
  industry_id: number;
  company_size_id: number;
  department_id: number;
  theme_id: number;
};

// 🔹 共通データの型（search_idはSearchConditions型へ変更）
export type Common = {
  search_id?: SearchConditions;  // ← ここが変更点
  actionType?: number;
};

// Context の型
type CommonContextType = {
  common: Common | null;
  setCommon: (common: Common) => void;
};

// Context作成
const CommonContext = createContext<CommonContextType | undefined>(undefined);

// Provider コンポーネント
export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [common, setCommon] = useState<Common | null>({
    // 初期値を0で埋めた検索条件で設定
    search_id: {
      industry_id: 0,
      company_size_id: 0,
      department_id: 0,
      theme_id: 0,
    },
    actionType: 0,
  });

  return (
    <CommonContext.Provider value={{ common, setCommon }}>
      {children}
    </CommonContext.Provider>
  );
};

// Hook
export const useCommon = () => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("useCommon must be used within a CommonProvider");
  }
  return context;
};
