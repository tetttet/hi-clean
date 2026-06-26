import type { StaticImageData } from "next/image";

declare global {
  type ImageSource = StaticImageData | string;

  interface IProjects {
    name: string;
    image: ImageSource;
    year: string;
  }

  interface IServices {
    title: string[];
    description: string;
    details: {
      title: string;
      services: string[];
    };
    image: ImageSource;
  }

  interface ITestimonials {
    testimonial: string;
    extra_comment: string;
    avatar: ImageSource;
    name: string;
    company: string;
  }

  interface ProjectCardProps extends IProjects {
    index: number;
  }
}

export {};
