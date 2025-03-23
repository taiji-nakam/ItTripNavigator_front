"use client"

import { useState } from "react"
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="bg-gray-300 min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* メインコンテンツエリア */}
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto mb-16">
          {/* 左側：テキストコンテンツ */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-800">
              デジタル変革を<br />
              簡単に、早く、正確に
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              事例紹介からあなたのDX推進を支援します
            </p>
          </div>
          
          {/* 右側：イメージ */}
          <div className="md:w-1/2 px-4">
            <div className="rounded-3xl overflow-hidden border-4 border-white shadow-lg">
              <img 
                src="/images/top_image.png" 
                alt="デジタル変革" 
                className="w-full h-auto"
                onError={(e) => {
                  // 画像が読み込めない場合のフォールバック
                  e.target.src = "https://via.placeholder.com/600x400?text=デジタル変革";
                }}
              />
            </div>
          </div>
        </div>
        
        {/* リンクボタン */}
        <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-12 max-w-5xl mx-auto">
          <Link 
            href="/f2" 
            className="bg-white p-6 rounded-xl shadow-md flex items-center w-full md:w-2/5 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="border-2 border-gray-300 rounded w-6 h-6 flex-shrink-0 mr-4"></div>
            <span className="text-lg md:text-xl text-gray-800">他社のデジタル事例が見たい</span>
          </Link>
          
          <Link 
            href="/candidates" 
            className="bg-white p-6 rounded-xl shadow-md flex items-center w-full md:w-2/5 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="border-2 border-gray-300 rounded w-6 h-6 flex-shrink-0 mr-4"></div>
            <span className="text-lg md:text-xl text-gray-800">具体的な人材が見たい</span>
          </Link>
        </div>
      </div>
    </div>
  );
}