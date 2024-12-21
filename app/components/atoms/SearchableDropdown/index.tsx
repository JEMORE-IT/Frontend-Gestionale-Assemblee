import React, { FC, useEffect, useRef, useState } from "react";
import SearchableDropdownProps, { Option } from "./index.types"

const SearchableDropdown: FC<SearchableDropdownProps> = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
}) => {
  const [query, setQuery] = useState<string>(""); // Stato per la query di ricerca
  const [isOpen, setIsOpen] = useState<boolean>(false); // Stato per il menu a tendina

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Chiudere il menu a tendina se si clicca al di fuori
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

  // Selezionare un'opzione dal menu
  const selectOption = (option: Option) => {
    setQuery("");
    handleChange(option.name); // Passa il valore selezionato al genitore
    setIsOpen(false);
  };

  // Restituisce il valore da mostrare nell'input
  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  // Filtrare le opzioni in base alla query
  const filterOptions = (options: Option[]) => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        {/* Input di ricerca */}
        <input
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          onChange={(e) => {
            setQuery(e.target.value); // Aggiorna la query di ricerca
            handleChange(null); // Resetta il valore selezionato
          }}
          onClick={() => setIsOpen(!isOpen)} // Alterna il menu a tendina
          className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
        {/* Icona del menu a tendina */}
        <div
          className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${
            isOpen ? "rotate-180" : ""
          } transition-transform`}
        >
          ▼
        </div>
      </div>

      {/* Menu delle opzioni */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {filterOptions(options).map((option) => (
            <div
              key={option.id} // Usa l'id come chiave univoca
              onClick={() => selectOption(option)} // Seleziona l'opzione
              className={`cursor-pointer px-4 py-2 ${
                option.name === selectedVal ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              {option.name}
            </div>
          ))}
          {/* Mostra un messaggio se non ci sono opzioni disponibili */}
          {filterOptions(options).length === 0 && (
            <div className="cursor-default px-4 py-2 text-gray-500">
              Nessuna opzione trovata
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;