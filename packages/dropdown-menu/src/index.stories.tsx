import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./index";
import {
  ArchiveRestoreIcon,
  BoltIcon,
  BookIcon,
  BookOpenIcon,
  ChevronDownIcon,
  CircleUserRoundIcon,
  CopyPlusIcon,
  EllipsisIcon,
  FilesIcon,
  Heading1Icon,
  Heading2Icon,
  Info,
  Layers2Icon,
  LifeBuoyIcon,
  LogOutIcon,
  MessageCircleMoreIcon,
  MinusIcon,
  MonitorIcon,
  MoonIcon,
  PinIcon,
  PlusIcon,
  Share2Icon,
  SunIcon,
  TextQuoteIcon,
  TrashIcon,
  TypeIcon,
  UserPenIcon,
} from "lucide-react";
// import Button from "@/button/index";
import { Button } from "../../button/dist/index";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./dependencies/ui/avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DropdownMenu> = {
  title: "Example/DropdownMenu",
  component: DropdownMenu,
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
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <EllipsisIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
        <DropdownMenuItem>Option 3</DropdownMenuItem>
        <DropdownMenuItem>Option 4</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Demo02: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          Same width of trigger
          <ChevronDownIcon
            className="opacity-60 -me-1"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
        <DropdownMenuItem>Option 3</DropdownMenuItem>
        <DropdownMenuItem>Option 4</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Demo03: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            Menu with icons
            <ChevronDownIcon
              className="opacity-60 -me-1"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <CopyPlusIcon size={16} className="opacity-60" aria-hidden="true" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            Group
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FilesIcon size={16} className="opacity-60" aria-hidden="true" />
            Clone
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// TODO: variant=destructive 的样式有问题
export const Demo04: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            Grouped items
            <ChevronDownIcon
              className="opacity-60 -me-1"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CopyPlusIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Layers2Icon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              Group
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FilesIcon size={16} className="opacity-60" aria-hidden="true" />
              Clone
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <TrashIcon size={16} aria-hidden="true" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Demo05: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            Labeled grouped items
            <ChevronDownIcon
              className="opacity-60 -me-1"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CopyPlusIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Layers2Icon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              Group
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FilesIcon size={16} className="opacity-60" aria-hidden="true" />
              Clone
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <TrashIcon size={16} aria-hidden="true" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Demo06: Story = {
  render: () => {
    type Checked = DropdownMenuCheckboxItemProps["checked"];

    const [nextjs, setNextjs] = useState<Checked>(false);
    const [sveltekit, setSveltekit] = useState<Checked>(true);
    const [astro, setAstro] = useState<Checked>(false);
    const [remix, setRemix] = useState<Checked>(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            Checkbox items
            <ChevronDownIcon
              className="opacity-60 -me-1"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={nextjs}
            onCheckedChange={setNextjs}
          >
            Next.js
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={sveltekit}
            onCheckedChange={setSveltekit}
          >
            SvelteKit
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={remix}
            onCheckedChange={setRemix}
            disabled
          >
            Remix
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={astro} onCheckedChange={setAstro}>
            Astro
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Demo07: Story = {
  render: () => {
    const [framework, setFramework] = useState("nextjs");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            Radio items
            <ChevronDownIcon
              className="opacity-60 -me-1"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={framework}
            onValueChange={setFramework}
          >
            <DropdownMenuRadioItem value="nextjs">
              Next.js
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="sveltekit" disabled>
              SvelteKit
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="remix">Remix</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="astro">Astro</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Demo08: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            Rich menu
            <ChevronDownIcon
              className="opacity-60 -me-1"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Edit</span>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Duplicate</span>
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Archive</span>
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Move to project</DropdownMenuItem>
                  <DropdownMenuItem>Move to folder</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Advanced options</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Add to favorites</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <span>Delete</span>
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Demo09: Story = {
  render: () => {
    const [framework, setFramework] = useState("nextjs");
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            Rich menu with icons
            <ChevronDownIcon
              className="opacity-60 -me-1"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PlusIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>New</span>
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>Framework</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={framework}
                    onValueChange={setFramework}
                  >
                    <DropdownMenuRadioItem value="nextjs">
                      Next.js
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sveltekit" disabled>
                      SvelteKit
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="remix">
                      Remix
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="astro">
                      Astro
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>
                Notifications
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuCheckboxItem
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  >
                    Email
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  >
                    Push
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Share2Icon size={16} className="opacity-60" aria-hidden="true" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArchiveRestoreIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Archive</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <TrashIcon size={16} aria-hidden="true" />
            <span>Delete</span>
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Demo10: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="outline" aria-label="Open account menu">
            <CircleUserRoundIcon size={16} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64">
          <DropdownMenuLabel className="flex flex-col">
            <span>Signed in as</span>
            <span className="text-xs font-normal text-foreground">
              k.kennedy@originui.com
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Option 1</DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
            <DropdownMenuItem>Option 3</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Demo11: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="outline" aria-label="Open account menu">
            <CircleUserRoundIcon size={16} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64">
          <DropdownMenuLabel className="flex gap-3 items-start">
            <img
              src="https://originui.com/avatar.jpg"
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate text-foreground">
                Keith Kennedy
              </span>
              <span className="text-xs font-normal truncate text-muted-foreground">
                k.kennedy@originui.com
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Option 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers2Icon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Option 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Option 3</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PinIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Option 4</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Option 5</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Demo12: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          <Avatar>
            <AvatarImage
              src="https://originui.com/avatar.jpg"
              alt="Profile image"
            />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate text-foreground">
            Keith Kennedy
          </span>
          <span className="text-xs font-normal truncate text-muted-foreground">
            k.kennedy@originui.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Demo13: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <Info size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Need help?</DropdownMenuLabel>
        <DropdownMenuItem
          className="py-1 cursor-pointer focus:bg-transparent focus:underline"
          asChild
        >
          <a href="#">
            <BookIcon size={16} className="opacity-60" aria-hidden="true" />
            Documentation
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="py-1 cursor-pointer focus:bg-transparent focus:underline"
          asChild
        >
          <a href="#">
            <LifeBuoyIcon size={16} className="opacity-60" aria-hidden="true" />
            Support
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="py-1 cursor-pointer focus:bg-transparent focus:underline"
          asChild
        >
          <a href="#">
            <MessageCircleMoreIcon
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            Contact us
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Demo14: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <PlusIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Add block</DropdownMenuLabel>
        <DropdownMenuItem>
          <div
            className="flex justify-center items-center rounded-md border bg-background size-8"
            aria-hidden="true"
          >
            <TypeIcon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Text</div>
            <div className="text-xs text-muted-foreground">
              Start writing with plain text
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex justify-center items-center rounded-md border bg-background size-8"
            aria-hidden="true"
          >
            <TextQuoteIcon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Quote</div>
            <div className="text-xs text-muted-foreground">Capture a quote</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex justify-center items-center rounded-md border bg-background size-8"
            aria-hidden="true"
          >
            <MinusIcon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Divider</div>
            <div className="text-xs text-muted-foreground">
              Visually divide blocks
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex justify-center items-center rounded-md border bg-background size-8"
            aria-hidden="true"
          >
            <Heading1Icon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Heading 1</div>
            <div className="text-xs text-muted-foreground">
              Big section heading
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div
            className="flex justify-center items-center rounded-md border bg-background size-8"
            aria-hidden="true"
          >
            <Heading2Icon size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Heading 2</div>
            <div className="text-xs text-muted-foreground">
              Medium section subheading
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Demo15: Story = {
  render: () => {
    type Theme = "light" | "dark" | "system"

    const [theme, setTheme] = useState<Theme>("system")

    // For demo purposes, we'll simulate system preference as "light"
    const systemPreference = "light"
    const displayTheme = theme === "system" ? systemPreference : theme

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="outline" aria-label="Select theme">
            {displayTheme === "light" && (
              <SunIcon size={16} aria-hidden="true" />
            )}
            {displayTheme === "dark" && (
              <MoonIcon size={16} aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-32">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <SunIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <MoonIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <MonitorIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
