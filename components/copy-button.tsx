"use client"

import * as React from "react"
import { CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

type CopyButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "children" | "variant" | "size"
> & {
  value: string
  label?: string
}

/* Copia o valor para a área de transferência e avisa com um toast */

function CopyButton({ value, label = "Copiar", className, ...props }: CopyButtonProps) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      toast(`Copiado: ${value}`)
    } catch {
      toast("Não foi possível copiar")
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      title={label}
      onClick={handleCopy}
      className={cn("text-gray-03 hover:bg-gray-01 hover:text-white", className)}
      {...props}
    >
      <CopyIcon />
    </Button>
  )
}

export { CopyButton }
