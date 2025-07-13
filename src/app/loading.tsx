// app/loading.tsx
"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
