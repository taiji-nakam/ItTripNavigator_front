// F1 TOPページ
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        デジタル変革を簡単に、<br />
        早く、正確に</h1>
      <p className="mb-8">事例紹介からあなたのDX推進を支援します</p>
      
      {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
        <Link 
          href="/f2" 
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">F2: 事例検索</h2>
          <p className="text-gray-600">過去の事例から学ぶ</p>
        </Link>
        
        <Link 
          href="/f3" 
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">F3: 事例一覧</h2>
          <p className="text-gray-600">すべての事例を見る</p>
        </Link>

        <Link 
          href="/f4" 
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">F4: 事例詳細</h2>
          <p className="text-gray-600">事例詳細</p>
        </Link>
      </div>
      */}
    </div>
  );
}