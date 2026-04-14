import { RegistrationForm } from "@/components/registration-form";
import { getSessionRegistrationCounts } from "@/lib/registrations";

export default async function RegisterPage() {
  const sessionCounts = await getSessionRegistrationCounts();

  return (
    <div className="flex min-h-screen flex-col font-sans bg-slate-50 dark:bg-slate-950 pb-24 pt-10 sm:pt-16">
      <section className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            해양주간 사전등록
          </h1>
        </div>
        
        <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-6 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 dark:border-slate-800">
          <RegistrationForm mode="create" sessionCounts={sessionCounts} />
        </div>
      </section>
    </div>
  );
}
