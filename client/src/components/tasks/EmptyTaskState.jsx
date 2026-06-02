import { ClipboardList, Plus, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function EmptyTaskState({ onCreateTask, onAiGenerate, hasFilters }) {
  return (
    <div className="mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/30 px-6 py-14 text-center">
      <ClipboardList className="mx-auto h-10 w-10 text-slate-500" />
      <h3 className="mt-4 text-lg font-medium text-slate-100">
        {hasFilters ? 'Nothing matches' : 'No tasks yet'}
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        {hasFilters ? 'Change filters or add a new task.' : 'Create one yourself or let AI draft a few.'}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={onCreateTask}>
          <Plus className="h-4 w-4" />
          New task
        </Button>
        <Button variant="secondary" onClick={onAiGenerate}>
          <Sparkles className="h-4 w-4" />
          AI generate
        </Button>
      </div>
    </div>
  );
}
