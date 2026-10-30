"use client"

import Image from "next/image"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"

import { useDragScroll } from "@/hooks/use-drag-scroll"
import { cn } from "@/lib/utils"

type Professional = {
  id: string
  name: string
  imageUrl?: string
}

type ProfessionalPickerProps = Omit<RadioGroup.Props<string>, "children"> & {
  professionals: Professional[]
  businessName?: string
  isProfessionalDisabled?: (professional: Professional) => boolean
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

/* Lista de profissionais com seleção única (foto ao lado do nome e do estabelecimento); rola arrastando com o mouse, como os horários */

function ProfessionalPicker({
  professionals,
  businessName,
  isProfessionalDisabled,
  className,
  ...props
}: ProfessionalPickerProps) {
  const { isDragging, ...dragProps } = useDragScroll<HTMLDivElement>()

  return (
    <RadioGroup
      data-slot="professional-picker"
      {...dragProps}
      className={cn(
        "flex shrink-0 cursor-grab gap-3 overflow-x-auto overscroll-x-contain select-none scrollbar-none",
        isDragging && "cursor-grabbing **:cursor-grabbing",
        className
      )}
      {...props}
    >
      {professionals.map((professional) => (
        <Radio.Root
          key={professional.id}
          value={professional.id}
          disabled={isProfessionalDisabled?.(professional)}
          className="group/professional flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg border border-gray-01 py-2 pr-4 pl-2 text-left transition-colors outline-none hover:bg-secondary-black focus-visible:ring-3 focus-visible:ring-[#0b6ef6]/40 data-checked:border-transparent data-checked:bg-synox data-disabled:pointer-events-none data-disabled:opacity-40"
        >
          <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-01 text-14-bold text-gray-03">
            {professional.imageUrl ? (
              <Image
                src={professional.imageUrl}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              getInitials(professional.name)
            )}
          </span>

          <span className="flex max-w-36 min-w-0 flex-col">
            <span className="truncate text-14-bold text-white">{professional.name}</span>
            {businessName && (
              <span className="truncate text-12-regular text-gray-03 group-data-checked/professional:text-white/80">
                {businessName}
              </span>
            )}
          </span>
        </Radio.Root>
      ))}
    </RadioGroup>
  )
}

export { ProfessionalPicker, type Professional }
