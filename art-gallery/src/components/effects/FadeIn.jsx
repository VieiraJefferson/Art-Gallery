import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Fade in animation wrapper
 */
const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  ...props
}) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Fade in on scroll/viewport enter
 */
const FadeInView = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  once = true,
  ...props
}) => {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered children animation
 */
const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { FadeIn, FadeInView, StaggerContainer, StaggerItem };
