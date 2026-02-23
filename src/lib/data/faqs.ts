export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Do I need a doctor's order?",
    answer:
      "No. TestWell's network of licensed physicians reviews and authorizes every lab test order. You simply choose your tests, and our physicians handle the rest — no office visit, no referral, no waiting.",
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
      "After placing your order, you'll receive a lab requisition with a list of nearby Quest Diagnostics and Labcorp locations. With over 4,000 locations across Florida and Texas, there's almost certainly one within a few miles of you. Most accept walk-ins — no appointment needed.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. TestWell is fully HIPAA-compliant. Your health data is encrypted in transit and at rest, stored on secure servers, and never shared with third parties without your explicit consent. Only you and your reviewing physician can access your results.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "TestWell operates on a direct-pay model — no insurance needed. Our prices are already lower than most insurance copays for lab work. We accept all major credit cards, debit cards, and HSA/FSA cards.",
  },
  {
    question: "Can I use my HSA or FSA?",
    answer:
      "Yes. Lab tests are qualified medical expenses under both Health Savings Accounts (HSA) and Flexible Spending Accounts (FSA). Simply use your HSA/FSA card at checkout.",
  },
  {
    question: "What happens after I order?",
    answer:
      "After checkout, a licensed physician reviews and authorizes your order (typically within 2 hours). You'll receive an email with your lab requisition and a list of nearby Quest or Labcorp locations. Walk in, get your blood drawn (usually under 15 minutes), and your results will be delivered to your secure portal within 1–3 business days.",
  },
];
