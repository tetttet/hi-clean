"use client";

import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";
import { useSiteContent } from "@/i18n/use-site-content";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);
  const content = useSiteContent().home.footer;

  const getExternalLinkProps = (href: string) => {
    if (!href.startsWith("http")) return {};

    return {
      target: "_blank",
      rel: "noopener noreferrer",
    };
  };

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
      });
    }, sectionRef);

    return () => ctx.revert();
  }

  useEffect(() => {
    if (isLoading || !animationComplete) return undefined;
    return initializeGSAP();
  }, [isLoading, animationComplete]);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="perspective-section relative z-20 min-h-screen bg-inverse-2"
    >
      <div
        ref={contentRef}
        className="mx-auto flex min-h-screen w-[90%] max-w-[1440px] flex-col justify-between gap-16 py-12"
      >
        <div>
          <p className="mb-8 max-w-3xl text-2xl font-semibold leading-[140%] text-muted sm:text-3xl">
            <TextReveal splitType="lines" direction="up" duration={0.7}>
              {content.intro}
            </TextReveal>
          </p>
          <h2 className="font-anton-sc text-6xl uppercase leading-none text-foreground sm:text-8xl lg:text-[11.37rem]">
            <TextReveal
              splitType="chars"
              direction="up"
              duration={0.7}
              stagger={0.05}
            >
              HI-
            </TextReveal>
            <TextReveal
              splitType="chars"
              direction="up"
              duration={0.7}
              stagger={0.05}
              delay={0.15}
              className="text-[#d0a850]"
            >
              Clean
            </TextReveal>
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {content.links.map((links, index) => (
            <div key={links.category} className="flex flex-col space-y-6">
              <h4 className="font-gambetta text-2xl text-footer-links">
                <TextReveal
                  splitType="words"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={index * 0.05}
                >
                  {`(${links.category})`}
                </TextReveal>
              </h4>
              <div className="flex flex-col gap-4">
                {links.links.map((link, linkIndex) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    {...getExternalLinkProps(link.href)}
                    className="text-xl font-semibold leading-[130%] text-foreground transition-colors hover:text-accent"
                  >
                    <TextReveal
                      splitType="words"
                      direction="up"
                      duration={0.7}
                      stagger={0.08}
                      delay={linkIndex * 0.05}
                    >
                      {link.name}
                    </TextReveal>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
