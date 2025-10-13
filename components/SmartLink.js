"use client";
import Link from "next/link";
import { useProgress } from "./ProgressContext";

export default function SmartLink({ href, children, ...props }) {
  const { setStart } = useProgress();

  return (
    <Link
      href={href}
      onClick={() => {
        setStart(true); // click ke sath hi loading start
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
