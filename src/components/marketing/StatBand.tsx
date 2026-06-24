interface Stat {
  value: string;
  label: string;
}

/** Bold proof numbers — scale + mono numerics carry the weight, no boxes. */
export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="font-mono text-4xl font-extrabold tracking-tight text-flame-500 md:text-5xl">
            {s.value}
          </div>
          <div className="mx-auto mt-2 max-w-[14ch] text-sm text-text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default StatBand;
