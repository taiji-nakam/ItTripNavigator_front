// F1 TOPページ
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* メインコンテンツエリア */}
      <div className="flex flex-col md:flex-row items-start justify-between mt-16 mb-16">
        {/* 左側：テキストコンテンツ */}
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-800">
            デジタル変革を<br />
            簡単に、早く、正確に
          </h1>
          <p className="text-xl mb-12 text-white">事例紹介からあなたのDX推進を支援します</p>
        </div>
        
        {/* 右側：イメージ */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="rounded-3xl overflow-hidden border-4 border-white shadow-lg">
            <img 
              src="/images/top_image.png" 
              alt="デジタル変革" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      {/* チェックボックスオプション */}
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center w-full md:w-2/5">
          <input type="checkbox" id="digital-cases" className="h-6 w-6 mr-4" />
          <label htmlFor="digital-cases" className="text-xl">他社のデジタル事例が見たい</label>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center w-full md:w-2/5">
          <input type="checkbox" id="staff-search" className="h-6 w-6 mr-4" />
          <label htmlFor="staff-search" className="text-xl">具体的な人材が見たい</label>
        </div>
      </div>
    </div>
  );
}
