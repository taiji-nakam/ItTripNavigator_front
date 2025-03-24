// src/components/ui/ResponsiveContainer.tsx
import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * レスポンシブなコンテナコンポーネント
 * 異なる画面サイズに応じて適切なマージンとパディングを提供します
 */
export function ResponsiveContainer({ children, className = '' }: ResponsiveContainerProps) {
  return (
    <div className={`
      w-full 
      px-4 sm:px-6 md:px-8 lg:px-12 
      mx-auto 
      max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
      ${className}
    `}>
      {children}
    </div>
  );
}

/**
 * レスポンシブセクションコンポーネント
 * 縦方向の間隔を画面サイズに応じて調整します
 */
export function ResponsiveSection({ children, className = '' }: ResponsiveContainerProps) {
  return (
    <section className={`py-8 md:py-12 lg:py-16 ${className}`}>
      {children}
    </section>
  );
}

/**
 * レスポンシブグリッドコンポーネント
 * 1~4カラムのグリッドを画面サイズに応じて自動調整します
 */
export function ResponsiveGrid({ children, className = '' }: ResponsiveContainerProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 ${className}`}>
      {children}
    </div>
  );
}