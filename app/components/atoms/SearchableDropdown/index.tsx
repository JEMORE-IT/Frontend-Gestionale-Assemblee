import React, { FC, useEffect, useRef, useState } from "react";
import SearchableDropdownProps, { Option } from "./index.types"

const SearchableDropdown: FC<SearchableDropdownProps> = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
}) => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const selectOption = (option: Option) => {
    setQuery("");
    handleChange(option[label] as string);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  const filterOptions = (options: Option[]) => {
    return options.filter((option) =>
      (option[label] as string)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  };

  return <>
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
          }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
        <div
          className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${
            isOpen ? "rotate-180" : ""
          } transition-transform`}
        >
          ▼
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {filterOptions(options).map((option, index) => (
            <div
              key={`${id}-${index}`}
              onClick={() => selectOption(option)}
              className={`cursor-pointer px-4 py-2 ${
                option[label] === selectedVal ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              {option[label]}
            </div>
          ))}
        </div>
      )}
    </div>
  </>
}

export default SearchableDropdown