import React, { useRef, useState } from 'react';
import { DaySchedule } from '../types';
import { toPng } from 'html-to-image';
import { Download, Award, Target, FileDown, Loader2, ChevronLeft, ChevronRight, FileCheck } from 'lucide-react';

interface VerticalPagesViewProps {
  days: DaySchedule[];
}

export const VerticalPagesView: React.FC<VerticalPagesViewProps> = ({ days }) => {
  // Split schedule into vertical pages (6 days per page)
  const pageSize = 6;
  const totalPages = Math.ceil(days.length / pageSize) || 1;

  const [activePage, setActivePage] = useState<number>(1);
  const [viewAllPages, setViewAllPages] = useState<boolean>(false);

  const pages = Array.from({ length: totalPages }, (_, index) => {
    const start = index * pageSize;
    return {
      pageNumber: index + 1,
      startDay: days[start]?.dayNumber || start + 1,
      endDay: days[Math.min(start + pageSize - 1, days.length - 1)]?.dayNumber || Math.min(start + pageSize, days.length),
      days: days.slice(start, start + pageSize),
    };
  });

  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [downloadingPage, setDownloadingPage] = useState<number | null>(null);

  const downloadPageImage = async (pageNumber: number) => {
    const element = pageRefs.current[pageNumber];
    if (!element) return;

    try {
      setDownloadingPage(pageNumber);
      // Generate crisp 2x resolution image
      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const pInfo = pages[pageNumber - 1];
      const link = document.createElement('a');
      link.download = `NEET_2027_Schedule_Page_${pageNumber}_Days_${pInfo?.startDay}_to_${pInfo?.endDay}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export page as image', err);
    } finally {
      setDownloadingPage(null);
    }
  };

  const pagesToRender = viewAllPages ? pages : pages.filter((p) => p.pageNumber === activePage);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Controller Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Printable Vertical Schedule Sheets
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Formatted in high-contrast vertical cards (6 days per page) optimized for phone screens and A4 PDF printing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle between single page view vs all pages */}
          <button
            onClick={() => setViewAllPages(!viewAllPages)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
              viewAllPages
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {viewAllPages ? 'Show Single Page' : 'Show All Pages'}
          </button>

          {!viewAllPages && (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                disabled={activePage === 1}
                onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
                className="p-1 rounded text-slate-700 hover:bg-white disabled:opacity-30 cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-bold px-2 text-slate-800">
                Page {activePage} of {totalPages}
              </span>

              <button
                disabled={activePage === totalPages}
                onClick={() => setActivePage((prev) => Math.min(totalPages, prev + 1))}
                className="p-1 rounded text-slate-700 hover:bg-white disabled:opacity-30 cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pages Container */}
      <div className="space-y-12">
        {pagesToRender.map((p) => (
          <div key={p.pageNumber} className="relative">
            {/* Action Bar Above Each Page */}
            <div className="flex items-center justify-between mb-2 px-2 no-print">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                PAGE {p.pageNumber} OF {totalPages} (DAYS {p.startDay}–{p.endDay})
              </span>

              <button
                onClick={() => downloadPageImage(p.pageNumber)}
                disabled={downloadingPage === p.pageNumber}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 shadow-2xs transition-colors cursor-pointer"
              >
                {downloadingPage === p.pageNumber ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    Generating PNG...
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-indigo-600" />
                    Download Page {p.pageNumber} (PNG)
                  </>
                )}
              </button>
            </div>

            {/* The Actual Vertical Printable/Image Page */}
            <div
              ref={(el) => {
                pageRefs.current[p.pageNumber] = el;
              }}
              className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-300 shadow-md print:shadow-none print:border-none print-page-break"
            >
              {/* Vertical Sheet Header */}
              <div className="border-b-2 border-slate-900 pb-3 mb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-sm">
                      NEET 2027 MASTER STUDY & PRACTICE SCHEDULE
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                      NEET 2027 — 200 DAYS MASTER PLANNER
                    </h1>
                    <p className="text-xs sm:text-sm font-extrabold text-indigo-700 tracking-wider uppercase mt-0.5">
                      PHYSICS + CHEMISTRY + BIOLOGY EVERY SINGLE DAY
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-slate-900 text-white rounded-md text-xs font-black tracking-wide">
                      PAGE {p.pageNumber} OF {totalPages}
                    </span>
                    <p className="text-[11px] font-bold text-slate-600 mt-1">
                      Days {p.startDay} to {p.endDay}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-600 font-medium">
                  <span>• <strong>PHYSICS:</strong> Class + Numericals + MCQs</span>
                  <span>• <strong>CHEMISTRY:</strong> Class + Numericals/MCQs</span>
                  <span>• <strong>BIOLOGY:</strong> NCERT Line-by-Line + PYQs</span>
                  <span>• <strong>MOCKS:</strong> 20 Full-Length Papers Completed</span>
                </div>
              </div>

              {/* High-Readability Vertical Table */}
              <div className="overflow-x-auto touch-scroll scrollbar-thin border border-slate-300 rounded-lg">
                <table className="w-full border-collapse text-left text-xs sm:text-sm min-w-[580px] sm:min-w-full">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider divide-x divide-slate-700">
                      <th className="py-2.5 px-2.5 w-20 text-center sticky left-0 z-10 bg-slate-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.3)]">DAY</th>
                      <th className="py-2.5 px-2.5 w-1/4 bg-blue-950 text-blue-100">PHYSICS</th>
                      <th className="py-2.5 px-2.5 w-1/4 bg-indigo-950 text-indigo-100">CHEMISTRY</th>
                      <th className="py-2.5 px-2.5 w-1/4 bg-purple-950 text-purple-100">BIOLOGY</th>
                      <th className="py-2.5 px-2.5 w-1/4 bg-amber-950 text-amber-100">MCQ/PYQ + MOCK / REVISION</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-300">
                    {p.days.map((day) => (
                      <tr
                        key={day.dayNumber}
                        className={`divide-x divide-slate-300 ${
                          day.practicePaper
                            ? 'bg-amber-50/80 font-medium'
                            : day.isMilestoneDay
                            ? 'bg-purple-50/70'
                            : 'bg-white'
                        }`}
                      >
                        {/* Day Cell */}
                        <td className={`py-3 px-2 text-center align-top font-black text-slate-900 text-sm sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)] ${
                          day.practicePaper
                            ? 'bg-amber-100'
                            : day.isMilestoneDay
                            ? 'bg-purple-100'
                            : 'bg-white'
                        }`}>
                          <div>{day.dayLabel}</div>
                          <div className="text-[10px] text-indigo-700 font-bold mt-0.5">
                            Phase {day.phase}
                          </div>
                          <div className="text-[10px] text-slate-500 font-semibold">
                            Wk {day.week}
                          </div>
                          {day.practicePaper && (
                            <span className="mt-1 block text-[9px] bg-amber-300 text-amber-950 font-black px-1 rounded uppercase">
                              Mock {day.practicePaper.paperNumber}
                            </span>
                          )}
                          {day.isMilestoneDay && !day.practicePaper && (
                            <span className="mt-1 block text-[9px] bg-purple-200 text-purple-950 font-bold px-1 rounded">
                              TEST
                            </span>
                          )}
                        </td>

                        {/* Physics Cell */}
                        <td className="py-2.5 px-3 align-top space-y-1">
                          <div className="font-bold text-slate-900 leading-snug">
                            {day.physics.topic}
                          </div>
                          <div className="text-[11px] text-slate-600 leading-tight">
                            <strong>Concept: </strong>{day.physics.classConcept}
                          </div>
                          <div className="text-[11px] text-blue-900 bg-blue-50/70 p-1.5 rounded border border-blue-100">
                            <strong>Practice: </strong>{day.physics.practice} ({day.physics.mcqCount} Qs)
                          </div>
                        </td>

                        {/* Chemistry Cell */}
                        <td className="py-2.5 px-3 align-top space-y-1">
                          <div className="font-bold text-slate-900 leading-snug">
                            {day.chemistry.topic}
                          </div>
                          <div className="text-[11px] text-slate-600 leading-tight">
                            <strong>Concept: </strong>{day.chemistry.classConcept}
                          </div>
                          <div className="text-[11px] text-indigo-900 bg-indigo-50/70 p-1.5 rounded border border-indigo-100">
                            <strong>Practice: </strong>{day.chemistry.practice} ({day.chemistry.mcqCount} Qs)
                          </div>
                        </td>

                        {/* Biology Cell */}
                        <td className="py-2.5 px-3 align-top space-y-1">
                          <div className="font-bold text-slate-900 leading-snug">
                            {day.biology.topic}
                          </div>
                          <div className="text-[11px] text-slate-600 leading-tight">
                            <strong>NCERT: </strong>{day.biology.classConcept}
                          </div>
                          <div className="text-[11px] text-purple-900 bg-purple-50/70 p-1.5 rounded border border-purple-100">
                            <strong>Practice: </strong>{day.biology.practice} ({day.biology.mcqCount} Qs)
                          </div>
                        </td>

                        {/* MCQ / Practice Paper / Revision Cell */}
                        <td className="py-2.5 px-3 align-top space-y-1">
                          {day.practicePaper && (
                            <div className="p-1.5 rounded bg-amber-200/80 border border-amber-400 text-amber-950 font-bold text-[11px]">
                              ★ {day.practicePaper.title} ({day.practicePaper.duration})
                            </div>
                          )}

                          <div className="text-[11px] font-extrabold text-amber-900 bg-amber-50 p-1 rounded border border-amber-200 flex items-center justify-between">
                            <span>Target: {day.mcqPyqTarget.totalTarget} MCQs</span>
                            <span>({day.mcqPyqTarget.pyqCount} PYQs)</span>
                          </div>

                          <div className="text-[11px] text-slate-700 leading-tight">
                            <strong>Task: </strong>{day.revisionTask.primaryTask}
                          </div>

                          <div className="text-[10px] text-rose-800">
                            <strong>Error Book: </strong>{day.revisionTask.errorBookFocus}
                          </div>

                          {day.revisionTask.testSession && !day.practicePaper && (
                            <div className="text-[10px] text-amber-900 font-bold bg-amber-100 p-1 rounded">
                              ★ {day.revisionTask.testSession}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Vertical Sheet Footer */}
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>NEET 2027 Master Plan • 200 Days • 100% Syllabus Completed</span>
                <span>Page {p.pageNumber} of {totalPages}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
