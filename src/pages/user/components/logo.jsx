import { Link } from 'react-router-dom';
import { Bus } from 'lucide-react';
import { cn } from "../lib/utils";

export function Logo({ className }) {
  return (
    <Link
      to="/"
      className={cn(
        'flex items-center gap-2 text-foreground hover:text-primary transition-colors',
        className
      )}
    >
      <Bus className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold font-headline">
        Rou<span className="text-primary">White</span>
      </span>
    </Link>
  );
}
