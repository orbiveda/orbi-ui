"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Design Tokens", href: "/docs/design-tokens" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Button", href: "/docs/components/button" },
      { label: "Input", href: "/docs/components/input" },
      { label: "Checkbox", href: "/docs/components/checkbox" },
      { label: "Switch", href: "/docs/components/switch" },
      { label: "Tabs", href: "/docs/components/tabs" },
      { label: "Tooltip", href: "/docs/components/tooltip" },
      { label: "Dialog", href: "/docs/components/dialog" },
      { label: "Card", href: "/docs/components/card" },
      { label: "Avatar", href: "/docs/components/avatar" },
      { label: "Badge", href: "/docs/components/badge" },
      { label: "Divider", href: "/docs/components/divider" },
      { label: "Stack", href: "/docs/components/stack" },
      { label: "Progress", href: "/docs/components/progress" },
      { label: "Textarea", href: "/docs/components/textarea" },
      { label: "Select", href: "/docs/components/select" },
    ],
  },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarClasses = [
    "docs-sidebar",
    open && "docs-sidebar--open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={sidebarClasses}>
      <nav>
        {navigation.map((group) => (
          <div key={group.title} className="docs-sidebar__group">
            <div className="docs-sidebar__group-title">{group.title}</div>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`docs-sidebar__link${isActive ? " docs-sidebar__link--active" : ""}`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
