import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

/**
 * Headline that rises in word by word (55ms apart). Pure CSS — the words
 * are in the server HTML and animate on first paint, so above-the-fold
 * text never waits for JavaScript. Works on plain strings and on nested
 * markup (e.g. a highlighted <span> or a <br />).
 */
export default function WordReveal({
  as: Tag = "h1",
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  children: ReactNode;
}) {
  const counter = { i: 0 };
  return <Tag className={className}>{split(children, counter)}</Tag>;
}

function split(node: ReactNode, counter: { i: number }): ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
      .split(/(\s+)/)
      .map((part, k) =>
        part.trim() === "" ? (
          part
        ) : (
          <span key={k} className="motion-word" style={{ "--motion-i": counter.i++ } as CSSProperties}>
            {part}
          </span>
        ),
      );
  }
  if (Array.isArray(node)) return Children.map(node, (n) => split(n, counter));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props.children == null) return el;
    return cloneElement(el, undefined, split(el.props.children, counter));
  }
  return node;
}
