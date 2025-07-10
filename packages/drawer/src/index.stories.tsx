/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./index";
import { Button } from "../../button";
import { useState } from "react";

const meta: Meta<typeof Drawer> = {
  title: "Interaction/Drawer",
  component: Drawer,
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
  name: "基本使用",
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => setIsOpen(true);
  
    const closeDrawer = () => setIsOpen(false);
  
    const confirm = () => {
      alert('You clicked confirm!');
      closeDrawer();
    };
  
    const cancel = () => {
      alert('You clicked cancel!');
      closeDrawer();
    };

    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {/* Drawer 触发器 */}
      <DrawerTrigger asChild>
        <Button onClick={openDrawer}>Open Drawer</Button>
      </DrawerTrigger>
      {/* Drawer 主体 */}
      <DrawerContent>
        {/* Drawer 头部 */}
        <DrawerHeader onCloseIconClick={closeDrawer}>
          {/* Drawer 标题 */}
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <p className="p-4">This is Drawer Content.</p>
        {/* Drawer 底部 */}
        <DrawerFooter>
          <Button onClick={confirm}>Confirm</Button>
          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    );
  },
};
