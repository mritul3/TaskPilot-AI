export const PRIORITIES = ['Low', 'Medium', 'High'];
export const STATUSES = ['Todo', 'In Progress', 'Completed'];

export const priorityColors = {
  Low: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 ring-amber-500/30',
  High: 'bg-red-500/15 text-red-400 ring-red-500/30',
};

export const statusColors = {
  Todo: 'bg-slate-500/15 text-slate-300 ring-slate-500/30',
  'In Progress': 'bg-blue-500/15 text-blue-400 ring-blue-500/30',
  Completed: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/30',
};

export const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDuration = (minutes) => {
  if (!minutes) return null;
  if (minutes >= 60 && minutes % 60 === 0) return `${minutes / 60}h`;
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  }
  return `${minutes} min`;
};

export const emptyTask = {
  title: '',
  description: '',
  category: 'General',
  priority: 'Medium',
  status: 'Todo',
  dueDate: '',
  estimatedMinutes: '',
};
