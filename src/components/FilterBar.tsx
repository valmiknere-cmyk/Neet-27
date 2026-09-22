import React from 'react';
import { LayoutGrid, Table, FileText, Search, Printer, Award, BookOpen, Layers } from 'lucide-react';
import { ViewMode, PhaseFilter } from '../types';

interface FilterBarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  phaseFilter: PhaseFilter;
  setPhaseFilter: (phase: PhaseFilter) => void;
  papersOnly: boolean;
  setPapersOnly: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPrint: () => void;
  totalFilteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  viewMode,
  setViewMode,
  phaseFilter,
  setPhaseFilter,
  papersOnly,
  setPapersOnly,
  searchQuery,
  setSearchQuery,
  onPrint,
  totalFilteredCount,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 sm:py-3 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 sm:gap-3">
        {/* Left: View Mode Toggle (Smooth Horizontal Scroll on Mobile) */}
        <div className="w-full sm:w-auto overflow-x-auto touch-scroll no-scrollbar -mx-1 px-1">
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                viewMode === 'table'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              Table View
            </button>

            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                viewMode === 'cards'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              Mobile Cards
            </button>

            <button
              onClick={() => setViewMode('vertical-pages')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                viewMode === 'vertical-pages'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              Vertical Sheets
            </button>
          </div>
        </div>

        {/* Right side: Search, Practice Papers Toggle & Print */}
        <div className="flex items-center gap-2 overflow-x-auto touch-scroll no-scrollbar sm:flex-wrap">
          {/* Practice Papers Quick Filter */}
          <button
            onClick={() => setPapersOnly(!papersOnly)}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
              papersOnly
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
            }`}
            title="Filter to only show the 20 Full-Length Practice Papers days"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>20 Mocks</span>
          </button>

          {/* Search Box */}
          <div className="relative flex-1 min-w-[160px] sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or chapter..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Print Button */}
          <button
            onClick={onPrint}
            className="shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
            title="Print schedule formatted for paper or PDF export"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Phase Selector Tabs (Horizontally Scrollable with Momentum) */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="w-full flex items-center gap-1.5 overflow-x-auto touch-scroll scrollbar-thin py-0.5 -mx-1 px-1">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            Phase:
          </span>

          {[
            { key: 'all', label: 'All 200 Days' },
            { key: '1', label: 'Phase 1: Class 11 (Days 1–80)' },
            { key: '2', label: 'Phase 2: Class 12 (Days 81–140)' },
            { key: '3', label: 'Phase 3: Grand Revision (Days 141–180)' },
            { key: '4', label: 'Phase 4: 20 Papers Marathon (Days 181–200)' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setPhaseFilter(item.key as PhaseFilter);
                if (papersOnly) setPapersOnly(false);
              }}
              className={`shrink-0 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer active:scale-95 ${
                phaseFilter === item.key && !papersOnly
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium shrink-0 hidden lg:block">
          Showing <span className="font-bold text-slate-800">{totalFilteredCount}</span> days
        </div>
      </div>
    </div>
  );
};
