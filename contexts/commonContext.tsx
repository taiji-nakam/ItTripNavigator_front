import { createContext, useContext, useState, ReactNode } from "react";

// ページ間で共有するデータを定義
// 　　--検索ID：検索開始時に発行し画面間で共有する     2025.03.09 TaiG
// 　　--アクションタイプ： 0:戦略文書,1:Agent　       2025.03.09 TaiG

// 共通 データの型定義
export type Common = {
  search_id?: number;
  actionType?: number;
};

// Context の型定義
type TaxContextType = {
  common: Common | null;
  setCommon: (common: Common) => void;
};

// Context を作成
const TaxContext = createContext<TaxContextType | undefined>(undefined);

// Provider コンポーネント
export const CommonProvider = ({ children }: { children: ReactNode }) => {
  // デフォルト値として { search_id: 0, actionType: 0 } を設定
  const [common, setCommon] = useState<Common | null>({
    search_id: 0,
    actionType: 0,
  });

  return (
    <TaxContext.Provider value={{ common, setCommon }}>
      {children}
    </TaxContext.Provider>
  );
};

// Context を簡単に利用できるようにする Hook
export const useCommon = () => {
  const context = useContext(TaxContext);
  if (!context) {
    throw new Error("useTax must be used within a TaxProvider");
  }
  return context;
};
