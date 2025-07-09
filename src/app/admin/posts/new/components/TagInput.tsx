import { useState } from "react";

export default function TagInput({
  value = [],
  onChange,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="bg-white text-black px-3 py-1 rounded-full flex items-center gap-1"
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-red-500 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder="Enter a tag and press Enter"
        className="w-full border p-2 rounded-lg"
      />
    </div>
  );
}
