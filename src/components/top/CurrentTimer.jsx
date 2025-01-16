import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CurrentTimer() {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0, -3));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      const newDate = new Date().toLocaleDateString();

      setTime(newTime.slice(0, -3));
      setDate(newDate);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      {date} {time}
    </motion.div>
  );
}
