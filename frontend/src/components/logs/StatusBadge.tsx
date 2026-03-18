import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function StatusBadge({ code }: { code: number }) {
  const style =
    code >= 500 ? 'bg-red-500/20 text-red-400 border-red-500/30' :
    code >= 400 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
    code >= 300 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';

  return (
    <Badge className={cn('font-mono text-xs', style)}>{code}</Badge>
  );
}
