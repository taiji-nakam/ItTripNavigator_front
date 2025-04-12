'use client';
import React, { useState, useEffect } from "react";
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCommon } from "../../../contexts/commonContext";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "github-markdown-css/github-markdown-light.css";

export default function F10Page() {
  const router = useRouter();
  const { common } = useCommon();
  const [strategyDocument, setStrategyDocument] = useState<string>("");

  useEffect(() => {
    async function fetchStrategyDocument() {
      const search_id = common?.search_id;
      const search_id_sub = common?.search_id_sub;
      const document_id = common?.document_id;

      if (!search_id || !search_id_sub || !document_id) {
        console.log("必要なパラメータが common に不足しています");
        return;
      }

      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/strategy?search_id=${search_id}&search_id_sub=${search_id_sub}&document_id=${document_id}`;
      console.log("Fetching strategy document from:", endpoint);
      try {
        const res = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        if (res.status === 200) {
          setStrategyDocument(data.document);
        } else {
          alert(data.message);
        }
      } catch (error: unknown) {
        console.error("Error fetching strategy document:", error);
        alert("戦略文書取得でエラーが発生しました: " + String(error));
      }
    }
    fetchStrategyDocument();
  }, [common?.search_id, common?.search_id_sub, common?.document_id]);

  const handleOutputClick = async () => {
    if (!strategyDocument) {
      alert("戦略文書が存在しません");
      return;
    }
    
    // Markdown文書を .md ファイルとしてダウンロードする処理
    const blob = new Blob([strategyDocument], { type: "text/markdown" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "strategy_document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);

    // 戦略文書ダウンロード完了API呼び出し用 payload を作成
    const search_id = common?.search_id;
    const search_id_sub = common?.search_id_sub;
    const document_id = common?.document_id;
    
    const payload = { search_id, search_id_sub, document_id };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/strategy/dl', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.status === 200) {
        alert("ご利用ありがとうございました。\nプロジェクト成功に向けた一助になれば幸いです！");
      } else {
        alert("Strategy/dl API error: " + data.message);
      }
    } catch (error: unknown) {
      console.error("Error calling strategy/dl API:", error);
      alert("戦略文書ダウンロード API 呼び出しでエラーが発生しました: " + String(error));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="case-detail-title">戦略文書詳細</h1>
        <button 
          className="back-to-list-button" 
          onClick={() => router.push('/f3')}>
          事例一覧に戻る
        </button>
      </div>

      <div className="content">
        <div className="white-box">
          <div className="document-content markdown-body">
            {strategyDocument ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {strategyDocument}
              </ReactMarkdown>
            ) : (
              "戦略文書を読み込み中..."
            )}
          </div>
        </div>
      </div>

      <div className="output-button-container">
        <button 
          type="button"
          className="output-button"
          onClick={handleOutputClick}
        >
          <span className="link-text">文章を出力</span>
        </button>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
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
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .back-to-list-button:hover {
          background-color: #8b0000;
        }
        .content {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 2rem;
        }
        .white-box {
          background-color: white;
          width: 80%;
          max-height: 70vh;
          padding: 20px;
          overflow-y: auto;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .document-content {
          font-size: 16px;
          color: #333;
          line-height: 1.6;
          white-space: normal;
        }
        .output-button-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
        .output-button {
          background-color: #888;
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          text-decoration: none;
        }
        .output-button:hover {
          background-color: #666;
        }
        .link-text {
          display: block;
        }
      `}</style>
    </div>
  );
}
