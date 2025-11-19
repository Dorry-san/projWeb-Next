"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Theme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      className="px-4 py-2 rounded-md bg-black/20 text-white"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "Nuit" : "Jour"}
    </button>
  );
}
