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

const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);
  const content = useSiteContent().home.results;

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
      id="results"
      ref={sectionRef}
      className="perspective-section relative z-20 min-h-screen bg-inverse-1"
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
                (01)
              </TextReveal>
            </p>
          </div>

          <div>
            <div className="font-anton-sc text-6xl uppercase leading-none sm:text-8xl lg:text-[13rem] xl:text-[15rem]">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.05}
              >
                {content.title}
              </TextReveal>
            </div>
            <p className="mt-6 max-w-5xl text-3xl font-semibold leading-[120%] sm:text-5xl lg:text-[3.75rem]">
              {content.lines.map((line, i) => (
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
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-2">
          {content.projects.map((project, index) => (
            <ProjectCard key={project.name} {...project} index={index} />
          ))}
        </div>
      </main>
    </section>
  );
};

export default Projects;

const ProjectCard: FC<ProjectCardProps> = ({ image, name, year, index }) => {
  return (
    <article className="border-t border-line bg-background">
      <DiagonalReveal duration={1.6} delay={index * 0.08}>
        <Image
          src={image}
          alt={name}
          width={1400}
          height={980}
          className="aspect-[4/3] h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={95}
        />
      </DiagonalReveal>

      <div className="flex items-center justify-between gap-6 p-6 sm:p-8">
        <h4 className="text-2xl font-semibold leading-[140%] sm:text-[1.875rem]">
          <TextReveal splitType="chars" direction="up" duration={0.7}>
            {name}
          </TextReveal>
        </h4>
        <p className="font-gambetta text-xl leading-none text-muted sm:text-2xl">
          <TextReveal
            splitType="chars"
            direction="up"
            duration={0.7}
            stagger={0.08}
            delay={0.2}
          >
            {year}
          </TextReveal>
        </p>
      </div>
    </article>
  );
};
