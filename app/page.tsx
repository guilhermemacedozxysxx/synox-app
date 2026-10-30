import { MenuIcon, SearchIcon } from "lucide-react";

import { BookingDrawer } from "@/components/booking-drawer";
import { BusinessCard, BusinessCardSkeleton } from "@/components/business-card";
import { BusinessInfoCard } from "@/components/business-info-card";
import { SchedulingCard, SchedulingCardSkeleton } from "@/components/scheduling-card";
import { ServiceCard, ServiceCardSkeleton } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Rating } from "@/components/ui/rating";
import { Skeleton } from "@/components/ui/skeleton";
import { Status } from "@/components/ui/status";
import { TimePicker, TimePickerItem } from "@/components/ui/time-picker";

const textVariants = ["primary", "secondary", "destructive", "outlined"] as const;
const iconVariants = ["dark", "primary", "secondary", "outlined", "ghost"] as const;
const iconSizes = ["icon", "icon-sm"] as const;
const statuses = ["confirmado", "finalizado", "aberto", "fechado", "cancelado"] as const;
const statusSizes = ["sm", "lg"] as const;
const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "18:30"];
const professionals = [
  { id: "roberto", name: "Roberto" },
  { id: "carlos", name: "Carlos" },
  { id: "geraldo", name: "Geraldo" },
  { id: "diego", name: "Diego" },
  { id: "jonathan", name: "Jonathan" },
];
const business = {
  name: "Royal Barber Club",
  address: "Avenida Paulista, 1450, São Paulo",
  rating: 5,
};
const scheduling = {
  service: "Corte de Cabelo",
  price: 45,
  date: new Date("2026-09-14T18:30:00-03:00"),
  businessName: business.name,
};
const businessInfo = {
  name: business.name,
  address: business.address,
  description:
    "Bem-vindo à Royal Barber Club, onde elegância e tradição se encontram. Nossa equipe oferece cortes de cabelo e barba com excelência, em um ambiente sofisticado, pensado para proporcionar estilo, confiança e uma experiência única.",
  phones: ["(00) 00000-0000", "(00) 00000-0000"],
  openingHours: [
    { day: "Segunda", hours: null },
    { day: "Terça-Feira", hours: "09:00 - 21:00" },
    { day: "Quarta-Feira", hours: "09:00 - 21:00" },
    { day: "Quinta-Feira", hours: "09:00 - 21:00" },
    { day: "Sexta-Feira", hours: "09:00 - 21:00" },
    { day: "Sábado", hours: "08:00 - 17:00" },
    { day: "Domingo", hours: null },
  ],
};

