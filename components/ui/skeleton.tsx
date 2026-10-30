import * as React from "react"

import { cn } from "@/lib/utils"

/* Bloco com brilho metálico que ocupa o lugar de um conteúdo enquanto ele carrega; quem prefere menos movimento vê só um pulso suave */

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "animate-shimmer rounded-md bg-gray-01 skeleton-shimmer motion-reduce:animate-pulse motion-reduce:bg-none",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
