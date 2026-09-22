import React, { useState } from 'react';
import { ErrorBookEntry } from '../utils/storage';
import { X, Plus, AlertCircle, CheckCircle2, Trash2, Filter } from 'lucide-react';

interface ErrorBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: ErrorBookEntry[];
  onAddEntry: (entry: Omit<ErrorBookEntry, 'id' | 'createdAt'>) => void;
  onToggleResolved: (id: string) => void;
  onDeleteEntry: (id: string) => void;
}

export const ErrorBookModal: React.FC<ErrorBookModalProps> = ({
  isOpen,
  onClose,
  entries,
  onAddEntry,
  onToggleResolved,
  onDeleteEntry,
}) => {
  const [subject, setSubject] = useState<'Physics' | 'Chemistry' | 'Biology'>('Physics');
  const [dayNumber, setDayNumber] = useState<number>(1);
  const [topic, setTopic] = useState('');
  const [mistakeDescription, setMistakeDescription] = useState('');
  const [correctConcept, setCorrectConcept] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !mistakeDescription.trim()) return;

    onAddEntry({
      subject,
      dayNumber,
      topic: topic.trim(),
      mistakeDescription: mistakeDescription.trim(),
      correctConcept: correctConcept.trim(),
      resolved: false,
    });

    setTopic('');
    setMistakeDescription('');
    setCorrectConcept('');
  };

  const filteredEntries = entries.filter((item) => {
    if (filterSubject === 'all') return true;
    return item.subject === filterSubject;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto touch-scroll">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[94vh] sm:max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-3.5 sm:p-5 bg-purple-900 text-white flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <AlertCircle className="w-5 h-5 text-purple-300 shrink-0" />
            <div>
              <h2 className="text-base sm:text-xl font-black tracking-tight leading-tight">
                NEET 2027 Digital Error Notebook
              </h2>
              <p className="text-[11px] sm:text-xs text-purple-200">
                Log tricky questions, calculation slips & NCERT traps across all 200 days.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-6 overflow-y-auto touch-scroll scrollbar-thin space-y-4 sm:space-y-6">
          {/* Add New Entry Form */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-purple-700" />
              Log A New Mistake / Doubt
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Day # (1–200)</label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={dayNumber}
                  onChange={(e) => setDayNumber(Math.max(1, Math.min(200, Number(e.target.value))))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Topic / Question No.</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Q.14 Vectors Dot Product"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  What Went Wrong (Mistake / Trap)?
                </label>
                <textarea
                  value={mistakeDescription}
                  onChange={(e) => setMistakeDescription(e.target.value)}
                  placeholder="e.g. Forgot to convert cm to m; confused cos θ with sin θ..."
                  rows={2}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Correct Concept / Learning Rule
                </label>
                <textarea
                  value={correctConcept}
                  onChange={(e) => setCorrectConcept(e.target.value)}
                  placeholder="e.g. Always check SI units first; W = Fs cos θ..."
                  rows={2}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-purple-700 hover:bg-purple-800 active:scale-95 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              Add To Error Book
            </button>
          </form>

          {/* List of Logged Mistakes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Logged Errors ({filteredEntries.length})
              </h3>

              <div className="flex items-center gap-1.5 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="p-1 border border-slate-300 rounded-md text-xs text-slate-700 bg-white"
                >
                  <option value="all">All Subjects</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>
            </div>

            {filteredEntries.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                No errors logged yet. Whenever you solve MCQs and make a mistake, log it here to review before your 7th-day tests!
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredEntries.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all ${
                      item.resolved
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : 'bg-white border-purple-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleResolved(item.id)}
                          className="cursor-pointer"
                          title={item.resolved ? 'Mark unresolved' : 'Mark mastered'}
                        >
                          {item.resolved ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-purple-600" />
                          )}
                        </button>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            item.subject === 'Physics'
                              ? 'bg-blue-100 text-blue-900'
                              : item.subject === 'Chemistry'
                              ? 'bg-indigo-100 text-indigo-900'
                              : 'bg-purple-100 text-purple-900'
                          }`}
                        >
                          {item.subject} • Day {item.dayNumber}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.topic}</h4>
                      </div>

                      <button
                        onClick={() => onDeleteEntry(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-2 text-xs text-slate-700 pl-6 space-y-1">
                      <p>
                        <strong className="text-rose-900">Mistake: </strong>
                        {item.mistakeDescription}
                      </p>
                      {item.correctConcept && (
                        <p>
                          <strong className="text-emerald-900">Correct Rule: </strong>
                          {item.correctConcept}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close Error Notebook
          </button>
        </div>
      </div>
    </div>
  );
};
