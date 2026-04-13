import { notFound } from "next/navigation";

import { contentPages, scheduleOverview, type ContentSlug } from "@/lib/site-content";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(contentPages).map((slug) => ({ slug }));
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;

  if (!(slug in contentPages)) {
    notFound();
  }

  const page = contentPages[slug as ContentSlug];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <section className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_30px_80px_-50px_rgba(15,110,134,0.35)] sm:px-10 sm:py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f6e86]">
          {page.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {page.summary}
        </p>
      </section>

      {slug === "schedule" ? (
        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {scheduleOverview.map((item) => (
            <article
              key={item.day}
              className="rounded-[1.5rem] border border-slate-200 bg-[var(--panel-strong)] px-6 py-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f6e86]">
                {item.day}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">{item.date}</h2>
              <p className="mt-2 text-lg font-medium text-slate-700">{item.title}</p>
              <ul className="mt-5 space-y-2 text-sm leading-7 text-slate-600">
                {item.items.map((entry) => (
                  <li key={entry}>- {entry}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      ) : null}

      <section className="mt-8 grid gap-5">
        {page.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_22px_50px_-44px_rgba(15,110,134,0.32)]"
          >
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
