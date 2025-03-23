{/*import Link from 'next/link';*/}

{/*export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-start">
        {/* ロゴ（左端） */}
        <div className="logo">
          <Link href="/" className="block">
            <div className="border border-gray-300 p-4">
              <h1 className="text-xl font-bold">IT Trip Navigator</h1>
              <p className="text-xs text-gray-500">by Hiprotech</p>
            </div>
          </Link>
        </div>

        {/* ナビゲーションリンク（右端） */}
        <nav className="flex items-start space-x-16">
          <Link href="/" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
            </svg>
            <span className="text-sm">ホーム</span>
          </Link>
          
          <Link href="/f2" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm">事例検索</span>
          </Link>
          
          <Link href="/f10" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm">人員TOP</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}