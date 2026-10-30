"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* Painel lateral que entra pela direita; usa o Dialog do Base UI para não ter gesto de arrastar */

function Drawer(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />
}

function DrawerTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerContent({ className, children, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="drawer-backdrop"
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <DialogPrimitive.Popup
        data-slot="drawer-content"
        className={cn(
          "fixed inset-y-0 right-0 z-40 flex w-92.5 max-w-[calc(100vw-20px)] flex-col gap-6 overflow-x-hidden overflow-y-auto overscroll-contain bg-background-black py-6 text-white outline-none scrollbar-none transition-transform duration-300 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

function DrawerHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex items-center justify-between gap-4 px-5", className)}
      {...props}
    >
      {children}
      <DrawerClose
        render={<Button variant="ghost" size="icon" aria-label="Fechar" />}
      >
        <XIcon />
      </DrawerClose>
    </div>
  )
}

function DrawerTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-18-bold text-white", className)}
      {...props}
    />
  )
}

export { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger }
