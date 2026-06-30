"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { FC, ReactNode, createContext, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "../common/preloader";

export const LoadingContext = createContext({
  isLoading: true,
  animationComplete: false,
});

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const contentVariants = {
    hidden: {
      y: 36,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.87, 0, 0.13, 1] as const,
      },
    },
  };

  return (
    <LoadingContext.Provider value={{ isLoading, animationComplete }}>
      <main className="min-h-screen bg-background text-foreground">
        <ReactLenis root options={{ lerp: 0.08, wheelMultiplier: 0.9 }}>
          {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                key="content"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                onAnimationComplete={() => setAnimationComplete(true)}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </ReactLenis>
      </main>
    </LoadingContext.Provider>
  );
};

export default Layout;
