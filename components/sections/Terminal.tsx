"use client";

import { useEffect, useState } from "react";
import { useStatus } from "@/components/StatusProvider";

const TYPE_DELAY_MS = 22;

export default function Terminal() {
  const { status } = useStatus();
  const json = JSON.stringify(status.json, null, 2);

  // Typing progress is tied to the text it belongs to, so a status change restarts it from 0.
  const [progress, setProgress] = useState({ json, len: json.length });
  const len = progress.json === json ? progress.len : 0;
  const typing = len < json.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress({ json, len: json.length });
      return;
    }
    let n = 0;
    setProgress({ json, len: 0 });
    const id = setInterval(() => {
      n += 1;
      setProgress({ json, len: n });
      if (n >= json.length) clearInterval(id);
    }, TYPE_DELAY_MS);
    return () => clearInterval(id);
  }, [json]);

  return (
    <div className="terminal-glow p-4 font-mono text-xs leading-5 text-zinc-200 sm:text-sm">
      <div className="mb-3 text-sm font-semibold text-zinc-100">&gt;_ Terminal</div>
      <div className="text-green-400">cat user_status.json</div>
      {/* The full text is rendered invisibly to reserve height, so typing never shifts the layout. */}
      <div className="mt-1 grid">
        <pre aria-hidden="true" className="invisible col-start-1 row-start-1 overflow-x-auto whitespace-pre-wrap break-words">
          {json}
        </pre>
        <pre
          aria-label={json}
          className="col-start-1 row-start-1 overflow-x-auto whitespace-pre-wrap break-words"
        >
          {json.slice(0, len)}
          <span
            aria-hidden="true"
            className={`terminal-caret ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-green-400 ${typing ? "" : "terminal-caret-blink"}`}
          />
        </pre>
      </div>
    </div>
  );
}
