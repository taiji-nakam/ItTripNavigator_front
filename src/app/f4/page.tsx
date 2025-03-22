//F4 事例詳細P
import Link from 'next/link';

export default function F1Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          事例詳細
        </h1>
        
        <p className="text-xl text-gray-700 mb-8">
          ITripナビゲーターで最適な解決策を見つけましょう
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">事例を探す</h2>
          <p className="text-gray-600 mb-6">過去の成功事例から最適な解決策を見つけましょう</p>
          <Link 
            href="/f4" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            事例を検索する →
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">専門家に相談</h2>
          <p className="text-gray-600 mb-6">エージェントに直接相談して専門的なアドバイスを得ましょう</p>
          <Link 
            href="/f6" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            相談予約をする →
          </Link>
        </div>
      </div>
    </div>
  );
}