"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction  } from "react";

// 🔹 検索条件の型（search_idとしてまとめる）
// export type SearchConditions = {
//   industry_id: number;
//   company_size_id: number;
//   department_id: number;
//   theme_id: number;
// };

// 🔹 共通データの型（search_idはSearchConditions型へ変更）
export type Common = {
  // search_id?: SearchConditions;  // ← ここが変更点
  search_id?: number;
  search_id_sub?: number;
  actionType?: number;
  document_id?: number;
};

// Context の型
type CommonContextType = {
  common: Common | null;
  setCommon: Dispatch<SetStateAction<Common | null>>;
};

// Context作成
const CommonContext = createContext<CommonContextType | undefined>(undefined);

// Provider コンポーネント
export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [common, setCommon] = useState<Common | null>({
    // // 初期値を0で埋めた検索条件で設定
    // search_id: {
    //   industry_id: 0,
    //   company_size_id: 0,
    //   department_id: 0,
    //   theme_id: 0,
    // },
    search_id: 0,
    search_id_sub: 0,
    actionType: 0,
    document_id: 0,
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
