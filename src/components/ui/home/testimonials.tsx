"use client";

import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScroll } from "framer-motion";
import { TextReveal } from "@/components/common/text-reveal";
import { FallingCard } from "./falling-card";
import { LoadingContext } from "@/components/layout";
import { useSiteContent } from "@/i18n/use-site-content";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const testimonialRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: testimonialRef,
    offset: ["start end", "end start"],
  });

  const { isLoading, animationComplete } = useContext(LoadingContext);
  const content = useSiteContent().home.testimonials;

  function initializeGSAP() {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.to(contentRef.current, {
          rotateX: "0deg",
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom bottom-=280",
          end: "bottom top-=280",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(sectionRef.current, {
          rotateX: "10deg",
          scale: 0.94,
          opacity: 0.9,
          transformOrigin: "center bottom",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom bottom-=280",
            end: "bottom bottom-=480",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }

  useEffect(() => {
    if (isLoading || !animationComplete) return undefined;
    return initializeGSAP();
  }, [isLoading, animationComplete]);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="perspective-section relative z-20 min-h-screen bg-background"
    >
      <main ref={contentRef} className="transform-container">
        <header className="mx-auto w-[90%] max-w-[1440px] space-y-12 py-16 lg:space-y-20 lg:py-[6rem]">
          <div className="flex items-center justify-between">
            <p className="font-gambetta text-xl text-muted sm:text-2xl">
              <TextReveal splitType="lines" direction="up" duration={0.7}>
                {content.eyebrow}
              </TextReveal>
            </p>
            <p className="font-gambetta text-xl text-muted sm:text-2xl">
              <TextReveal splitType="lines" direction="up" duration={0.7}>
                (03)
              </TextReveal>
            </p>
          </div>

          <div>
            <h2 className="font-anton-sc text-6xl uppercase leading-none sm:text-8xl lg:text-[10rem] xl:text-[11.25rem]">
              {content.title.map((line, i) => (
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.05}
                  delay={i * 0.16}
                  key={line}
                >
                  {line}
                </TextReveal>
              ))}
            </h2>
            <p className="mt-6 max-w-5xl text-3xl font-semibold leading-[120%] sm:text-5xl lg:text-[3.75rem]">
              {content.lines.map((line, i) => (
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={i === 0 ? 0.05 : i * 0.1}
                  key={line}
                >
                  {line}
                </TextReveal>
              ))}
            </p>
          </div>
        </header>

        <div
          className="grid grid-cols-1 gap-4 px-4 pb-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-0 lg:px-0"
          ref={testimonialRef}
        >
          {content.items.map((testimonial, i) => (
            <FallingCard
              key={`${testimonial.name}-${i}`}
              index={i}
              scrollYProgress={scrollYProgress}
              {...testimonial}
              background={i % 2 !== 0}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default Testimonials;
