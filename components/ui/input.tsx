import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

const inputBoxClassName =
  "flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-gray-01 bg-secondary-black px-3 text-14-regular text-white transition-colors"

const inputFieldClassName =
  "caret-white outline-none placeholder:text-gray-03 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-14-regular file:text-white disabled:pointer-events-none disabled:cursor-not-allowed"

type InputProps = React.ComponentProps<"input"> & {
  icon?: React.ReactNode
}

function Input({ className, type, icon, ...props }: InputProps) {
  if (!icon) {
    return (
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(
          inputBoxClassName,
          inputFieldClassName,
          "disabled:opacity-50 aria-invalid:border-red",
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
        "has-disabled:cursor-not-allowed has-disabled:opacity-50 has-aria-invalid:border-red [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
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

export { Input }
