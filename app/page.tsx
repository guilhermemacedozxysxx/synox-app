import { MenuIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const textVariants = ["primary", "secondary", "destructive", "outlined"] as const;
const iconVariants = ["dark", "primary", "secondary", "outlined", "ghost"] as const;
const iconSizes = ["icon", "icon-sm"] as const;

export default function Home() {
  return (
    <main className="flex flex-1 flex-wrap items-start justify-center gap-12 bg-background-black px-6 py-12 text-white">
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
    </main>
  );
}
