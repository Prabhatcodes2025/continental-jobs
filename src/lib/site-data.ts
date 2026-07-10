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
  descriptor: "Human Resource Solutions",
  shortName: "Continental Mercantile Corporation",
  website: "www.continentalmanpower.com",
  years: "43+",
  chairman: "Sajeevan Thumpayil",
  chairmanFull: "Sajeevan Thumpayil",
  office: "Continental Towers, Near Ernakulam South, Kochi, Kerala",
  emails: {
    chairman: "chairman@continentalmanpower.com",
    work: "recruitments@continentalmanpower.com",
    jobs: "gulfrecruitments@continentalmanpower.com"
  },
  phones: {
    kochi: ["0091 89070 90050", "0091 89070 90060"],
    mumbai: ["0091 89070 90010", "0091 89070 90020"],
    whatsapp: "890709001",
    main: "00 91-484-4144444"
  },
  socialChat:
    "https://wa.me/91890709001?text=Hello%20Continental%20Mercantile%20Corporation%2C%20I%20would%20like%20to%20know%20more."
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
    title: "Human Resource Solutions Worldwide",
    text: "End-to-end global recruitment support for large and small workforce demands across multiple destination markets.",
    icon: UsersRound
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
    text: "End-to-end human resources sourcing for employers across approved international destination markets.",
    icon: UsersRound
  },
  {
    title: "Global Recruiters",
    text: "Shortlisting, interview coordination, mobilization and employer reporting.",
    icon: Building2
  },
  {
    title: "Overseas Education Consultants",
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
  ["Refineries / Gas Plants / Petrochemicals", Wrench],
  ["Shutdown Maintenance", Wrench],
  ["Power Plants", Wrench],
  ["Storage Tanks / Roads / Ports / Cities", Building2],
  ["Engineering", Wrench],
  ["Large Infrastructure Projects", Building2],
  ["Healthcare Recruitment", HeartPulse],
  ["Hotel / Catering / Housekeeping", Hotel],
  ["Hypermarkets / Supermarkets / Retail", BriefcaseBusiness],
  ["Security Guards Professionals", ShieldCheck],
  ["Ship Building and Ship Repair", Ship],
  ["MEP Projects", Wrench],
  ["Doctors / Engineers / Professionals", UsersRound]
];

export const whyContinental = [
  "Technical and non-technical workforce sourcing for global projects",
  "Extensive experience in sourcing, interviewing and selection",
  "43+ years of long-standing recruitment reputation",
  "Large worldwide office network for sourcing, interviews and mobilization",
  "Speedy mobilization after receipt of visa and travel documents",
  "Experienced business development, client relations and recruitment managers",
  "Daily updated database of CVs across junior, senior and management roles",
  "Worker welfare follow-up after mobilization"
];

export const employerStartInfo = [
  "Project details and project location",
  "Required job categories and number of workers in each category",
  "Countries from where workers are required",
  "Detailed job description for each category",
  "Minimum qualification and experience for each category",
  "Salary, benefits, food, accommodation and facilities offered",
  "Contract duration and visa or entry permit processing duration",
  "Expected mobilization timeline",
  "Confirmation of labour law compliance in the country of employment",
  "Any other specifications or terms offered to workers"
];

export const specializedRecruitment = [
  {
    title: "Healthcare Recruitment",
    text: "Doctors, nurses and paramedical staff for ministry, military, university and private hospitals across Middle East and international markets."
  },
  {
    title: "Shutdown Maintenance",
    text: "Engineers and technicians for refinery, petrochemical and power plant shutdowns, including welding, fabrication, rigging, scaffolding and insulation."
  },
  {
    title: "Large Infrastructure Projects",
    text: "Workforce support for seaports, airports, bridges, townships, stadiums, roads, ports and city-scale projects."
  },
  {
    title: "MEP Projects",
    text: "HVAC technicians, A/C mechanics, electricians, plumbers, duct fabrication, sheet metal, fitters and building maintenance system technicians."
  },
  {
    title: "Security Guards Professionals",
    text: "Trained security personnel for banks, malls, facilities and large security companies, with communication and patrolling readiness."
  },
  {
    title: "Hypermarkets / Supermarkets / Retail",
    text: "Logistics staff, managers, cashiers, sales staff, stock managers and store/material management teams for retail chains."
  },
  {
    title: "Hotel, Catering and Housekeeping",
    text: "Chefs, cooks, service crew, bakery, confectionery, butchery, cleaning and hospitality staff supported by training facilities."
  },
  {
    title: "Oil & Gas Construction",
    text: "Project directors, engineers, supervisors, foremen, welders, fabricators and skilled labour for refineries, gas plants, petrochemical plants and storage tanks."
  },
  {
    title: "Ship Building and Ship Repair",
    text: "Professionals for ship manufacture, repair and maintenance for military and commercial clients."
  }
];

export const academies = [
  {
    title: "Academy for Hotel Management",
    text: "Cookery, bakery, confectionery, pastry, F&B services and hospitality career training with placement support."
  },
  {
    title: "Academy for Oil & Gas",
    text: "International-standard technical training for welding, fabrication, insulation, scaffolding, rigging, sheet metal, blasting, painting, HVAC and logistics."
  },
  {
    title: "Academy for Technical Studies",
    text: "Skill development for technical workforce needs in oil, gas, power plants, maintenance and global project environments."
  },
  {
    title: "Academy for Professional Studies",
    text: "Professional development including health and safety, English language, NEBOSH, IOSH, IELTS, SAP and language training."
  }
];

export const indianOffices = [
  "Cochin",
  "Madurai",
  "Bombay",
  "Gujarat",
  "Jaipur",
  "Delhi",
  "Kolkata",
  "Siliguri",
  "Vizag"
];

export const globalRegions = [
  "India",
  "Singapore",
  "Philippines",
  "Malaysia",
  "Dubai / UAE",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Saudi Arabia",
  "Qatar",
  "London / UK",
  "Malta",
  "Spain",
  "Nepal",
  "Bangladesh",
  "Sri Lanka",
  "Africa"
];

export const recruitmentSteps = [
  "Employer requirement and compliance review",
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
    title: "Corporate Office, India",
    caption: "Continental Towers, India."
  },
  {
    src: "/brand/indian-operations-map-corrected.svg",
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
  "Overseas recruitment consultancy",
  "Work abroad consultancy",
  "International recruitment agency",
  "Gulf jobs recruitment agency",
  "Europe work permit jobs",
  "Dubai jobs recruitment",
  "Saudi recruitment",
  "Oil and gas recruitment",
  "Healthcare recruitment agency",
  "Hospitality recruitment",
  "India overseas recruitment agency",
  "India human resource solutions"
];
