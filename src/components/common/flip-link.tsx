"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLink = ({
  children,
  href,
  onClick,
  className = "text-foreground",
}: {
  children: ReactNode;
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) => {
  if (typeof children !== "string") {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      <motion.span
        initial="initial"
        whileHover="hovered"
        className="relative block overflow-hidden whitespace-nowrap"
        style={{
          lineHeight: 0.9,
        }}
      >
        <span>
          {children.split("").map((letter, i) => (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={`${letter}-${i}`}
            >
              {letter}
            </motion.span>
          ))}
        </span>
        <span className="absolute inset-0 text-accent">
          {children.split("").map((letter, i) => (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={`${letter}-hover-${i}`}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      </motion.span>
    </Link>
  );
};
