"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "children"> & {
  value: string
}

/* Copia o valor para a área de transferência e mostra "Copiado" por 2 segundos */

function CopyButton({ value, variant = "secondary", ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return

    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
  }

  return (
    <Button variant={variant} onClick={handleCopy} {...props}>
      {copied ? "Copiado" : "Copiar"}
    </Button>
  )
}

export { CopyButton }
