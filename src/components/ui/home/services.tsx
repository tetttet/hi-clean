"use client";

import { FC, useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { TextReveal } from "@/components/common/text-reveal";
import { DiagonalReveal } from "@/components/common/image-reveal";
import { LoadingContext } from "@/components/layout";
import { useSiteContent } from "@/i18n/use-site-content";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);
  const content = useSiteContent().home.services;

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
      id="services"
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
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={0.2}
              >
                (02)
              </TextReveal>
            </p>
          </div>

          <div>
            <h2 className="font-anton-sc text-6xl uppercase leading-none sm:text-8xl lg:text-[13rem] xl:text-[15rem]">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.05}
                delay={0.2}
              >
                {content.title}
              </TextReveal>
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

        <div>
          {content.cards.map((service, i) => (
            <ServiceCard
              key={service.title.join("-")}
              {...service}
              position={i === 1 ? "left" : "right"}
              index={i}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default Services;

const ServiceCard: FC<
  IServices & {
    position: string;
    index: number;
  }
> = ({ description, details, image, position, title, index }) => {
  return (
    <article
      className={`flex min-h-[86vh] flex-col border-t border-line bg-inverse-2 lg:h-screen ${
        position === "left" ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="relative min-h-[22rem] w-full lg:h-full lg:w-[40%]">
        <DiagonalReveal className="h-full" duration={1.6} delay={index * 0.08}>
          <Image
            src={image}
            alt={title.join(" ")}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            quality={95}
          />
        </DiagonalReveal>
      </div>
      <div className="flex w-full flex-col justify-between gap-16 p-8 sm:p-12 lg:w-[60%] lg:p-[6rem]">
        <div className="space-y-5">
          <h2 className="flex flex-col font-anton-sc text-5xl uppercase leading-none sm:text-7xl lg:text-[6rem]">
            {title.map((part, i) => (
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.06}
                key={part}
                delay={i * 0.1}
              >
                {part}
              </TextReveal>
            ))}
          </h2>
          <p className="max-w-3xl text-2xl font-semibold leading-[140%] sm:text-[2rem]">
            <TextReveal
              splitType="lines"
              direction="up"
              duration={0.7}
              stagger={0.08}
              delay={0.25}
            >
              {description}
            </TextReveal>
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="font-gambetta text-2xl text-muted">
            <TextReveal
              key={`details-title-${details.title}`}
              splitType="lines"
              direction="up"
              duration={0.7}
              stagger={0.08}
              delay={0.35}
            >
              {`(${details.title})`}
            </TextReveal>
          </h4>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {details.services.map((service, i) => (
              <p key={service} className="text-xl font-semibold leading-[130%] sm:text-2xl">
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={i * 0.12}
                >
                  {service}
                </TextReveal>
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
