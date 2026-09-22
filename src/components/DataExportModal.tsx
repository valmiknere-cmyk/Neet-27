import React, { useState } from 'react';
import { DaySchedule, DayProgress } from '../types';
import { ErrorBookEntry } from '../utils/storage';
import {
  exportScheduleToCSV,
  exportScheduleToJSON,
  exportProgressToJSON,
  exportErrorBookToCSV,
  exportErrorBookToJSON,
  exportMasterBundle,
  downloadFile,
} from '../utils/exportData';
import {
  X,
  Download,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
  Package,
  Layers,
  Archive,
  BookOpen,
  Info,
} from 'lucide-react';

interface DataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  days: DaySchedule[];
  progress: Record<number, DayProgress>;
  errorBookEntries: ErrorBookEntry[];
}

export const DataExportModal: React.FC<DataExportModalProps> = ({
  isOpen,
  onClose,
  days,
  progress,
  errorBookEntries,
}) => {
  const [downloadedStatus, setDownloadedStatus] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const markDownloaded = (key: string) => {
    setDownloadedStatus((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setDownloadedStatus((prev) => ({ ...prev, [key]: false }));
    }, 2500);
  };

  const handleDownloadScheduleCSV = () => {
    const csv = exportScheduleToCSV(days);
    downloadFile('NEET_2027_200_Days_Master_Schedule.csv', csv, 'text/csv;charset=utf-8;');
    markDownloaded('scheduleCSV');
  };

  const handleDownloadScheduleJSON = () => {
    const json = exportScheduleToJSON(days);
    downloadFile('NEET_2027_200_Days_Master_Schedule.json', json, 'application/json');
    markDownloaded('scheduleJSON');
  };

  const handleDownloadProgressJSON = () => {
    const json = exportProgressToJSON(progress, days);
    downloadFile('NEET_2027_Student_Progress_Backup.json', json, 'application/json');
    markDownloaded('progressJSON');
  };

  const handleDownloadErrorBookCSV = () => {
    const csv = exportErrorBookToCSV(errorBookEntries);
    downloadFile('NEET_2027_Digital_Error_Notebook.csv', csv, 'text/csv;charset=utf-8;');
    markDownloaded('errorCSV');
  };

  const handleDownloadErrorBookJSON = () => {
    const json = exportErrorBookToJSON(errorBookEntries);
    downloadFile('NEET_2027_Digital_Error_Notebook.json', json, 'application/json');
    markDownloaded('errorJSON');
  };

  const handleDownloadMasterBundle = () => {
    const json = exportMasterBundle(days, progress, errorBookEntries);
    downloadFile('NEET_2027_Complete_Master_Data_Archive.json', json, 'application/json');
    markDownloaded('masterBundle');
  };

  const handleDownloadAllIndividualFiles = () => {
    handleDownloadScheduleCSV();
    setTimeout(() => handleDownloadScheduleJSON(), 200);
    setTimeout(() => handleDownloadProgressJSON(), 400);
    setTimeout(() => handleDownloadErrorBookCSV(), 600);
    setTimeout(() => handleDownloadMasterBundle(), 800);
    markDownloaded('allFiles');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto touch-scroll">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[94vh] sm:max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-3.5 sm:p-5 bg-slate-900 text-white flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <h2 className="text-base sm:text-xl font-black tracking-tight leading-tight">
                Download All Data Files
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Export 200 days schedule, CSV sheets, student progress & error logs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-6 overflow-y-auto touch-scroll scrollbar-thin space-y-4 text-slate-800">
          {/* Quick One-Click Complete Download Banner */}
          <div className="p-3.5 sm:p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                Recommended
              </span>
              <h3 className="font-black text-slate-900 text-sm sm:text-base mt-1">
                Complete Master Data Archive (All 200 Days)
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                Contains all 200 schedule days, syllabus topics, 20 practice papers, checklist progress & error notes.
              </p>
            </div>

            <button
              onClick={handleDownloadMasterBundle}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              {downloadedStatus['masterBundle'] ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Master JSON</span>
                </>
              )}
            </button>
          </div>

          {/* Individual Data File Downloads Grid */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              Individual File Formats
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {/* 1. Schedule CSV (Excel) */}
              <div className="p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors flex flex-col justify-between space-y-2 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      Schedule Spreadsheet (CSV)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    200 rows with Physics, Chemistry, Biology topics, MCQs target & practice papers for Excel / Sheets.
                  </p>
                </div>

                <button
                  onClick={handleDownloadScheduleCSV}
                  className="w-full py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV (Excel)</span>
                </button>
              </div>

              {/* 2. Schedule JSON */}
              <div className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors flex flex-col justify-between space-y-2 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-blue-600 shrink-0" />
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      Full Schedule (JSON)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Complete structured dataset of all 200 days with subtopics, concepts, milestone tests & papers.
                  </p>
                </div>

                <button
                  onClick={handleDownloadScheduleJSON}
                  className="w-full py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON</span>
                </button>
              </div>

              {/* 3. Student Progress & Notes */}
              <div className="p-3 rounded-xl border border-slate-200 bg-white hover:border-amber-300 transition-colors flex flex-col justify-between space-y-2 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-amber-600 shrink-0" />
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      Study Progress & Notes (JSON)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Backup of your ticked checklist items, study notes, mock exam scores and completion dates.
                  </p>
                </div>

                <button
                  onClick={handleDownloadProgressJSON}
                  className="w-full py-1.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Backup Progress</span>
                </button>
              </div>

              {/* 4. Digital Error Notebook */}
              <div className="p-3 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-colors flex flex-col justify-between space-y-2 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      Error Notebook ({errorBookEntries.length} logged)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    All recorded question mistakes, concept traps and learning rules in CSV or JSON.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadErrorBookCSV}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  >
                    <Download className="w-3 h-3" />
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={handleDownloadErrorBookJSON}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  >
                    <Download className="w-3 h-3" />
                    <span>JSON</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trigger All Downloads Button */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2">
            <div className="text-xs text-slate-700">
              <strong>Want all files at once?</strong> Download CSV, JSON, Progress & Error Notebook together.
            </div>
            <button
              onClick={handleDownloadAllIndividualFiles}
              className="shrink-0 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download All 5 Files</span>
            </button>
          </div>

          {/* Project Source Code Export Note */}
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-950">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Need the application code repository?</strong>
              <p className="text-blue-900 mt-0.5 leading-relaxed">
                You can also export the full application codebase as a ZIP archive or push to GitHub anytime from the AI Studio top Settings menu by clicking <strong>&quot;Export to ZIP&quot;</strong> or <strong>&quot;Export to GitHub&quot;</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
