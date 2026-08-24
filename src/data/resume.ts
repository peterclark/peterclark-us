import sophosLogo from "@/assets/logos/sophos-logo.png"
import rackspaceLogo from "@/assets/logos/rackspace-logo.png"
import tetcoLogo from "@/assets/logos/tetco-logo.png"
import usaaLogo from "@/assets/logos/usaa-logo.png"
import bostonLogo from "@/assets/logos/boston-logo.png"
import inrevLogo from "@/assets/logos/inrev-logo.png"
import storymdLogo from "@/assets/logos/storymd-logo.png"
import uscLogo from "@/assets/logos/usc-logo.png"
import starbucksLogo from "@/assets/logos/starbucks-logo.png"
import greenRiverLogo from "@/assets/logos/green-river-logo.png"

export type Client = {
  name: string
  href: string
  logo: string
  /** Artwork drawn in white — needs a dark tile to be visible. */
  onDark?: boolean
}

export type Role = {
  id: string
  org: string
  href?: string
  title: string
  /** The specific product worked on, linked beside the role title. */
  product?: { name: string; href: string }
  start: number
  end: number | "present"
  logo?: string
  summary: string
  stack: string[]
  /** Stack entries rendered with emphasis — the headline technologies. */
  lead?: string[]
  clients?: Client[]
}

export type SkillGroup = {
  label: string
  items: string[]
  lead?: string[]
}

export const PROFILE = {
  name: "Peter Clark",
  fullName: "Peter Stephen Clark",
  title: "Senior Software Engineer 2",
  employer: "Sophos",
  location: "San Antonio, TX",
  email: "peter@5clarks.net",
  phone: "(210) 863-8260",
  phoneHref: "tel:1-210-863-8260",
  site: "peterclark.us",
  siteHref: "https://peterclark.us",
  github: "peterclark",
  githubHref: "https://github.com/peterclark",
  summary:
    "TypeScript and React on the front, NestJS and AWS behind it. Previously lead developer for USAA, Starbucks, and the City of Boston, and IT director for a multi-company retail group.",
} as const

export const ROLES: Role[] = [
  {
    id: "sophos",
    org: "Sophos",
    href: "https://sophos.com",
    title: "Senior Software Engineer 2",
    product: {
      name: "Sophos MDR",
      href: "https://www.sophos.com/en-us/services/managed-detection-and-response",
    },
    start: 2019,
    end: "present",
    logo: sophosLogo,
    // Product framing is from the public Sophos MDR page. The second sentence —
    // what your team specifically owns — is still my inference from your stack.
    // TODO(peter): sharpen it to the systems you actually build.
    summary:
      "On the team building Sophos MDR, a 24/7 managed detection and response service used by 40,000+ organizations, where analysts and agentic AI investigate and respond to threats on the customer's behalf across 500+ integrations spanning endpoint, network, cloud, identity, and email. Full-stack work across the TypeScript React front end and the NestJS services on AWS behind it, with infrastructure as code and feature-flagged delivery. Member of the Sophos AI Champions team, building its AI orchestration pipeline — cross-repo automation that carries a Jira ticket through to an open pull request, scoring tickets for implementation readiness and rewriting the ones that fall short, running a coding agent against the target repository, then validating through lint, unit, and component tests where each failure triggers a targeted agent fix and retry before the run commits, pushes, and opens the PR. Runs are checkpointed, so a long one resumes at the phase it stopped in.",
    lead: ["TypeScript", "React", "NestJS", "AWS"],
    stack: [
      "TypeScript",
      "React",
      "NestJS",
      "AWS",
      "Terraform",
      "GraphQL",
      "OpenAPI",
      "PostgreSQL",
      "DynamoDB",
      "SQS/SNS",
      "LaunchDarkly",
      "Claude Code",
      "Codex",
    ],
  },
  {
    id: "freelance",
    org: "Freelance",
    title: "Software Consultant",
    start: 2016,
    end: 2019,
    summary:
      "Lead web developer for a range of clients — insurance, government, higher education, retail, and health startups. Particularly adept at UX/UI work favoring clean, simple user interfaces, and at blending structure, design, and behavior in web applications.",
    lead: ["Rails 5", "React"],
    stack: ["Rails 5", "React", "Java", "Ruby", "Postgres", "MySQL", "Elasticsearch", "Heroku", "AWS"],
    clients: [
      { name: "USAA", href: "https://www.usaa.com/join/start", logo: usaaLogo },
      {
        name: "City of Boston",
        href: "https://www.greenriver.com/portfolio/the-city-of-boston",
        logo: bostonLogo,
        onDark: true,
      },
      { name: "Rackspace", href: "https://www.rackspace.com", logo: rackspaceLogo },
      { name: "INREV", href: "https://www.inrev.org", logo: inrevLogo },
      { name: "StoryMD", href: "https://phr.storymd.com", logo: storymdLogo },
      { name: "USC", href: "https://clinicaltrials.keckmedicine.org", logo: uscLogo },
      { name: "Starbucks", href: "https://www.greenriver.com/portfolio/starbucks", logo: starbucksLogo },
      { name: "Green River", href: "https://www.greenriver.com", logo: greenRiverLogo },
    ],
  },
  {
    id: "rackspace",
    org: "Rackspace",
    href: "https://www.rackspace.com",
    title: "Senior Software Developer",
    start: 2012,
    end: 2017,
    logo: rackspaceLogo,
    summary:
      "Part of an agile team designing Rackspace's internal sales quoting system. Key contributor across the user interface, RESTful API design, and NoSQL database architecture. Author of two Ruby gems providing access to Rackspace's billing and inventory systems over XML and JSON APIs.",
    lead: ["Ruby on Rails"],
    stack: ["Ruby on Rails", "MongoDB", "REST APIs", "Bootstrap"],
  },
  {
    id: "tetco",
    org: "Tetco",
    href: "https://www.tetco.com",
    title: "IT Director / Senior Software Developer",
    start: 1999,
    end: 2012,
    logo: tetcoLogo,
    summary:
      "Led the company's entry onto the web and built cost-saving applications that improved collaboration across subsidiary companies. Directed all technology initiatives — development, network and communications infrastructure, security, PCI compliance, deployment, and retail technology — leading 19 IT professionals including seven direct reports.",
    lead: ["Java"],
    stack: ["Java", "JSP", "MS SQL Server", "PCI compliance", "Team leadership"],
  },
]

