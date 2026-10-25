"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* Drawer lateral que entra pela direita e fecha ao arrastar para a direita */

function Drawer({ swipeDirection = "right", ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root swipeDirection={swipeDirection} {...props} />
}

function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerContent({ className, children, ...props }: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        data-slot="drawer-backdrop"
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        className="pointer-events-none fixed inset-0 z-40 flex justify-end"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            "pointer-events-auto flex h-full w-92.5 max-w-[calc(100vw-20px)] translate-x-(--drawer-swipe-movement-x) flex-col gap-6 overflow-y-auto bg-background-black py-6 text-white outline-none transition-transform duration-300 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full data-swiping:transition-none",
            className
          )}
          {...props}
        >
          {children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
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

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-18-bold text-white", className)}
      {...props}
    />
  )
}

export { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger }
