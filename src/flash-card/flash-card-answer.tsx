import type { FC } from "react";

// Parses the "- **label**: value" bullet lines showQuizzBack builds out of
// a note's back-* frontmatter, one bullet per key in insertion order.
const LABEL_VALUE_LINE = /^- \*\*(.+?)\*\*: (.+)$/;

const parseSections = (md: string) =>
  md
    .split("\n")
    .map((line) => line.match(LABEL_VALUE_LINE))
    .filter((match): match is RegExpMatchArray => match !== null)
    .map(([, label, value]) => ({ label: label!, value: value! }));

export const FlashCardAnswer: FC<{ md: string }> = ({ md }) => (
  <div className="flex w-full flex-col gap-4">
    {parseSections(md).map(({ label, value }) => (
      <div key={label}>
        <div className="text-base font-bold text-slate-900">{label}</div>
        <div className="text-sm text-slate-400">{value}</div>
      </div>
    ))}
  </div>
);
