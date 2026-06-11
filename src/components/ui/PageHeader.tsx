interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-stone-600">{description}</p>
    </header>
  );
}
