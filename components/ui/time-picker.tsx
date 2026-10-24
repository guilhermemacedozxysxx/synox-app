import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"
import { cn } from "@/lib/utils"

/* Grupo de horários com seleção única (navegável pelas setas do teclado) */

function TimePicker({ className, ...props }: RadioGroup.Props<string>) {
  return (
    <RadioGroup
      data-slot="time-picker"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  )
}

function TimePickerItem({
  className,
  value,
  children,
  ...props
}: Radio.Root.Props<string>) {
  return (
    <Radio.Root
      data-slot="time-picker-item"
      value={value}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-01 px-4 py-2 text-14-regular whitespace-nowrap text-white transition-colors outline-none select-none hover:bg-secondary-black focus-visible:ring-3 focus-visible:ring-[#0b6ef6]/40 data-checked:border-transparent data-checked:bg-synox data-checked:text-14-bold data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children ?? value}
    </Radio.Root>
  )
}

export { TimePicker, TimePickerItem }
