import React, { useState } from 'react';
import { HandoffTask, RunbookFAQ } from '../types/portfolio';
import { CheckCircle2, Clock, AlertCircle, FileText, ChevronDown, ChevronUp, Plus, ExternalLink } from 'lucide-react';

interface HandoffSectionProps {
  tasks: HandoffTask[];
  faqs: RunbookFAQ[];
  onAddTask: (newTask: Omit<HandoffTask, 'id'>) => void;
  onToggleTaskStatus: (taskId: string) => void;
}

export const HandoffSection: React.FC<HandoffSectionProps> = ({
  tasks,
  faqs,
  onAddTask,
  onToggleTaskStatus,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<HandoffTask['category']>('Core Systems');
  const [newTaskNotes, setNewTaskNotes] = useState('');

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const readinessPercent = Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = tasks.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !newTaskAssignee.trim()) return;

    onAddTask({
      title: newTaskTitle.trim(),
      assignee: newTaskAssignee.trim(),
      category: newTaskCategory,
      status: 'Ready for Review',
      dueDate: 'Before Last Day',
      notes: newTaskNotes.trim() || 'Handoff meeting scheduled.'
    });

    setNewTaskTitle('');
    setNewTaskAssignee('');
    setNewTaskNotes('');
    setShowAddForm(false);
  };

  const getStatusBadge = (status: HandoffTask['status']) => {
    switch (status) {
      case 'Completed':
        return <span className="text-emerald-700 font-medium">✓ Completed</span>;
      case 'Ready for Review':
        return <span className="text-blue-700 font-medium">● Ready for Review</span>;
      case 'In Progress':
        return <span className="text-amber-700 font-medium">◐ In Progress</span>;
      case 'Scheduled':
        return <span className="text-stone-500 font-medium">○ Scheduled</span>;
    }
  };

  return (
    <section id="handoff" className="py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Section 03 · Operational Continuity
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial font-medium text-stone-900">
              The Comprehensive Handoff Matrix
            </h2>
            <p className="text-base text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Every system, token, document, and operational responsibility accounted for so the team never skips a beat.
            </p>
          </div>

          {/* Readiness Gauge */}
          <div className="p-4 bg-white border border-stone-200 rounded-xl flex items-center gap-5 shrink-0 shadow-xs">
            <div>
              <div className="text-xs font-medium text-stone-500">Transition Readiness</div>
              <div className="text-2xl font-bold font-mono-code text-stone-900 tabular-nums">
                {readinessPercent}% Ready
              </div>
            </div>
            <div className="w-24 h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div
                className="h-full bg-stone-900 transition-all duration-500"
                style={{ width: `${readinessPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Task Categories & Add Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl">
            {['all', 'Core Systems', 'Documentation', 'Access & Keys', 'Ongoing Initiatives'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'all' ? 'All Deliverables' : cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Cancel' : 'Add Handoff Item'}</span>
          </button>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <form onSubmit={handleCreateTask} className="mb-8 p-6 bg-stone-100/70 border border-stone-200 rounded-2xl animate-in fade-in">
            <h4 className="text-sm font-semibold text-stone-900 mb-4">Add Transition Item</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Deliverable / Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Billing service webhooks"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Assignee Lead</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David K."
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Category</label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as HandoffTask['category'])}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  <option value="Core Systems">Core Systems</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Access & Keys">Access & Keys</option>
                  <option value="Ongoing Initiatives">Ongoing Initiatives</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-stone-600 mb-1">Notes / Instructions</label>
              <input
                type="text"
                placeholder="Walkthrough scheduled, Notion RFC link, etc."
                value={newTaskNotes}
                onChange={(e) => setNewTaskNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
            >
              Save Deliverable
            </button>
          </form>
        )}

        {/* Deliverables Table / List */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs mb-16">
          <div className="divide-y divide-stone-100">
            {filteredTasks.map((task) => (
              <div 
                key={task.id}
                className="p-5 hover:bg-stone-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => onToggleTaskStatus(task.id)}
                    className="mt-0.5 text-stone-400 hover:text-stone-900 transition-colors"
                    title="Click to toggle status"
                  >
                    {task.status === 'Completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-stone-300 hover:border-stone-500" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-medium ${task.status === 'Completed' ? 'text-stone-400 line-through' : 'text-stone-900'}`}>
                        {task.title}
                      </h4>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-500 font-mono-code">{task.category}</span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1 max-w-2xl">
                      {task.notes}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-center text-xs shrink-0">
                  <div className="text-stone-600">
                    Lead: <strong className="text-stone-900 font-medium">{task.assignee}</strong>
                  </div>

                  <div className="text-xs font-mono-code">
                    {getStatusBadge(task.status)}
                  </div>

                  {task.resourceLink && (
                    <a
                      href={task.resourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-stone-400 hover:text-stone-800 transition-colors"
                      title="Open Resource Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Runbook FAQ Accordion */}
        <div>
          <div className="mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Runbook Quick-Reference
            </div>
            <h3 className="text-2xl font-serif-editorial font-medium text-stone-900">
              The "What If Aria is Hiking?" FAQ
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Answers to esoteric tribal knowledge, secret keys, and midnight troubleshooting.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-stone-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-stone-900 text-sm hover:bg-stone-50/50"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                      <p className="mb-3">{faq.answer}</p>
                      <div className="text-stone-500 font-mono-code text-[11px]">
                        Point of Contact: <span className="text-stone-800 font-medium">{faq.emergencyContact}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
