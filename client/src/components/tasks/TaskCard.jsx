import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { formatDate, priorityColors, statusColors } from '../../utils/taskHelpers';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="group rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700 hover:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-100 truncate">{task.title}</h3>
          {task.description && (
            <p className="mt-1 text-sm text-slate-400 line-clamp-2">{task.description}</p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            aria-label="Edit task"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusColors[task.status]}`}>
          {task.status}
        </span>
        {task.category && (
          <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400">
            {task.category}
          </span>
        )}
        {task.estimatedMinutes && (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {formatDuration(task.estimatedMinutes)}
          </span>
        )}
        {task.dueDate && (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      <div className="mt-4">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, { status: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 focus:border-brand-500 focus:outline-none"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </article>
  );
}