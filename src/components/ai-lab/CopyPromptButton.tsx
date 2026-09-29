"use client";

import CopyButton from "../motion/CopyButton";

export default function CopyPromptButton({ text }: { text: string }) {
  return (
    <CopyButton
      text={text}
      label="Copy Prompt"
      className="self-start bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold px-4 py-2 rounded-md"
    />
  );
}
