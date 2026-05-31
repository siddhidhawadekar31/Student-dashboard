import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types";
import Sidebar from "@/components/layout/Sidebar";
import BentoGrid from "@/components/dashboard/BentoGrid";
import CoursesSkeleton from "@/components/ui/CoursesSkeleton";
import ErrorBoundaryFallback from "@/components/ui/ErrorBoundaryFallback";

async function CoursesData() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return <ErrorBoundaryFallback message={error.message} />;
  }

  const courses: Course[] = data ?? [];
  return <BentoGrid courses={courses} />;
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-dvh bg-bg-base">
      {/* Background ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-pink-500/6 blur-3xl" />
      </div>

      <Sidebar />

      <main
        className="relative z-10 flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8"
        id="main-content"
      >
        <Suspense fallback={<CoursesSkeleton />}>
          <CoursesData />
        </Suspense>
      </main>
    </div>
  );
}
