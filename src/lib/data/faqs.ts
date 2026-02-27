export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Do I need a doctor's order?",
    answer:
      "No. A licensed physician reviews every order automatically — it's included free. No office visit, no referral, no extra steps.",
  },
  {
    question: "How long do results take?",
    answer:
      "Most results are available within 1–3 business days after your lab visit. Some specialty tests may take up to 5 business days. You'll receive a notification as soon as your physician-reviewed results are ready in your secure portal.",
  },
  {
    question: "What states do you serve?",
    answer:
      "TestWell currently serves residents of Florida and Texas. We're actively expanding to additional states. Enter your email on our waitlist to be notified when we launch in your state.",
  },
  {
    question: "How do I find a lab near me?",
    answer:
      "After you order, you'll get a lab requisition with nearby Quest and Labcorp locations. With 4,000+ locations in Florida and Texas, there's almost always one nearby. Walk in anytime — no appointment needed.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. TestWell is fully HIPAA-compliant. Your health data is encrypted in transit and at rest, stored on secure servers, and never shared with third parties without your explicit consent. Only you and your reviewing physician can access your results.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We're cash-pay only — no insurance needed. Our prices are already lower than most insurance copays. We accept credit cards, debit cards, and HSA/FSA cards.",
  },
  {
    question: "Can I use my HSA or FSA?",
    answer:
      "Yes. Lab tests are qualified medical expenses under both Health Savings Accounts (HSA) and Flexible Spending Accounts (FSA). Simply use your HSA/FSA card at checkout.",
  },
  {
    question: "What happens after I order?",
    answer:
      "A physician reviews your order (usually within 2 hours). You'll get an email with your lab requisition and nearby lab locations. Walk in, get your blood drawn (under 15 minutes), and check your results online in 1–3 business days.",
  },
];
