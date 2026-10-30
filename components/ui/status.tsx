import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center rounded-full px-2 py-0.5 whitespace-nowrap",
  {
    variants: {
      status: {
        confirmado: "bg-synox text-white",
        aberto: "bg-synox text-white",
        finalizado: "bg-gray-01 text-gray-03",
        fechado: "bg-gray-01 text-gray-03",
        cancelado: "bg-dark-red text-red",
      },
      size: {
        sm: "text-12-bold",
        lg: "text-14-bold",
      },
    },
    defaultVariants: {
      status: "confirmado",
      size: "sm",
    },
  }
)

const statusLabels = {
  confirmado: "Confirmado",
  aberto: "Aberto",
  finalizado: "Finalizado",
  fechado: "Fechado",
  cancelado: "Cancelado",
} as const

function Status({
  className,
  status = "confirmado",
  size = "sm",
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof statusVariants>) {
  return (
    <span
      data-slot="status"
      data-status={status}
      className={cn(statusVariants({ status, size, className }))}
      {...props}
    >
      {children ?? statusLabels[status ?? "confirmado"]}
    </span>
  )
}

export { Status, statusVariants }
