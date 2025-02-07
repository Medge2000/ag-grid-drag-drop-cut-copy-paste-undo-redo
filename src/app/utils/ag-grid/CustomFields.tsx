import { useState } from "react";

export const CustomInputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
  className = "",
  cursor = "cursor-default",
  step = 1,
}: {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  cursor?: string;
  step?: number;
}) => (
  <div
    className={`flex min-w-64 max-w-96 w-full items-center font-semibold border border-gray-400 dark:border-gray-600 text-sm ${className}`}
  >
    <label
      className={`min-w-24 max-w-24 w-24 bg-cerulean-175 dark:bg-gray-700 border-r border-gray-400 dark:border-gray-600 pl-4 py-1 ${cursor}`}
    >
      {label}
    </label>
    <input
      className={`border-none pl-4 py-1 w-full bg-white dark:bg-gray-800 dark:text-white focus:outline-none  text-sm ${cursor}`}
      value={value}
      onChange={(e) => {
        if (type === "number") {
          const value = Number(e.target.value);
          const multiplier = 1 / step;
          const roundedValue = Math.round(value * multiplier) / multiplier;
          onChange(roundedValue);
        } else {
          onChange(e.target.value);
        }
      }}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      step={step}
      inputMode={type === "number" ? "numeric" : "text"}
    />
  </div>
);

// Dropdown Component
export const CustomDropdown = ({
  label,
  options,
  selected,
  onSelect,
  placeholder,
  disabled = false,
  className = "",
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`flex  min-w-64 max-w-96 w-full items-center font-semibold border border-gray-400 dark:border-gray-600 text-sm ${className}`}
    >
      <label className="min-w-24 max-w-24 w-24 bg-cerulean-175 dark:bg-gray-700 border-r border-gray-400 dark:border-gray-600 pl-4 py-1">
        {label}
      </label>
      <div className="relative flex flex-col w-full h-full border-none">
        <button
          className={`h-full w-full text-left pl-4 py-1 bg-white dark:bg-gray-800 hover:dark:bg-gray-700 ${
            selected ? "dark:text-white" : "dark:text-gray-500"
          } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) {
              setIsOpen((prev) => !prev);
            }
          }}
          disabled={disabled}
        >
          {selected || placeholder}
        </button>

        {isOpen && (
          <div className="absolute top-8 left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 z-50 rounded-md overflow-hidden shadow-xl">
            {options.map((option) => (
              <button
                key={option}
                className="w-full bg-white dark:bg-gray-800 hover:bg-cerulean-125 dark:hover:bg-gray-700 text-left pl-2 py-1.5 dark:text-white"
                onClick={() => {
                  if (!disabled) {
                    onSelect(option);
                    setIsOpen(false);
                  }
                }}
                disabled={disabled}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
