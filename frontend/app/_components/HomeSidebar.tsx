"use client";

import * as React from "react";
import {
  Anchor,
  BookText,
  ChevronRight,
  ClipboardList,
  HandCoins,
  LayoutDashboard,
  Moon,
  ScanLine,
  Sun,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const data = {
  header: {
    name: "Acme Inc.",
    logo: Anchor,
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Product",
      url: "#",
      icon: ScanLine,
    },
    {
      title: "Compliance",
      url: "#",
      icon: ClipboardList,
      isActive: true,
      items: [
        {
          title: "Ask",
          url: "#",
        },
        {
          title: "Checklist",
          url: "#",
        },
        {
          title: "Timeline",
          url: "#",
        },
      ],
    },
    {
      title: "Customs/Tariffs",
      url: "#",
      icon: HandCoins,
      items: [
        {
          title: "Cost Saving",
          url: "#",
        },
        {
          title: "Estimates",
          url: "#",
        },
      ],
    },
    {
      title: "Export Documentation",
      url: "#",
      icon: BookText,
      items: [
        {
          title: "Documents",
          url: "#",
        },
        {
          title: "Export",
          url: "#",
        },
      ],
    },
  ],
};

export function HomeSidebar({
  breadcrumbs,
  children,
}: {
  breadcrumbs?: { title: string; href?: string }[];
  children?: React.ReactNode;
}) {
  const { setTheme } = useTheme();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <data.header.logo className="size-3" />
                </div>
                <h1 className="tracking-tight font-semibold text-base">
                  {data.header.name}
                </h1>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) =>
                !item.items ? (
                  <SidebarMenuButton
                    asChild
                    key={item.title}
                    tooltip={item.title}
                  >
                    <a href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                ) : (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ),
              )}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
        <SidebarFooter>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 justify-between">
            <SidebarTrigger variant="outline" className="-ml-1" />
            {breadcrumbs && (
              <>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((b, i) => (
                      <>
                        <BreadcrumbItem className="hidden md:block">
                          {b.href ? (
                            <BreadcrumbLink key={b.title} href={b.href}>
                              {b.title}
                            </BreadcrumbLink>
                          ) : (
                            <BreadcrumbPage key={b.title}>
                              {b.title}
                            </BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                        {breadcrumbs.length - 1 > i && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                      </>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </>
            )}
          </div>
        </header>
        <div className="px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
