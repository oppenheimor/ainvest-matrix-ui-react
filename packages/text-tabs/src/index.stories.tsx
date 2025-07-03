import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  TextTabs,
  TextTabsList,
  TextTabsContent,
  TextTabsTrigger,
  TextTabsSeparator,
} from "./index";

const meta: Meta<typeof TextTabs> = {
  title: "Tabs/TextTabs",
  component: TextTabs,
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
  name: "基本用法",
  render: () => {
    return (
      <TextTabs defaultValue="1Y">
        <TextTabsList>
          <TextTabsTrigger value="1Y">1Y</TextTabsTrigger>
          <TextTabsSeparator />
          <TextTabsTrigger value="2Y">2Y</TextTabsTrigger>
          <TextTabsSeparator />
          <TextTabsTrigger value="5Y">5Y</TextTabsTrigger>
        </TextTabsList>
        <TextTabsContent value="1Y" className="text-text-primary">1 Year Report Content</TextTabsContent>
        <TextTabsContent value="2Y" className="text-text-primary">2 Year Report Content</TextTabsContent>
        <TextTabsContent value="5Y" className="text-text-primary">5 Year Report Content</TextTabsContent>
      </TextTabs>
    );
  },
};