export const SKILLS: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "SQL"],
    lead: ["TypeScript"],
  },
  {
    label: "Front end",
    items: ["React", "React Router", "Tailwind", "Vite", "Jotai", "React Hook Form", "Zod"],
    lead: ["React", "Tailwind"],
  },
  {
    label: "Back end & APIs",
    items: ["NestJS", "GraphQL", "OpenAPI", "JWT"],
    lead: ["NestJS"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "DynamoDB"],
    lead: ["PostgreSQL"],
  },
  {
    label: "Cloud & infrastructure",
    items: ["AWS", "SQS/SNS", "Terraform", "LaunchDarkly"],
    lead: ["AWS", "Terraform"],
  },
  {
    label: "Testing",
    items: ["Vitest", "Cucumber"],
    lead: ["Vitest"],
  },
  {
    label: "AI tooling",
    items: ["Claude Code", "Codex", "Agent orchestration"],
    lead: ["Claude Code", "Agent orchestration"],
  },
  {
    label: "Process",
    items: ["Jira", "Agile"],
  },
]

export const EDUCATION = [
  {
    school: "Texas Lutheran University",
    href: "http://www.tlu.edu",
    field: "Physics",
    honors: ["Magna Cum Laude"],
    gpa: "3.8 GPA",
  },
  {
    school: "University of Texas at San Antonio",
    href: "http://www.utsa.edu",
    field: "Electrical Engineering coursework",
    honors: [],
    gpa: "3.4 GPA",
  },
]

export const CERTIFICATIONS = [
  // TODO(peter): confirm the year — placeholder until you tell me when you joined
  // the AI Champions team.
  { name: "Sophos AI Champion", year: 2025 },
  {
    name: "Mastering React",
    year: 2019,
    href: "https://www.dropbox.com/s/irucqzswao2c4iy/Mastering%20React%20Certification.pdf",
  },
  {
    name: "MongoDB Certified Developer",
    year: 2015,
    href: "https://university.mongodb.com/certification",
  },
  { name: "Diamond Achievement Award", year: 2012 },
  {
    name: "Certified Scrum Master",
    year: 2008,
    href: "https://www.dropbox.com/s/rolcsrjv15dpoq5/Scrum%20Certificate.pdf",
  },
  {
    name: "Java Certified Developer",
    year: 2001,
    href: "https://www.dropbox.com/s/pn9e3t4j0dpnkku/Java%20Certified%20Professional.pdf",
  },
]

export const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Experience" },
  { id: "skills", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const
