export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-background px-6 py-12 text-center text-foreground">
      <h1 className="text-4xl font-bold">Synox</h1>

      <p className="max-w-md text-lg text-muted-foreground">
        Gerencie os agendamentos do seu salão ou barbearia.
      </p>
    </main>
  );
}