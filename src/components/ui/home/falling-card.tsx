"use client";

import { FC, useRef, useState } from "react";
import {
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import Image from "next/image";

interface FallingCardProps extends ITestimonials {
  index: number;
  background: boolean;
  scrollYProgress: MotionValue<number>;
}

export const FallingCard: FC<FallingCardProps> = ({
  avatar,
  background,
  company,
  extra_comment,
  name,
  testimonial,
  index,
  scrollYProgress,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const start = index * 0.08;
  const end = start + 0.22;

  const y = useTransform(scrollYProgress, [start, end], [80, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const yPosition = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePosition({ x, y: yPosition });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const glareX = useMotionTemplate`${mousePosition.x * 100 + 50}%`;
  const glareY = useMotionTemplate`${mousePosition.y * 100 + 50}%`;
  const glareOpacity = useMotionTemplate`${
    Math.abs(mousePosition.x) + Math.abs(mousePosition.y) + 0.04
  }`;

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative perspective-1000"
    >
      <motion.article
        style={{
          rotateX: useMotionTemplate`${-mousePosition.y * 8}deg`,
          rotateY: useMotionTemplate`${mousePosition.x * 8}deg`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`relative flex min-h-[32rem] flex-col overflow-hidden border border-line p-8 will-change-transform sm:p-[3.75rem] ${
          background ? "bg-inverse-1" : "bg-inverse-2"
        }`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(233, 95, 53, 0.16) 0%, rgba(233, 95, 53, 0) 70%)`,
            opacity: glareOpacity,
          }}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="30"
          viewBox="0 0 48 30"
          fill="none"
          className="relative z-10 mb-16"
        >
          <path
            d="M0 30V13.764L5.73034 0H17.5843L13.8764 13.2584H21.0112V30H0ZM26.3483 30V13.764L32.0787 0H43.9326L40.2247 13.2584H47.3596V30H26.3483Z"
            fill="var(--accent)"
          />
        </svg>

        <div className="relative z-10 mb-9 space-y-4">
          <h3 className="text-2xl font-semibold leading-[140%] sm:text-3xl">
            {testimonial}
          </h3>
          <p className="text-base leading-[180%] text-muted">
            {extra_comment}
          </p>
        </div>

        <div className="relative z-10 mt-auto flex items-center gap-4">
          <Image
            src={avatar}
            alt={name}
            width={56}
            height={56}
            className="h-14 w-14 object-cover"
            quality={90}
          />
          <div>
            <h4 className="text-xl font-semibold leading-[130%]">{name}</h4>
            <p className="font-gambetta text-muted">({company})</p>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};
