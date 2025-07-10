"use client"

import * as React from "react"

import { useMediaQuery } from "./hooks/use-media-query"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
  DialogOverlay
} from "../../dialog/src/index"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
} from "../../drawer/src/index"

interface BaseProps {
  children?: React.ReactNode
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  breakpointValue?: number
}

interface CredenzaProps extends BaseProps {
  className?: string
  asChild?: true
  container?: HTMLElement | null
  overlayClassName?: string
  preventInteractOutside?: boolean
}

const CredenzaContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
});

const useCredenzaContext = () => {
  const context = React.useContext(CredenzaContext);
  if (!context) {
    throw new Error(
      "Credenza components cannot be rendered outside the Credenza Context",
    );
  }
  return context;
};

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const { breakpointValue = 768 } = props

  const isDesktop = useMediaQuery(`(min-width: ${breakpointValue}px)`);
  const Credenza = isDesktop ? Dialog : Drawer;

  return (
    <CredenzaContext.Provider value={{ isDesktop }}>
      <Credenza {...props} {...(!isDesktop && { autoFocus: true })}>
        {children}
      </Credenza>
    </CredenzaContext.Provider>
  );
};


const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const CredenzaTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <CredenzaTrigger className={className} {...props}>
      {children}
    </CredenzaTrigger>
  );
};

const CredenzaPortal = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const CredenzaPortal = isDesktop ? DialogPortal : DrawerPortal;

  return (
    <CredenzaPortal {...props}>
      {children}
    </CredenzaPortal>
  );
};

const CredenzaOverlay = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const CredenzaOverlay = isDesktop ? DialogOverlay : DrawerOverlay;

  return (
    <CredenzaOverlay className={className} {...props} />
  );
};

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const CredenzaClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <CredenzaClose className={className} {...props} />
  );
};

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const CredenzaContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <CredenzaContent className={className} {...props}>
      {children}
    </CredenzaContent>
  );
};

const CredenzaDescription = ({
  className,
  children,
  ...props
}: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const CredenzaDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <CredenzaDescription className={className} {...props}>
      {children}
    </CredenzaDescription>
  );
};

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps & {
  showCloseIcon?: boolean;
  onCloseIconClick?: (event: React.MouseEvent) => void;
}) => {
  const { isDesktop } = useCredenzaContext();
  const CredenzaHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <CredenzaHeader className={className} {...props}>
      {children}
    </CredenzaHeader>
  );
};

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const CredenzaTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <CredenzaTitle className={className} {...props}>
      {children}
    </CredenzaTitle>
  );
};

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const CredenzaFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <CredenzaFooter className={className} {...props}>
      {children}
    </CredenzaFooter>
  );
};

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
  CredenzaPortal,
  CredenzaOverlay,
}
