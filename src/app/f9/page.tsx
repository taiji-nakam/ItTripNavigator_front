'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function F9Page() {
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

  // 3秒後にリダイレクトする効果
  /*useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/page.tsx');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);*/

  return (
    <div className="container">
      <div className="header"></div>
      
      <div className="content">
        <h1 className="title">エージェントへの相談を受け付けました</h1>
        <h2 className="title">ご連絡まで少々お待ちください</h2>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .logo {
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .nav {
          display: flex;
          gap: 2rem;
        }
        
        .nav-item {
          cursor: pointer;
        }
        
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }
        
        .title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          font-weight: bold;
        }
        
        .subtitle {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}