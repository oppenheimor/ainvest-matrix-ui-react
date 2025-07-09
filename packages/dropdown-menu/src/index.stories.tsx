/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
} from "./index";
import { Button } from "../../button";
import {
  BoltIcon,
  CopyPlusIcon,
  FilesIcon,
  TrashIcon,
  User2Icon,
  ChevronRightIcon,
  LogOutIcon,
} from "lucide-react";

const meta: Meta<typeof DropdownMenu> = {
  title: "Interaction/DropdownMenu",
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
  name: "个人中心",
  parameters: {
    docs: {
      description: {
        story: "个人中心下拉菜单",
      },
    },
  },
  render: () => {
    const languages = [
      { value: "chinese", label: "Chinese(Simplified)" },
      { value: "english", label: "English" },
      { value: "finance", label: "Finance" },
      { value: "grantland", label: "Grantland" },
      { value: "finvesta", label: "Finvesta" },
      { value: "capitallink", label: "CapitalLink" },
      { value: "marketbridge", label: "MarketBridge" },
      { value: "datasync", label: "DataSync" },
      { value: "InnovativeTech", label: "InnovativeTech" },
      { value: "japanese", label: "Japanese" },
      { value: "korean", label: "Korean" },
      { value: "german", label: "German" },
      { value: "spanish", label: "Spanish" },
      { value: "portuguese", label: "Portuguese" },
      { value: "russian", label: "Russian" },
    ];

    const [language, setLanguage] = useState("english");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Sign In</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* 自定义内容（登录区域） */}
          <div className="flex flex-col gap-3 items-center px-4 py-[9px] mb-3">
            <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full">
              <User2Icon className="w-5 h-5" />
            </div>
            <Button className="w-[246px]" size="lg">
              Sign In
            </Button>
          </div>
          <DropdownMenuItem className="flex items-center gap-[10px]">
            <BoltIcon className="w-5 h-5" />
            <span className="text-base">Subscriptions</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-[10px]">
            <CopyPlusIcon className="w-5 h-5" />
            <span className="text-base">Help Center</span>
          </DropdownMenuItem>
          {/* 多级菜单 */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex justify-between items-center">
              <div className="flex items-center gap-[10px]">
                <FilesIcon className="w-5 h-5" />
                <span className="text-base">Language</span>
              </div>
              <div className="flex gap-1 justify-start items-center">
                <span className="text-sm text-text-secondary">{languages.find(lang => lang.value === language)?.label || ""}</span>
                <ChevronRightIcon className="w-3 h-3" />
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-[278px] overflow-y-auto">
                <DropdownMenuRadioGroup
                  value={language}
                  onValueChange={setLanguage}
                >
                  {languages.map((lang) => (
                    <DropdownMenuRadioItem
                      key={lang.value}
                      value={lang.value}
                      className="text-base"
                    >
                      {lang.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="flex items-center gap-[10px]">
            <TrashIcon className="w-5 h-5" />
            <span className="text-base">API Docs</span>
          </DropdownMenuItem>
          {/* 分割线 */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-[10px]">
            <LogOutIcon className="w-5 h-5" />
            <span className="text-base">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
