import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const FiltersProducts = ({ setFilterQuery }: any) => {
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilterQuery((prevParams: any) => {
      let updatedQuery = prevParams ? [...prevParams] : [];
      updatedQuery = updatedQuery.filter((query) => query.name !== name);

      if (value) {
        updatedQuery.push({ name, value });
      }

      return updatedQuery;
    });
  };

  // Reset Filters
  const resetFilters = () => {
    setFilterQuery([]);
  };

  return (
    <aside className="inset-0 top-24 w-full text-primary-text p-6">
      <div>
        <h2 className="font-semibold text-lg text-primary-text border-b pb-3 border-neutral-400">
          Filters
        </h2>
        <aside className="mt-6">
          {/* Search */}
          <h3 className="mt-4 mb-1 font-medium text-primary-text">Search</h3>
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-2 border-b border-neutral-300 focus:outline-none"
            name="name"
            onChange={handleFilterChange}
          />

          {/* Category */}
          <h3 className="mt-4 mb-1 font-medium text-primary-text">Category</h3>
          <select
            className="w-full p-2 border-b border-neutral-300 focus:outline-none"
            onChange={handleFilterChange}
            name="category"
          >
            <option value="">All</option>
            <option value="Notebooks">Notebooks</option>
            <option value="Calculators">Calculators</option>
            <option value="Pens">Pens</option>
            <option value="Pencils">Pencils</option>
            <option value="Markers">Markers</option>
            <option value="Erasers">Erasers</option>
            <option value="Staplers">Staplers</option>
            <option value="Folders">Folders</option>
          </select>

          {/* Brand */}
          <h3 className="mt-4 mb-1 font-medium text-primary-text">Brand</h3>
          <input
            type="text"
            placeholder="Enter brand..."
            className="w-full p-2 border-b border-neutral-300 focus:outline-none"
            name="brand"
            onChange={handleFilterChange}
          />

          {/* Material */}
          <h3 className="mt-4 mb-1 font-medium text-primary-text">Material</h3>
          <input
            type="text"
            placeholder="Enter material..."
            className="w-full p-2 border-b border-neutral-300 focus:outline-none"
            name="material"
            onChange={handleFilterChange}
          />

          {/* Availability */}
          <h3 className="mt-4 mb-1 font-medium text-primary-text">
            Availability
          </h3>
          <select
            className="w-full p-2 border-b border-neutral-300 focus:outline-none"
            onChange={handleFilterChange}
            name="status"
          >
            <option value="">All</option>
            <option value="available">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="discontinued">Discontinued</option>
          </select>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="mt-6 mb-1 w-full p-2 bg-secondary text-primary-bg duration-300 transition-transform hover:scale-105 hover:cursor-pointer rounded-full"
          >
            Reset Filters
          </button>
        </aside>
      </div>
    </aside>
  );
};

export default FiltersProducts;
