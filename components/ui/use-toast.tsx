
// Simplified version of the shadcn/ui toast hook
import { useState } from "react";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function generateId() {
  return `toast-${++count}`;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  function add(props: Omit<ToastProps, "id">) {
    const id = generateId();
    const newToast = { id, ...props };

    setToasts((prevToasts) => {
      const newToasts = [...prevToasts, newToast].slice(-TOAST_LIMIT);
      return newToasts;
    });

    return id;
  }

  function update(id: string, props: Partial<ToastProps>) {
    setToasts((prevToasts) => {
      return prevToasts.map((toast) => {
        if (toast.id === id) {
          return { ...toast, ...props };
        }
        return toast;
      });
    });
  }

  function dismiss(id: string) {
    setToasts((prevToasts) => {
      return prevToasts.filter((toast) => toast.id !== id);
    });
  }

  function remove(id: string) {
    setTimeout(() => {
      setToasts((prevToasts) => {
        return prevToasts.filter((toast) => toast.id !== id);
      });
    }, TOAST_REMOVE_DELAY);
  }

  return {
    toasts,
    add,
    update,
    dismiss,
    remove,
    toast: add,
  };
}

export const toast = (props: Omit<ToastProps, "id">) => {
  // This is a simplified version that only shows console logs
  console.log("Toast:", props.title, props.description);
  return "toast-id";
};
