import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Tests: [
    { href: "/tests", label: "Browse All Tests" },
    { href: "/tests?category=Heart+Health", label: "Heart Health" },
    { href: "/tests?category=Metabolic+Health", label: "Metabolic Health" },
    { href: "/tests?category=Diabetes", label: "Diabetes" },
    { href: "/pricing", label: "Test Bundles" },
  ],
  Company: [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "#", label: "About Us" },
    { href: "#", label: "Contact" },
  ],
  Support: [
    { href: "/#faq", label: "FAQ" },
    { href: "#", label: "Find a Lab" },
    { href: "/portal", label: "Patient Portal" },
    { href: "#", label: "Privacy Policy" },
  ],
  Legal: [
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "HIPAA Notice" },
    { href: "#", label: "State Licenses" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">
                Test<span className="text-teal">Well</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Affordable, physician-reviewed lab tests at Quest and Labcorp locations
              across Florida and Texas.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-slate-800" />

        {/* Disclaimers */}
        <div className="space-y-4 mb-8">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-400">Physician Oversight:</strong> All
            laboratory test orders are reviewed and authorized by licensed
            physicians in the states where TestWell operates. TestWell does not
            provide medical advice, diagnosis, or treatment. If your results
            indicate a medical concern, consult your healthcare provider.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            TestWell is currently available to residents of Florida and Texas
            only. Lab services are performed by CLIA-certified laboratories
            including Quest Diagnostics and Labcorp.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} TestWell. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              HIPAA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
