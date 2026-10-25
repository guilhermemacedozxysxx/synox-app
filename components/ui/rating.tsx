"use client"

import * as React from "react"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type RatingProps = Omit<RadioGroup.Props<number>, "value" | "defaultValue" | "onValueChange"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  max?: number
}

/* Avaliação por estrelas; passar o mouse mostra a nota que será dada */

function Rating({
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  className,
  ...props
}: RatingProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [hovered, setHovered] = React.useState(0)

  const currentValue = value ?? internalValue
  const displayValue = hovered || currentValue

  function handleValueChange(nextValue: number) {
    setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <RadioGroup
      data-slot="rating"
      value={currentValue}
      onValueChange={handleValueChange}
      onMouseLeave={() => setHovered(0)}
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    >
      {Array.from({ length: max }, (_, index) => {
        const star = index + 1
        const isFilled = star <= displayValue

        return (
          <Radio.Root
            key={star}
            value={star}
            aria-label={`${star} de ${max} estrelas`}
            onMouseEnter={() => setHovered(star)}
            className="cursor-pointer rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-[#0b6ef6]/40 data-disabled:pointer-events-none data-disabled:opacity-50"
          >
            <StarIcon
              strokeWidth={1.6}
              className={cn(
                "size-6 transition-colors",
                isFilled ? "fill-primary-orange text-primary-orange" : "text-gray-01"
              )}
            />
          </Radio.Root>
        )
      })}
    </RadioGroup>
  )
}

export { Rating }
