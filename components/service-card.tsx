import Image from "next/image"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ServiceCardProps = {
  name: string
  description: string
  price: number
  imageUrl?: string
  onReserve?: () => void
  className?: string
}

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

function ServiceCard({
  name,
  description,
  price,
  imageUrl,
  onReserve,
  className,
}: ServiceCardProps) {
  return (
    <article
      data-slot="service-card"
      className={cn(
        "flex w-87.5 items-center gap-3 rounded-lg border border-gray-01 bg-secondary-black p-3",
        className
      )}
    >
      <div className="relative size-27.5 shrink-0 overflow-hidden rounded-md bg-synox">
        {imageUrl && (
          <Image src={imageUrl} alt={name} fill sizes="110px" className="object-cover" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 self-stretch">
        <div className="flex flex-col gap-1">
          <h3 className="text-14-bold text-white">{name}</h3>
          <p className="line-clamp-2 text-14-regular text-gray-03">{description}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-14-bold whitespace-nowrap text-white">
            {priceFormatter.format(price)}
          </span>
          <Button variant="secondary" onClick={onReserve}>
            Reservar
          </Button>
        </div>
      </div>
    </article>
  )
}

export { ServiceCard }
