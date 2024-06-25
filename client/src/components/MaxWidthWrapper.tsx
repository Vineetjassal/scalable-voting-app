import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
type MaxWidthWrapperProps = {
  children: ReactNode;
  className?: string;
};

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-2 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
