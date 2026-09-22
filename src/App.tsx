import React, { useState, useEffect, useMemo } from 'react';
import { NEET_200_DAYS_SCHEDULE } from './data/neetSchedule';
import { DaySchedule, DayProgress, ViewMode, PhaseFilter } from './types';
import { loadProgress, saveProgress, loadErrorBook, saveErrorBook, ErrorBookEntry } from './utils/storage';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ScheduleTable } from './components/ScheduleTable';
import { MobileCardView } from './components/MobileCardView';
import { VerticalPagesView } from './components/VerticalPagesView';
import { DayDetailModal } from './components/DayDetailModal';
import { ErrorBookModal } from './components/ErrorBookModal';
import { DailyRoutineGuide } from './components/DailyRoutineGuide';
import { DataExportModal } from './components/DataExportModal';
import confetti from 'canvas-confetti';

export default function App() {
  const [progress, setProgress] = useState<Record<number, DayProgress>>(() => loadProgress());
  const [errorBookEntries, setErrorBookEntries] = useState<ErrorBookEntry[]>(() => loadErrorBook());

  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>('all');
  const [papersOnly, setPapersOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedDay, setSelectedDay] = useState<DaySchedule | null>(null);
  const [isErrorBookOpen, setIsErrorBookOpen] = useState(false);
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [jumpInput, setJumpInput] = useState('');

  // Sync progress changes to localStorage
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Sync error book to localStorage
  useEffect(() => {
    saveErrorBook(errorBookEntries);
  }, [errorBookEntries]);

  // Count completed full-length practice papers (Days with practicePaper that are fully done)
  const completedPapersCount = useMemo(() => {
    return NEET_200_DAYS_SCHEDULE.filter((d) => {
      if (!d.practicePaper) return false;
      const p = progress[d.dayNumber];
      return p && p.physicsDone && p.chemistryDone && p.biologyDone && p.mcqsDone && p.revisionDone;
    }).length;
  }, [progress]);

  // Toggle entire day completion
  const handleToggleDay = (dayNumber: number) => {
    const current = progress[dayNumber];
    const isNowDone = !(current?.physicsDone && current?.chemistryDone && current?.biologyDone && current?.mcqsDone && current?.revisionDone);

    const updated: Record<number, DayProgress> = {
      ...progress,
      [dayNumber]: {
        physicsDone: isNowDone,
        chemistryDone: isNowDone,
        biologyDone: isNowDone,
        mcqsDone: isNowDone,
        revisionDone: isNowDone,
        userNotes: current?.userNotes || '',
        paperScore: current?.paperScore,
        completedAt: isNowDone ? new Date().toISOString() : undefined,
      },
    };

    setProgress(updated);

    if (isNowDone) {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.7 },
      });
    }
  };

  // Toggle specific subject on a day
  const handleToggleSubject = (dayNumber: number, field: keyof DayProgress) => {
    const current = progress[dayNumber] || {
      physicsDone: false,
      chemistryDone: false,
      biologyDone: false,
      mcqsDone: false,
      revisionDone: false,
    };

    const updatedItem = {
      ...current,
      [field]: !current[field],
    };

    const isFullyDone =
      updatedItem.physicsDone &&
      updatedItem.chemistryDone &&
      updatedItem.biologyDone &&
      updatedItem.mcqsDone &&
      updatedItem.revisionDone;

    setProgress((prev) => ({
      ...prev,
      [dayNumber]: {
        ...updatedItem,
        completedAt: isFullyDone ? new Date().toISOString() : current.completedAt,
      },
    }));

    if (isFullyDone) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  // Update specific day progress from modal
  const handleUpdateDayProgress = (dayNumber: number, newProgress: DayProgress) => {
    setProgress((prev) => ({
      ...prev,
      [dayNumber]: newProgress,
    }));
  };

  // Error book handlers
  const handleAddErrorEntry = (entryData: Omit<ErrorBookEntry, 'id' | 'createdAt'>) => {
    const newEntry: ErrorBookEntry = {
      ...entryData,
      id: `err-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };
    setErrorBookEntries((prev) => [newEntry, ...prev]);
  };

  const handleToggleResolvedError = (id: string) => {
    setErrorBookEntries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, resolved: !item.resolved } : item))
    );
  };

  const handleDeleteError = (id: string) => {
    setErrorBookEntries((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter days by phase, practice papers only, and search query
  const filteredDays = useMemo(() => {
    return NEET_200_DAYS_SCHEDULE.filter((day) => {
      // Papers only filter
      if (papersOnly && !day.practicePaper) {
        return false;
      }

      // Phase filter
      if (!papersOnly && phaseFilter !== 'all' && day.phase !== Number(phaseFilter)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inPhysics =
          day.physics.topic.toLowerCase().includes(query) ||
          day.physics.classConcept.toLowerCase().includes(query) ||
          day.physics.subtopics.some((s) => s.toLowerCase().includes(query));

        const inChemistry =
          day.chemistry.topic.toLowerCase().includes(query) ||
          day.chemistry.classConcept.toLowerCase().includes(query) ||
          day.chemistry.subtopics.some((s) => s.toLowerCase().includes(query));

        const inBiology =
          day.biology.topic.toLowerCase().includes(query) ||
          day.biology.classConcept.toLowerCase().includes(query) ||
          day.biology.subtopics.some((s) => s.toLowerCase().includes(query));

        const inRevision =
          day.revisionTask.primaryTask.toLowerCase().includes(query) ||
          day.revisionTask.errorBookFocus.toLowerCase().includes(query);

        const inPaper = day.practicePaper
          ? day.practicePaper.title.toLowerCase().includes(query) ||
            day.practicePaper.focus.toLowerCase().includes(query)
          : false;

        const inDay = day.dayLabel.toLowerCase().includes(query);

        return inPhysics || inChemistry || inBiology || inRevision || inPaper || inDay;
      }

      return true;
    });
  }, [phaseFilter, papersOnly, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  const handleJumpToDay = (e: React.FormEvent) => {
    e.preventDefault();
    const dNum = parseInt(jumpInput.trim(), 10);
    if (!isNaN(dNum) && dNum >= 1 && dNum <= 200) {
      const target = NEET_200_DAYS_SCHEDULE.find((d) => d.dayNumber === dNum);
      if (target) {
        // Adjust filters so target day is visible
        if (papersOnly && !target.practicePaper) {
          setPapersOnly(false);
        }
        if (phaseFilter !== 'all' && target.phase !== Number(phaseFilter)) {
          setPhaseFilter('all');
        }
        setTimeout(() => {
          const el = document.getElementById(
            viewMode === 'table' ? `day-row-${dNum}` : `day-card-${dNum}`
          );
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            setSelectedDay(target);
          }
        }, 50);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Top Application Header */}
      <Header
        progress={progress}
        totalDays={NEET_200_DAYS_SCHEDULE.length}
        completedPapersCount={completedPapersCount}
        totalPapers={20}
        onErrorBookClick={() => setIsErrorBookOpen(true)}
        onRoutineClick={() => setIsRoutineOpen(true)}
        onDownloadDataClick={() => setIsExportOpen(true)}
      />

      {/* Filter and View Mode Switcher */}
      <FilterBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        phaseFilter={phaseFilter}
        setPhaseFilter={setPhaseFilter}
        papersOnly={papersOnly}
        setPapersOnly={setPapersOnly}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPrint={handlePrint}
        totalFilteredCount={filteredDays.length}
      />

      {/* Main Study Plan Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-6 py-3 sm:py-6">
        {/* Quick Day Jump & Milestone Tracker Bar */}
        {viewMode !== 'vertical-pages' && (
          <div className="mb-3 sm:mb-4 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 no-print">
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <span className="text-[11px] sm:text-xs font-black uppercase text-slate-500 tracking-wider">
                Jump to Day:
              </span>
              <form onSubmit={handleJumpToDay} className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  placeholder="1–200"
                  className="w-20 px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Go
                </button>
              </form>
            </div>

            {/* Quick Milestone Shortcuts - Touch Scrollable on Mobile */}
            <div className="w-full sm:w-auto flex items-center gap-1.5 overflow-x-auto touch-scroll scrollbar-thin py-1 -mx-1 px-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase mr-0.5 shrink-0">
                Milestones:
              </span>
              {[
                { day: 80, label: 'Day 80: Class 11 Complete' },
                { day: 140, label: 'Day 140: Class 12 Complete' },
                { day: 180, label: 'Day 180: Grand Revision' },
                { day: 200, label: 'Day 200: Final Exam & 20 Mocks Done!' },
              ].map((m) => (
                <button
                  key={m.day}
                  onClick={() => {
                    setPhaseFilter('all');
                    setPapersOnly(false);
                    setTimeout(() => {
                      const el = document.getElementById(
                        viewMode === 'table' ? `day-row-${m.day}` : `day-card-${m.day}`
                      );
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      } else {
                        const target = NEET_200_DAYS_SCHEDULE.find((d) => d.dayNumber === m.day);
                        if (target) setSelectedDay(target);
                      }
                    }, 50);
                  }}
                  className="shrink-0 px-2 sm:px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] sm:text-xs font-bold whitespace-nowrap cursor-pointer transition-colors active:scale-95"
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* View Mode Switching */}
        {viewMode === 'table' && (
          <ScheduleTable
            days={filteredDays}
            progress={progress}
            onToggleDay={handleToggleDay}
            onSelectDay={(day) => setSelectedDay(day)}
          />
        )}

        {viewMode === 'cards' && (
          <MobileCardView
            days={filteredDays}
            progress={progress}
            onToggleSubject={handleToggleSubject}
            onSelectDay={(day) => setSelectedDay(day)}
          />
        )}

        {viewMode === 'vertical-pages' && <VerticalPagesView days={filteredDays} />}

        {/* Empty state if search returns zero results */}
        {filteredDays.length === 0 && (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-xs max-w-md mx-auto my-8">
            <p className="text-slate-500 font-semibold text-sm">
              No days match your filters or search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setPhaseFilter('all');
                setPapersOnly(false);
              }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedDay && (
        <DayDetailModal
          day={selectedDay}
          onClose={() => setSelectedDay(null)}
          progress={
            progress[selectedDay.dayNumber] || {
              physicsDone: false,
              chemistryDone: false,
              biologyDone: false,
              mcqsDone: false,
              revisionDone: false,
            }
          }
          onUpdateProgress={handleUpdateDayProgress}
        />
      )}

      {isErrorBookOpen && (
        <ErrorBookModal
          isOpen={isErrorBookOpen}
          onClose={() => setIsErrorBookOpen(false)}
          entries={errorBookEntries}
          onAddEntry={handleAddErrorEntry}
          onToggleResolved={handleToggleResolvedError}
          onDeleteEntry={handleDeleteError}
        />
      )}

      {isRoutineOpen && (
        <DailyRoutineGuide isOpen={isRoutineOpen} onClose={() => setIsRoutineOpen(false)} />
      )}

      {isExportOpen && (
        <DataExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          days={NEET_200_DAYS_SCHEDULE}
          progress={progress}
          errorBookEntries={errorBookEntries}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700 text-sm">
            NEET 2027 — 200 DAYS STUDY & PRACTICE MASTER SCHEDULE
          </p>
          <p>
            Physics + Chemistry + Biology every single day • 100% Complete Class 11 & 12 Syllabus (all 97 Chapters) + 20 Full-Length Practice Papers Completed on Day 200!
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsExportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition-colors cursor-pointer"
            >
              Download All Data Files (CSV, JSON, Backups)
            </button>
            <button
              onClick={() => setIsRoutineOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
            >
              Daily Routine Guide
            </button>
            <button
              onClick={() => setIsErrorBookOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold transition-colors cursor-pointer"
            >
              Digital Error Notebook
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
