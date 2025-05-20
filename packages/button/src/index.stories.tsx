import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./index";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LoaderCircleIcon,
  MailIcon,
  MoonIcon,
  PlusIcon,
  PrinterIcon,
  SparklesIcon,
  SunIcon,
  TrashIcon,
  XIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  VolumeXIcon,
  MinusIcon,
  CheckIcon,
  CopyIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  FilesIcon,
  FilmIcon,
  EllipsisIcon,
  QrCodeIcon,
  SquareArrowOutUpRightIcon,
  PinIcon,
  GitForkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ThumbsUpIcon,
  StarIcon,
  CircleUserRoundIcon,
  CircleIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "./dependencies/ui/badge";
import { Toggle } from "./dependencies/ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./dependencies/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./dependencies/ui/tooltip";
import { cn } from "./utils/clsx";
import { ToggleGroup, ToggleGroupItem } from "./dependencies/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./dependencies/ui/dropdown-menu";
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { useFileUpload } from "./dependencies/hooks/use-file-upload";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo01: Story = {
  render: () => <Button>Button</Button>,
};

export const Demo02: Story = {
  render: () => <Button disabled>Button</Button>,
};

export const Demo03: Story = {
  render: () => <Button className="rounded-full">Button</Button>,
};

export const Demo04: Story = {
  render: () => (
    <Button>
      <ArchiveIcon className="opacity-60 -ms-1" size={16} aria-hidden="true" />
      Button
    </Button>
  ),
};

export const Demo05: Story = {
  render: () => (
    <Button variant="destructive">
      <TrashIcon className="opacity-60 -ms-1" size={16} aria-hidden="true" />
      Button
    </Button>
  ),
};

export const Demo06: Story = {
  render: () => (
    <Button variant="secondary">
      <XIcon className="opacity-60 -ms-1" size={16} aria-hidden="true" />
      Button
    </Button>
  ),
};

export const Demo07: Story = {
  render: () => (
    <Button variant="outline">
      Button
      <SparklesIcon className="opacity-60 -me-1" size={16} aria-hidden="true" />
    </Button>
  ),
};

export const Demo08: Story = {
  render: () => (
    <Button className="group" variant="ghost">
      <ArrowLeftIcon
        className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
        size={16}
        aria-hidden="true"
      />
      Button
    </Button>
  ),
};

export const Demo09: Story = {
  render: () => (
    <Button className="group">
      Button
      <ArrowRightIcon
        className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
        size={16}
        aria-hidden="true"
      />
    </Button>
  ),
};

export const Demo10: Story = {
  render: () => (
    <Button className="group" variant="secondary">
      <MailIcon className="opacity-60 -ms-1" size={16} aria-hidden="true" />
      Email
      <ArrowRightIcon
        className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
        size={16}
        aria-hidden="true"
      />
    </Button>
  ),
};

export const Demo11: Story = {
  render: () => (
    <Button>
      Button
      <ChevronDownIcon
        className="opacity-60 -me-1"
        size={16}
        aria-hidden="true"
      />
    </Button>
  ),
};

export const Demo12: Story = {
  render: () => (
    <div className="inline-flex gap-2 items-center">
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </div>
  ),
};

export const Demo13: Story = {
  render: () => (
    <Button disabled>
      <LoaderCircleIcon
        className="animate-spin -ms-1"
        size={16}
        aria-hidden="true"
      />
      Button
    </Button>
  ),
};

// TODO: 这个效果有点问题
export const Demo14: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = () => {
      // Simulate an async operation
      setIsLoading(true);
      setTimeout(() => {
        // Reset after 1 second
        setIsLoading(false);
      }, 1000);
    };

    return (
      <Button
        onClick={handleClick}
        disabled={isLoading}
        data-loading={isLoading || undefined}
        className="relative group disabled:opacity-100"
      >
        <span className="group-data-loading:text-transparent">Click me</span>
        {isLoading && (
          <div className="flex absolute inset-0 justify-center items-center">
            <LoaderCircleIcon
              className="animate-spin"
              size={16}
              aria-hidden="true"
            />
          </div>
        )}
      </Button>
    );
  },
};

