import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LineTabs,
  LineTabsList,
  LineTabsContent,
  LineTabsTrigger,
} from "./index";

const meta: Meta<typeof LineTabs> = {
  title: "Tabs/LineTabs",
  component: LineTabs,
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
      <LineTabs defaultValue="Indices">
        <LineTabsList>
          <LineTabsTrigger value="Indices">Indices</LineTabsTrigger>
          <LineTabsTrigger value="Stocks">Stocks</LineTabsTrigger>
          <LineTabsTrigger value="Crypto">Crypto</LineTabsTrigger>
          <LineTabsTrigger value="Futures">Futures</LineTabsTrigger>
          <LineTabsTrigger value="Forex">Forex</LineTabsTrigger>
          <LineTabsTrigger value="Bonds">Bonds</LineTabsTrigger>
          <LineTabsTrigger value="ETFs">ETFs</LineTabsTrigger>
        </LineTabsList>
        <LineTabsContent value="Indices" className="text-text-primary">
          Indices Content
        </LineTabsContent>
        <LineTabsContent value="Stocks" className="text-text-primary">
          Stocks Content
        </LineTabsContent>
        <LineTabsContent value="Crypto" className="text-text-primary">
          Crypto Content
        </LineTabsContent>
        <LineTabsContent value="Futures" className="text-text-primary">
          Futures Content
        </LineTabsContent>
        <LineTabsContent value="Forex" className="text-text-primary">
          Forex Content
        </LineTabsContent>
        <LineTabsContent value="Bonds" className="text-text-primary">
          Bonds Content
        </LineTabsContent>
        <LineTabsContent value="ETFs" className="text-text-primary">
          ETFs Content
        </LineTabsContent>
      </LineTabs>
    );
  },
};
