import { Search } from 'lucide-react';
import Select from '../ui/Select';
import { PRIORITIES, STATUSES } from '../../utils/taskHelpers';

const inputClass =
  'w-full rounded-lg border border-slate-700 bg-slate-900 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

export default function TaskFilters({ filters, onChange, categories }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 xl:items-end">
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-sm font-medium text-slate-300">Search</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Title..."
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <Select
          label="Status"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="py-2.5"
          options={[{ value: '', label: 'All' }, ...STATUSES.map((s) => ({ value: s, label: s }))]}
        />
        <Select
          label="Priority"
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value })}
          className="py-2.5"
          options={[{ value: '', label: 'All' }, ...PRIORITIES.map((p) => ({ value: p, label: p }))]}
        />
        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="py-2.5"
          options={[
            { value: '', label: 'All' },
            ...categories.map((c) => ({ value: c, label: c })),
          ]}
        />
      </div>
    </div>
  );
}
