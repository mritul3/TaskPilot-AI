import { useEffect, useState } from 'react';
import { Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { emptyTask, PRIORITIES, STATUSES } from '../../utils/taskHelpers';
import { suggestPriority } from '../../services/aiService';

export default function TaskFormModal({ isOpen, onClose, onSubmit, task, loading }) {
  const [form, setForm] = useState(emptyTask);
  const [aiPriorityBusy, setAiPriorityBusy] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'General',
        priority: task.priority || 'Medium',
        status: task.status || 'Todo',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    } else {
      setForm(emptyTask);
    }
  }, [task, isOpen]);

  const askAiPriority = async () => {
    if (!form.title.trim()) {
      toast.error('Add a title first');
      return;
    }
    setAiPriorityBusy(true);
    try {
      const { data } = await suggestPriority(form.title, form.description);
      setForm((f) => ({ ...f, priority: data.priority }));
      toast.success(`Suggested: ${data.priority}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAiPriorityBusy(false);
    }
  };

  const askAiEstimate = async () => {
    if (!form.title.trim()) {
      toast.error('Add a title first');
      return;
    }
    setAiEstimateBusy(true);
    try {
      const { data } = await suggestEstimate(form.title, form.description, form.category);
      setForm((f) => ({ ...f, estimatedMinutes: data.estimatedMinutes }));
      toast.success(`Suggested: ${data.estimatedMinutes} min`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAiEstimateBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) {
      toast.error('Title is required');
      return;
    }
    onSubmit({
      ...form,
      title,
      description: form.description.trim(),
      category: form.category.trim() || 'General',
      dueDate: form.dueDate || null,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Edit task' : 'New task'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          required
          maxLength={200}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <div>
          <label className="mb-1.5 block text-sm text-slate-300">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            maxLength={2000}
            rows={3}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Category"
            maxLength={100}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm text-slate-300">Priority</label>
              <button
                type="button"
                onClick={askAiPriority}
                disabled={aiPriorityBusy}
                className="text-xs text-brand-400 hover:text-brand-300"
              >
                <Wand2 className="inline h-3 w-3 mr-1" />
                {aiPriorityBusy ? '...' : 'AI suggest'}
              </button>
            </div>
            <Select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              options={PRIORITIES}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={STATUSES}
          />
          <Input
            label="Due date"
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm text-slate-300">Estimated time (minutes)</label>
            <button
              type="button"
              onClick={askAiEstimate}
              disabled={aiEstimateBusy}
              className="text-xs text-brand-400 hover:text-brand-300"
            >
              <Wand2 className="inline h-3 w-3 mr-1" />
              {aiEstimateBusy ? '...' : 'AI suggest'}
            </button>
          </div>
          <Input
            type="number"
            min={5}
            max={480}
            step={15}
            placeholder="e.g. 45"
            value={form.estimatedMinutes}
            onChange={(e) => setForm({ ...form, estimatedMinutes: e.target.value })}
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {task ? 'Save' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}