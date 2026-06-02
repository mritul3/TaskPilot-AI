import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ListTree, Plus, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../layouts/DashboardLayout';
import TaskCard from '../components/tasks/TaskCard';
import TaskFilters from '../components/tasks/TaskFilters';
import EmptyTaskState from '../components/tasks/EmptyTaskState';
import TaskFormModal from '../components/tasks/TaskFormModal';
import BreakdownModal from '../components/ai/BreakdownModal';
import GenerateTasksModal from '../components/ai/GenerateTasksModal';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import * as taskApi from '../services/taskService';

export default function Dashboard() {
  const qc = useQueryClient();
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', category: '' });
  const [showForm, setShowForm] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [editing, setEditing] = useState(null);

  const params = useMemo(() => {
    const q = {};
    if (filters.search) q.search = filters.search;
    if (filters.status) q.status = filters.status;
    if (filters.priority) q.priority = filters.priority;
    if (filters.category) q.category = filters.category;
    return q;
  }, [filters]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks', params],
    queryFn: () => taskApi.getTasks(params).then((r) => r.data),
  });

  const tasks = data?.tasks ?? [];

  const categories = [...new Set(tasks.map((t) => t.category).filter(Boolean))].sort();

  const refetch = () => qc.invalidateQueries({ queryKey: ['tasks'] });

  const createTask = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      toast.success('Task added');
      setShowForm(false);
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const updateTask = useMutation({
    mutationFn: ({ id, payload }) => taskApi.updateTask(id, payload),
    onSuccess: () => {
      toast.success('Saved');
      setShowForm(false);
      setEditing(null);
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const removeTask = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      toast.success('Deleted');
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const addMany = useMutation({
    mutationFn: taskApi.bulkCreateTasks,
    onSuccess: refetch,
    onError: (e) => toast.error(e.message),
  });

  const onSave = (payload) => {
    if (editing) updateTask.mutate({ id: editing._id, payload });
    else createTask.mutate(payload);
  };

  const filteredEmpty = filters.search || filters.status || filters.priority || filters.category;

  let completed = 0;
  let inProgress = 0;
  for (const t of tasks) {
    if (t.status === 'Completed') completed++;
    if (t.status === 'In Progress') inProgress++;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Your tasks</h1>
          <p className="mt-2 text-sm text-slate-400">
            {tasks.length} total · {inProgress} in progress · {completed} done
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowBreakdown(true)}>
            <ListTree className="h-4 w-4" />
            Breakdown
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setShowGenerate(true)}>
            <Sparkles className="h-4 w-4" />
            AI generate
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
          >
            <Plus className="h-4 w-4" />
            New task
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <TaskFilters filters={filters} onChange={setFilters} categories={categories} />
      </div>

      {isLoading && (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && isError && (
        <p className="py-20 text-center text-red-400">Could not load tasks — try refreshing.</p>
      )}

      {!isLoading && !isError && tasks.length === 0 && (
        <EmptyTaskState
          hasFilters={filteredEmpty}
          onCreateTask={() => {
            setEditing(null);
            setShowForm(true);
          }}
          onAiGenerate={() => setShowGenerate(true)}
        />
      )}

      {!isLoading && !isError && tasks.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={(t) => {
                setEditing(t);
                setShowForm(true);
              }}
              onDelete={(id) => {
                if (confirm('Delete this task?')) removeTask.mutate(id);
              }}
              onStatusChange={(id, payload) => updateTask.mutate({ id, payload })}
            />
          ))}
        </div>
      )}

      <TaskFormModal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditing(null);
        }}
        onSubmit={onSave}
        task={editing}
        loading={createTask.isPending || updateTask.isPending}
      />

      <BreakdownModal isOpen={showBreakdown} onClose={() => setShowBreakdown(false)} />

      <GenerateTasksModal
        isOpen={showGenerate}
        onClose={() => setShowGenerate(false)}
        onGenerate={(list) => addMany.mutateAsync(list)}
      />
    </DashboardLayout>
  );
}
