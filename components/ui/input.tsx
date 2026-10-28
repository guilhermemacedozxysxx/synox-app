"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { CircleAlertIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const inputBoxClassName =
  "flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-gray-01 bg-secondary-black px-3 text-14-regular text-white transition-[border-color,box-shadow]"

const inputFieldClassName =
  "caret-blink-slow outline-none placeholder:text-gray-03 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-14-regular file:text-white disabled:pointer-events-none disabled:cursor-not-allowed"

type InputControlProps = React.ComponentProps<"input"> & {
  icon?: React.ReactNode
}

type InputProps = InputControlProps & {
  error?: string
}

function InputControl({ className, type, icon, ...props }: InputControlProps) {
  if (!icon) {
    return (
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(
          inputBoxClassName,
          inputFieldClassName,
          "focus:border-[#0b6ef6] focus:ring-3 focus:ring-[#0b6ef6]/40 disabled:opacity-50 aria-invalid:border-red aria-invalid:ring-3 aria-invalid:ring-red/40",
          className
        )}
        {...props}
      />
    )
  }

  return (
    <div
      data-slot="input-group"
      className={cn(
        inputBoxClassName,
        "has-focus:border-[#0b6ef6] has-focus:ring-3 has-focus:ring-[#0b6ef6]/40 has-disabled:cursor-not-allowed has-disabled:opacity-50 has-aria-invalid:border-red has-aria-invalid:ring-3 has-aria-invalid:ring-red/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
        className
      )}
    >
      {icon}
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(inputFieldClassName, "h-full min-w-0 flex-1 bg-transparent")}
        {...props}
      />
    </div>
  )
}

/* Com error, o campo fica inválido e a mensagem aparece embaixo, ligada ao input pelo aria-describedby */

function Input({ className, error, ...props }: InputProps) {
  const errorId = React.useId()

  if (!error) {
    return <InputControl className={className} {...props} />
  }

  return (
    <div
      data-slot="input-field"
      className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
    >
      <InputControl
        aria-invalid
        aria-describedby={errorId}
        {...props}
      />
      <p
        id={errorId}
        data-slot="input-error"
        className="flex items-center gap-1.5 text-12-regular text-red"
      >
        <CircleAlertIcon className="size-3.5 shrink-0" />
        {error}
      </p>
    </div>
  )
}

export { Input }
