import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  accent?: 'violet' | 'red' | 'green' | 'amber';
}

const accents = {
  violet: 'bg-violet-600/20 text-violet-400',
  red:    'bg-red-600/20 text-red-400',
  green:  'bg-emerald-600/20 text-emerald-400',
  amber:  'bg-amber-600/20 text-amber-400',
};

export default function StatCard({ title, value, icon: Icon, description, accent = 'violet' }: StatCardProps) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
          </div>
          <div className={cn('p-3 rounded-lg', accents[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
