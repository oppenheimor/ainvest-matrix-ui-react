import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./index";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  AtSignIcon,
  ChevronDownIcon,
  CommandIcon,
  EclipseIcon,
  PlusIcon,
  ZapIcon,
  Link2Icon,
  BellIcon,
  ShieldCheckIcon,
  LifeBuoyIcon,
  GaugeIcon,
  CircleDashedIcon,
  LucideIcon,
} from "lucide-react";
import { Collapsible, CollapsibleContent } from "./dependencies/ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Accordion> = {
  title: "Example/Accordion",
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo01: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">W/ chevron</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo02: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">W/ plus-minus</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  {item.title}
                  <PlusIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo03: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">W/ left chevron</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline [&>svg]:-order-1">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2 text-muted-foreground ps-7">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo04: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];
    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">W/ left plus-minus</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg]:-order-1 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  {item.title}
                  <PlusIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground ps-7">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo05: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        icon: CommandIcon,
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        icon: EclipseIcon,
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        icon: ZapIcon,
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        icon: AtSignIcon,
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">W/ icon and chevron</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
                <span className="flex gap-3 items-center">
                  <item.icon
                    size={16}
                    className="opacity-60 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-2 text-muted-foreground ps-7">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo06: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        icon: CommandIcon,
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        icon: EclipseIcon,
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        icon: ZapIcon,
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        icon: AtSignIcon,
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">W/ icon and plus-minus</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  <span className="flex gap-3 items-center">
                    <item.icon
                      size={16}
                      className="opacity-60 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item.title}</span>
                  </span>
                  <PlusIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground ps-7">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo07: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "Connected accounts",
        sub: "Manage your linked social and work accounts",
        content:
          "Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.",
      },
      {
        id: "2",
        title: "Notifications",
        sub: "Customize your notification preferences",
        content:
          "Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.",
      },
      {
        id: "3",
        title: "2-step verification",
        sub: "Add an extra layer of security to your account",
        content:
          "Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.",
      },
      {
        id: "4",
        title: "Contact support",
        sub: "We're here to help 24/7",
        content:
          "Our support team is available around the ClockIcon to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
      },
    ];
    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">W/ sub-header and chevron</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] [&[data-state=open]>svg]:rotate-180">
                  <span className="flex flex-col space-y-1">
                    <span>{item.title}</span>
                    {item.sub && (
                      <span className="text-sm font-normal">{item.sub}</span>
                    )}
                  </span>
                  <ChevronDownIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo08: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "Connected accounts",
        sub: "Manage your linked social and work accounts",
        content:
          "Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.",
      },
      {
        id: "2",
        title: "Notifications",
        sub: "Customize your notification preferences",
        content:
          "Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.",
      },
      {
        id: "3",
        title: "2-step verification",
        sub: "Add an extra layer of security to your account",
        content:
          "Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.",
      },
      {
        id: "4",
        title: "Contact support",
        sub: "We're here to help 24/7",
        content:
          "Our support team is available around the ClockIcon to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">W/ sub-header and plus-minus</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  <span className="flex flex-col space-y-1">
                    <span>{item.title}</span>
                    {item.sub && (
                      <span className="text-sm font-normal">{item.sub}</span>
                    )}
                  </span>
                  <PlusIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo09: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        icon: Link2Icon,
        title: "Connected accounts",
        sub: "Manage your linked social and work accounts",
        content:
          "Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.",
      },
      {
        id: "2",
        icon: BellIcon,
        title: "Notifications",
        sub: "Customize your notification preferences",
        content:
          "Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.",
      },
      {
        id: "3",
        icon: ShieldCheckIcon,
        title: "2-step verification",
        sub: "Add an extra layer of security to your account",
        content:
          "Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.",
      },
      {
        id: "4",
        icon: LifeBuoyIcon,
        title: "Contact support",
        sub: "We're here to help 24/7",
        content:
          "Our support team is available around the ClockIcon to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">W/ icon, sub-header, and chevron</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] [&[data-state=open]>svg]:rotate-180">
                  <span className="flex gap-3 items-center">
                    <span
                      className="flex justify-center items-center rounded-full border size-10 shrink-0"
                      aria-hidden="true"
                    >
                      <item.icon size={16} className="opacity-60" />
                    </span>
                    <span className="flex flex-col space-y-1">
                      <span>{item.title}</span>
                      {item.sub && (
                        <span className="text-sm font-normal">{item.sub}</span>
                      )}
                    </span>
                  </span>
                  <ChevronDownIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground ms-3 ps-10">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo10: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        icon: Link2Icon,
        title: "Connected accounts",
        sub: "Manage your linked social and work accounts",
        content:
          "Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.",
      },
      {
        id: "2",
        icon: BellIcon,
        title: "Notifications",
        sub: "Customize your notification preferences",
        content:
          "Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.",
      },
      {
        id: "3",
        icon: ShieldCheckIcon,
        title: "2-step verification",
        sub: "Add an extra layer of security to your account",
        content:
          "Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.",
      },
      {
        id: "4",
        icon: LifeBuoyIcon,
        title: "Contact support",
        sub: "We're here to help 24/7",
        content:
          "Our support team is available around the ClockIcon to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">
          W/ icon, sub-header, and plus-minus
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  <span className="flex gap-3 items-center">
                    <span
                      className="flex justify-center items-center rounded-full border size-10 shrink-0"
                      aria-hidden="true"
                    >
                      <item.icon size={16} className="opacity-60" />
                    </span>
                    <span className="flex flex-col space-y-1">
                      <span>{item.title}</span>
                      {item.sub && (
                        <span className="text-sm font-normal">{item.sub}</span>
                      )}
                    </span>
                  </span>
                  <PlusIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground ms-3 ps-10">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo11: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Tabs w/ chevron</h2>
        <Accordion
          type="single"
          collapsible
          className="space-y-2 w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo12: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Tabs w/ plus-minus</h2>
        <Accordion
          type="single"
          collapsible
          className="space-y-2 w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="ocus-visible:ring-0 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  {item.title}
                  <PlusIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo13: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Tabs w/ left chevron</h2>
        <Accordion
          type="single"
          collapsible
          className="space-y-2 w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2 text-muted-foreground ps-7">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo14: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Tabs w/ left plus-minus</h2>
        <Accordion
          type="single"
          collapsible
          className="space-y-2 w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-0 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  {item.title}
                  <PlusIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo15: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Table w/ chevron</h2>
        <Accordion
          type="single"
          collapsible
          className="-space-y-px w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo16: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Table w/ plus-minus</h2>
        <Accordion
          type="single"
          collapsible
          className="-space-y-px w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-0 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  {item.title}
                  <PlusIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo17: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Table w/ left chevron</h2>
        <Accordion
          type="single"
          collapsible
          className="-space-y-px w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="justify-start gap-3 rounded-md py-2 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2 text-muted-foreground ps-7">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo18: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        content:
          "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
      },
      {
        id: "2",
        title: "How can I customize the components?",
        content:
          "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        content:
          "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
      },
      {
        id: "4",
        title: "How accessible are the components?",
        content:
          "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
      },
    ];

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Table w/ left plus-minus</h2>
        <Accordion
          type="single"
          collapsible
          className="-space-y-px w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-0 [&>svg]:-order-1 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  {item.title}
                  <PlusIcon
                    size={16}
                    className="opacity-60 transition-transform duration-200 pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground ps-7">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo19: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        collapsibles: [
          {
            title: "What about performance?",
            content:
              "We optimize every component for maximum performance and minimal bundle size.",
          },
          {
            title: "How is the documentation?",
            content:
              "Our documentation is comprehensive and includes live examples for every component.",
          },
        ],
      },
      {
        id: "2",
        title: "How can I customize the components?",
        collapsibles: [
          {
            title: "Can I use custom themes?",
            content:
              "Yes, our theming system is fully customizable and supports both light and dark modes.",
          },
          {
            title: "What about Tailwind support?",
            content:
              "We have first-class support for Tailwind CSS with custom utility classes.",
          },
        ],
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        collapsibles: [
          {
            title: "What's the bundle size impact?",
            content:
              "Our components are tree-shakeable and typically add minimal overhead to your bundle.",
            open: true,
          },
          {
            title: "How is code splitting handled?",
            content:
              "We support automatic code splitting for optimal loading performance.",
          },
        ],
      },
      {
        id: "4",
        title: "How accessible are the components?",
        collapsibles: [
          {
            title: "Which screen readers are supported?",
            content:
              "We test with NVDA, VoiceOver, and JAWS to ensure broad compatibility.",
          },
          {
            title: "What about keyboard navigation?",
            content:
              "Full keyboard navigation support is implemented following WAI-ARIA best practices.",
          },
        ],
      },
    ];

    function CollapsibleDemo({
      title,
      content,
      open,
    }: {
      title: string;
      content: string;
      open?: boolean;
    }) {
      return (
        <Collapsible
          className="px-4 py-3 border-t bg-accent"
          defaultOpen={open}
        >
          <CollapsibleTrigger className="flex gap-2 text-[15px] leading-6 font-semibold [&[data-state=open]>svg]:rotate-180">
            <ChevronDownIcon
              size={16}
              className="mt-1 opacity-60 transition-transform duration-200 shrink-0"
              aria-hidden="true"
            />
            {title}
          </CollapsibleTrigger>
          <CollapsibleContent className="text-muted-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down mt-1 overflow-hidden ps-6 text-sm transition-all">
            {content}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Multi-level</h2>
        <Accordion
          type="single"
          collapsible
          className="-space-y-px w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="rounded-md px-4 py-3 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="p-0">
                {item.collapsibles.map((collapsible, index) => (
                  <CollapsibleDemo
                    key={index}
                    title={collapsible.title}
                    content={collapsible.content}
                    open={collapsible.open}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};

export const Demo20: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "What makes Origin UI different?",
        icon: CommandIcon,
        collapsibles: [
          {
            title: "What about performance?",
            content:
              "We optimize every component for maximum performance and minimal bundle size.",
            icon: GaugeIcon,
          },
          {
            title: "How is the documentation?",
            content:
              "Our documentation is comprehensive and includes live examples for every component.",
            icon: CircleDashedIcon,
          },
        ],
      },
      {
        id: "2",
        title: "How can I customize the components?",
        icon: EclipseIcon,
        collapsibles: [
          {
            title: "Can I use custom themes?",
            content:
              "Yes, our theming system is fully customizable and supports both light and dark modes.",
            icon: GaugeIcon,
          },
          {
            title: "What about Tailwind support?",
            content:
              "We have first-class support for Tailwind CSS with custom utility classes.",
            icon: CircleDashedIcon,
          },
        ],
      },
      {
        id: "3",
        title: "Is Origin UI optimized for performance?",
        icon: ZapIcon,
        collapsibles: [
          {
            title: "What's the bundle size impact?",
            content:
              "Our components are tree-shakeable and typically add minimal overhead to your bundle.",
            open: true,
            icon: GaugeIcon,
          },
          {
            title: "How is code splitting handled?",
            content:
              "We support automatic code splitting for optimal loading performance.",
            icon: CircleDashedIcon,
          },
        ],
      },
      {
        id: "4",
        title: "How accessible are the components?",
        icon: AtSignIcon,
        collapsibles: [
          {
            title: "Which screen readers are supported?",
            content:
              "We test with NVDA, VoiceOver, and JAWS to ensure broad compatibility.",
            icon: GaugeIcon,
          },
          {
            title: "What about keyboard navigation?",
            content:
              "Full keyboard navigation support is implemented following WAI-ARIA best practices.",
            icon: CircleDashedIcon,
          },
        ],
      },
    ];

    function CollapsibleDemo({
      title,
      content,
      open,
      icon: Icon,
    }: {
      title: string;
      content: string;
      open?: boolean;
      icon: LucideIcon;
    }) {
      return (
        <Collapsible className="py-3 border-t ps-6 pe-4" defaultOpen={open}>
          <CollapsibleTrigger className="flex gap-2 text-[15px] leading-6 font-semibold [&[data-state=open]>svg]:rotate-180">
            <ChevronDownIcon
              size={16}
              className="mt-1 opacity-60 transition-transform duration-200 shrink-0"
              aria-hidden="true"
            />
            <span className="flex gap-3 items-center">
              <Icon
                size={16}
                className="opacity-60 shrink-0"
                aria-hidden="true"
              />
              <span>{title}</span>
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="text-muted-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down mt-1 overflow-hidden ps-6 text-sm transition-all">
            {content}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <div className="space-y-4 w-[500px]">
        <h2 className="text-xl font-bold">Multi-level w/ icon</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="has-focus-visible:border-ring has-focus-visible:ring-ring/50 outline-none has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="justify-start gap-3 rounded-md text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
                <span className="flex gap-3 items-center">
                  <item.icon
                    size={16}
                    className="opacity-60 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                {item.collapsibles.map((collapsible, index) => (
                  <CollapsibleDemo
                    key={index}
                    title={collapsible.title}
                    content={collapsible.content}
                    open={collapsible.open}
                    icon={collapsible.icon}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};
