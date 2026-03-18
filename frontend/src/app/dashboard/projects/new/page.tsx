'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';

export default function NewProjectPage() {
  const router  = useRouter();
  const [form, setForm] = useState({
    name: '', description: '', alertThreshold: '10', alertEmail: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/projects', {
        name: form.name,
        description: form.description || undefined,
        alertThreshold: Number(form.alertThreshold),
        alertEmail: form.alertEmail || undefined,
      });
      toast.success('Project created!');
      router.push('/dashboard/projects');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="text-2xl font-bold text-white">New Project</h1>
        <p className="text-slate-400 text-sm mt-1">Get an API key to start sending logs from your SDK</p>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Project details</CardTitle>
          <CardDescription className="text-slate-400">You can change these settings later</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-slate-300">Project name *</Label>
              <Input
                value={form.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
                placeholder="My Production API"
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Description</Label>
              <Input
                value={form.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description (optional)"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Alert threshold (errors/hr)</Label>
              <Input
                type="number"
                min="1"
                value={form.alertThreshold}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, alertThreshold: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white focus:border-violet-500"
              />
              <p className="text-xs text-slate-500">You&apos;ll be alerted when this many errors occur within 1 hour</p>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Alert email</Label>
              <Input
                type="email"
                value={form.alertEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, alertEmail: e.target.value })}
                placeholder="ops@yourcompany.com (optional)"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium"
            >
              {loading ? 'Creating…' : 'Create project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
