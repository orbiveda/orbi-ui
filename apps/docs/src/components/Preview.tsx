"use client";

import React, { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as OrbiReact from "@orbi/react";

const scope = {
  ...OrbiReact,
  React,
  useState: React.useState,
};

interface PreviewProps {
  code: string;
  children?: React.ReactNode;
  noInline?: boolean;
}

export function Preview({ code, children, noInline }: PreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="preview-container" style={{ border: "1px solid var(--orbi-colors-border)", borderRadius: "8px", overflow: "hidden", margin: "1.5rem 0" }}>
      <div className="preview-header" style={{ display: "flex", gap: "1rem", borderBottom: "1px solid var(--orbi-colors-border)", padding: "0.5rem 1rem", backgroundColor: "var(--orbi-colors-surface-alt)" }}>
        <button
          onClick={() => setActiveTab("preview")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: activeTab === "preview" ? "bold" : "normal",
            color: activeTab === "preview" ? "var(--orbi-colors-text)" : "var(--orbi-colors-text-muted)"
          }}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("code")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: activeTab === "code" ? "bold" : "normal",
            color: activeTab === "code" ? "var(--orbi-colors-text)" : "var(--orbi-colors-text-muted)"
          }}
        >
          Code
        </button>
      </div>

      <div className="preview-content">
        <LiveProvider code={code.trim()} scope={scope} noInline={noInline}>
          {activeTab === "preview" && (
            <div style={{ padding: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
              {children || <LivePreview />}
            </div>
          )}

          {activeTab === "code" && (
            <div className="playground__editor-wrapper" style={{ margin: 0 }}>
              <div className="playground__editor">
                <LiveEditor />
              </div>
            </div>
          )}
          <LiveError className="playground__error" />
        </LiveProvider>
      </div>
    </div>
  );
}
