import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  SegmentTabs,
  SegmentTabsList,
  SegmentTabsContent,
  SegmentTabsTrigger,
} from "./index";

const meta: Meta<typeof SegmentTabs> = {
  title: "Tabs/SegmentTabs",
  component: SegmentTabs,
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
      <SegmentTabs defaultValue="Indices">
        <SegmentTabsList>
          <SegmentTabsTrigger value="Indices">Indices</SegmentTabsTrigger>
          <SegmentTabsTrigger value="Stocks">Stocks</SegmentTabsTrigger>
          <SegmentTabsTrigger value="Crypto">Crypto</SegmentTabsTrigger>
          <SegmentTabsTrigger value="Futures">Futures</SegmentTabsTrigger>
          <SegmentTabsTrigger value="Forex">Forex</SegmentTabsTrigger>
          <SegmentTabsTrigger value="Bonds">Bonds</SegmentTabsTrigger>
          <SegmentTabsTrigger value="ETFs">ETFs</SegmentTabsTrigger>
        </SegmentTabsList>
        <SegmentTabsContent value="Indices" className="text-text-primary">
          Indices Content
        </SegmentTabsContent>
        <SegmentTabsContent value="Stocks" className="text-text-primary">
          Stocks Content
        </SegmentTabsContent>
        <SegmentTabsContent value="Crypto" className="text-text-primary">
          Crypto Content
        </SegmentTabsContent>
        <SegmentTabsContent value="Futures" className="text-text-primary">
          Futures Content
        </SegmentTabsContent>
        <SegmentTabsContent value="Forex" className="text-text-primary">
          Forex Content
        </SegmentTabsContent>
        <SegmentTabsContent value="Bonds" className="text-text-primary">
          Bonds Content
        </SegmentTabsContent>
        <SegmentTabsContent value="ETFs" className="text-text-primary">
          ETFs Content
        </SegmentTabsContent>
      </SegmentTabs>
    );
  },
};
