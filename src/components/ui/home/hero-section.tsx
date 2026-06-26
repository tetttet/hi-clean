"use client";

import { useContext, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { hero_banner } from "@/constants/images";
import { TextReveal } from "@/components/common/text-reveal";
import { DiagonalReveal } from "@/components/common/image-reveal";
import { LoadingContext } from "@/components/layout";
import Navigation from "@/components/common/navigation";

gsap.registerPlugin(ScrollTrigger);

const trustPoints = [
  "Apartment cleaning",
  "House cleaning",
  "Deep cleaning",
  "Move-in refresh",
  "Window care",
  "Guest-ready reset",
];

const HeroSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  useGSAP(
    () => {
      if (isLoading || !animationComplete) return undefined;

      const ctx = gsap.context(() => {
        ScrollTrigger.refresh();

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          gsap.to(imageRef.current, {
            objectPosition: "62% center",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "bottom bottom-=280",
            end: "bottom top-=280",
            pin: true,
            pinSpacing: false,
            id: "hero-pin",
          });

          gsap.to(containerRef.current, {
            rotateX: "10deg",
            scale: 0.94,
            opacity: 0.9,
            transformOrigin: "center bottom",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "bottom bottom-=280",
              end: "bottom bottom-=480",
              scrub: true,
            },
          });
        });
      }, containerRef);

      return () => ctx.revert();
    },
    {
      dependencies: [isLoading, animationComplete],
      scope: containerRef,
    }
  );

  return (
    <section
      id="top"
      ref={containerRef}
      className="mx-auto flex min-h-screen max-w-[1440px] flex-col bg-background lg:flex-row"
    >
      <div className="relative h-[68vh] min-h-[32rem] w-full lg:sticky lg:top-0 lg:h-screen lg:w-1/2">
        <DiagonalReveal className="h-full" delay={0.4} duration={1.6}>
          <div className="relative h-full">
            <Image
              ref={imageRef}
              src={hero_banner}
              alt="HI-Clean team in a bright home"
              className="h-full w-full object-cover"
              priority
              quality={95}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectPosition: "42% center" }}
            />
          </div>
        </DiagonalReveal>
      </div>

      <div className="flex-1 lg:w-1/2">
        <div className="transform-container">
          <Navigation isHomePage />

          <div className="px-6 pb-12 pt-12 sm:px-10 lg:px-[4.5rem] lg:pt-[4.37rem]">
            <p className="mb-6 font-gambetta text-xl text-muted">
              <TextReveal splitType="lines" direction="up" duration={0.7}>
                (Apartments and houses)
              </TextReveal>
            </p>

            <h1 className="flex flex-col font-anton-sc text-6xl uppercase leading-none sm:text-7xl lg:text-[8rem] xl:text-[9.5rem]">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.06}
                delay={0.2}
              >
                HI-
              </TextReveal>
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                delay={0.35}
                stagger={0.06}
                className="text-[#d0a850]"
              >
                Clean
              </TextReveal>
            </h1>

            <p className="mt-14 max-w-2xl text-3xl font-semibold leading-[130%] sm:text-4xl lg:mt-24">
              {[
                "Bright, reliable cleaning for",
                "apartments and houses that",
                "need to feel fresh again.",
              ].map((line, index) => (
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  delay={0.55 + index * 0.08}
                  stagger={0.08}
                  key={line}
                >
                  {line}
                </TextReveal>
              ))}
            </p>
          </div>

          <div className="space-y-20 px-6 pb-16 pt-10 sm:px-10 lg:px-[6rem] lg:pb-[6rem] lg:pt-[4.5rem]">
            <div>
              <span className="mb-6 block font-gambetta text-2xl leading-none text-muted">
                <TextReveal splitType="lines" direction="up" duration={0.7}>
                  (About Us)
                </TextReveal>
              </span>
              <h2 className="mb-6 flex flex-col font-anton-sc text-5xl uppercase leading-[110%] sm:text-6xl lg:text-[4.25rem]">
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.05}
                >
                  Clean Homes,
                </TextReveal>
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.05}
                  delay={0.15}
                >
                  Calm Days
                </TextReveal>
              </h2>

              <p className="flex max-w-2xl flex-col gap-7 text-lg font-normal leading-[170%] text-muted sm:text-xl">
                <span>
                  {[
                    "HI-Clean is built for people who want their home",
                    "to feel cared for without managing every small detail.",
                    "Our team handles regular cleaning, deep refreshes,",
                    "and move-in work with a simple, careful process.",
                  ].map((line, i) => (
                    <TextReveal
                      splitType="lines"
                      direction="up"
                      duration={0.7}
                      stagger={0.08}
                      delay={i * 0.05}
                      key={line}
                    >
                      {line}
                    </TextReveal>
                  ))}
                </span>
                <span>
                  {[
                    "We focus on the rooms that shape daily life:",
                    "kitchens, bathrooms, floors, windows, and all the",
                    "quiet corners that make a space feel truly finished.",
                  ].map((line, i) => (
                    <TextReveal
                      splitType="lines"
                      direction="up"
                      duration={0.7}
                      stagger={0.08}
                      delay={i * 0.05}
                      key={line}
                    >
                      {line}
                    </TextReveal>
                  ))}
                </span>
              </p>
            </div>

            <div>
              <span className="mb-6 block font-gambetta text-2xl leading-none text-muted">
                <TextReveal splitType="lines" direction="up" duration={0.7}>
                  (What we take care of)
                </TextReveal>
              </span>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {trustPoints.map((point, index) => (
                  <div
                    key={point}
                    className="border border-line bg-inverse-2 px-4 py-5 text-base font-semibold leading-[130%] shadow-[0_16px_50px_rgba(21,26,23,0.05)]"
                  >
                    <TextReveal
                      splitType="words"
                      direction="up"
                      duration={0.7}
                      stagger={0.04}
                      delay={index * 0.04}
                    >
                      {point}
                    </TextReveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
