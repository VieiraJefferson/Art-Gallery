import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Animated text component with underline effect
 */
const AnimatedText = React.forwardRef(
  (
    {
      text,
      className,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      as: Component = "h1",
      showUnderline = true,
      ...props
    },
    ref
  ) => {
    const pathVariants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: underlineDuration,
          ease: "easeInOut",
        },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-start justify-center gap-2", className)}
        {...props}
      >
        <div className="relative">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            <Component
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground",
                textClassName
              )}
            >
              {text}
            </Component>
          </motion.div>

          {showUnderline && (
            <motion.svg
              width="100%"
              height="20"
              viewBox="0 0 300 20"
              className={cn("absolute -bottom-2 left-0 text-accent", underlineClassName)}
              preserveAspectRatio="none"
            >
              <motion.path
                d={underlinePath}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  d: underlineHoverPath,
                  transition: { duration: 0.8 },
                }}
              />
            </motion.svg>
          )}
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

/**
 * Animated paragraph text with staggered word animation
 */
const AnimatedParagraph = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  return (
    <motion.p
      className={cn("text-lg md:text-xl text-muted-foreground leading-relaxed", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

/**
 * Animated letter-by-letter text
 */
const AnimatedLetters = ({ text, className, delay = 0 }) => {
  const letters = text.split("");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.02,
            delayChildren: delay,
          },
        },
      }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export { AnimatedText, AnimatedParagraph, AnimatedLetters };
