type OperationsCardItem = {
  title: string;
  value: string;
  note: string;
  tone: "blue" | "orange" | "yellow" | "red";
};

const cards: OperationsCardItem[] = [
  {
    title: "Total Personnel Dashboard",
    value: "87",
    note: "+5 this week",
    tone: "blue",
  },
  {
    title: "Active PTWs",
    value: "5",
    note: "2 high-risk, 2 standard",
    tone: "orange",
  },
  {
    title: "Incident Today",
    value: "0",
    note: "7 days without incident",
    tone: "yellow",
  },
  {
    title: "Failed Inspection",
    value: "1",
    note: "Fire safety check",
    tone: "red",
  },
] as const;

function CardIcon({ tone }: { tone: OperationsCardItem["tone"] }) {
  if (tone === "blue") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path d="M6 20C6.9 16.9 9 15 12 15C15 15 17.1 16.9 18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (tone === "orange") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" fill="currentColor" />
        <path d="M9 10L11 12L15 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (tone === "yellow") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 4L21 20H3L12 4Z" fill="currentColor" />
        <path d="M12 9V13" stroke="#6B4E00" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1" fill="#6B4E00" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M12 8V13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="#fff" />
    </svg>
  );
}

export default function OperationsCards() {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {cards.map((card) => {
        const toneClasses =
          card.tone === "blue"
            ? "bg-[#EEF5FC] text-[#C3DAF5]"
            : card.tone === "orange"
              ? "bg-[#FDF2EC] text-[#FBC9AE]"
              : card.tone === "yellow"
                ? "bg-[#FDF9EC] text-[#F7D76A]"
                : "bg-[#FDF0F0] text-[#F3AEAE]";

        return (
          <article key={card.title} className={`rounded-lg p-4 ${toneClasses}`}>
            <div className="flex items-start justify-between gap-4">
              <p className="max-w-[150px] text-[14px] font-medium leading-5 text-[#535862]">
                {card.title}
              </p>
              <span>
                <CardIcon tone={card.tone} />
              </span>
            </div>
            <p className="mt-6 text-[34px] font-semibold leading-none text-[#101828]">
              {card.value}
            </p>
            <p className="mt-3 text-[12px] text-[#98A2B3]">{card.note}</p>
          </article>
        );
      })}
    </div>
  );
}
