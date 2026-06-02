import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { generateTasks } from '../../services/aiService';
import { priorityColors } from '../../utils/taskHelpers';
import Spinner from '../ui/Spinner';

export default function GenerateTasksModal({ isOpen, onClose, onGenerate }) {
  const [prompt, setPrompt] = useState('');
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const close = () => {
    setPrompt('');
    setPreview([]);
    onClose();
  };

  const runGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Type a goal first');
      return;
    }
    setLoading(true);
    setPreview([]);
    try {
      const { data } = await generateTasks(prompt);
      setPreview(data.tasks);
      toast.success(`Got ${data.tasks.length} tasks`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToBoard = async () => {
    setSaving(true);
    try {
      await onGenerate(preview);
      toast.success('Added to your list');
      close();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Generate tasks" size="xl">
      <p className="mb-3 text-sm text-slate-400">
        Describe what you are trying to do — the API will suggest tasks you can add.
      </p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        maxLength={2000}
        rows={3}
        placeholder="e.g. launch a small ecommerce site next month"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-brand-500 focus:outline-none"
      />
      <Button className="mt-3" onClick={runGenerate} loading={loading}>
        <Sparkles className="h-4 w-4" />
        Generate
      </Button>

      {loading && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}

      {preview.length > 0 && (
        <div className="mt-5 space-y-2">
          {preview.map((task, i) => (
            <div key={i} className="rounded-lg border border-slate-800 bg-slate-800/40 p-3">
              <div className="flex justify-between gap-2">
                <span className="font-medium text-slate-100">{task.title}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority] || priorityColors.Medium}`}
                >
                  {task.priority || 'Medium'}
                </span>
              </div>
              {task.description && (
                <p className="mt-1 text-sm text-slate-400">{task.description}</p>
              )}
            </div>
          ))}
          <Button className="w-full mt-3" onClick={addToBoard} loading={saving}>
            Add {preview.length} tasks
          </Button>
        </div>
      )}
    </Modal>
  );
}
