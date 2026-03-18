import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const colors: Record<string, string> = {
  GET:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  POST:   'bg-blue-500/15 text-blue-400 border-blue-500/30',
  PUT:    'bg-violet-500/15 text-violet-400 border-violet-500/30',
  PATCH:  'bg-amber-500/15 text-amber-400 border-amber-500/30',
  DELETE: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export default function MethodBadge({ method }: { method: string }) {
  return (
    <Badge className={cn('font-mono text-xs', colors[method] || 'bg-slate-500/15 text-slate-400 border-slate-500/30')}>
      {method}
    </Badge>
  );
}
