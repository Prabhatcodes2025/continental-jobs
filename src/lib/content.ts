import { contactDetails, galleryItems, globalRegions, indianOffices } from "@/lib/site-data";

export type OfficeContact = {
  title: string;
  subtitle: string;
  address: string;
  phones: string[];
  whatsapp?: string;
  emails: string[];
  website?: string;
  managerPhones?: string[];
};

export type GalleryEntry = {
  title: string;
  caption: string;
  src: string;
  activity: string;
};

export type SiteContent = {
  recruitmentEmail: string;
  offices: OfficeContact[];
  indianOperations: string[];
  worldwideOperations: string[];
  gallery: GalleryEntry[];
};

export const activityCategories = [
  "Oil & Gas Recruitment",
  "Healthcare",
  "Hospitality",
  "Security",
  "Retail",
  "Construction",
  "MEP",
  "Ship Building"
];

export const defaultSiteContent: SiteContent = {
  recruitmentEmail: contactDetails.email,
  offices: [
    {
      title: contactDetails.corporateOffice.label,
      subtitle: "Head office for candidates, employers and global coordination.",
      address: contactDetails.corporateOffice.address,
      phones: contactDetails.corporateOffice.phones.map((phone) => phone.display),
      whatsapp: contactDetails.corporateOffice.whatsapp.display,
      emails: [contactDetails.corporateOffice.email],
      website: contactDetails.corporateOffice.website
    },
    {
      title: contactDetails.operationsOffice.label,
      subtitle: "Operational support for recruitment processing and employer coordination.",
      address: contactDetails.operationsOffice.address,
      phones: contactDetails.operationsOffice.phones.map((phone) => phone.display),
      emails: [contactDetails.operationsOffice.email],
      managerPhones: contactDetails.operationsOffice.managerPhones.map((phone) => phone.display)
    }
  ],
  indianOperations: indianOffices,
  worldwideOperations: globalRegions,
  gallery: [
    ...galleryItems.map((item) => ({ ...item, activity: "Corporate" })),
    {
      title: "Oil & Gas Recruitment",
      caption: "Symbolic recruitment visual for refinery, gas plant, petrochemical and shutdown maintenance staffing.",
      src: "/gallery/dubai-hiring.png",
      activity: "Oil & Gas Recruitment"
    },
    {
      title: "Healthcare Recruitment",
      caption: "Doctors, nurses and paramedical sourcing for international hospitals and healthcare organizations.",
      src: "/brand/corporate-office-kochi.png",
      activity: "Healthcare"
    },
    {
      title: "Hospitality Recruitment",
      caption: "Hotel, catering, housekeeping, bakery and food service staff for global employers.",
      src: "/gallery/dubai-hiring.png",
      activity: "Hospitality"
    },
    {
      title: "Security Professionals",
      caption: "Security guard and facility workforce recruitment with documentation and mobilization support.",
      src: "/brand/indian-operations-map-corrected.svg",
      activity: "Security"
    },
    {
      title: "Retail and Hypermarket Staffing",
      caption: "Recruitment for supermarkets, hypermarkets, food counters, store keeping and retail operations.",
      src: "/gallery/dubai-hiring.png",
      activity: "Retail"
    },
    {
      title: "Construction and Infrastructure",
      caption: "Skilled workforce for roads, ports, cities, large infrastructure and industrial construction projects.",
      src: "/brand/indian-operations-map-corrected.svg",
      activity: "Construction"
    },
    {
      title: "MEP Projects",
      caption: "HVAC, electrical, plumbing, ducting, fit-out and building maintenance recruitment support.",
      src: "/brand/corporate-office-kochi.png",
      activity: "MEP"
    },
    {
      title: "Ship Building and Ship Repair",
      caption: "Technical human resources for ship manufacture, repair and maintenance projects.",
      src: "/gallery/spain-work-permit.png",
      activity: "Ship Building"
    }
  ]
};

export function linesToList(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return [];
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^00/, "");
  const withCountry = digits.startsWith("91") ? digits : `91${digits}`;
  return `tel:+${withCountry}`;
}

export function mailHref(email: string) {
  return `mailto:${email.trim()}`;
}

export function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^00/, "");
  const withCountry = digits.startsWith("91") ? digits : `91${digits}`;
  return `https://wa.me/${withCountry}?text=Hello%20Continental%20Mercantile%20Corporation%2C%20I%20would%20like%20to%20know%20more.`;
}

export function contentFromFormData(formData: FormData, imagePaths: string[] = []): SiteContent {
  const defaultOffices = defaultSiteContent.offices;
  const recruitmentEmail = String(formData.get("recruitmentEmail") || defaultSiteContent.recruitmentEmail).trim();
  const offices = defaultOffices.map((office, index) => ({
    title: String(formData.get(`office-${index}-title`) || office.title).trim(),
    subtitle: String(formData.get(`office-${index}-subtitle`) || office.subtitle).trim(),
    address: String(formData.get(`office-${index}-address`) || office.address).trim(),
    phones: linesToList(formData.get(`office-${index}-phones`)).length ? linesToList(formData.get(`office-${index}-phones`)) : office.phones,
    whatsapp: String(formData.get(`office-${index}-whatsapp`) || office.whatsapp || "").trim() || undefined,
    emails: linesToList(formData.get(`office-${index}-emails`)).length ? linesToList(formData.get(`office-${index}-emails`)) : office.emails,
    website: String(formData.get(`office-${index}-website`) || office.website || "").trim() || undefined,
    managerPhones: linesToList(formData.get(`office-${index}-managerPhones`)).length ? linesToList(formData.get(`office-${index}-managerPhones`)) : office.managerPhones
  }));

  const gallery = defaultSiteContent.gallery.map((item, index) => ({
    title: String(formData.get(`gallery-${index}-title`) || item.title).trim(),
    caption: String(formData.get(`gallery-${index}-caption`) || item.caption).trim(),
    activity: String(formData.get(`gallery-${index}-activity`) || item.activity).trim(),
    src: imagePaths[index] || String(formData.get(`gallery-${index}-src`) || item.src).trim()
  }));

  return {
    recruitmentEmail,
    offices,
    indianOperations: linesToList(formData.get("indianOperations")).length ? linesToList(formData.get("indianOperations")) : defaultSiteContent.indianOperations,
    worldwideOperations: linesToList(formData.get("worldwideOperations")).length ? linesToList(formData.get("worldwideOperations")) : defaultSiteContent.worldwideOperations,
    gallery
  };
}
