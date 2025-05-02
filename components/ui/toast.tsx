
"use client"

import * as React from "react"

// Simplified toast components
export function Toast({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="toast-root" {...props}>{children}</div>
}

export function ToastTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="toast-title" {...props}>{children}</h2>
}

export function ToastDescription({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="toast-description" {...props}>{children}</p>
}

export function ToastClose(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="toast-close" {...props}>&times;</button>
}

export function ToastViewport(props: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className="toast-viewport" {...props} />
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <div className="toast-provider">{children}</div>
}
