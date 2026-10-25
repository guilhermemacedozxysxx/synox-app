"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CalendarProps = {
  value?: Date | null
  onValueChange?: (date: Date) => void
  defaultMonth?: Date
  isDateDisabled?: (date: Date) => boolean
  className?: string
}

const weekdayFormatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
const monthFormatter = new Intl.DateTimeFormat("pt-BR", { month: "long" })
const fullDateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" })

/* 1º de janeiro de 2023 foi um domingo, então os próximos 7 dias dão os nomes da semana a partir de domingo */

const weekdays = Array.from({ length: 7 }, (_, index) => {
  const name = weekdayFormatter.format(new Date(2023, 0, 1 + index)).replace(".", "")
  return name.charAt(0).toUpperCase() + name.slice(1)
})

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/* Semanas completas do mês, começando no domingo; dias de fora do mês aparecem esmaecidos */

function getCalendarDays(month: Date) {
  const firstDay = startOfMonth(month)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const weeks = Math.ceil((firstDay.getDay() + daysInMonth) / 7)

  return Array.from({ length: weeks * 7 }, (_, index) => {
    return new Date(month.getFullYear(), month.getMonth(), index - firstDay.getDay() + 1)
  })
}

function Calendar({
  value,
  onValueChange,
  defaultMonth,
  isDateDisabled,
  className,
}: CalendarProps) {
  const [today] = React.useState(() => startOfDay(new Date()))
  const [month, setMonth] = React.useState(() => startOfMonth(defaultMonth ?? value ?? today))

  const isCurrentMonth = isSameDay(month, startOfMonth(today))
  const monthName = capitalize(monthFormatter.format(month))
  const monthLabel =
    month.getFullYear() === today.getFullYear() ? monthName : `${monthName} ${month.getFullYear()}`

  function goToMonth(offset: number) {
    setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1))
  }

  return (
    <div data-slot="calendar" className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-16-bold text-white" aria-live="polite">
          {monthLabel}
        </span>

        <div className="flex items-center gap-3">
          <Button
            variant="outlined"
            size="icon-sm"
            className="size-7"
            aria-label="Mês anterior"
            disabled={isCurrentMonth}
            onClick={() => goToMonth(-1)}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="secondary"
            size="icon-sm"
            className="size-7"
            aria-label="Próximo mês"
            onClick={() => goToMonth(1)}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 place-items-center gap-y-2">
        {weekdays.map((weekday) => (
          <span key={weekday} className="text-12-regular text-gray-03">
            {weekday}
          </span>
        ))}

        {getCalendarDays(month).map((day) => {
          const isOutside = day.getMonth() !== month.getMonth()
          const isPast = day < today
          const isDisabled = isOutside || isPast || (isDateDisabled?.(day) ?? false)
          const isSelected = !!value && isSameDay(day, value)

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isDisabled}
              aria-pressed={isSelected}
              aria-label={fullDateFormatter.format(day)}
              onClick={() => onValueChange?.(day)}
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-14-regular text-white transition-colors outline-none hover:bg-gray-01 focus-visible:ring-3 focus-visible:ring-[#0b6ef6]/40 disabled:pointer-events-none",
                isPast && !isOutside && "text-gray-02",
                isOutside && "text-gray-03 opacity-50",
                isDisabled && !isPast && !isOutside && "text-gray-02",
                isSelected && "bg-synox text-14-bold"
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }
