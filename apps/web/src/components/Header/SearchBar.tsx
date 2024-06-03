import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="flex items-center">
      <input
        autoComplete="off"
        type="text"
        placeholder="Search the product..."
        className=" border border-gray-300 focus:outline-none focus:border-[0.5px] focus:border-[#0a6406] px-6 py-3 rounded-[300px] w-full text-sm"
      />
      <button
        // onClick={() => {}}
        className="bg-white hover:opacity-80 text-[#0a6406] p-2 rounded full"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
