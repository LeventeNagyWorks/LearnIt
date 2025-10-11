/* eslint-disable react/prop-types */
import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const Counter = ({ value, className }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  React.useEffect(() => {
    const animation = animate(count, value, {
      duration: 2,
      ease: [0.4, 0, 0.2, 1],
    });
    return animation.stop;
  }, [count, value]);

  return <motion.p className={className}>{rounded}</motion.p>;
};

export default Counter;
