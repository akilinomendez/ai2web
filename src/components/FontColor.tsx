import { useEffect } from "react";
import colors from "../utils/colors";

export default function FontSize({
  value,
  onChange,
}: {
  value: string;

  onChange: (value: string) => void;
}) {
  useEffect(() => {
    document.documentElement.style.setProperty("--font-color", value);
  }, [value]);

  return (
    <div className="flex gap-2  w-full ">
      <div className="flex flex-col">
        <span className="text-white font-bold">Font Color</span>

        <div className="flex h-10 gap-1 border border-white">
          <select
            className={"w-32 h-full    text-center"}
            onChange={(e) => onChange(e.target.value)}
            value={value}
          >
            {colors().map((color, index) => (
              <option
                key={index}
                value={color}
                style={{ backgroundColor: color }}
              >
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
