export default function CoursesSkeleton() {
  return (
    <section aria-label="Loading dashboard" aria-busy="true">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 pb-20 md:pb-0">
        {/* Hero skeleton */}
        <div className="skeleton min-h-[200px] rounded-2xl border border-white/5 bg-bg-surface lg:col-span-8" />

        {/* Stats skeleton */}
        <div className="skeleton min-h-[200px] rounded-2xl border border-white/5 bg-bg-surface lg:col-span-4" />

        {/* Course skeletons */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="skeleton min-h-[180px] rounded-2xl border border-white/5 bg-bg-surface lg:col-span-4"
          />
        ))}

        {/* Activity skeleton */}
        <div className="skeleton min-h-[160px] rounded-2xl border border-white/5 bg-bg-surface lg:col-span-12" />
      </div>
    </section>
  );
}
