import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-900 p-12">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="h-8 w-8" />
          <span className="text-2xl font-bold">TaskPilot</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Tasks + AI,
            <br />
            in one place.
          </h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-md">
            Track work, filter your list, and use AI when you need a breakdown or a head start.
          </p>
        </div>
        <p className="text-sm text-indigo-200">Take-home project</p>
      </div>

      <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 sm:px-12">
        <div className="lg:hidden flex items-center gap-2 mb-8 text-brand-500">
          <Sparkles className="h-7 w-7" />
          <span className="text-xl font-bold">TaskPilot</span>
        </div>
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {subtitle && <p className="mt-2 text-slate-400">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
