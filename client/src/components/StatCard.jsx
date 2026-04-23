import { motion } from 'framer-motion';
import { Card } from './ui/card';

function StatCard({ label, value, detail, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="h-full overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{label}</p>
            <h3 className="mt-3 text-3xl font-semibold sm:mt-4">{value}</h3>
          </div>
          <div className="h-14 w-14 rounded-full bg-cyan-400/10 blur-xl" />
        </div>
        <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{detail}</p>
      </Card>
    </motion.div>
  );
}

export default StatCard;
