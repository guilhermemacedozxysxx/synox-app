import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button relative isolate inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-14-bold text-white whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red aria-invalid:ring-3 aria-invalid:ring-red/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-synox before:transition-opacity hover:before:opacity-40 disabled:opacity-20",
        secondary: "bg-gray-01 hover:bg-gray-01/80 disabled:bg-gray-01/50",
        destructive: "bg-red hover:bg-red/80 disabled:bg-red/60",
        outlined: "border-gray-01 hover:bg-secondary-black",
        dark: "bg-background-black hover:bg-background-black/80",
        ghost: "hover:[&_svg]:opacity-80",
      },
      size: {
        default: "h-9 gap-2 px-4",
        icon: "size-10 rounded-md [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
