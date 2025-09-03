/**
 * Safe date formatting utilities to prevent hydration mismatches
 */

import { useEffect, useState } from 'react';

/**
 * Hook to safely format dates on the client-side to prevent hydration mismatches
 */
export function useSafeDate(date: string | Date): {
  formattedDate: string;
  formattedTime: string;
  daysAgo: number;
  isClient: boolean;
} {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dateObj = new Date(date);
  
  if (!isClient) {
    // Return safe defaults during SSR
    return {
      formattedDate: 'Loading...',
      formattedTime: 'Loading...',
      daysAgo: 0,
      isClient: false,
    };
  }

  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const daysAgo = Math.floor((Date.now() - dateObj.getTime()) / (1000 * 60 * 60 * 24));

  return {
    formattedDate,
    formattedTime,
    daysAgo,
    isClient: true,
  };
}

/**
 * Format a date safely for server-side rendering
 * Uses ISO string format which is consistent across server and client
 */
export function formatDateSafe(date: string | Date): string {
  try {
    const dateObj = new Date(date);
    // Use ISO format to avoid locale differences
    return dateObj.toISOString().split('T')[0];
  } catch (error) {
    console.warn('Date formatting error:', error);
    return 'Invalid date';
  }
}

/**
 * Calculate days ago safely
 */
export function getDaysAgoSafe(date: string | Date): number {
  try {
    const dateObj = new Date(date);
    const now = new Date();
    return Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.warn('Days calculation error:', error);
    return 0;
  }
}