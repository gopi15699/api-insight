'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, Copy, Check, Activity, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/api';
import type { Project } from '@/types';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [copied, setCopied]     = useState<string | null>(null);

  useEffect(() => {
    api.get('/projects')
      .then(({ data }) => setProjects(data.data))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(key);
    toast.success('API key copied!');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between animate-fade-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-1">Each project gets a unique API key for your SDK</p>
        </div>
        <Button onClick={() => router.push('/dashboard/projects/new')} className="bg-violet-600 hover:bg-violet-700 gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-48 bg-slate-800 rounded-xl" />)}
        </div>
      ) : projects.length === 0 ? (
        <Card className="bg-slate-900 border-slate-800 border-dashed">
          <CardContent className="py-16 text-center">
            <Activity className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-white font-medium text-lg">No projects yet</p>
            <p className="text-slate-500 text-sm mb-6">Create your first project to get an API key</p>
            <Button onClick={() => router.push('/dashboard/projects/new')} className="bg-violet-600 hover:bg-violet-700">
              <Plus className="h-4 w-4 mr-2" /> Create project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <Card key={p._id} className={`bg-slate-900 border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-200 animate-fade-up stagger-${Math.min(i + 2, 6)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{p.name}</CardTitle>
                    {p.description && (
                      <p className="text-slate-500 text-sm mt-1">{p.description}</p>
                    )}
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shrink-0">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* API Key */}
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1.5">API Key</p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs font-mono text-slate-300 truncate">{p.apiKey}</code>
                    <button
                      onClick={() => copyKey(p.apiKey)}
                      className="text-slate-500 hover:text-violet-400 transition-colors shrink-0"
                    >
                      {copied === p.apiKey ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Alert threshold: <span className="text-slate-300">{p.alertThreshold} errors/hr</span></span>
                  <span>Created {new Date(p.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    onClick={() => router.push(`/dashboard/logs?projectId=${p._id}`)}
                    className="flex-1 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-600/30 gap-1.5"
                  >
                    View Logs <ArrowRight className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-500 hover:text-red-400 hover:bg-red-950/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
