"use client";

import React, { useState } from "react";

interface DropdownItem {
  id: string;
  name: string;
}

type DropdownProps = {
  label: string;
  items: DropdownItem[];
  onSelect: (id: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ label, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (id: string, name: string) => {
    setSelectedItem(name);
    setIsOpen(false);
    onSelect(id);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full px-20 py-5 bg-white rounded-lg shadow text-gray-700 font-semibold flex justify-between items-center"
      >
        {selectedItem || label}
        <img
          src={isOpen ? "/icon-up.png" : "/icon-down.png"}
          alt="トグル"
          className="w-7 h-7 ml-2"
        />
      </button>

      {isOpen && (
        <div className="top-full left-0 w-full bg-white rounded-lg shadow mt-2 z-10">
          <ul className="max-h-none overflow-visible">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.id, item.name)}
                className="p-4 border-b border-gray-200 hover:bg-gray-500 hover:text-white cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
