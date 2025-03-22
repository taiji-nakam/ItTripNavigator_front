import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-white-50">
      <div className="flex items-center gap-2">
        {/* ロゴ（左端） */}
        <div className="logo mb-4 md:mb-0">
          <a href="/">
            <img
              src="/icon/logo.png"
              alt="Logo"
              className="w-4 h-4"
            />
          </a>
        </div>

        {/* ナビゲーションリンク（右端） */}
        <nav className="flex gap-4">
          <a href="/">
            <img
              src="/icon/home.png"
              alt="ホーム"
              className="w-6 h-6"
            />
          </a>
          <a href="/">
            <img
              src="/icon/case.png"
              alt="事例検索"
              className="w-6 h-6"
            />
          </a>
          <a href="/"> {/* 未実装のリンクを一時的に / に設定 */}
            <img
              src="/icon/resource.png"
              alt="人員TOP"
              className="w-6 h-6"
            />    
          </a>
        </nav>
      </div>
    </header>
  );
}
