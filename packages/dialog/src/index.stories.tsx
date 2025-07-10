/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./index";
import { Button } from "../../button";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  title: "Interaction/Dialog",
  component: Dialog,
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

    const openDialog = () => setIsOpen(true);
  
    const closeDialog = () => setIsOpen(false);
  
    const confirm = () => {
      alert('You clicked confirm!');
      closeDialog();
    };
  
    const cancel = () => {
      alert('You clicked cancel!');
      closeDialog();
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Dialog 触发器 */}
      <DialogTrigger asChild>
        <Button onClick={openDialog}>Open Dialog</Button>
      </DialogTrigger>
      {/* Dialog 主体 */}
      <DialogContent className="sm:max-w-[425px]">
        {/* Dialog 头部 */}
        <DialogHeader onCloseIconClick={closeDialog}>
          {/* Dialog 标题 */}
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <p>This is dialog content.</p>
        {/* Dialog 底部 */}
        <DialogFooter>
          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
          <Button onClick={confirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    );
  },
};
