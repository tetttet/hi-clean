import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { PRELOADER_IMAGES } from "@/constants/images";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const digit1Ref = useRef<HTMLDivElement | null>(null);
  const digit2Ref = useRef<HTMLDivElement | null>(null);
  const digit3Ref = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const digit1 = digit1Ref.current;
    const digit2 = digit2Ref.current;
    const digit3 = digit3Ref.current;
    const container = containerRef.current;
    const imageRefs = [...imagesRef.current];
    const digitRefs = [digit1, digit2, digit3].filter(
      (element): element is HTMLDivElement => Boolean(element)
    );
    let isMounted = true;
    let delayedExit: gsap.core.Tween | undefined;
    let exitTimeline: gsap.core.Timeline | undefined;

    if (digit3) {
      digit3.innerHTML = "";
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
          const div = document.createElement("div");
          div.className =
            "num flex h-28 items-center justify-center text-6xl md:h-36";
          div.textContent = j.toString();
          digit3.appendChild(div);
        }
      }

      const finalDigit = document.createElement("div");
      finalDigit.className =
        "num flex h-28 items-center justify-center text-6xl md:h-36";
      finalDigit.textContent = "0";
      digit3.appendChild(finalDigit);
    }

    const animateDigit = (
      digit: HTMLElement | null,
      duration: number,
      delay = 0
    ) => {
      if (!digit) return undefined;
      const nums = digit.querySelectorAll(".num");
      if (nums.length === 0) return undefined;

      const numHeight = nums[0].clientHeight;
      const totalDistance = (nums.length - 1) * numHeight;

      return gsap.to(digit, {
        y: -totalDistance,
        duration,
        delay,
        ease: "power2.inOut",
      });
    };

    const totalDuration = 1.8;

    const animateImages = () => {
      imageRefs.forEach((image, index) => {
        if (!image) return;

        const imageDelay = (index / PRELOADER_IMAGES.length) * totalDuration;

        gsap.fromTo(
          image,
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: totalDuration / PRELOADER_IMAGES.length,
            delay: imageDelay,
            ease: "power3.inOut",
          }
        );
      });

      animateDigit(digit1, 0.55, 1.35);
      animateDigit(digit2, totalDuration);
      animateDigit(digit3, totalDuration - 0.15);

      delayedExit = gsap.delayedCall(totalDuration + 0.12, () => {
        exitTimeline = gsap.timeline();

        exitTimeline.to(
          imageRefs.filter(Boolean),
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 0.38,
            stagger: 0.02,
            ease: "power3.inOut",
          },
          0
        );

        exitTimeline.to(
          digitRefs,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 0.38,
            ease: "power2.inOut",
          },
          0
        );

        if (container) {
          exitTimeline.to(container, {
            opacity: 0,
            scale: 0.96,
            duration: 0.28,
            ease: "power3.inOut",
            onComplete: () => {
              if (isMounted) {
                window.setTimeout(onComplete, 80);
              }
            },
          });
        } else if (isMounted) {
          window.setTimeout(onComplete, 80);
        }
      });
    };

    const imageElements = imageRefs.filter(Boolean);
    const loadPromises = imageElements.map((img) => {
      return new Promise((resolve) => {
        if (img?.complete) {
          resolve(true);
          return;
        }

        if (img) {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true);
        }
      });
    });

    Promise.all(loadPromises).then(animateImages);

    return () => {
      isMounted = false;
      delayedExit?.kill();
      exitTimeline?.kill();
      gsap.killTweensOf([
        container,
        ...digitRefs,
        ...imageRefs,
      ]);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="preloader-container fixed inset-0 z-[999999] flex h-screen w-full items-center justify-center overflow-hidden bg-background text-foreground"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="relative h-[min(68vh,34rem)] w-[min(82vw,38rem)] overflow-hidden border border-line bg-inverse-2 shadow-[0_24px_80px_rgba(21,26,23,0.12)]">
          {PRELOADER_IMAGES.map((image, index) => (
            <Image
              key={image}
              ref={(el) => {
                imagesRef.current[index] = el;
              }}
              src={image}
              alt={`HI-Clean loader photo ${index + 1}`}
              priority
              quality={95}
              fill
              sizes="(max-width: 768px) 82vw, 38rem"
              className="absolute object-cover"
              style={{
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                zIndex: index + 1,
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center justify-center font-anton-sc uppercase md:bottom-10 md:right-10">
          <div className="flex items-center justify-center text-accent">
            <div className="relative h-28 w-10 overflow-hidden md:h-36">
              <div ref={digit1Ref} className="digit-1 absolute w-full">
                {[0, 1].map((digit) => (
                  <div
                    key={digit}
                    className="num flex h-28 items-center justify-center text-6xl md:h-36"
                  >
                    {digit}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-28 w-10 overflow-hidden md:h-36">
              <div ref={digit2Ref} className="digit-2 absolute w-full">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit, index) => (
                  <div
                    key={index}
                    className="num flex h-28 items-center justify-center text-6xl md:h-36"
                  >
                    {digit}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-28 w-10 overflow-hidden md:h-36">
              <div ref={digit3Ref} className="digit-3 absolute w-full" />
            </div>
            <div className="text-6xl">%</div>
          </div>
        </div>

        <div className="absolute left-6 top-6 font-anton-sc text-3xl uppercase leading-none text-foreground md:left-10 md:top-10 md:text-5xl">
          HI-<span className="text-[#d0a850]">Clean</span>
        </div>
      </div>
    </div>
  );
};
