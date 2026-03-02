"use client";

import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import {
  Button,
  Input,
  Label,
  Stack,
  Card,
  Badge,
  Avatar,
  Checkbox,
  Divider,
  Dialog,
} from "@orbi/react";

const scope = {
  Button,
  Input,
  Label,
  Stack,
  Card,
  Badge,
  Avatar,
  Checkbox,
  Divider,
  Dialog,
  React,
  useState: React.useState,
};

interface LivePlaygroundProps {
  code: string;
  noInline?: boolean;
}

export function LivePlayground({ code, noInline }: LivePlaygroundProps) {
  return (
    <div className="playground">
      <LiveProvider code={code.trim()} scope={scope} noInline={noInline}>
        <div className="playground__preview">
          <LivePreview />
        </div>
        <div className="playground__editor-wrapper">
          <span className="playground__editor-label">Editable</span>
          <div className="playground__editor">
            <LiveEditor />
          </div>
        </div>
        <LiveError className="playground__error" />
      </LiveProvider>
    </div>
  );
}
