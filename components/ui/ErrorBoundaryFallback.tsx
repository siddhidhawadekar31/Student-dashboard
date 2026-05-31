import { AlertTriangle } from "lucide-react";

interface Props {
  message?: string;
}

export default function ErrorBoundaryFallback({ message }: Props) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
      <AlertTriangle className="h-8 w-8 text-red-400" />
      <div>
        <p className="font-display text-lg font-semibold text-red-300">
          Failed to load courses
        </p>
        <p className="mt-1 font-sans text-sm text-white/40">
          {message ?? "Could not connect to Supabase. Check your environment variables."}
        </p>
      </div>
      <p className="font-mono text-xs text-white/20">
        Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
      </p>
    </div>
  );
}
