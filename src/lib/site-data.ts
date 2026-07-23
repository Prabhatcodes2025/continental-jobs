import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardList,
  Factory,
  FileCheck2,
  FileSignature,
  FileText,
  Filter,
  GraduationCap,
  Hammer,
  HardHat,
  HeartPulse,
  Handshake,
  Hotel,
  Megaphone,
  MapPinned,
  Plane,
  ReceiptText,
  Search,
  ShoppingCart,
  ShieldCheck,
  Ship,
  Stethoscope,
  UtensilsCrossed,
  Video,
  Wind,
  Workflow,
  UsersRound,
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const contactDetails = {
  email: "recruitments@continentalmanpower.com",
  corporateOffice: {
    label: "CORPORATE OFFICE",
    location: "Cochin",
    address: "Continental Towers, Near Ernakulam South, Cochin, Kerala - 11, India",
    phones: [
      { display: "0091 890 70 900 50", raw: "8907090050", tel: "+918907090050" },
      { display: "0091 890 70 900 60", raw: "8907090060", tel: "+918907090060" }
    ],
    whatsapp: { display: "8907090001", raw: "8907090001", tel: "+918907090001" },
    email: "recruitments@continentalmanpower.com",
    website: "continentalmanpower.com"
  },
  operationsOffice: {
    label: "OPERATIONS OFFICE",
    location: "Bombay",
    address: "\"Devdutt\", Near Taj Hotel, Bandra(W), Mumbai-50",
    phones: [
      { display: "0091 890 70 900 10", raw: "8907090010", tel: "+918907090010" },
      { display: "0091 890 70 900 20", raw: "8907090020", tel: "+918907090020" }
    ],
    email: "gulfrecruitments@continentalmanpower.com",
    managerPhones: [
      { display: "+91 98950 50050", raw: "9895050050", tel: "+919895050050" },
      { display: "+91 89070 90002", raw: "8907090002", tel: "+918907090002" }
    ]
  },
  whatsappUrl:
    "https://wa.me/918907090001?text=Hello%20Continental%20Mercantile%20Corporation%2C%20I%20would%20like%20to%20know%20more."
};

export const company = {
  name: "Continental Mercantile Corporation Pvt Ltd",
  descriptor: "Human Resource Solutions",
  shortName: "Continental Mercantile Corporation",
  website: "continentalmanpower.com",
  years: "43+",
  chairman: "Sajeevan Thumpayil",
  chairmanFull: "Sajeevan Thumpayil",
  office: contactDetails.corporateOffice.address,
  emails: {
    work: contactDetails.email
  },
  phones: {
    kochi: contactDetails.corporateOffice.phones.map((phone) => phone.display),
    mumbai: contactDetails.operationsOffice.phones.map((phone) => phone.display),
    whatsapp: contactDetails.corporateOffice.phones[0].display,
    main: contactDetails.corporateOffice.phones[0].display
  },
  socialChat: contactDetails.whatsappUrl
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
    title: "WORK ABROAD",
    text: "Ethical overseas placement support for skilled, technical and professional talent.",
    icon: BriefcaseBusiness
  },
  {
    title: "HUMAN RESOURCE SOLUTIONS",
    text: "End-to-end global recruitment support for large and small workforce demands across multiple destination markets.",
    icon: UsersRound
  },
  {
    title: "STUDY ABROAD",
    text: "Education pathway guidance for international universities, technical studies and career mobility.",
    icon: GraduationCap
  },
  {
    title: "MIGRATION",
    text: "Documentation-led guidance for compliant migration, visa and work permit processes.",
    icon: MapPinned
  },
  {
    title: "SKILL DEVELOPMENT",
    text: "Candidate screening, trade orientation and readiness support before deployment.",
    icon: BadgeCheck
  },
  {
    title: "GLOBAL RECRUITMENT",
    text: "Shortlisting, interview coordination, mobilization and employer reporting.",
    icon: Building2
  }
];

