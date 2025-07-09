import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ResizableBanner } from "./index";

const meta: Meta<typeof ResizableBanner> = {
  title: "Layout/ResizableBanner",
  component: ResizableBanner,
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
  name: "ResizableBanner",
  parameters: {},

  render: () => {
    return (
      <ResizableBanner
        className="w-full"
        src="https://s3.tradingview.com/brokers/headers/AMF1-Sponsorship-2501_TradingView_ProfileBanner_250211_v04_JB.svg"
        bannerBreakpoints={[
          { min: 0, max: 500, scale: 1.4, height: 160 },
          { min: 501, max: 990, scale: 1.25, height: 256 },
          { min: 991, max: Infinity, scale: 1, height: 320 },
        ]}
      />
      // <ResizableBanner
      //   className="w-full h-[856px] bg-[linear-gradient(0deg,#001033_0%,#165DFF_69.32%)]"
      //   src="https://cdn.ainvest.com/kamisAssets/bg1920.0kdhj77tfhvn.png"
      //   // bannerBreakpoints={[
      //   //   { min: 0, max: 500, scale: 0.6, height: 300 },
      //   //   { min: 501, max: 990, scale: 0.75, height: 500 },
      //   //   { min: 991, max: Infinity, scale: 1, height: 856 },
      //   // ]}
      // />
    );
  },
};
