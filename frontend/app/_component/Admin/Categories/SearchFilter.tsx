
import { FilterState } from '@/app/_types/admin/category.type';
import { ChevronDown, ChevronsDown, ChevronsUp, Filter, Search } from 'lucide-react';

interface SearchFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onResetFilters: () => void;
  toggleExpandAll: () => void;
  allExpanded: boolean;
}

export default function SearchFilter({
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters,
  onResetFilters,
  toggleExpandAll,
  allExpanded
}: SearchFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="w-5 h-5 absolute text-sm left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={filters.searchQuery}
              onChange={(e) =>
                onFilterChange({ ...filters, searchQuery: e.target.value })
              }
              className="w-full pl-10 pr-4 text-sm py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5a5d66] text-[#5a5d66]"
            />
          </div>
        </div>

        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-[#5a5d66]"
        >
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''
              }`}
          />
        </button>

        <button
          onClick={toggleExpandAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#5a5d66] hover:bg-gray-100 rounded transition-colors"
          title={allExpanded ? "Collapse All" : "Expand All"}
        >
          {allExpanded ? (
            <>
              <ChevronsUp className="w-4 h-4" />
              Collapse All
            </>
          ) : (
            <>
              <ChevronsDown className="w-4 h-4" />
              Expand All
            </>
          )}
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium text-[#5a5d66] mb-1">
              Level
            </label>
            <select
              value={filters.level}
              onChange={(e) =>
                onFilterChange({ ...filters, level: e.target.value })
              }
              className="px-3 py-2 border text-sm border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5a5d66] text-[#5a5d66]"
            >
              <option value="all">All Levels</option>
              <option value="0">Level 0</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5a5d66] mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                onFilterChange({ ...filters, status: e.target.value })
              }
              className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5a5d66] text-[#5a5d66]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={onResetFilters}
              className="px-4 py-2 text-sm border border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}