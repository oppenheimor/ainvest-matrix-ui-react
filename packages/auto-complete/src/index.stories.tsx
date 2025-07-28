/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AutoComplete } from "./index";
import { AutoCompleteOption } from "./types";

const meta: Meta<typeof AutoComplete> = {
  title: "Components/AutoComplete",
  component: AutoComplete,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "default", "large"],
    },
    status: {
      control: "select",
      options: [undefined, "error", "warning"],
    },
    allowClear: {
      control: "boolean",
    },
    showArrow: {
      control: "boolean",
    },
    dropdownMatchSelectWidth: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 邮箱自动补全
export const EmailAutoComplete: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState<AutoCompleteOption[]>([]);

    const DEFAULT_EMAIL_DOMAINS = [
      "gmail.com",
      "outlook.com",
      "hotmail.com",
      "yahoo.com",
      "icloud.com",
      "qq.com",
      "163.com",
      "126.com",
      "sina.com",
      "sohu.com",
    ];

    function generateEmailSuggestions(
      inputValue: string,
      domains: string[] = DEFAULT_EMAIL_DOMAINS,
      maxSuggestions: number = 8
    ): AutoCompleteOption[] {
      if (!inputValue || inputValue.trim() === "") {
        return [];
      }

      const trimmedInput = inputValue.trim();

      // 如果已经包含@符号，则判断是否需要补全
      if (trimmedInput.includes("@")) {
        const [localPart, domainPart] = trimmedInput.split("@");

        if (!domainPart || domainPart === "") {
          // @后面没有内容，生成所有域名建议
          return domains.slice(0, maxSuggestions).map((domain) => ({
            value: `${localPart}@${domain}`,
            key: `${localPart}@${domain}`,
          }));
        } else {
          // 检查是否已经是完整的邮箱地址
          const isCompleteEmail = domains.some(
            (domain) => domain.toLowerCase() === domainPart.toLowerCase()
          );

          if (isCompleteEmail) {
            // 已经是完整的邮箱地址，不提供建议
            return [];
          } else {
            // @后面有部分内容，筛选匹配的域名
            const matchingDomains = domains.filter((domain) =>
              domain.toLowerCase().startsWith(domainPart.toLowerCase())
            );
            return matchingDomains.slice(0, maxSuggestions).map((domain) => ({
              value: `${localPart}@${domain}`,
              key: `${localPart}@${domain}`,
            }));
          }
        }
      }

      // 没有@符号，为用户名部分生成完整邮箱建议
      return domains.slice(0, maxSuggestions).map((domain) => ({
        value: `${trimmedInput}@${domain}`,
        key: `${trimmedInput}@${domain}`,
      }));
    }

    /**
     * 邮箱自动完成的默认筛选函数
     * 只在输入包含@但域名部分不完整时进行筛选
     */
    function emailFilterOption(
      inputValue: string,
      option: AutoCompleteOption
    ): boolean {
      if (!inputValue.includes("@")) {
        return true; // 没有@时显示所有建议
      }

      const [, domainPart] = inputValue.split("@");
      if (!domainPart) {
        return true; // @后面没有内容时显示所有建议
      }

      // @后面有内容时，检查选项是否匹配
      const [, optionDomain] = option.value.split("@");
      return optionDomain.toLowerCase().includes(domainPart.toLowerCase());
    }

    const handleSearch = (searchValue: string) => {
      const suggestions = generateEmailSuggestions(searchValue);
      setOptions(suggestions);
    };

    const handleChange = (newValue: string) => {
      setValue(newValue);
      handleSearch(newValue);
    };

    const handleSelect = (selectedValue: string) => {
      setValue(selectedValue);
    };

    return (
      <div className="w-full max-w-md">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-text-primary">邮箱自动补全</h3>
          <p className="mb-4 text-sm text-text-secondary">
            输入用户名，系统会自动推荐常见邮箱后缀。例如输入 "zhangsan"，会推荐
            zhangsan@gmail.com, zhangsan@outlook.com 等。
          </p>
        </div>

        <AutoComplete
          value={value}
          options={options}
          onChange={handleChange}
          onSearch={handleSearch}
          onSelect={handleSelect}
          placeholder="请输入邮箱地址"
          allowClear
          filterOption={emailFilterOption}
        />

        <div className="p-3 mt-4 rounded bg-background-layer1">
          <p className="text-sm text-text-secondary">
            <strong>当前值:</strong> {value || "无"}
          </p>
        </div>
      </div>
    );
  },
};

// 自定义筛选
export const CustomFilter: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    const customOptions = [
      { value: "Apple", label: "🍎 Apple" },
      { value: "Banana", label: "🍌 Banana" },
      { value: "Cherry", label: "🍒 Cherry" },
      { value: "Date", label: "🥥 Date" },
      { value: "Elderberry", label: "🫧 Elderberry" },
    ];

    // 自定义筛选：不区分大小写，并且支持拼音首字母
    const customFilterOption = (
      inputValue: string,
      option: AutoCompleteOption
    ) => {
      const input = inputValue.toLowerCase();
      const optionValue = option.value.toLowerCase();
      return optionValue.includes(input) || optionValue.startsWith(input);
    };

    return (
      <div className="w-full max-w-md">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-text-primary">自定义筛选</h3>
          <p className="mb-4 text-sm text-text-secondary">
            自定义筛选逻辑，支持部分匹配和首字母匹配
          </p>
        </div>

        <AutoComplete
          {...args}
          value={value}
          onChange={setValue}
          options={customOptions}
          filterOption={customFilterOption}
          placeholder="试试输入 'a' 或 'apple'"
        />
      </div>
    );
  },
};
