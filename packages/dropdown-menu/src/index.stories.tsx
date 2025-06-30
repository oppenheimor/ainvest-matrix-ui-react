import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./index";
import {
  CopyPlusIcon,
  BoltIcon,
  Layers2Icon,
  FilesIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "../../button";
import { Skeleton } from "../../skeleton/src/index";

const meta: Meta<typeof DropdownMenu> = {
  title: "Example/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: ``,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo01: Story = {
  name: "按钮变体",
  parameters: {
    docs: {
      description: {
        story:
          "Button 组件支持 5 种不同的变体 `primary`、`default`、`secondary`、`text`、`link`，分别适用于不同的使用场景",
      },
    },
  },
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Open Dropdown</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
          <DropdownMenuItem>Option 3</DropdownMenuItem>
          <DropdownMenuItem>Option 4</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Demo02: Story = {
  name: "下拉菜单中展示骨架屏",
  parameters: {
    docs: {
      description: {
        story: "下拉菜单中展示骨架屏，展示加载状态",
      },
    },
  },
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Open Dropdown</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Array.from({ length: 4 }).map((_, idx) => (
            <DropdownMenuItem className="hover:bg-transarent" key={idx}>
              <div className="flex items-center gap-[6px]">
                <Skeleton variant="avatar" className="w-7 h-7" />
                <div className="flex flex-col gap-[2px]">
                  <Skeleton className="h-[18px] w-[200px]" />
                  <Skeleton className="h-[18px] w-[200px]" />
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
