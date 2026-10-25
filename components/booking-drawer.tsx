"use client"

import * as React from "react"

import { BusinessCard } from "@/components/business-card"
import { SchedulingCard } from "@/components/scheduling-card"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { TimePicker, TimePickerItem } from "@/components/ui/time-picker"
import { toast } from "@/components/ui/toast"
import { useDragScroll } from "@/hooks/use-drag-scroll"
import { cn } from "@/lib/utils"

type BookingDrawerProps = {
  service: {
    name: string
    description: string
    price: number
    imageUrl?: string
  }
  business: {
    name: string
    address: string
    imageUrl?: string
  }
  times: string[]
  isDateDisabled?: (date: Date) => boolean
  onConfirm?: (booking: { date: Date }) => void
  className?: string
}

/* Junta o dia escolhido com o horário no fuso de São Paulo, o mesmo usado pelo Scheduling Card */

function toBookingDate(day: Date, time: string) {
  const year = day.getFullYear()
  const month = String(day.getMonth() + 1).padStart(2, "0")
  const date = String(day.getDate()).padStart(2, "0")

  return new Date(`${year}-${month}-${date}T${time}:00-03:00`)
}

function BookingDrawerDivider() {
  return <hr className="border-gray-01" />
}

function BookingDrawer({
  service,
  business,
  times,
  isDateDisabled,
  onConfirm,
  className,
}: BookingDrawerProps) {
  const [open, setOpen] = React.useState(false)
  const [day, setDay] = React.useState<Date | null>(null)
  const [time, setTime] = React.useState("")
  const { isDragging: isDraggingTimes, ...timesDragProps } = useDragScroll<HTMLDivElement>()

  const bookingDate = day && time ? toBookingDate(day, time) : null

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setDay(null)
      setTime("")
    }
  }

  function handleConfirm() {
    if (!bookingDate) return

    onConfirm?.({ date: bookingDate })
    toast("Reserva confirmada")
    handleOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <ServiceCard
        {...service}
        className={className}
        action={
          <DrawerTrigger render={<Button variant="secondary" />}>Reservar</DrawerTrigger>
        }
      />

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Fazer Reserva</DrawerTitle>
        </DrawerHeader>

        <BookingDrawerDivider />

        <Calendar
          value={day}
          onValueChange={setDay}
          isDateDisabled={isDateDisabled}
          className="px-5"
        />

        <BookingDrawerDivider />

        <TimePicker
          {...timesDragProps}
          value={time}
          onValueChange={setTime}
          aria-label="Horário"
          className={cn(
            "shrink-0 cursor-grab flex-nowrap gap-3 overflow-x-auto overscroll-x-contain px-5 select-none scrollbar-none",
            isDraggingTimes && "cursor-grabbing **:cursor-grabbing"
          )}
        >
          {times.map((item) => (
            <TimePickerItem key={item} value={item} disabled={!day} />
          ))}
        </TimePicker>

        <BookingDrawerDivider />

        <div className="flex flex-col gap-3 px-5">
          {bookingDate ? (
            <SchedulingCard
              variant="expanded"
              service={service.name}
              price={service.price}
              date={bookingDate}
              businessName={business.name}
              className="w-full"
            />
          ) : (
            <p className="text-14-regular text-gray-03">
              Escolha o dia e o horário para ver o resumo da reserva.
            </p>
          )}

          <BusinessCard
            variant="address"
            name={business.name}
            address={business.address}
            imageUrl={business.imageUrl}
            className="w-full"
          />
        </div>

        <div className="mt-auto px-5">
          <Button className="w-full" disabled={!bookingDate} onClick={handleConfirm}>
            Confirmar
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { BookingDrawer }
