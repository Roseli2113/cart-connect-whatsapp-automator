
"use client"

import * as React from "react"

export interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}

export function TooltipProvider({
  children,
  delayDuration = 300,
  skipDelayDuration = 300,
  disableHoverableContent = false,
  ...props
}: TooltipProviderProps) {
  return (
    <div>
      {children}
    </div>
  )
}
