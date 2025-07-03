import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  PillTabs,
  PillTabsList,
  PillTabsContent,
  PillTabsTrigger,
} from "./index";

const meta: Meta<typeof PillTabs> = {
  title: "Tabs/PillTabs",
  component: PillTabs,
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
      <PillTabs defaultValue="Indices">
        <PillTabsList>
          <PillTabsTrigger value="Indices">Indices</PillTabsTrigger>
          <PillTabsTrigger value="Stocks">Stocks</PillTabsTrigger>
          <PillTabsTrigger value="Crypto">Crypto</PillTabsTrigger>
          <PillTabsTrigger value="Futures">Futures</PillTabsTrigger>
          <PillTabsTrigger value="Forex">Forex</PillTabsTrigger>
          <PillTabsTrigger value="Bonds">Bonds</PillTabsTrigger>
          <PillTabsTrigger value="ETFs">ETFs</PillTabsTrigger>
        </PillTabsList>
        <PillTabsContent value="Indices" className="text-text-primary">
          Indices Content
        </PillTabsContent>
        <PillTabsContent value="Stocks" className="text-text-primary">
          Stocks Content
        </PillTabsContent>
        <PillTabsContent value="Crypto" className="text-text-primary">
          Crypto Content
        </PillTabsContent>
        <PillTabsContent value="Futures" className="text-text-primary">
          Futures Content
        </PillTabsContent>
        <PillTabsContent value="Forex" className="text-text-primary">
          Forex Content
        </PillTabsContent>
        <PillTabsContent value="Bonds" className="text-text-primary">
          Bonds Content
        </PillTabsContent>
        <PillTabsContent value="ETFs" className="text-text-primary">
          ETFs Content
        </PillTabsContent>
      </PillTabs>
    );
  },
};
