import Image from "next/image"
import { StarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type BusinessCardProps = {
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

function BusinessMap({ address }: { address: string }) {
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

function BusinessCard({
  variant = "mobile",
  name,
  address,
  imageUrl,
  rating,
  onReserve,
  className,
}: BusinessCardProps) {
  if (variant === "address") {
    return (
      <article
        data-slot="business-card"
        className={cn(
          "relative isolate flex h-45 w-82.5 items-end justify-center overflow-hidden rounded-lg bg-secondary-black p-5",
          className
        )}
      >
        <BusinessMap address={address} />

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
      data-slot="business-card"
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

/* Mesmo tamanho e formato de cada variante, para a página não "pular" quando os dados chegam */

function BusinessCardSkeleton({
  variant = "mobile",
  className,
}: Pick<BusinessCardProps, "variant" | "className">) {
  if (variant === "address") {
    return (
      <div
        data-slot="business-card-skeleton"
        aria-busy
        aria-label="Carregando estabelecimento"
        className={cn(
          "relative isolate flex h-45 w-82.5 items-end justify-center overflow-hidden rounded-lg bg-secondary-black p-5",
          className
        )}
      >
        <Skeleton className="absolute inset-0 -z-10 rounded-none opacity-40" />

        <div className="flex w-full items-center gap-3 rounded-lg bg-secondary-black px-5 py-3">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </div>
    )
  }

  const isDesktop = variant === "desktop"

  return (
    <div
      data-slot="business-card-skeleton"
      aria-busy
      aria-label="Carregando estabelecimento"
      className={cn(
        "flex flex-col rounded-2xl border border-gray-01 bg-secondary-black",
        isDesktop ? "w-55" : "w-41.75",
        className
      )}
    >
      <div className={cn("px-1 pt-1", !isDesktop && "pb-2")}>
        <Skeleton className="h-39.75 rounded-2xl" />
      </div>

      <div className={cn("flex flex-col gap-3 px-3 pb-3", isDesktop && "pt-3")}>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </div>
  )
}

export { BusinessCard, BusinessCardSkeleton }
