import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  BlockTabs,
  BlockTabsList,
  BlockTabsContent,
  BlockTabsTrigger,
} from "./index";

const meta: Meta<typeof BlockTabs> = {
  title: "Tabs/BlockTabs",
  component: BlockTabs,
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
      <BlockTabs defaultValue="Indices">
        <BlockTabsList>
          <BlockTabsTrigger value="Indices">Indices</BlockTabsTrigger>
          <BlockTabsTrigger value="Stocks">Stocks</BlockTabsTrigger>
          <BlockTabsTrigger value="Crypto">Crypto</BlockTabsTrigger>
          <BlockTabsTrigger value="Futures">Futures</BlockTabsTrigger>
          <BlockTabsTrigger value="Forex">Forex</BlockTabsTrigger>
          <BlockTabsTrigger value="Bonds">Bonds</BlockTabsTrigger>
          <BlockTabsTrigger value="ETFs">ETFs</BlockTabsTrigger>
        </BlockTabsList>
        <BlockTabsContent value="Indices" className="text-text-primary">
          Indices Content
        </BlockTabsContent>
        <BlockTabsContent value="Stocks" className="text-text-primary">
          Stocks Content
        </BlockTabsContent>
        <BlockTabsContent value="Crypto" className="text-text-primary">
          Crypto Content
        </BlockTabsContent>
        <BlockTabsContent value="Futures" className="text-text-primary">
          Futures Content
        </BlockTabsContent>
        <BlockTabsContent value="Forex" className="text-text-primary">
          Forex Content
        </BlockTabsContent>
        <BlockTabsContent value="Bonds" className="text-text-primary">
          Bonds Content
        </BlockTabsContent>
        <BlockTabsContent value="ETFs" className="text-text-primary">
          ETFs Content
        </BlockTabsContent>
      </BlockTabs>
    );
  },
};
