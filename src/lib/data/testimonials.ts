export interface Testimonial {
  name: string;
  initials: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Maria Garcia",
    initials: "MG",
    role: "Wellness Coach",
    location: "Miami, FL",
    quote:
      "I saved over $200 on my blood work compared to what my doctor's office quoted me. Results came back in two days.",
    rating: 5,
  },
  {
    name: "James Thompson",
    initials: "JT",
    role: "Software Engineer",
    location: "Austin, TX",
    quote:
      "So easy to use. I ordered my Lipid Panel and A1c test, walked into a Quest lab, and had my results by the end of the week.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    role: "Freelance Designer",
    location: "Tampa, FL",
    quote:
      "As someone without insurance, TestWell has been a game-changer. Affordable, fast, and completely private.",
    rating: 5,
  },
];
