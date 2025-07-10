/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "./index";
import { Button } from "../../button";
import { useState } from "react";
import { useMediaQuery } from "./hooks/use-media-query";
import { cn } from "./utils/clsx";

const meta: Meta<typeof Credenza> = {
  title: "Interaction/Credenza",
  component: Credenza,
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
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isOpen, setIsOpen] = useState(false);
  
    const openCredenza = () => setIsOpen(true);
  
    const closeCredenza = () => setIsOpen(false);
  
    const confirm = () => {
      alert('You clicked confirm!');
      closeCredenza();
    };

    return (
      <Credenza open={isOpen} onOpenChange={setIsOpen}>
        <CredenzaTrigger asChild>
          <Button onClick={openCredenza}>Open Credenza</Button>
        </CredenzaTrigger>
        {/* Credenza 主体 */}
        <CredenzaContent>
          {/* Credenza 头部 */}
          <CredenzaHeader onCloseIconClick={closeCredenza}>
            {/* Credenza 标题 */}
            <CredenzaTitle>Credenza Title</CredenzaTitle>
          </CredenzaHeader>
          {/* Credenza 内容 */}
          <CredenzaBody>
            <p className={cn(isDesktop ? "p-0" : "px-4")}>
              This modal got triggered using state
            </p>
          </CredenzaBody>
          {/* Credenza 底部 */}
          <CredenzaFooter>
            <Button onClick={confirm}>Confirm</Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    );
  },
};