export const industries: Array<[string, LucideIcon]> = [
  ["Oil & Gas", Wrench],
  ["Refineries / Gas Plants / Petrochemicals", Factory],
  ["Shutdown Maintenance", Hammer],
  ["Power Plants", Wrench],
  ["Storage Tanks / Roads / Ports / Cities", HardHat],
  ["Engineering", Wrench],
  ["Large Infrastructure Projects", Building2],
  ["Healthcare Recruitment", HeartPulse],
  ["Hotel / Catering / Housekeeping", UtensilsCrossed],
  ["Hypermarkets / Supermarkets / Retail", ShoppingCart],
  ["Security Guards Professionals", ShieldCheck],
  ["Ship Building and Ship Repair", Ship],
  ["MEP Projects", Wind],
  ["Technical Studies", Wrench],
  ["Professional Studies", GraduationCap],
  ["Doctors / Engineers / Professionals", UsersRound]
];

export const sectorCards = [
  {
    title: "Healthcare",
    src: "/sectors/healthcare.svg",
    caption: "Doctors, nurses and paramedical staffing for international hospitals."
  },
  {
    title: "Oil & Gas",
    src: "/sectors/oil-gas.svg",
    caption: "Project workforce for oil, gas and petrochemical environments."
  },
  {
    title: "Refinery and Shutdown Maintenance",
    src: "/sectors/refinery-shutdown.svg",
    caption: "Shutdown, maintenance and plant support teams."
  },
  {
    title: "Engineering",
    src: "/sectors/engineering.svg",
    caption: "Engineering and technical professionals for global projects."
  },
  {
    title: "Construction",
    src: "/sectors/construction.svg",
    caption: "Skilled construction workforce for overseas employers."
  },
  {
    title: "Infrastructure",
    src: "/sectors/infrastructure.svg",
    caption: "Roads, ports, cities and large infrastructure project staffing."
  },
  {
    title: "MEP",
    src: "/sectors/mep.svg",
    caption: "Mechanical, electrical and plumbing project teams."
  },
  {
    title: "Security Professionals",
    src: "/sectors/security.svg",
    caption: "Security guards and facility protection professionals."
  },
  {
    title: "Hypermarkets / Retail",
    src: "/sectors/retail.svg",
    caption: "Retail, hypermarket and supermarket staffing support."
  },
  {
    title: "Hotel, Catering and Housekeeping",
    src: "/sectors/hospitality.svg",
    caption: "Hospitality, catering, housekeeping and food service staff."
  },
  {
    title: "Shipbuilding and Ship Repair",
    src: "/sectors/shipbuilding.svg",
    caption: "Technical workforce for shipbuilding, repair and maintenance."
  },
  {
    title: "Technical and Professional Studies",
    src: "/sectors/technical-studies.svg",
    caption: "Training pathways for technical and professional readiness."
  }
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
  "Croatia",
  "Nepal",
  "Bangladesh",
  "Sri Lanka",
  "Kenya",
  "Ghana",
  "Uganda",
  "Nigeria",
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

export const recruitmentProcessStages: Array<{
  step: number;
  phase: string;
  title: string;
  icon: LucideIcon;
  order: number;
}> = [
  { step: 1, phase: "PHASE 1 - REQUIREMENT & AGREEMENT", title: "Receipt of Manpower Requirement Order", icon: ClipboardList, order: 1 },
  { step: 2, phase: "PHASE 1 - REQUIREMENT & AGREEMENT", title: "Verification of Salary & Other Employment Terms Offered to the Workers", icon: FileCheck2, order: 2 },
  { step: 3, phase: "PHASE 1 - REQUIREMENT & AGREEMENT", title: "Verification & Finalisation of Recruitment Fees & Terms", icon: Handshake, order: 3 },
  { step: 4, phase: "PHASE 1 - REQUIREMENT & AGREEMENT", title: "Finalisation & Signing of the Recruitment Process Agreement", icon: FileSignature, order: 4 },
  { step: 5, phase: "PHASE 1 - REQUIREMENT & AGREEMENT", title: "Create Emigrate Documents by the Client", icon: FileText, order: 5 },
  { step: 6, phase: "PHASE 1 - REQUIREMENT & AGREEMENT", title: "Receipt of Power of Attorney & Demand Letter etc. Documents Required for Conducting Interview", icon: BadgeCheck, order: 6 },
  { step: 7, phase: "PHASE 2 - PLANNING & SOURCING", title: "Finalisation of Recruitment Procedures & Methods", icon: Workflow, order: 7 },
  { step: 8, phase: "PHASE 2 - PLANNING & SOURCING", title: "Finalisation of the Itinerary of Interview", icon: CalendarDays, order: 8 },
  { step: 9, phase: "PHASE 2 - PLANNING & SOURCING", title: "Search in the Data Bank Availability of Sufficient CVs", icon: Search, order: 9 },
  { step: 10, phase: "PHASE 2 - PLANNING & SOURCING", title: "If not found sufficient candidates in the data bank/job portals, advertise through newspapers, digital media and headhunt until sufficient CVs are procured", icon: Megaphone, order: 10 },
  { step: 11, phase: "PHASE 2 - PLANNING & SOURCING", title: "Screening of Candidates and Lining up of Sufficient Candidates as per the Client's Specification", icon: Filter, order: 11 },
  { step: 12, phase: "PHASE 3 - INTERVIEW & SELECTION", title: "Prepare for Final Interview", icon: UsersRound, order: 12 },
  { step: 13, phase: "PHASE 3 - INTERVIEW & SELECTION", title: "Client Conducts Interview or Authorises Continental to Conduct Table/Skype Interview", icon: Video, order: 13 },
  { step: 14, phase: "PHASE 3 - INTERVIEW & SELECTION", title: "If Required Conducts Practical Trade Testing", icon: Wrench, order: 14 },
  { step: 15, phase: "PHASE 3 - INTERVIEW & SELECTION", title: "Signs Employment Contract", icon: FileSignature, order: 15 },
  { step: 16, phase: "PHASE 3 - INTERVIEW & SELECTION", title: "Candidate Undergoes Medical Examination", icon: Stethoscope, order: 16 },
  { step: 17, phase: "PHASE 4 - VISA & MOBILISATION", title: "Prepares All Documents Required for Visa Processing", icon: FileText, order: 17 },
  { step: 18, phase: "PHASE 4 - VISA & MOBILISATION", title: "Receive Visas & Completion of Visa Formalities", icon: BadgeCheck, order: 18 },
  { step: 19, phase: "PHASE 4 - VISA & MOBILISATION", title: "Completing Insurance Formalities", icon: ShieldCheck, order: 19 },
  { step: 20, phase: "PHASE 4 - VISA & MOBILISATION", title: "Completing Immigration Formalities", icon: MapPinned, order: 20 },
  { step: 21, phase: "PHASE 4 - VISA & MOBILISATION", title: "Completing Air Ticketing & Reservation", icon: Plane, order: 21 },
  { step: 22, phase: "PHASE 4 - VISA & MOBILISATION", title: "Forwarding Bills to the Client for Necessary Fees", icon: ReceiptText, order: 22 },
  { step: 23, phase: "PHASE 4 - VISA & MOBILISATION", title: "Pre-Departure Assistance & Orientation to the Workers", icon: GraduationCap, order: 23 },
  { step: 24, phase: "PHASE 4 - VISA & MOBILISATION", title: "Departure of Contract Workers to the Projects", icon: Plane, order: 24 },
  { step: 25, phase: "PHASE 5 - POST-DEPLOYMENT SUPPORT", title: "Follow-up and Monitoring the Status & Welfare of Workers Mobilized", icon: HeartPulse, order: 25 }
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
