// F10 戦略文書作成
'use client';
import React, { useEffect } from "react";
// import Link from 'next/link';
import { useCommon } from "../../../contexts/commonContext"

export default function F10Page() {


  const { common } = useCommon();

  useEffect(() => {
    // 画面表示時処理
    // common debug
      if (common) {
        console.log("common.search_id:", common.search_id);
        console.log("common.search_id:", common.search_id_sub);
        console.log("common.search_id:", common.actionType);
      } else {
        console.log("common is null");
      }
      // action:/strategy​

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  // 文章出力ボタンのクリックハンドラー
  // const handleOutputClick = () => {
  //   console.log('文章を出力しました');
  //   // ここに出力ロジックを追加
  // };

  return (
    <div className="container">
      <div className="header">
      </div>
      <div className="content">
        <div className="white-box">
          <div className="output-button-container">
            <button 
              className="output-button" 
              onClick={() => window.location.href = '/output'}
            >
              文章を出力
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 2rem;
        }
        
        .white-box {
          background-color: white;
          width: 80%;
          min-height: 80vh;
          position: relative;
        }
        
        .output-button-container {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
        }
        
        .output-button {
          background-color: #888;
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .output-button:hover {
          background-color: #666;
        }
      `}</style>
    </div>
  );
}