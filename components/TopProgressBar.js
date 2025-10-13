"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useProgress } from "./ProgressContext";

export default function TopProgressBar() {
    const pathname = usePathname();
    const { start, setStart } = useProgress();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    // 🔁 When "start" = true → begin animation immediately
    useEffect(() => {
        if (start) {
            let interval;
            setVisible(true);
            setProgress(10);

            interval = setInterval(() => {
                setProgress((p) => (p < 90 ? p + Math.random() * 10 : p));
            }, 300);

            // Jab route change ho jaye → complete and hide
            const completeTimer = setTimeout(() => {
                clearInterval(interval);
                setProgress(100);
                setTimeout(() => {
                    setVisible(false);
                    setProgress(0);
                    setStart(false); // reset global state
                }, 400);
            }, 1200);

            return () => {
                clearInterval(interval);
                clearTimeout(completeTimer);
            };
        }
    }, [start, pathname, setStart]);

    return (
        <div className={`top-progress-container ${visible ? "active" : ""}`}>
            <div className="top-progress-bar" style={{ width: `${progress}%` }} />
        </div>
    );
}
