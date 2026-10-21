import work from "@content/work.json";
import { absoluteUrl, isReady, PERSON_ID, site, SITE_URL, WEBSITE_ID } from "@/lib/site";

const hackathon = work.projects.find((project) => project.slug === "bina")?.meta;

const uetTaxila = {
  "@type": "CollegeOrUniversity",
  name: "University of Engineering and Technology, Taxila",
  url: "https://www.uettaxila.edu.pk",
};

export const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  alternateName: site.seo.alternateNames.filter((name) => name !== site.shortName),
  jobTitle: "AI engineer",
  description: site.seo.description,
  url: SITE_URL,
  image: absoluteUrl(site.images.formal.src),
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Sorbonne Université",
    url: "https://www.sorbonne-universite.fr",
  },
  // Role wrappers are schema.org's way to give a past degree or job its title and dates.
  alumniOf: {
    "@type": "OrganizationRole",
    roleName: "BSc Computer Science student",
    startDate: "2020",
    endDate: "2024",
    alumniOf: uetTaxila,
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: "BSc Computer Science",
    recognizedBy: uetTaxila,
    validFrom: "2024",
  },
  worksFor: {
    "@type": "EmployeeRole",
    roleName: "Lead software engineer",
    startDate: "2024-10",
    endDate: "2026-08",
    worksFor: { "@type": "Organization", name: "Mavera", url: "https://mavera.io" },
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Lead software engineer",
  },
  knowsAbout: ["LLM agents", "Retrieval", "Rust", "Kubernetes", "CUDA"],
  sameAs: [site.links.linkedin, site.links.github, site.links.medium, site.links.fiverr].filter(isReady),
  ...(hackathon && { award: `First place, ${hackathon}` }),
};

// Pages other than the homepage don't carry the full Person, so references to it repeat the name and URL.
export const personReference = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  url: SITE_URL,
};

export const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: site.name,
  url: SITE_URL,
  inLanguage: "en-GB",
  publisher: personReference,
};

export function profilePage() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_URL,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: person,
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
