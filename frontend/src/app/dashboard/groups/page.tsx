'use client';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Layers, TrendingUp, Clock, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StatusBadge from '@/components/logs/StatusBadge';
import MethodBadge from '@/components/logs/MethodBadge';
import api from '@/lib/api';
import type { Project, ErrorGroup } from '@/types';

export default function GroupsPage() {
  const [projects, setProjects]   = useState<Project[]>([]);
  const [projectId, setProjectId] = useState('');
  const [groups, setGroups]       = useState<ErrorGroup[]>([]);
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    api.get('/projects').then(({ data }) => {
      const ps: Project[] = data.data;
      setProjects(ps);
      if (ps.length > 0) setProjectId(ps[0]._id);
    });
  }, []);

  const loadGroups = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const { data } = await api.get('/logs/groups', { params: { projectId } });
      setGroups(data.data);
    } catch {
      toast.error('Failed to load error groups');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => { loadGroups(); }, [loadGroups]);

  const maxCount = groups[0]?.count || 1;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4 animate-fade-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-white">Error Groups</h1>
          <p className="text-slate-400 text-sm mt-1">Similar errors grouped by endpoint + message pattern</p>
        </div>
        <Select value={projectId} onValueChange={setProjectId}>
          <SelectTrigger className="w-48 bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {projects.map((p) => (
              <SelectItem key={p._id} value={p._id} className="text-slate-200 focus:bg-slate-700">
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-28 bg-slate-800 rounded-xl" />)}
        </div>
      ) : groups.length === 0 ? (
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="py-16 text-center">
            <Layers className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <p className="text-white font-medium">No error groups yet</p>
            <p className="text-slate-500 text-sm mt-1">Groups appear once the SDK sends error logs</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {groups.map((g, i) => (
            <Card key={g._id} className={`bg-slate-900 border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-900/10 transition-all duration-200 animate-fade-up stagger-${Math.min(i + 2, 6)}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Count pill */}
                  <div className="shrink-0 text-center bg-red-950/40 border border-red-800/40 rounded-lg px-3 py-2 min-w-[60px]">
                    <p className="text-2xl font-bold text-red-400 leading-none">{g.count}</p>
                    <p className="text-xs text-red-600 mt-1">hits</p>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Top row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusBadge code={g.statusCode} />
                      <MethodBadge method={g.method} />
                      <span className="font-mono text-sm text-slate-200">{g.endpoint}</span>
                    </div>

                    {/* Error message */}
                    {g.errorMessage && (
                      <p className="text-sm text-red-300/80">{g.errorMessage}</p>
                    )}

                    {/* Suggestion */}
                    {g.suggestion && (
                      <div className="flex items-start gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-amber-300/70 leading-relaxed">{g.suggestion}</p>
                      </div>
                    )}

                    {/* Frequency bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                          style={{ width: `${Math.round((g.count / maxCount) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        First: {new Date(g.firstOccurred).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last: {new Date(g.lastOccurred).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
