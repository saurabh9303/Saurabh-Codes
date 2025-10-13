'use client';
import { useEffect, useState } from 'react';

export default function NetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Initial check
        setIsOnline(navigator.onLine);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline) return null; // Online hone par kuch show nahi kare

    return (
        <div className="fixed top-0 left-0 w-full text-xs bg-red-600 p-1 text-white text-center z-[9999] animate-slideDown shadow-md">
           ⚠️ Offline or slow connection. Check your network. 🌐
        </div>
    );
}
