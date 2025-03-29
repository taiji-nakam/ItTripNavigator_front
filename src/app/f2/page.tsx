// F2 事例検索情報入力
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "../../components/Dropdown";
import Link from "next/link";
import { useCommon} from "../../../contexts/commonContext"

const Itnavi: React.FC = () => {
  const router = useRouter();
  const [isSearchHover, setIsSearchHover] = useState(false);
  const [industryId, setIndustryId] = useState("");
  const [companySizeId, setCompanySizeId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [themeId, setThemeId] = useState("");
  const { common, setCommon } = useCommon();

  useEffect(() => {
    // 画面表示時処理
    // common debug
    if (common) {
      console.log("common.search_id:", common.search_id);
      console.log("common.search_id:", common.search_id_sub);
    } else {
      console.log("common is null");
    }
    // Action:/allIssues​
    // const res = await fetch(process.env.API_ENDPOINT + '/allIssues​', {
    // ・・・

    // Action:/casees/featured

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoClick = () => {
    const searchParams = new URLSearchParams({
      industry_id: industryId,
      company_size_id: companySizeId,
      department_id: departmentId,
      theme_id: themeId,
    });
    // Action:/searchCase


    // common更新
    setCommon((prev) => ({ ...prev, search_id: 789 }));
    setCommon((prev) => ({ ...prev, search_id_sub: 123 }));
    router.push(`/f3?${searchParams.toString()}`);
  };

  return (
    <>
      <section className="section-container">
        {/* タイトル */}
        <h2 className="section-title">事例検索</h2>

        {/* レイアウト：左タイトル・右プルダウン */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* 左：ダミータイトルボックス */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
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
              <h3 className="text-xl font-bold text-center mb-4">ゼロトラストセキュリティの導入による情報漏洩対策</h3>
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
          </div>

          {/* 右：プルダウン + 検索ボタン */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <Dropdown label="業界を指定する" onSelect={setIndustryId} items={[
              { id: "1", name: "製造業（自動車、電子機器、鉄鋼、化学素材、食品等）" },
              { id: "2", name: "流通・小売業（百貨店、スーパー、B2B卸売などの物流・販売を担う業界等）" },
              { id: "3", name: "建設不動産業（建築、土木、不動産、住宅建設等）" },
              { id: "4", name: "物流・運輸業（貨物輸送、倉庫、海運、物流サービス等）" },
              { id: "5", name: "エネルギー資源（電力、ガス、再生可能エネルギー等）" },
              { id: "6", name: "観光サービス（ホテル、レストラン、テーマパーク）" },
              { id: "7", name: "メディア・エンタメ（テレビ、映像、マスコミ等）" },
              { id: "8", name: "指定なし" },
            ]} />
            <Dropdown label="売上規模を指定する" onSelect={setCompanySizeId} items={[
              { id: "1", name: "〜50億円" },
              { id: "2", name: "50億円〜100億円" },
              { id: "3", name: "100億円〜1,000億円" },
              { id: "4", name: "1,000億円〜5,000億円" },
              { id: "5", name: "5,000億円" },
              { id: "6", name: "指定なし" },
            ]} />
            <Dropdown label="部署を指定する" onSelect={setDepartmentId} items={[
              { id: "1", name: "情報システム部" },
              { id: "2", name: "DX部" },
              { id: "3", name: "マーケティング部" },
              { id: "4", name: "新規事業開発部" },
              { id: "5", name: "研究開発部" },
              { id: "6", name: "製造部（工場）" },
              { id: "7", name: "生産管理・品質管理部" },
              { id: "8", name: "物流・在庫管理部" },
              { id: "9", name: "人事部" },
              { id: "10", name: "その他" },
              { id: "11", name: "指定しない" },
            ]} />
            <Dropdown label="テーマを指定する" onSelect={setThemeId} items={[
              { id: "1", name: "基幹システムや業務システム周辺テーマ" },
              { id: "2", name: "ITインフラ周辺テーマ" },
              { id: "3", name: "情報セキュリティやガバナンス周辺テーマ" },
              { id: "4", name: "生産現場の省人化や業務効率化の周辺テーマ" },
              { id: "5", name: "スマートファクトリー周辺のテーマ" },
              { id: "6", name: "サプライチェーン周辺のテーマ" },
              { id: "7", name: "ITサポート・現場対応周辺のテーマ" },
              { id: "8", name: "新規事業や既存事業の高度化周辺のテーマ" },
              { id: "9", name: "データ管理と活用周辺テーマ" },
              { id: "10", name: "デジタルマーケティング周辺データ" },
              { id: "11", name: "育成周辺のテーマ" },
              { id: "12", name: "指定しない" },
            ]} />

            {/* 共通クラスでシンプル化 */}
            <button 
              onClick={handleGoClick}
              onMouseEnter={() => setIsSearchHover(true)}
              onMouseLeave={() => setIsSearchHover(false)}
              className="btn">
              <img 
                src={isSearchHover ? "/icon-searchbtn-hover.png" : "/icon-searchbtn.png"}
                alt="検索" />
              事例を検索する
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Itnavi;
