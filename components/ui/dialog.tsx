"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const dialogContentVariants = cva(
  "fixed top-1/2 left-1/2 z-50 flex max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 rounded-lg bg-background-black p-5 text-center text-white outline-none transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  {
    variants: {
      size: {
        default: "w-79.5",
        sm: "w-61.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogContent({
  className,
  size,
  ...props
}: DialogPrimitive.Popup.Props & VariantProps<typeof dialogContentVariants>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="dialog-backdrop"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ size, className }))}
        {...props}
      />
    </DialogPrimitive.Portal>
  )
}

/* Ícone de sucesso: círculo com o background da Synox e check branco */

function DialogIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-icon"
      aria-hidden
      className={cn("flex size-18 items-center justify-center", className)}
      {...props}
    >
      <span className="flex size-15 items-center justify-center rounded-full bg-synox">
        <CheckIcon className="size-7 text-white" strokeWidth={3.5} />
      </span>
    </div>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-16-bold text-white", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-14-regular text-gray-03", className)}
      {...props}
    />
  )
}

/* Botões lado a lado, dividindo a largura igualmente */

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex w-full gap-2.5 *:flex-1", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
  DialogTrigger,
}
