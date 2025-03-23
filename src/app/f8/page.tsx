'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function F8Page() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [personName, setPersonName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォームデータの処理ロジックをここに追加
    console.log({ companyName, personName, email, phone });
  };

  return (
    <div className="container">
      <h1 className="title">情報取得</h1>
      
      <form className="form" onSubmit={handleSubmit}>
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
            placeholder="任意：電話番号を入力"
            className="input"
          />
        </div>
        
        <div className="action-buttons">
        <a href="f9" className="action-button">
          <span className="link-text">エージェントに相談</span>
        </a>
        <a href="f10" className="action-button">
          <span className="link-text">戦略的文章出力</span>
        </a>
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

        .buttonWrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 3rem;
          gap: 2rem;
        }

        .buttonText {
          text-align: center;
          line-height: 1.5;
        }

        .orText {
          font-weight: bold;
          color: #333;
          font-size: 1.1rem;
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