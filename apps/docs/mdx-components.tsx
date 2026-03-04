import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="docs-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="docs-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="docs-h3">{children}</h3>,
    p: ({ children }) => <p className="docs-p">{children}</p>,
    code: ({ children }) => <code className="docs-inline-code">{children}</code>,
    pre: ({ children }) => <pre className="docs-pre">{children}</pre>,
    table: ({ children }) => (
      <div className="docs-table-wrapper">
        <table className="docs-table">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="docs-th">{children}</th>,
    td: ({ children }) => <td className="docs-td">{children}</td>,
    ...components,
  };
}
