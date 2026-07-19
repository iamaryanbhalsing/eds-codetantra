"use client";

interface TopicFilterProps {
  topics: string[];
  activeTopic: string;
  onSelect: (topic: string) => void;
  color?: "brand" | "brandSecondary";
}

export function TopicFilter({ topics, activeTopic, onSelect, color = "brand" }: TopicFilterProps) {
  const allLabel = "All";
  const colors = color === "brand"
    ? { active: "bg-brand/10 text-brand border-brand/30", inactive: "text-muted-foreground hover:text-foreground border-transparent hover:border-border/50" }
    : { active: "bg-brandSecondary/10 text-brandSecondary border-brandSecondary/30", inactive: "text-muted-foreground hover:text-foreground border-transparent hover:border-border/50" };

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        onClick={() => onSelect("")}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
          activeTopic === "" ? colors.active : colors.inactive
        }`}
      >
        {allLabel}
      </button>
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => onSelect(topic)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all whitespace-nowrap ${
            activeTopic === topic ? colors.active : colors.inactive
          }`}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}
