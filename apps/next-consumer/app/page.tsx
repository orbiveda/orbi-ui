"use client";

import {
  Button,
  Card,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Progress,
  Tooltip,
  Input,
  Label,
  Dialog,
  Checkbox,
} from "@orbi/react";
import { useState } from "react";

export default function Home() {
  const [switchState, setSwitchState] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <main style={{ padding: "40px" }}>
      <h1>Orbi UI - Next.js Consumer Test</h1>
      <p>Verifying component imports and rendering</p>

      <section style={{ marginTop: "40px" }}>
        <h2>Button Component</h2>
        <Card>
          <Button>Click me</Button>
          <Button variant="secondary">Secondary</Button>
        </Card>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Switch Component</h2>
        <Card>
          <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Switch
              checked={switchState}
              onCheckedChange={setSwitchState}
              aria-label="Demo switch"
            />
            <span>Toggle switch: {switchState ? "ON" : "OFF"}</span>
          </label>
        </Card>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Card Component</h2>
        <Card>
          <p>This is a card component with content</p>
        </Card>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Input Component</h2>
        <Card>
          <Label htmlFor="test-input">Test Input</Label>
          <Input
            id="test-input"
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Card>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Tabs Component</h2>
        <Card>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content for Tab 1</TabsContent>
            <TabsContent value="tab2">Content for Tab 2</TabsContent>
          </Tabs>
        </Card>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Progress Component</h2>
        <Card>
          <Progress value={65} max={100} aria-label="Loading progress" />
        </Card>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Tooltip Component</h2>
        <Card>
          <Tooltip content="This is a tooltip" placement="top">
            <Button>Hover over me</Button>
          </Tooltip>
        </Card>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Checkbox Component</h2>
        <Card>
          <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Checkbox />
            <span>Accept terms</span>
          </label>
        </Card>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Dialog Component</h2>
        <Card>
          <Dialog>
            <Button>Open Dialog</Button>
          </Dialog>
        </Card>
      </section>

      <section style={{ marginTop: "40px", padding: "20px", background: "#f0f0f0" }}>
        <h3>✅ If you can see all components above without errors, the test passed!</h3>
      </section>
    </main>
  );
}
