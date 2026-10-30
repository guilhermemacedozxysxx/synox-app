import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toast";
import { lufga } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synox",
  description: "Gerencie os agendamentos do seu salão ou barbearia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${lufga.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
