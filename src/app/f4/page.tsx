// F4 事例詳細
'use client';
import React, { useEffect } from "react";
import Link from 'next/link';
// import styles from './page.module.css'; // CSSモジュールを使用する場合
import { useRouter } from 'next/navigation';
import { useCommon } from "../../../contexts/commonContext"

export default function F4Page() {
  const router = useRouter();
  const { common } = useCommon();

  useEffect(() => {
  // 画面表示時処理
  // common debug
    if (common) {
      console.log("common.search_id:", common.search_id);
      console.log("common.search_id:", common.search_id_sub);
    } else {
      console.log("common is null");
    }
    // Action:/caseDetail

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 各セクションの展開状態を管理
  // const [expandedSections, setExpandedSections] = useState({
  //   overview: false,
  //   company: false,
  //   challenge1: false,
  //   challenge2: false,
  //   solution: false
  // // ここに出力ロジックを追加
  // });

  // 次画面遷移時にactionTypeを更新する
  // エージェントへ相談：1/戦略文書作成:2
  // setCommon((prev) => ({ ...prev, actionType: 1 }));

  return (
    <div className="case-detail-container">
      <div className="case-detail-header">
        <h1 className="case-detail-title">事例詳細</h1>
        <button 
          className="back-to-list-button" 
          onClick={() => router.push('/f3')}
          >
          事例一覧に戻る
        </button>
      </div>

      <div className="case-detail-content">
        <div className="detail-section">
          <h2 className="section-title">事例概要</h2>
          <p className="section-text">社内外からのアクセスをゼロトラストモデルに移行し、セキュリティリスクを最小化。</p>
        </div>
        <div className="detail-section">
          <h2 className="section-title">企業概要</h2>
          <p className="section-text">社内外からのアクセスをゼロトラストモデルに移行し、セキュリティリスクを最小化。</p>
        </div>
        <div className="detail-section">
          <h2 className="section-title">抱えている課題 / 背景</h2>
          <p className="section-text">社内外からのアクセスをゼロトラストモデルに移行し、セキュリティリスクを最小化。</p>
        </div>
        <div className="detail-section">
          <h2 className="section-title">抱えている課題 / 背景</h2>
          <p className="section-text">社内外からのアクセスをゼロトラストモデルに移行し、セキュリティリスクを最小化。</p>
        </div>
        <div className="detail-section">
          <h2 className="section-title">解決方法</h2>
          <p className="section-text">社内外からのアクセスをゼロトラストモデルに移行し、セキュリティリスクを最小化。</p>
        </div>
      </div>
      <div className="action-buttons">
        <Link href="/f10" passHref legacyBehavior>
          <a className="action-button">
            <span className="link-text">戦略文章出力</span>
          </a>
        </Link>
        <Link href="#" passHref legacyBehavior>
          <a className="action-button">
            <span className="link-text">この課題が解決できる人材を見てみる</span>
          </a>
        </Link>
        <Link href="/f8" passHref legacyBehavior>
          <a className="action-button">
            <span className="link-text">エージェントに人材の相談をする</span>
          </a>
        </Link>
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
          position: relative;
        }

        .section-title {
          font-size: 20px;
          margin-bottom: 15px;
        }

        .section-text {
          margin-bottom: 10px;
        }

        .expand-button-container {
          text-align: right;
          margin-top: 10px;
        }

        .expand-button {
          background-color: transparent;
          color:rgb(11, 11, 11);
          border: none;
          font-weight: right;
          cursor: pointer;
          font-size: 13px;
        }

        .expand-text {
          display: block;
          color: #666;
          font-size: 50px;
        }

        .hidden-content {
          margin-top: 15px;
          padding: 10px;
          border-left: 0px solid #b22222;
          background-color: #fff;
          border-radius: 0;
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
          position: relative;
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
          text-align: center;
          width: 100%;
        }
      `}</style>
    </div>
  );
}