"use client"

import * as React from "react"

/* Rola um contêiner na horizontal ao arrastar com o mouse (no toque a rolagem nativa já funciona); depois de arrastar, o clique é ignorado para não selecionar um item sem querer */

const DRAG_THRESHOLD = 5

function useDragScroll<T extends HTMLElement>() {
  const drag = React.useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 })
  const [isDragging, setIsDragging] = React.useState(false)

  function onPointerDown(event: React.PointerEvent<T>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return

    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    }
  }

  function onPointerMove(event: React.PointerEvent<T>) {
    const state = drag.current
    if (!state.active) return

    const delta = event.clientX - state.startX
    if (!state.moved && Math.abs(delta) < DRAG_THRESHOLD) return

    if (!state.moved) {
      state.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
      setIsDragging(true)
    }

    event.currentTarget.scrollLeft = state.scrollLeft - delta
  }

  function endDrag() {
    if (!drag.current.active) return

    drag.current.active = false
    setIsDragging(false)
  }

  function onClickCapture(event: React.MouseEvent<T>) {
    if (!drag.current.moved) return

    event.preventDefault()
    event.stopPropagation()
    drag.current.moved = false
  }

  return {
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onClickCapture,
  }
}

export { useDragScroll }
