import { PROJECTS_IMAGES, SERVICES_IMAGES } from "./images";

export const PROJECTS: IProjects[] = [
  {
    name: "Apartment Reset",
    year: "Apartments",
    image: PROJECTS_IMAGES[0],
  },
  {
    name: "Family Home Refresh",
    year: "Houses",
    image: PROJECTS_IMAGES[1],
  },
  {
    name: "Move-In Detail",
    year: "Move-in",
    image: PROJECTS_IMAGES[2],
  },
  {
    name: "After-Renovation Polish",
    year: "Deep clean",
    image: PROJECTS_IMAGES[3],
  },
];

export const SERVICES: IServices[] = [
  {
    title: ["Apartment", "Cleaning"],
    description:
      "Reliable regular cleaning for kitchens, bathrooms, bedrooms, and living spaces.",
    details: {
      title: "Included Care",
      services: [
        "Dusting and surfaces",
        "Kitchen reset",
        "Bathroom sanitation",
        "Floors and vacuuming",
      ],
    },
    image: SERVICES_IMAGES[0],
  },
  {
    title: ["House", "Cleaning"],
    description:
      "Room-by-room cleaning for homes that need consistent attention and detail.",
    details: {
      title: "Home Services",
      services: [
        "Bedrooms and living rooms",
        "Stairs and hallways",
        "Trash removal",
        "Fresh finishing touches",
      ],
    },
    image: SERVICES_IMAGES[1],
  },
  {
    title: ["Deep", "Cleaning"],
    description:
      "A focused clean for move-ins, seasonal refreshes, and spaces that need extra care.",
    details: {
      title: "Deep Details",
      services: [
        "Appliance exteriors",
        "Baseboards and edges",
        "Interior window care",
        "Post-renovation dust",
      ],
    },
    image: SERVICES_IMAGES[2],
  },
];