export const Demo15: Story = {
  render: () => (
    <Button variant="outline" className="gap-3">
      Messages
      <span className="text-muted-foreground -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
        18
      </span>
    </Button>
  ),
};

export const Demo16: Story = {
  render: () => (
    <Button variant="outline">
      <PrinterIcon className="opacity-60 -ms-1" size={16} aria-hidden="true" />
      Print
      <kbd className="bg-background text-muted-foreground/70 ms-1 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
        ⌘P
      </kbd>
    </Button>
  ),
};

export const Demo17: Story = {
  render: () => (
    <Button className="gap-0 py-0 rounded-full ps-0">
      <div className="me-0.5 flex aspect-square h-full p-1.5">
        <img
          className="w-full h-auto rounded-full"
          src="https://originui.com/avatar.jpg"
          alt="Profile image"
          width={24}
          height={24}
          aria-hidden="true"
        />
      </div>
      @georgelucas
    </Button>
  ),
};

export const Demo18: Story = {
  render: () => (
    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
      <Avatar>
        <AvatarImage
          src="https://originui.com/avatar.jpg"
          alt="Profile image"
        />
        <AvatarFallback>KK</AvatarFallback>
      </Avatar>
      <ChevronDownIcon size={16} className="opacity-60" aria-hidden="true" />
    </Button>
  ),
};

export const Demo19: Story = {
  render: () => (
    <Button variant="outline" className="aspect-square max-sm:p-0">
      <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
      <span className="max-sm:sr-only">Add new</span>
    </Button>
  ),
};

export const Demo20: Story = {
  render: () => (
    <Button
      className="rounded-full"
      variant="outline"
      size="icon"
      aria-label="Add new item"
    >
      <PlusIcon size={16} aria-hidden="true" />
    </Button>
  ),
};

export const Demo21: Story = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <Button
        className="rounded-full group"
        variant="outline"
        size="icon"
        onClick={() => setOpen((prevState) => !prevState)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <PlusIcon
          className="transition-transform duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]"
          size={16}
          aria-hidden="true"
        />
      </Button>
    );
  },
};

export const Demo22: Story = {
  render: () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button variant="outline" size="icon" aria-label="Add new item">
                <PlusIcon size={16} aria-hidden="true" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">Tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

export const Demo23: Story = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <Button
        className="group"
        variant="outline"
        size="icon"
        onClick={() => setOpen((prevState) => !prevState)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg
          className="pointer-events-none"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
          />
          <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
          />
          <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
          />
        </svg>
      </Button>
    );
  },
};

