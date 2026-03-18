'use client';
// template.tsx re-mounts on every route change (unlike layout.tsx which persists).
// This gives us a clean hook to run entrance animations on every page transition
// without any library — just CSS keyframes defined in globals.css.
export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
}
