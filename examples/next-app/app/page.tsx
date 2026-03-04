"use client"

import {
  Button,
  Card,
  Input,
  Label,
  Badge,
  Avatar,
  Checkbox,
  Switch,
  Progress,
  Tooltip,
  Dialog,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Stack,
  Divider,
} from "@orbi/react"
import { useState } from "react"

export default function Home() {
  const [switchState, setSwitchState] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [checkboxState, setCheckboxState] = useState(false)

  return (
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1>Orbi UI - Next.js Example</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--typography-body)" }}>
          Demonstrating all Orbi UI components and design tokens
        </p>
      </header>

      <section style={{ marginBottom: "40px" }}>
        <h2>Button Component</h2>
        <Card>
          <Stack direction="row" gap="md">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button disabled>Disabled Button</Button>
          </Stack>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Input Component</h2>
        <Card>
          <Label htmlFor="example-input">Enter your email:</Label>
          <Input
            id="example-input"
            type="email"
            placeholder="you@example.com"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <p style={{ fontSize: "var(--typography-small)", color: "var(--color-text-secondary)" }}>
            You entered: {inputValue || "nothing yet"}
          </p>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Switch Component</h2>
        <Card>
          <label style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Switch checked={switchState} onCheckedChange={setSwitchState} />
            <span>Toggle switch: {switchState ? "ON" : "OFF"}</span>
          </label>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Checkbox Component</h2>
        <Card>
          <label style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Checkbox checked={checkboxState} onCheckedChange={setCheckboxState} />
            <span>Accept terms and conditions</span>
          </label>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Badge Component</h2>
        <Card>
          <Stack direction="row" gap="md">
            <Badge>New</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="error">Error</Badge>
          </Stack>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Avatar Component</h2>
        <Card>
          <Stack direction="row" gap="md">
            <Avatar name="Alice Johnson" />
            <Avatar name="Bob Smith" />
            <Avatar name="Carol White" />
          </Stack>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Progress Component</h2>
        <Card>
          <Label>Download Progress</Label>
          <Progress value={65} max={100} style={{ marginTop: "12px" }} />
          <p style={{ fontSize: "var(--typography-small)" }}>65% complete</p>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Tooltip Component</h2>
        <Card>
          <Tooltip content="Click to see action" placement="top">
            <Button>Hover over me</Button>
          </Tooltip>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Tabs Component</h2>
        <Card>
          <Tabs defaultValue="features">
            <TabsList>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
            </TabsList>
            <TabsContent value="features" style={{ padding: "20px 0" }}>
              <p>• WCAG 2.1 accessible components</p>
              <p>• Token-driven design system</p>
              <p>• Full TypeScript support</p>
              <p>• Tree-shakeable imports</p>
            </TabsContent>
            <TabsContent value="tokens" style={{ padding: "20px 0" }}>
              <p>• Color system with semantic tokens</p>
              <p>• Spacing scale (8px-based)</p>
              <p>• Typography scale</p>
              <p>• Motion and transitions</p>
            </TabsContent>
            <TabsContent value="docs" style={{ padding: "20px 0" }}>
              <p>• Full API documentation</p>
              <p>• Installation guides</p>
              <p>• Example applications</p>
              <p>• Accessibility guidelines</p>
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Dialog Component</h2>
        <Card>
          <Video content={<>Check the Dialog component for modal functionality</>} 
            trigger={<Button>Open Dialog</Button>} 
          />
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Divider Component</h2>
        <Card>
          <p>Content above divider</p>
          <Divider />
          <p>Content below divider</p>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Stack Component (Layout)</h2>
        <Card>
          <Stack direction="column" gap="lg">
            <Stack direction="row" gap="md">
              <Button>Left</Button>
              <Button>Center</Button>
              <Button>Right</Button>
            </Stack>
            <Stack direction="column" gap="sm">
              <div style={{ padding: "12px", background: "var(--color-neutral-100)" }}>
                Stack item 1
              </div>
              <div style={{ padding: "12px", background: "var(--color-neutral-100)" }}>
                Stack item 2
              </div>
              <div style={{ padding: "12px", background: "var(--color-neutral-100)" }}>
                Stack item 3
              </div>
            </Stack>
          </Stack>
        </Card>
      </section>

      <footer style={{ marginTop: "60px", paddingTop: "20px", borderTop: "1px solid var(--color-neutral-200)" }}>
        <p style={{ fontSize: "var(--typography-small)", color: "var(--color-text-secondary)" }}>
          ✅ If all components above render without errors, the example is working correctly!
        </p>
        <p style={{ fontSize: "var(--typography-small)", color: "var(--color-text-secondary)" }}>
          See <code>app/page.tsx</code> for component usage examples.
        </p>
      </footer>
    </main>
  )
}

function Video({ content, trigger }: { content: React.ReactNode; trigger: React.ReactNode }) {
  return (
    <Dialog>
      {trigger}
    </Dialog>
  )
}
