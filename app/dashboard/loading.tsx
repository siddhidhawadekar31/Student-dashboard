import CoursesSkeleton from "@/components/ui/CoursesSkeleton";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-dvh bg-bg-base">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
      </div>
      <Sidebar />
      <main className="relative z-10 flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8">
        <CoursesSkeleton />
      </main>
    </div>
  );
}
