import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { breakdown } from '../../services/aiService';
import Spinner from '../ui/Spinner';

export default function BreakdownModal({ isOpen, onClose }) {
  const [goal, setGoal] = useState('');
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const close = () => {
    setGoal('');
    setSteps([]);
    onClose();
  };

  const run = async () => {
    if (!goal.trim()) {
      toast.error('Enter a goal first');
      return;
    }
    setLoading(true);
    setSteps([]);
    try {
      const { data } = await breakdown(goal);
      setSteps(data.subtasks);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Task breakdown" size="lg">
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        maxLength={2000}
        rows={3}
        placeholder="e.g. build a SaaS MVP"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-brand-500 focus:outline-none"
      />
      <Button className="mt-3" onClick={run} loading={loading}>
        Break it down
      </Button>

      {loading && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}

      {steps.length > 0 && (
        <ol className="mt-5 space-y-2 list-decimal list-inside text-sm text-slate-200">
          {steps.map((step, i) => (
            <li key={i} className="rounded-lg border border-slate-800 bg-slate-800/50 px-3 py-2 list-none">
              <span className="text-brand-400 font-medium mr-2">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      )}
    </Modal>
  );
}
