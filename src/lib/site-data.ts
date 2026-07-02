import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HeartPulse,
  Hotel,
  MapPinned,
  ShieldCheck,
  Ship,
  UsersRound,
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const company = {
  name: "Continental Mercantile Corporation Pvt Ltd",
  group: "The Continental Group",
  shortName: "Continental Mercantile Corporation",
  website: "www.continentalmanpower.com",
  years: "43+",
  chairman: "Sajeevan T S",
  chairmanFull: "Sajeevan Thumpayil",
  office: "Continental Towers, Near Ernakulam South, Kochi, Kerala",
  emails: {
    chairman: "chairman@continentalmanpower.com",
    work: "workabroad@continentalmanpower.com",
    jobs: "jobsabroad@continentalmanpower.com"
  },
  phones: {
    kochi: ["8907 090 050", "8907 090 060"],
    mumbai: ["9833 110 500", "9833 110 600"],
    whatsapp: "8907090010",
    main: "00 91-484-4144444"
  },
  socialChat:
    "https://wa.me/918907090010?text=Hello%20Continental%20Mercantile%20Corporation%2C%20I%20would%20like%20to%20know%20more."
};

export const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Operations", "/indian-operations"],
  ["Process", "/recruitment-process"],
  ["Apply", "/apply"],
  ["Employers", "/manpower-requirement"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"]
] as const;

export const services = [
  {
    title: "Work Abroad",
    text: "Ethical overseas placement support for skilled, technical and professional talent.",
    icon: BriefcaseBusiness
  },
  {
    title: "Study Abroad",
    text: "Education pathway guidance for international universities, technical studies and career mobility.",
    icon: GraduationCap
  },
  {
    title: "Migration",
    text: "Documentation-led guidance for compliant migration, visa and work permit processes.",
    icon: MapPinned
  },
  {
    title: "Skill Development",
    text: "Candidate screening, trade orientation and readiness support before deployment.",
    icon: BadgeCheck
  },
  {
    title: "Worldwide Staffing Solutions",
    text: "End-to-end manpower sourcing for employers across the Gulf, Europe, Asia and Africa.",
    icon: UsersRound
  },
  {
    title: "Global Recruitment",
    text: "Shortlisting, interview coordination, mobilization and employer reporting.",
    icon: Building2
  },
  {
    title: "Overseas Education",
    text: "Career-focused academic options connected to long-term global opportunities.",
    icon: GraduationCap
  },
  {
    title: "HR Solutions",
    text: "Talent acquisition support, project staffing, compliance documentation and workforce planning.",
    icon: ShieldCheck
  }
];

export const industries: Array<[string, LucideIcon]> = [
  ["Oil & Gas", Wrench],
  ["Engineering", Wrench],
  ["Construction", Building2],
  ["Healthcare", HeartPulse],
  ["Hospitality", Hotel],
  ["Hypermarkets / Retail", BriefcaseBusiness],
  ["Security", ShieldCheck],
  ["Ship Building", Ship],
  ["MEP Projects", Wrench],
  ["Doctors / Engineers / Professionals", UsersRound]
];

export const indianOffices = [
  "Kochi HQ",
  "Delhi",
  "Mumbai",
  "Kolkata",
  "Chennai",
  "Surat",
  "Trichy",
  "Kushinagar",
  "Vizag"
];

export const globalRegions = [
  "Dubai",
  "Saudi Arabia",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Qatar",
  "Singapore",
  "Canada",
  "Australia",
  "UK",
  "Ireland",
  "Poland",
  "Malta",
  "Nepal",
  "Bangladesh",
  "Sri Lanka",
  "Philippines",
  "Kenya",
  "Ghana",
  "Uganda"
];

export const recruitmentSteps = [
  "Employer manpower requirement and compliance review",
  "Job description, qualification and salary confirmation",
  "Candidate sourcing, screening and trade validation",
  "Interview coordination and final selection",
  "Offer, documentation, medical and visa processing",
  "Pre-departure briefing, mobilization and post-deployment support"
];

export const requiredDocuments = [
  "Updated resume / CV",
  "Passport copy with validity",
  "Recent passport-size photograph",
  "Educational and technical certificates",
  "Experience certificates",
  "Medical and police clearance where applicable",
  "Employer demand letter and visa/work permit documents for client requirements"
];

export const galleryItems = [
  {
    src: "/brand/corporate-office-kochi.png",
    title: "Corporate Office, Kochi",
    caption: "Continental Towers near Ernakulam South."
  },
  {
    src: "/brand/indian-operations-map.png",
    title: "Indian Operations",
    caption: "Regional presence across major recruitment corridors."
  },
  {
    src: "/gallery/dubai-hiring.png",
    title: "Dubai Recruitment",
    caption: "Hypermarket and food industry staffing campaigns."
  },
  {
    src: "/gallery/spain-work-permit.png",
    title: "Europe Work Permit",
    caption: "Work abroad opportunity communications."
  }
];

export const seoKeywords = [
  "Overseas manpower consultancy",
  "Work abroad consultancy",
  "International recruitment agency",
  "Gulf jobs manpower agency",
  "Europe work permit jobs",
  "Dubai jobs recruitment",
  "Saudi manpower recruitment",
  "Oil and gas manpower recruitment",
  "Healthcare recruitment agency",
  "Hospitality manpower supply",
  "Kerala overseas recruitment agency",
  "Kochi manpower consultancy"
];
