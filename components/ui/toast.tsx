"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/* Aviso rápido no rodapé da tela; toast("mensagem") pode ser chamado de qualquer componente client */

type ToastState = {
  message: string
  visible: boolean
}

const TOAST_DURATION = 1600

let state: ToastState = { message: "", visible: false }
let hideTimeout: ReturnType<typeof setTimeout> | undefined
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function toast(message: string) {
  clearTimeout(hideTimeout)
  state = { message, visible: true }
  emit()

  hideTimeout = setTimeout(() => {
    state = { ...state, visible: false }
    emit()
  }, TOAST_DURATION)
}

const serverState: ToastState = { message: "", visible: false }

function Toaster() {
  const { message, visible } = React.useSyncExternalStore(
    subscribe,
    () => state,
    () => serverState
  )

  return (
    <div
      role="status"
      aria-live="polite"
      data-slot="toast"
      className={cn(
        "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-gray-02 bg-gray-01 px-3.5 py-2 text-14-regular text-white shadow-lg transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {message}
    </div>
  )
}

export { Toaster, toast }
