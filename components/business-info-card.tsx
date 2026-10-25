import * as React from "react"
import Image from "next/image"
import { SmartphoneIcon } from "lucide-react"

import { BusinessCard } from "@/components/business-card"
import { CopyButton } from "@/components/copy-button"
import { SchedulingCard } from "@/components/scheduling-card"
import { Button } from "@/components/ui/button"
import { Status } from "@/components/ui/status"
import { cn } from "@/lib/utils"

type OpeningHours = {
  day: string
  hours: string | null
}

type Booking = Omit<
  React.ComponentProps<typeof SchedulingCard>,
  "variant" | "className" | "businessName" | "businessImageUrl"
>

type BusinessInfoCardProps = {
  variant?: "info" | "booking"
  name: string
  address: string
  imageUrl?: string
  description: string
  phones: string[]
  openingHours?: OpeningHours[]
  booking?: Booking
  onCancelBooking?: () => void
  className?: string
}

function BusinessInfoCardDivider() {
  return <hr className="w-full border-gray-01" />
}

function BusinessInfoCard({
  variant = "info",
  name,
  address,
  imageUrl,
  description,
  phones,
  openingHours = [],
  booking,
  onCancelBooking,
  className,
}: BusinessInfoCardProps) {
  const isBooking = variant === "booking"

  return (
    <article
      data-slot="business-info-card"
      className={cn(
        "flex flex-col gap-5 rounded-2xl bg-secondary-black p-5",
        isBooking ? "w-111" : "w-96.5",
        className
      )}
    >
      <BusinessCard
        variant="address"
        name={name}
        address={address}
        imageUrl={imageUrl}
        className="w-full"
      />

      <section className="flex flex-col gap-2.5">
        <h3 className="text-14-bold text-white uppercase">Sobre nós</h3>
        <p className="text-14-regular text-gray-03">{description}</p>
      </section>

      <BusinessInfoCardDivider />

      <ul className="flex flex-col gap-2.5">
        {phones.map((phone, index) => (
          <li key={`${phone}-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2.5 text-14-regular text-white">
              <SmartphoneIcon className="size-6 shrink-0" strokeWidth={1.2} />
              {phone}
            </span>
            <CopyButton value={phone} label={`Copiar telefone ${phone}`} />
          </li>
        ))}
      </ul>

      <BusinessInfoCardDivider />

      {isBooking && booking ? (
        <>
          <section className="flex flex-col gap-2.5">
            <Status status={booking.status} size="lg" />
            <SchedulingCard
              variant="expanded"
              {...booking}
              businessName={name}
              className="w-full"
            />
          </section>

          <Button variant="destructive" className="w-full" onClick={onCancelBooking}>
            Cancelar Reserva
          </Button>
        </>
      ) : (
        <>
          <dl className="grid grid-cols-2 gap-x-2.5 gap-y-2.5 text-14-regular">
            {openingHours.map(({ day, hours }) => (
              <React.Fragment key={day}>
                <dt className="text-gray-03">{day}</dt>
                <dd className="text-right text-white">{hours ?? "Fechado"}</dd>
              </React.Fragment>
            ))}
          </dl>

          <BusinessInfoCardDivider />

          <footer className="flex items-center justify-between py-5">
            <span className="text-14-regular text-white">Em parceria com</span>
            <Image src="/images/synox-symbol.svg" alt="Synox" width={38} height={40} />
          </footer>
        </>
      )}
    </article>
  )
}

export { BusinessInfoCard }
