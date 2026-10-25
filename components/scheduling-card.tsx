import * as React from "react"
import Image from "next/image"

import { Status } from "@/components/ui/status"
import { cn } from "@/lib/utils"

type SchedulingCardProps = {
  variant?: "contracted" | "expanded"
  service: string
  price?: number
  date: Date
  businessName: string
  businessImageUrl?: string
  status?: React.ComponentProps<typeof Status>["status"]
  className?: string
}

/* Fuso fixo para o servidor e o navegador formatarem a mesma data */

const timeZone = "America/Sao_Paulo"

const monthFormatter = new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone })
const dayFormatter = new Intl.DateTimeFormat("pt-BR", { day: "numeric", timeZone })
const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone,
})
const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function SchedulingCardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-14-regular">
      <span className="text-gray-03">{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  )
}

function SchedulingCard({
  variant = "contracted",
  service,
  price,
  date,
  businessName,
  businessImageUrl,
  status = "confirmado",
  className,
}: SchedulingCardProps) {
  const month = capitalize(monthFormatter.format(date))
  const day = dayFormatter.format(date)
  const time = timeFormatter.format(date)

  if (variant === "expanded") {
    return (
      <article
        data-slot="scheduling-card"
        className={cn(
          "flex w-82.5 flex-col gap-3 rounded-lg border border-gray-01 bg-secondary-black p-3 whitespace-nowrap",
          className
        )}
      >
        <div className="flex items-center justify-between gap-4 text-white">
          <h3 className="text-16-bold">{service}</h3>
          {price !== undefined && (
            <span className="text-right text-14-bold">{priceFormatter.format(price)}</span>
          )}
        </div>

        <SchedulingCardRow label="Data" value={`${day} de ${month}`} />
        <SchedulingCardRow label="Horário" value={time} />
        <SchedulingCardRow label="Local" value={businessName} />
      </article>
    )
  }

  return (
    <article
      data-slot="scheduling-card"
      className={cn(
        "flex w-87.5 rounded-lg border border-gray-01 bg-secondary-black",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 p-3">
        <Status status={status} />

        <div className="flex flex-col gap-2">
          <h3 className="text-16-bold text-white">{service}</h3>

          <div className="flex items-center gap-2">
            <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-synox">
              {businessImageUrl && (
                <Image
                  src={businessImageUrl}
                  alt=""
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              )}
            </div>
            <span className="truncate text-14-regular text-white">{businessName}</span>
          </div>
        </div>
      </div>

      <time
        dateTime={date.toISOString()}
        className="flex w-26.5 shrink-0 flex-col items-center justify-center border-l border-gray-01 py-3 whitespace-nowrap text-white"
      >
        <span className="text-12-regular">{month}</span>
        <span className="text-24-regular">{day}</span>
        <span className="text-12-regular">{time}</span>
      </time>
    </article>
  )
}

export { SchedulingCard }
