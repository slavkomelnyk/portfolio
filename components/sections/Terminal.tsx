"use client";

import { useStatus } from "@/components/StatusProvider";

export default function Terminal() {
  const { status } = useStatus();
  const json = JSON.stringify(status.json, null, 2);

  return (
    <div className="terminal-glow p-4 font-mono text-xs leading-5 text-zinc-200 sm:text-sm">
      <div className="mb-3 text-sm font-semibold text-zinc-100">&gt;_ Terminal</div>
      <div className="text-green-400">cat user_status.json</div>
      <pre key={json} className="hero-swap mt-1 overflow-x-auto whitespace-pre-wrap break-words">{json}</pre>
    </div>
  );
}
