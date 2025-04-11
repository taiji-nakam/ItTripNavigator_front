'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useCommon } from "../../../contexts/commonContext";

export default function F8Page() {
  const router = useRouter();
  const { common } = useCommon();

  // フォーム入力用の状態
  const [companyName, setCompanyName] = useState('');
  const [personName, setPersonName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [jobTitle, setJobTitle] = useState('');

   // 戦略文章出力中のメッセージ用の状態
   const [loadingMessage, setLoadingMessage] = useState("");

  // バリデーション: 全項目必須。未入力項目があればアラート表示
  const validateForm = (): boolean => {
    const missing: string[] = [];
    if (!companyName.trim()) missing.push("会社名");
    if (!personName.trim()) missing.push("氏名");
    if (!email.trim()) missing.push("メールアドレス");
    if (!phone.trim()) missing.push("電話番号");
    if (!departmentName.trim()) missing.push("部署");
    if (!jobTitle.trim()) missing.push("役職");
    // 電話番号: 半角数字と半角ハイフンのみ許可（例: 123-4567-8901）
    const phoneRegex = /^[0-9-]+$/;
    if (phone.trim() && !phoneRegex.test(phone.trim())) {
      missing.push("電話番号（半角数字と半角ハイフンのみを使用してください）");
    }
    
    // メールアドレス: 半角英数字記号を含み、メールアドレス形式であることを確認
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (email.trim() && !emailRegex.test(email.trim())) {
      missing.push("メールアドレス（正しい形式で入力してください）");
    }

    if (missing.length > 0) {
      alert("以下の項目が未入力または不正です:\n" + missing.join("\n"));
      return false;
    }
    return true;
  };

  // 共通のユーザーエントリー API 呼び出し
  const callUserEntry = async (): Promise<any | null> => {
    if (common) {
      console.log("common.search_id:", common.search_id);
      console.log("common.search_id_sub:", common.search_id_sub);
      console.log("common.actionType:", common.actionType);
    } else {
      console.log("common is null");
    }
    const payload = {
      search_id: common?.search_id,
      search_id_sub: common?.search_id_sub,
      mail_address: email,
      phone_no: phone,
      company_name: companyName,
      deparment_name: departmentName,
      job_title: jobTitle,
      user_name: personName
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/userEntry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.status === 200) {
        return data; // 例: { search_id: 5, search_id_sub: 1, user_id: "4CRY300003" }
      } else {
        alert("UserEntry API error: " + data.message);
        return null;
      }
    } catch (error: any) {
      console.error("UserEntry API error:", error);
      alert("ユーザー登録でエラーが発生しました: " + error.toString());
      return null;
    }
  };

  // エージェントに相談ボタン用ハンドラ
  const handleAgentSupport = async () => {
    if (!validateForm()) return;
    const userData = await callUserEntry();
    if (!userData) return;

    // agentSupport には search_id, search_id_sub, user_id の3項目が必須なため、common から改めて付与
    const payload = {
      search_id: common?.search_id,
      search_id_sub: common?.search_id_sub,
      user_id: userData.user_id
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/agentSupport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.status === 200) {
        router.push('/f9');
      } else {
        alert("AgentSupport API error: " + data.message);
      }
    } catch (error: any) {
      console.error("AgentSupport API error:", error);
      alert("エージェント相談 API 呼び出しでエラーが発生しました: " + error.toString());
    }
  };

  // 戦略文章出力ボタン用ハンドラ
  const handleStrategy = async () => {
    if (!validateForm()) return;
    
    // 表示: 文章作成中のメッセージを表示
    setLoadingMessage("文章を作成中です。しばらくお待ちください");

    const userData = await callUserEntry();
    if (!userData) return;

    // strategy でも同様に必要な項目を payload に付与する
    const payload = {
      search_id: common?.search_id,
      search_id_sub: common?.search_id_sub,
      user_id: userData.user_id
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.status === 200) {
        router.push('/f10');
      } else {
        alert("Strategy API error: " + data.message);
      }
    } catch (error: any) {
      console.error("Strategy API error:", error);
      alert("戦略文章出力 API 呼び出しでエラーが発生しました: " + error.toString());
    } finally {
      // 処理終了後はメッセージをクリア
      setLoadingMessage("");
    }
  };

  // 「この課題が解決できる人材を見てみる」ボタン用ハンドラ
  // const handleTalentView = () => {
  //   router.push('/f6');
  // };

  return (
    <div className="container">
      {/* モーダル用オーバーレイ：loadingMessage が設定されている間だけ表示 */}
      {loadingMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            {loadingMessage}
          </div>
        </div>
      )}
      <h1 className="title">情報取得</h1>
      
      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="inputGroup">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="会社名を入力"
            className="input"
          />
        </div>
        <div className="inputGroup">
          <input
            type="text"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            placeholder="氏名を入力"
            className="input"
          />
        </div>
        <div className="inputGroup">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレスを入力"
            className="input"
          />
        </div>
        <div className="inputGroup">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="電話番号を入力"
            className="input"
          />
        </div>
        <div className="inputGroup">
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="部署を入力"
            className="input"
          />
        </div>
        <div className="inputGroup">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="役職を入力"
            className="input"
          />
        </div>
        
        <div className="action-buttons">
          {/* 戦略文章出力ボタン：common.actionType が1の場合は無効 */}
          <button 
            type="button"
            className="action-button"
            disabled={common?.actionType === 1}
            onClick={handleStrategy}
          >
            <span className="link-text">戦略文章出力</span>
          </button>
          {/* エージェントに相談ボタン：common.actionType が2の場合は無効 */}
          <button 
            type="button"
            className="action-button"
            disabled={common?.actionType === 2}
            onClick={handleAgentSupport}
          >
            <span className="link-text">エージェントに人材の相談をする</span>
          </button>
          {/* この課題が解決できる人材を見てみるは無効 
          <button 
            type="button"
            className="action-button"
            onClick={handleTalentView}
          >
            <span className="link-text">この課題が解決できる人材を見てみる</span>
          </button>*/}
        </div>
      </form>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: calc(100vh - 80px);
        }
        .title {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: left;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .inputGroup {
          position: relative;
        }
        .input {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: white;
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
          font-weight: bold;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .link-text {
          display: block;
          color: rgb(11, 11, 11);
          font-size: 17px;
          margin-top: 10px;
          width: 100%;
          text-align: center;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }
        .modal-content {
          background-color: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-size: 1.5rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
