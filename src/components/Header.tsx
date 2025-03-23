"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Users } from "lucide-react"

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header style={{
      backgroundColor: "#D1D5DB", 
      padding: "12px 0", 
      width: "100%"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px"
      }}>
        {/* ロゴ部分 */}
        <Link href="/" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
        <div>
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                IT Trip Navigator
                </span>
            </div>
        </Link>
        
        {/* ナビゲーション部分 */}
        <div style={{
          display: "flex",
          gap: "80px",
          alignItems: "center"
        }}>
          <Link 
            href="/" 
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: pathname === "/" ? "#2563EB" : "#1F2937"
            }}
          >
            <Home size={25} />
            <span style={{ fontSize: "12px", marginTop: "4px" }}>ホーム</span>
          </Link>
          
          <Link 
            href="/f4" 
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: pathname === "/application" ? "#2563EB" : "#1F2937"
            }}
          >
            <FileText size={25} />
            <span style={{ fontSize: "12px", marginTop: "4px" }}>事例検索</span>
          </Link>
          
          <Link 
            href="/" 
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: pathname === "/candidates" ? "#2563EB" : "#1F2937"
            }}
          >
            <Users size={25} />
            <span style={{ fontSize: "12px", marginTop: "4px" }}>人員TOP</span>
          </Link>
        </div>
      </div>
    </header>
  );
}