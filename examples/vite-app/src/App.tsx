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

export default function App() {
  const [switchState, setSwitchState] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [checkboxState, setCheckboxState] = useState(false)

  return (
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1>Orbi UI - Vite + React Example</h1>
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
          <Label htmlFor="example-input">Enter your name:</Label>
          <Input
            id="example-input"
            type="text"
            placeholder="John Doe"
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
          <Label>Installation Progress</Label>
          <Progress value={42} max={100} style={{ marginTop: "12px" }} />
          <p style={{ fontSize: "var(--typography-small)" }}>42% complete</p>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Tooltip Component</h2>
        <Card>
          <Tooltip content="This is an interactive example" placement="top">
            <Button>Hover over me</Button>
          </Tooltip>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Tabs Component</h2>
        <Card>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" style={{ padding: "20px 0" }}>
              <p>• Built with React 18</p>
              <p>• TypeScript support</p>
              <p>• Accessible by default</p>
              <p>• Fully customizable tokens</p>
            </TabsContent>
            <TabsContent value="components" style={{ padding: "20px 0" }}>
              <p>• Button • Input • Label</p>
              <p>• Dialog • Tabs • Progress</p>
              <p>• Switch • Checkbox • Avatar</p>
              <p>• Badge • Card • Tooltip</p>
            </TabsContent>
            <TabsContent value="tools" style={{ padding: "20px 0" }}>
              <p>• GitHub Actions for CI/CD</p>
              <p>• Automated npm publishing</p>
              <p>• Type-safe with TypeScript</p>
              <p>• Vitest for unit testing</p>
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Dialog Component</h2>
        <Card>
          <Dialog>
            <Button>Open Dialog</Button>
          </Dialog>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Divider Component</h2>
        <Card>
          <p>Section one content above divider</p>
          <Divider />
          <p>Section two content below divider</p>
        </Card>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Stack Component (Layout)</h2>
        <Card>
          <Stack direction="column" gap="lg">
            <Stack direction="row" gap="md">
              <Button>Item 1</Button>
              <Button>Item 2</Button>
              <Button>Item 3</Button>
            </Stack>
            <Stack direction="column" gap="sm">
              <div style={{ padding: "12px", background: "var(--color-neutral-100)" }}>
                Vertical stack item 1
              </div>
              <div style={{ padding: "12px", background: "var(--color-neutral-100)" }}>
                Vertical stack item 2
              </div>
              <div style={{ padding: "12px", background: "var(--color-neutral-100)" }}>
                Vertical stack item 3
              </div>
            </Stack>
          </Stack>
        </Card>
      </section>

      <footer style={{ marginTop: "60px", paddingTop: "20px", borderTop: "1px solid var(--color-neutral-200)" }}>
        <p style={{ fontSize: "var(--typography-small)", color: "var(--color-text-secondary)" }}>
          ✅ If all components rendered without errors, everything is working correctly!
        </p>
        <p style={{ fontSize: "var(--typography-small)", color: "var(--color-text-secondary)" }}>
          See <code>src/App.tsx</code> for component usage examples.
        </p>
      </footer>
    </main>
  )
}