export default function Home() {
  return (
    <main className="grid flex-1 content-start justify-center gap-16 bg-background-black px-6 py-12 text-white">
      <div className="flex flex-wrap items-start gap-12">
        <section className="flex flex-col gap-4">
          <h2 className="text-16-bold text-gray-03">Button</h2>

          {textVariants.map((variant) => (
            <div key={variant} className="flex items-center gap-4">
              <Button variant={variant}>Button</Button>
              <Button variant={variant} disabled>
                Button
              </Button>
              <span className="text-12-regular text-gray-03">{variant}</span>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-16-bold text-gray-03">Icon Button</h2>

          {iconVariants.map((variant) => (
            <div key={variant} className="flex items-center gap-4">
              {iconSizes.map((size) => (
                <Button key={size} variant={variant} size={size} aria-label="Menu">
                  <MenuIcon />
                </Button>
              ))}
              <span className="text-12-regular text-gray-03">{variant}</span>
            </div>
          ))}
        </section>

        <section className="flex w-[350px] flex-col gap-4">
          <h2 className="text-16-bold text-gray-03">Input</h2>

          <Input placeholder="Input" />
          <Input defaultValue="Royal Barber Club" />
          <Input placeholder="Buscar" icon={<SearchIcon strokeWidth={1.2} />} />
          <Input placeholder="Desabilitado" disabled />
          <Input
            placeholder="E-mail"
            defaultValue="royalbarber.com"
            error="Digite um e-mail válido."
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-16-bold text-gray-03">Status</h2>

          {statuses.map((status) => (
            <div key={status} className="flex items-center gap-4">
              {statusSizes.map((size) => (
                <Status key={size} status={status} size={size} />
              ))}
            </div>
          ))}
        </section>

        <section className="flex w-[350px] flex-col gap-4">
          <h2 className="text-16-bold text-gray-03">Time Picker</h2>

          <TimePicker defaultValue="18:30" aria-label="Horário">
            {times.map((time) => (
              <TimePickerItem key={time} value={time} disabled={time === "10:00"} />
            ))}
          </TimePicker>
        </section>
      </div>

      <div className="flex flex-wrap items-start gap-12 justify-self-start">
        <section className="flex flex-col gap-4">
          <h2 className="text-16-bold text-gray-03">Business Card</h2>

          <div className="flex items-start gap-4">
            <BusinessCard variant="mobile" {...business} />
            <BusinessCard variant="desktop" {...business} />
          </div>
          <BusinessCard variant="address" {...business} />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-16-bold text-gray-03">Scheduling Card</h2>

          <SchedulingCard variant="contracted" {...scheduling} />
          <SchedulingCard variant="expanded" {...scheduling} />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-16-bold text-gray-03">Service Card</h2>

          <ServiceCard
            name="Corte de Cabelo"
            description="Corte moderno com acabamento impecável."
            price={45}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-16-bold text-gray-03">Booking Drawer</h2>

          <BookingDrawer
            service={{
              name: "Corte de Cabelo",
              description: "Corte moderno com acabamento impecável.",
              price: 45,
            }}
            business={business}
            times={["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"]}
            professionals={professionals}
          />
        </section>
      </div>

      <section className="flex flex-col gap-4 justify-self-start">
        <h2 className="text-16-bold text-gray-03">Business Info Card</h2>

        <div className="flex flex-wrap items-start gap-5">
          <BusinessInfoCard variant="info" {...businessInfo} />
          <BusinessInfoCard
            variant="booking"
            {...businessInfo}
            booking={{
              service: scheduling.service,
              price: scheduling.price,
              date: scheduling.date,
              status: "confirmado",
            }}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 justify-self-start">
        <h2 className="text-16-bold text-gray-03">Dialog</h2>

        <div className="flex flex-wrap items-center gap-4">
          <Dialog>
            <DialogTrigger render={<Button variant="secondary" />}>Default</DialogTrigger>
            <DialogContent>
              <DialogIcon />
              <DialogHeader>
                <DialogTitle>Reserva confirmada</DialogTitle>
                <DialogDescription>Seu horário foi reservado com sucesso.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="secondary" />}>Fechar</DialogClose>
                <DialogClose render={<Button />}>Ver reserva</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger render={<Button variant="secondary" />}>Small</DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Sair da conta</DialogTitle>
                <DialogDescription>Deseja mesmo sair?</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="secondary" />}>Não</DialogClose>
                <DialogClose render={<Button />}>Sim</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger render={<Button variant="secondary" />}>Rating</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Avalie o atendimento</DialogTitle>
                <DialogDescription>Como foi sua experiência no {business.name}?</DialogDescription>
              </DialogHeader>
              <Rating aria-label="Nota do atendimento" />
              <DialogFooter>
                <DialogClose render={<Button variant="secondary" />}>Agora não</DialogClose>
                <DialogClose render={<Button />}>Enviar</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="flex flex-col gap-6 justify-self-start">
        <h2 className="text-16-bold text-gray-03">Skeleton</h2>

        <div className="flex flex-wrap items-start gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-12-regular text-gray-03">Button e Icon Button</span>
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-22 rounded-lg" />
              <Skeleton className="size-10" />
              <Skeleton className="size-8" />
            </div>
          </div>

          <div className="flex w-87.5 flex-col gap-4">
            <span className="text-12-regular text-gray-03">Input</span>
            <Skeleton className="h-9 w-full" />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-12-regular text-gray-03">Status e Time Picker</span>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-22 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-9 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-12-regular text-gray-03">Business Card</span>
            <div className="flex items-start gap-4">
              <BusinessCardSkeleton variant="mobile" />
              <BusinessCardSkeleton variant="desktop" />
            </div>
            <BusinessCardSkeleton variant="address" />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-12-regular text-gray-03">Scheduling Card</span>
            <SchedulingCardSkeleton variant="contracted" />
            <SchedulingCardSkeleton variant="expanded" />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-12-regular text-gray-03">Service Card</span>
            <ServiceCardSkeleton />
          </div>
        </div>
      </section>
    </main>
  );
}
