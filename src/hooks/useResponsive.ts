// src/hooks/useResponsive.ts
"use client"

import { useState, useEffect } from 'react';

// ブレークポイント設定
const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

type Breakpoint = keyof typeof breakpoints;

export function useResponsive() {
  // SSRで実行されるときにwindowがないのでデフォルト値を設定
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {
      // 初期値を設定
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // リサイズイベントリスナーを追加
      window.addEventListener('resize', handleResize);
      
      // コンポーネントのアンマウント時にリスナーを削除
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // 各ブレークポイントに対する真偽値を返す
  const screens = {
    xs: windowSize.width >= breakpoints.xs,
    sm: windowSize.width >= breakpoints.sm,
    md: windowSize.width >= breakpoints.md,
    lg: windowSize.width >= breakpoints.lg,
    xl: windowSize.width >= breakpoints.xl,
    xxl: windowSize.width >= breakpoints.xxl,
  };

  // 現在のブレークポイントを返す
  const getCurrentBreakpoint = (): Breakpoint | null => {
    if (windowSize.width === 0) return null;
    
    if (windowSize.width >= breakpoints.xxl) return 'xxl';
    if (windowSize.width >= breakpoints.xl) return 'xl';
    if (windowSize.width >= breakpoints.lg) return 'lg';
    if (windowSize.width >= breakpoints.md) return 'md';
    if (windowSize.width >= breakpoints.sm) return 'sm';
    if (windowSize.width >= breakpoints.xs) return 'xs';
    
    return null;
  };

  // モバイルかどうかを判定
  const isMobile = windowSize.width < breakpoints.md;
  
  // タブレットかどうかを判定
  const isTablet = 
    windowSize.width >= breakpoints.md && 
    windowSize.width < breakpoints.lg;
  
  // デスクトップかどうかを判定
  const isDesktop = windowSize.width >= breakpoints.lg;

  return {
    width: windowSize.width,
    height: windowSize.height,
    screens,
    currentBreakpoint: getCurrentBreakpoint(),
    isMobile,
    isTablet,
    isDesktop,
  };
}