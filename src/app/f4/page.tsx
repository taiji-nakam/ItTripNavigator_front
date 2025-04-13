'use client';
import React, { useEffect, useState } from "react";
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCommon } from "../../../contexts/commonContext";

export default function F4Page() {
  const router = useRouter();
  const { common, setCommon } = useCommon();
  
  // APIから取得した情報を格納する状態を定義
  const [caseDetail, setCaseDetail] = useState({
    case_id: null,
    case_name: "",
    case_summary: "",
    company_summary: "",
    initiative_summary: "",
    issue_background: "",
    solution_method: "",
  });

  useEffect(() => {
     // common の search_id と search_id_sub が定義されている場合にのみ呼び出す
     if (common?.search_id != null && common?.search_id_sub != null) {
      async function fetchCaseDetail() {
        // APIエンドポイントを作成
        const endpoint =
          process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/caseDetail?search_id=${common?.search_id}&search_id_sub=${common?.search_id_sub}`;
        console.log(endpoint);
        try {
          const res = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          console.log(data);
          // HTTP のステータスコードが 200 なら正常にデータが取得できたとみなす
          if (res.status === 200) {
            setCaseDetail({
              case_id: data.case_id,
              case_name: data.case_name,
              case_summary: data.case_summary,
              company_summary: data.company_summary,
              initiative_summary: data.initiative_summary,
              issue_background: data.issue_background,
              solution_method: data.solution_method,
            });
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error fetching case detail:", error);
          alert(error);
        }
      }
      fetchCaseDetail();
    }
  }, [common?.search_id, common?.search_id_sub]); // 依存配列に必要なパラメータを追加

  return (
    <div className="case-detail-container">
      <div className="case-detail-header">
        <h1 className="case-detail-title">事例詳細</h1>
        <button 
          className="back-to-list-button" 
          onClick={() => router.push('/f3')}>
          事例一覧に戻る
        </button>
      </div>
      <div className="case-detail-content">
        <div className="detail-section">
          <h2 className="section-title">タイトル/企業概要</h2>
          <p className="section-text">
            {caseDetail.case_name} / {caseDetail.company_summary}
          </p>
        </div>
        <div className="detail-section">
          <h2 className="section-title">事例概要</h2>
          <p className="section-text">{caseDetail.case_summary}</p>
        </div>
        <div className="detail-section">
          <h2 className="section-title">取り組み概要</h2>
          <p className="section-text">{caseDetail.initiative_summary}</p>
        </div>
        <div className="detail-section">
          <h2 className="section-title">抱えている課題 / 背景</h2>
          <p className="section-text">{caseDetail.issue_background}</p>
        </div>
        <div className="detail-section">
          <h2 className="section-title">解決方法</h2>
          <p className="section-text">{caseDetail.solution_method}</p>
        </div>
      </div>
      <div className="action-buttons">
        {/* 戦略文章出力：actionType 2 に設定し、/f8 へ遷移 */}
        <button
          className="action-button"
          onClick={() => {
            setCommon(prev => ({ ...prev, actionType: 2 }));
            router.push('/f8');
          }}
        >
          <span className="link-text">戦略文章出力</span>
        </button>

        {/* この課題が解決できる人材を見てみる：/f6 へ遷移 */}
        <button
          className="action-button"
          onClick={() => {
            setCommon(prev => ({
              ...prev,
              search_mode: 0,
              caseTitle: caseDetail.case_name,
              caseCompanySummary: caseDetail.case_summary,
              caseChallenge: caseDetail.issue_background
            }));
            router.push('/f6');
          }}
        >
          <span className="link-text">この課題が解決できる人材を見てみる</span>
        </button>

        {/* エージェントに人材の相談をする：actionType 1 に設定し、/f8 へ遷移 */}
        <button
          className="action-button"
          onClick={() => {
            setCommon(prev => ({ ...prev, actionType: 1 }));           
            router.push('/f8');
          }}
        >
          <span className="link-text">エージェントに人材の相談をする</span>
        </button>
      </div>
      <style jsx>{`
        .case-detail-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .case-detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .case-detail-title {
          font-size: 28px;
          font-weight: bold;
          color: #333;
        }
        .back-to-list-button {
          background-color: #b22222;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          text-decoration: none;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .back-to-list-button:hover {
          background-color: #8b0000;
        }
        .case-detail-content {
          background-color: white;
          border-radius: 5px;
          padding: 20px;
          margin-bottom: 30px;
        }
        .detail-section {
          border-bottom: 1px solid #ddd;
          padding: 20px 0;
        }
        .section-title {
          font-size: 20px;
          margin-bottom: 15px;
        }
        .section-text {
          margin-bottom: 10px;
        }
        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 110px;
          margin-top: 30px;
        }
        .action-button {
          background-color: white;
          border: 5px solid #ddd;
          border-radius: 20px;
          padding: 20px;
          text-align: center;
          width: 20%;
          text-decoration: none;
          color: #333;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .link-text {
          display: block;
          color: rgb(11, 11, 11);
          font-size: 17px;
          margin-top: 10px;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
