import Image from "next/image"
import { StarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type BarberShopCardProps = {
  variant?: "mobile" | "desktop" | "address"
  name: string
  address: string
  imageUrl?: string
  rating?: number
  onReserve?: () => void
  className?: string
}

const ratingFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

/* Mapa do Google sem chave de API; os tamanhos extras empurram para fora da área visível o cartão de "Ver mapa ampliado" e os controles do Google */

function BarberShopMap({ address }: { address: string }) {
  const query = encodeURIComponent(address)

  return (
    <iframe
      title={`Mapa de ${address}`}
      src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      tabIndex={-1}
      aria-hidden
      className="pointer-events-none absolute -top-37.5 left-0 h-[calc(100%+300px)] w-full border-0 grayscale invert-[.92] contrast-[.85]"
    />
  )
}

function BarberShopCard({
  variant = "mobile",
  name,
  address,
  imageUrl,
  rating,
  onReserve,
  className,
}: BarberShopCardProps) {
  if (variant === "address") {
    return (
      <article
        data-slot="barber-shop-card"
        className={cn(
          "relative isolate flex h-45 w-82.5 items-end justify-center overflow-hidden rounded-lg bg-secondary-black p-5",
          className
        )}
      >
        <BarberShopMap address={address} />

        <div className="relative flex w-full items-center gap-3 rounded-lg bg-secondary-black px-5 py-3 text-white">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-synox">
            {imageUrl && (
              <Image src={imageUrl} alt="" fill sizes="48px" className="object-cover" />
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="text-16-bold">{name}</h3>
            <p className="text-12-regular">{address}</p>
          </div>
        </div>
      </article>
    )
  }

  const isDesktop = variant === "desktop"

  return (
    <article
      data-slot="barber-shop-card"
      className={cn(
        "flex flex-col rounded-2xl border border-gray-01 bg-secondary-black",
        isDesktop ? "w-55" : "w-41.75",
        className
      )}
    >
      <div className={cn("px-1 pt-1", !isDesktop && "pb-2")}>
        <div className="relative h-39.75 overflow-hidden rounded-2xl bg-synox">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes={isDesktop ? "213px" : "159px"}
              className="object-cover"
            />
          )}

          {rating !== undefined && (
            <span className="absolute top-1 left-1 flex items-center gap-1 rounded-2xl bg-synox px-2.5 py-1 text-12-bold text-white">
              <StarIcon className="size-3 fill-current" />
              {ratingFormatter.format(rating)}
            </span>
          )}
        </div>
      </div>

      <div className={cn("flex flex-col gap-3 px-3 pb-3", isDesktop && "pt-3")}>
        <div className="flex flex-col gap-1">
          <h3 className="text-16-bold text-white">{name}</h3>
          <p className="text-12-regular text-gray-03">{address}</p>
        </div>

        <Button variant="secondary" className="w-full" onClick={onReserve}>
          Reservar
        </Button>
      </div>
    </article>
  )
}

export { BarberShopCard }