export const Demo24: Story = {
  render: () => {
    const [bookmarked, setBookmarked] = useState<boolean>(false);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Toggle
                className="group size-9 p-0 hover:bg-indigo-50 hover:text-indigo-500 data-[state=on]:bg-indigo-50 data-[state=on]:text-indigo-500"
                aria-label="BookmarkIcon this"
                pressed={bookmarked}
                onPressedChange={setBookmarked}
              >
                <BookmarkIcon size={16} aria-hidden="true" />
              </Toggle>
            </div>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">
            <p>{bookmarked ? "Remove bookmark" : "BookmarkIcon this"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

export const Demo25: Story = {
  render: () => {
    const [count, setCount] = useState<number>(3);

    const handleClick = () => {
      setCount(0);
    };

    return (
      <Button
        variant="outline"
        size="icon"
        className="relative"
        onClick={handleClick}
        aria-label="Notifications"
      >
        <BellIcon size={16} aria-hidden="true" />
        {count > 0 && (
          <Badge className="absolute -top-2 left-full px-1 -translate-x-1/2 min-w-5">
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </Button>
    );
  },
};

export const Demo26: Story = {
  render: () => {
    const [theme, setTheme] = useState<string>("light");

    return (
      <Toggle
        variant="outline"
        className="group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-transparent"
        pressed={theme === "dark"}
        onPressedChange={() =>
          setTheme((prev) => (prev === "dark" ? "light" : "dark"))
        }
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
        <MoonIcon
          size={16}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <SunIcon
          size={16}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    );
  },
};

export const Demo27: Story = {
  render: () => {
    return (
      <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          variant="outline"
          size="icon"
          aria-label="Upvote"
        >
          <ChevronUpIcon size={16} aria-hidden="true" />
        </Button>
        <span className="flex items-center px-3 text-sm font-medium border border-input">
          235
        </span>
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          variant="outline"
          size="icon"
          aria-label="Downvote"
        >
          <ChevronDownIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    );
  },
};

export const Demo28: Story = {
  render: () => {
    return (
      <div className="inline-flex -space-x-px rounded-full shadow-xs rtl:space-x-reverse">
        <Button
          className="rounded-none shadow-none first:rounded-s-full last:rounded-e-full focus-visible:z-10"
          size="icon"
          aria-label="Upvote"
        >
          <ChevronUpIcon size={16} aria-hidden="true" />
        </Button>
        <span className="flex items-center px-1 text-sm font-medium bg-primary text-primary-foreground">
          235
        </span>
        <Button
          className="rounded-none shadow-none first:rounded-s-full last:rounded-e-full focus-visible:z-10"
          size="icon"
          aria-label="Downvote"
        >
          <ChevronDownIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    );
  },
};

export const Demo29: Story = {
  render: () => {
    const [volume, setVolume] = useState(3); // Initialize volume state (0-9)

    const decreaseVolume = () => setVolume((prev) => Math.max(0, prev - 1));
    const increaseVolume = () => setVolume((prev) => Math.min(6, prev + 1));

    // Optimized volume icon selection
    const Icon =
      volume === 0
        ? VolumeXIcon
        : volume < 3
        ? VolumeIcon
        : volume < 5
        ? Volume1Icon
        : Volume2Icon;

    return (
      <div
        className="inline-flex items-center"
        role="group"
        aria-labelledby="volume-control"
      >
        <span id="volume-control" className="sr-only">
          Volume Control
        </span>
        <Button
          className="rounded-full"
          variant="outline"
          size="icon"
          aria-label="Decrease volume"
          onClick={decreaseVolume}
          disabled={volume === 0}
        >
          <MinusIcon size={16} aria-hidden="true" />
        </Button>
        <div
          className="flex items-center px-3 text-sm font-medium tabular-nums"
          aria-live="polite"
        >
          <Icon className="opacity-60" size={16} aria-hidden="true" />
          <span className="ms-2" aria-label={`Current volume is ${volume}`}>
            {volume}
          </span>
        </div>
        <Button
          className="rounded-full"
          variant="outline"
          size="icon"
          aria-label="Increase volume"
          onClick={increaseVolume}
          disabled={volume === 6}
        >
          <PlusIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    );
  },
};

export const Demo30: Story = {
  render: () => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = async () => {
      try {
        // await navigator.clipboard.writeText("string to copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="disabled:opacity-100"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy to clipboard"}
              disabled={copied}
            >
              <div
                className={cn(
                  "transition-all",
                  copied ? "opacity-100 scale-100" : "opacity-0 scale-0"
                )}
              >
                <CheckIcon
                  className="stroke-emerald-500"
                  size={16}
                  aria-hidden="true"
                />
              </div>
              <div
                className={cn(
                  "absolute transition-all",
                  copied ? "opacity-0 scale-0" : "opacity-100 scale-100"
                )}
              >
                <CopyIcon size={16} aria-hidden="true" />
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">
            Click to copy
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

export const Demo31: Story = {
  render: () => {
    return (
      <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          variant="outline"
          size="icon"
          aria-label="Flip Horizontal"
        >
          <FlipHorizontalIcon size={16} aria-hidden="true" />
        </Button>
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          variant="outline"
          size="icon"
          aria-label="Flip Vertical"
        >
          <FlipVerticalIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    );
  },
};

export const Demo32: Story = {
  render: () => {
    const [value, setValue] = useState<string>("center");

    return (
      <ToggleGroup
        className="inline-flex divide-x divide-background"
        type="single"
        value={value}
        onValueChange={(value) => {
          if (value) setValue(value);
        }}
      >
        <ToggleGroupItem
          className="bg-primary/80 text-primary-foreground hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          aria-label="Align Left"
          value="left"
        >
          <AlignLeftIcon size={16} aria-hidden="true" />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="bg-primary/80 text-primary-foreground hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          aria-label="Align Center"
          value="center"
        >
          <AlignCenterIcon size={16} aria-hidden="true" />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="bg-primary/80 text-primary-foreground hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          aria-label="Align Right"
          value="right"
        >
          <AlignRightIcon size={16} aria-hidden="true" />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="bg-primary/80 text-primary-foreground hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          aria-label="Align Justify"
          value="justify"
        >
          <AlignJustifyIcon size={16} aria-hidden="true" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Demo33: Story = {
  render: () => {
    return (
      <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          variant="outline"
        >
          <FilesIcon
            className="opacity-60 -ms-1"
            size={16}
            aria-hidden="true"
          />
          Files
        </Button>
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          variant="outline"
        >
          <FilmIcon className="opacity-60 -ms-1" size={16} aria-hidden="true" />
          Media
        </Button>
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          variant="outline"
          size="icon"
          aria-label="Menu"
        >
          <EllipsisIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    );
  },
};

export const Demo34: Story = {
  render: () => {
    return (
      <ToggleGroup variant="outline" className="inline-flex" type="single">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Demo35: Story = {
  render: () => {
    const [value, setValue] = useState<string>("center");

    return (
      <ToggleGroup
        type="single"
        variant="outline"
        value={value}
        onValueChange={(value) => {
          if (value) setValue(value);
        }}
      >
        <ToggleGroupItem className="flex-1" value="left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem className="flex-1" value="center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem className="flex-1" value="right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Demo36: Story = {
  render: () => {
    return (
      <div className="inline-flex rounded-md divide-x divide-primary-foreground/30 shadow-xs rtl:space-x-reverse">
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          size="icon"
          aria-label="QR code"
        >
          <QrCodeIcon size={16} aria-hidden="true" />
        </Button>
        <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10">
          Sign in
        </Button>
      </div>
    );
  },
};

export const Demo37: Story = {
  render: () => {
    return (
      <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          variant="outline"
        >
          Preview
        </Button>
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          variant="outline"
          size="icon"
          aria-label="Open link"
        >
          <SquareArrowOutUpRightIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    );
  },
};

export const Demo38: Story = {
  render: () => {
    return (
      <div className="inline-flex rounded-md divide-x divide-primary-foreground/30 shadow-xs rtl:space-x-reverse">
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          size="icon"
          aria-label="Options"
        >
          <ChevronDownIcon size={16} aria-hidden="true" />
        </Button>
        <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10">
          <PinIcon className="opacity-60 -ms-1" size={16} aria-hidden="true" />
          Pinned
        </Button>
      </div>
    );
  },
};

export const Demo39: Story = {
  render: () => {
    return (
      <div className="inline-flex rounded-md divide-x divide-primary-foreground/30 shadow-xs rtl:space-x-reverse">
        <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10">
          <GitForkIcon className="opacity-60" size={16} aria-hidden="true" />
          Fork
          <span className="border-primary-foreground/30 text-primary-foreground/60 ms-1 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
            18
          </span>
        </Button>
        <Button
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
          size="icon"
          aria-label="Options"
        >
          <ChevronDownIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    );
  },
};

// TODO: 目前有点问题
export const Demo40: Story = {
  render: () => {
    const options = [
      {
        label: "Merge pull request",
        description:
          "All commits from this branch will be added to the base branch via a commit version.",
      },
      {
        label: "Squash and merge",
        description:
          "The 6 commits from this branch will be combined into one commit in the base branch.",
      },
      {
        label: "Rebase and merge",
        description:
          "The 6 commits from this branch will be rebased and added to the base branch.",
      },
    ];

    const [selectedIndex, setSelectedIndex] = useState("0");

    return (
      <div className="inline-flex rounded-md divide-x divide-primary-foreground/30 shadow-xs rtl:space-x-reverse">
        <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10">
          {options[Number(selectedIndex)].label}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              size="icon"
              aria-label="Options"
            >
              <ChevronDownIcon size={16} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="max-w-64 md:max-w-xs"
            side="bottom"
            sideOffset={4}
            align="end"
          >
            <DropdownMenuRadioGroup
              value={selectedIndex}
              onValueChange={setSelectedIndex}
            >
              {options.map((option, index) => (
                <DropdownMenuRadioItem
                  key={option.label}
                  value={String(index)}
                  className="items-start [&>span]:pt-1.5"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

export const Demo41: Story = {
  render: () => {
    return (
      <Button className="relative ps-12">
        Previous
        <span className="flex absolute inset-y-0 justify-center items-center w-9 pointer-events-none bg-primary-foreground/15 start-0">
          <ChevronLeftIcon
            className="opacity-60"
            size={16}
            aria-hidden="true"
          />
        </span>
      </Button>
    );
  },
};

export const Demo42: Story = {
  render: () => {
    return (
      <Button className="relative pe-12">
        Next
        <span className="flex absolute inset-y-0 justify-center items-center w-9 pointer-events-none bg-primary-foreground/15 end-0">
          <ChevronRightIcon
            className="opacity-60"
            size={16}
            aria-hidden="true"
          />
        </span>
      </Button>
    );
  },
};

export const Demo43: Story = {
  render: () => {
    return (
      <Button className="py-0 pe-0" variant="outline">
        <ThumbsUpIcon className="opacity-60" size={16} aria-hidden="true" />
        Like
        <span className="inline-flex relative justify-center items-center px-3 h-full text-xs font-medium rounded-full text-muted-foreground before:bg-input ms-1 before:absolute before:inset-0 before:left-0 before:w-px">
          86
        </span>
      </Button>
    );
  },
};

export const Demo44: Story = {
  render: () => {
    return (
      <Button>
        <StarIcon className="opacity-60 -ms-1" size={16} aria-hidden="true" />
        <span className="flex gap-2 items-baseline">
          Star
          <span className="text-xs text-primary-foreground/60">729</span>
        </span>
      </Button>
    );
  },
};

export const Demo45: Story = {
  render: () => {
    return (
      <div className="inline-flex flex-wrap gap-2">
        <Button variant="outline" aria-label="Login with Google" size="icon">
          <RiGoogleFill size={16} aria-hidden="true" />
        </Button>
        <Button variant="outline" aria-label="Login with Facebook" size="icon">
          <RiFacebookFill size={16} aria-hidden="true" />
        </Button>
        <Button variant="outline" aria-label="Login with X" size="icon">
          <RiTwitterXFill size={16} aria-hidden="true" />
        </Button>
        <Button variant="outline" aria-label="Login with GitHub" size="icon">
          <RiGithubFill size={16} aria-hidden="true" />
        </Button>
      </div>
    );
  },
};

export const Demo46: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          className="flex-1"
          variant="outline"
          aria-label="Login with Google"
          size="icon"
        >
          <RiGoogleFill
            className="dark:text-primary text-[#DB4437]"
            size={16}
            aria-hidden="true"
          />
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          aria-label="Login with Facebook"
          size="icon"
        >
          <RiFacebookFill
            className="dark:text-primary text-[#1877f2]"
            size={16}
            aria-hidden="true"
          />
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          aria-label="Login with X"
          size="icon"
        >
          <RiTwitterXFill
            className="dark:text-primary text-[#14171a]"
            size={16}
            aria-hidden="true"
          />
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          aria-label="Login with GitHub"
          size="icon"
        >
          <RiGithubFill
            className="text-black dark:text-primary"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </div>
    );
  },
};

export const Demo47: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        <Button variant="outline">
          <RiGoogleFill
            className="me-1 text-[#DB4437] dark:text-white/60"
            size={16}
            aria-hidden="true"
          />
          Login with Google
        </Button>
        <Button variant="outline">
          <RiTwitterXFill
            className="me-1 text-[#14171a] dark:text-white/60"
            size={16}
            aria-hidden="true"
          />
          Login with X
        </Button>
        <Button variant="outline">
          <RiFacebookFill
            className="me-1 text-[#1877f2] dark:text-white/60"
            size={16}
            aria-hidden="true"
          />
          Login with Facebook
        </Button>
        <Button variant="outline">
          <RiGithubFill
            className="me-1 text-[#333333] dark:text-white/60"
            size={16}
            aria-hidden="true"
          />
          Login with GitHub
        </Button>
      </div>
    );
  },
};

export const Demo48: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        <Button className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90">
          <span className="flex-1 pointer-events-none me-2">
            <RiGoogleFill className="opacity-60" size={16} aria-hidden="true" />
          </span>
          Login with Google
        </Button>
        <Button className="bg-[#14171a] text-white after:flex-1 hover:bg-[#14171a]/90">
          <span className="flex-1 pointer-events-none me-2">
            <RiTwitterXFill
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
          </span>
          Login with X
        </Button>
        <Button className="bg-[#1877f2] text-white after:flex-1 hover:bg-[#1877f2]/90">
          <span className="flex-1 pointer-events-none me-2">
            <RiFacebookFill
              className="opacity-60"
              size={16}
              aria-hidden="true"
            />
          </span>
          Login with Facebook
        </Button>
        <Button className="bg-[#333333] text-white after:flex-1 hover:bg-[#333333]/90">
          <span className="flex-1 pointer-events-none me-2">
            <RiGithubFill className="opacity-60" size={16} aria-hidden="true" />
          </span>
          Login with GitHub
        </Button>
      </div>
    );
  },
};

export const Demo49: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const toggleExpand = () => {
      setIsExpanded((prevState) => !prevState);
    };

    return (
      <Button
        className="gap-1"
        variant="ghost"
        onClick={toggleExpand}
        aria-expanded={isExpanded}
        aria-controls="expandable-content" // Use this ID on the element that this button controls
      >
        {isExpanded ? "Show less" : "Show more"}
        {isExpanded ? (
          <ChevronUpIcon className="-me-1" size={16} aria-hidden="true" />
        ) : (
          <ChevronDownIcon className="-me-1" size={16} aria-hidden="true" />
        )}
      </Button>
    );
  },
};

export const Demo50: Story = {
  render: () => {
    return (
      <Button variant="link" className="gap-1">
        <ChevronLeftIcon className="opacity-60" size={16} aria-hidden="true" />
        Go back
      </Button>
    );
  },
};

export const Demo51: Story = {
  render: () => {
    const [{ files }, { removeFile, openFileDialog, getInputProps }] =
      useFileUpload({
        accept: "image/*",
      });

    const previewUrl = files[0]?.preview || null;
    const fileName = files[0]?.file.name || null;

    return (
      <div className="flex flex-col gap-2 items-center">
        <div className="inline-flex gap-2 items-center align-top">
          <div
            className="flex overflow-hidden relative justify-center items-center rounded-md border border-input size-9 shrink-0"
            aria-label={
              previewUrl ? "Preview of uploaded image" : "Default user avatar"
            }
          >
            {previewUrl ? (
              <img
                className="object-cover size-full"
                src={previewUrl}
                alt="Preview of uploaded image"
                width={32}
                height={32}
              />
            ) : (
              <div aria-hidden="true">
                <CircleUserRoundIcon className="opacity-60" size={16} />
              </div>
            )}
          </div>
          <div className="inline-block relative">
            <Button onClick={openFileDialog} aria-haspopup="dialog">
              {fileName ? "Change image" : "Upload image"}
            </Button>
            <input
              {...getInputProps()}
              className="sr-only"
              aria-label="Upload image file"
              tabIndex={-1}
            />
          </div>
        </div>
        {fileName && (
          <div className="inline-flex gap-2 text-xs">
            <p className="truncate text-muted-foreground" aria-live="polite">
              {fileName}
            </p>{" "}
            <button
              onClick={() => removeFile(files[0]?.id)}
              className="font-medium text-destructive hover:underline"
              aria-label={`Remove ${fileName}`}
            >
              Remove
            </button>
          </div>
        )}
        <p
          aria-live="polite"
          role="region"
          className="mt-2 text-xs text-muted-foreground"
        >
          Basic image uploader ∙{" "}
          <a
            href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
            className="underline hover:text-foreground"
          >
            Docs
          </a>
        </p>
      </div>
    );
  },
};

export const Demo52: Story = {
  render: () => {
    const [{ files }, { removeFile, openFileDialog, getInputProps }] =
      useFileUpload({
        accept: "image/*",
      });

    const previewUrl = files[0]?.preview || null;
    const fileName = files[0]?.file.name || null;

    return (
      <div className="flex flex-col gap-2 items-center">
        <div className="inline-flex relative">
          <Button
            variant="outline"
            className="overflow-hidden relative p-0 shadow-none size-16"
            onClick={openFileDialog}
            aria-label={previewUrl ? "Change image" : "Upload image"}
          >
            {previewUrl ? (
              <img
                className="object-cover size-full"
                src={previewUrl}
                alt="Preview of uploaded image"
                width={64}
                height={64}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div aria-hidden="true">
                <CircleUserRoundIcon className="opacity-60 size-4" />
              </div>
            )}
          </Button>
          {previewUrl && (
            <Button
              onClick={() => removeFile(files[0]?.id)}
              size="icon"
              className="absolute -top-2 -right-2 rounded-full border-2 shadow-none border-background focus-visible:border-background size-6"
              aria-label="Remove image"
            >
              <XIcon className="size-3.5" />
            </Button>
          )}
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            tabIndex={-1}
          />
        </div>
        {fileName && (
          <p className="text-xs text-muted-foreground">{fileName}</p>
        )}
        <p
          aria-live="polite"
          role="region"
          className="mt-2 text-xs text-muted-foreground"
        >
          Avatar upload button
        </p>
      </div>
    );
  },
};

export const Demo53: Story = {
  render: () => {
    return (
      <div className="inline-grid grid-cols-3 gap-1 w-fit">
        <Button
          className="col-start-2"
          variant="outline"
          size="icon"
          aria-label="Pan camera up"
        >
          <ChevronUpIcon size={16} aria-hidden="true" />
        </Button>
        <Button
          className="col-start-1"
          variant="outline"
          size="icon"
          aria-label="Pan camera left"
        >
          <ChevronLeftIcon size={16} aria-hidden="true" />
        </Button>
        <div className="flex justify-center items-center" aria-hidden="true">
          <CircleIcon className="opacity-60" size={16} />
        </div>
        <Button variant="outline" size="icon" aria-label="Pan camera right">
          <ChevronRightIcon size={16} aria-hidden="true" />
        </Button>
        <Button
          className="col-start-2"
          variant="outline"
          size="icon"
          aria-label="Pan camera down"
        >
          <ChevronDownIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    );
  },
};

export const Demo54: Story = {
  render: () => {
    return (
      <Button className="gap-4 py-3 h-auto text-left group" variant="outline">
        <div className="space-y-1">
          <h3>Talent Agency</h3>
          <p className="font-normal text-muted-foreground whitespace-break-spaces">
            Matches for your roster
          </p>
        </div>
        <ChevronRightIcon
          className="opacity-60 transition-transform group-hover:translate-x-0.5"
          size={16}
          aria-hidden="true"
        />
      </Button>
    );
  },
};
