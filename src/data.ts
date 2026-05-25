import { PortfolioData, TeardownSlide } from "./types";

export const defaultPortfolioData: PortfolioData = {
  name: "Abhishek Singla",
  title: "Product Leader",
  subtitle: "Core Payments, FinTech & Transaction Infrastructure",
  bioSummary: "Accomplished Payments Product Manager specializing in high-scale retail payments, settlement engines, and Unified NPCI Integration layers (UPI, BBPS, Cards). Formerly scaled payment platforms to $6B+ processing ARR.",
  aboutMarkdown: "I am a Product Manager passionate about the engineering plumbing and regulatory frameworks of high-velocity financial transactions.\n\nOver the past 6+ years, I have built routing orchestrators, multi-currency ledger engines, and developer API interfaces that serve thousands of enterprises. My core philosophy is that **stellar fintech systems aren't built on visual gimmicks—they are won on 99.99% settlement accuracy, 50ms API latencies, and flawless checkout success rates.**\n\nI regularly publish deep-dives analyzing payment rails (like BBPS & UPI) to map consumer friction into structured API optimizations. I love collaborating with compliance departments, technical architects, and enterprise card networks to ship resilient payments software.",
  socials: {
    linkedin: "https://www.linkedin.com/in/abhishek-singla-pm",
    email: "abhishek.singla014@gmail.com",
    twitter: "https://x.com/abhisheksingla",
    github: "https://github.com/abhisheksingla"
  },
  experiences: [
    {
      id: "exp-1",
      company: "EnKash (Payments & Corporate Card Infrastructure)",
      role: "Lead Product Manager — Payments Core & APM Rails",
      location: "Bengaluru / Noida, India",
      timeline: "2023 - Present",
      category: "fintech",
      metrics: [
        { label: "Processing Vol", value: "$6.2B", detail: "Annualized volume scaled on UPI & BBPS biller networks" },
        { label: "Webhook Success", value: "99.85%", detail: "Optimized response retries reducing client timeouts" },
        { label: "Integration TAT", value: "-45%", detail: "Automated developer sandboxes and modular SDK layouts" }
      ],
      bullets: [
        "Spearheaded core payment routing engines across 5 major card acquiring channels and NPCI networks, optimizing gateway routing dynamically based on telemetry response latencies.",
        "Redesigned the corporate merchant pay-out pipeline using unified API models, cutting integration turnaround time (TAT) by 45% for high-growth enterprise clients.",
        "Built a state-driven fall-back system for recurring e-mandates (eNACH/UPI AutoPay) complying with latest RBI guidelines, improving subscription auto-debit success by 14%.",
        "Negotiated host-to-host banking pipes directly with HDFC and ICICI blocks, cutting billing fee overhead by 12 basis points across cross-border accounts."
      ]
    },
    {
      id: "exp-2",
      company: "Mindgate Solutions (Retail Payment Gateway Systems)",
      role: "Senior Product Manager — Merchant Core & BBPS Gateway",
      location: "Mumbai / Noida, India",
      timeline: "2021 - 2023",
      category: "core-pm",
      metrics: [
        { label: "Biller Sync Speed", value: "<150ms", detail: "Real-time query discovery across unified utilities databases" },
        { label: "Ledger Volume", value: "2M/Day", detail: "Transactions reconciled seamlessly in multi-tenant spaces" },
        { label: "Fee Leakage", value: "-98%", detail: "Automated real-time double-debit dispute handlers" }
      ],
      bullets: [
        "Owned merchant integration interfaces for Indian utility bills via BBPS (Bharat Bill Payment System), transforming unstructured regional developer pipelines into clean Webhook layouts.",
        "Launched a multi-tenant dual-entry ledger reconciliation system processing 2 Million transactions daily, reducing ledger delta errors by 98% through atomic query transactions.",
        "Led product definition for merchant settlements, introducing instant split payouts and scheduled billing buckets that optimized merchant cashflow capabilities."
      ]
    },
    {
      id: "exp-3",
      company: "Vyapar (SaaS billing & Fintech Ecosystem)",
      role: "Product Manager — Billing Engines & Growth Core",
      location: "Bengaluru, India",
      timeline: "2019 - 2021",
      category: "growth",
      metrics: [
        { label: "Checkout Conversions", value: "+18%", detail: "Boosted by embedding direct deep-link checkout states" },
        { label: "Manual Ticket Drop", value: "-35%", detail: "Reduced checkout status disputes via native bank-fetch queries" },
        { label: "Transaction Runrate", value: "30M+", detail: "Retail invoices logged, tracked, and reconciled annually" }
      ],
      bullets: [
        "Designed and embedded deep-linked UPI checkouts within accounting invoices, boosting customer invoice-payment conversion rates by 18%.",
        "Introduced smart bill discovery modules within the billing platform, utilizing machine learning heuristics to automatically fetch pending utility bills of users.",
        "Mapped user dropout behavior on otp verification layouts, designing dynamic OTP autofill prompts and fallback SMS routes that salvaged 4.5% of failing merchant checkouts."
      ]
    }
  ],
  education: [
    {
      school: "BITS Pilani / SP Jain School of Global Management",
      degree: "Post Graduate Program in Product Management & Fintech Core",
      timeline: "Graduated with Honors",
      bullets: [
        "Focus on Merchant Acquiring Systems, Open Banking APIs, and Behavioral Fintech Frameworks.",
        "Awarded Outstanding Capstone Project for building a mock cross-border settlement engine on distributed rails."
      ]
    },
    {
      school: "Delhi University",
      degree: "Bachelor of Science in Computer Science / Information Tech",
      timeline: "Graduated First Class",
      bullets: [
        "Core focus on Database Management, Data Structures, and Cryptographic Security layers."
      ]
    }
  ],
  skills: [
    {
      category: "Core Payments Networks",
      items: ["NPCI (UPI, BBPS, IMPS)", "B2B Recurring Mandates (AutoPay, eNACH)", "ISO 20022 Messaging", "Credit Tokenization Systems"]
    },
    {
      category: "Fintech Systems Architecture",
      items: ["Dynamic Gateway Routing Engine", "Dual-Entry Transaction Ledgers", "Real-time Settlement Splits", "Webhook & Open API Design"]
    },
    {
      category: "Product Management Craft",
      items: ["System Flowcharting", "API Specification Sheets", "Conversion Funnel Diagnostics", "A/B Testing & Core Metric Optimization"]
    },
    {
      category: "Data & Technical Competence",
      items: ["SQL & Database Optimization", "Data Visualizations with D3/Recharts", "JSON Payload Specification", "Regulatory Compliance Frameworks"]
    }
  ]
};

export const defaultTeardownSlides: TeardownSlide[] = [
  {
    id: "bbps-slide-1",
    title: "Understanding BBPS System Architecture",
    category: "System Overview",
    subtitle: "NPCI's multi-layered biller node architecture",
    summary: "The Bharat Bill Payment System (BBPS) is an NPCI-driven unified bill payment system in India. While architected beautifully, its multi-hop API model often acts as a double-edged sword for developer conversion metrics.",
    points: [
      {
        title: "Central Clearing Unit (BBPCU)",
        description: "Operated by NPCI, setting clearing and settlement standards between customer-facing apps and biller operating units.",
        badge: "NPCI Layer"
      },
      {
        title: "Customer/Biller Operating Units (BBPOUs)",
        description: "Gateways acting as aggregators. A transaction travels from User -> Customer-BBPOU -> NPCI Clearing -> Biller-BBPOU -> Core Biller Engine.",
        badge: "Gateway Node"
      },
      {
        title: "Multi-Hop API Latency Accumulation",
        description: "Every hop adds DNS lookups, queue processing, and socket timeouts. Average bill queries take 1.8s, causing 22% dropouts before payment start.",
        badge: "Latency Bottleneck"
      }
    ],
    insight: "PM Optimization: Latency-masking UX is vital. By asynchronously pre-polling favorite billers at active app wake-up, average checkouts feel instant."
  },
  {
    id: "bbps-slide-2",
    title: "The Double-Debit Settlement Fracture",
    category: "The Friction Core",
    subtitle: "Why payment success notifications get lost in transit",
    summary: "The highest merchant dispute volume in BBPS arises from the 'Double-Debit, No Success' scenario. A buyer's bank account gets debited, but the biller reports it unpaid due to state mismatching.",
    points: [
      {
        title: "Asynchronous API Handoffs",
        description: "A customer pays successfully, but the callback to the customer-facing BBPOU fails or times out, trapping money in pending-reconciliation purgatory.",
        badge: "State Desync"
      },
      {
        title: "Lack of Uniform Transaction Status API",
        description: "Many legacy Billers do not support a real-time query interface. Confirmations can take up to T+2 days to reflect.",
        badge: "Biller Blindspot"
      },
      {
        title: "Anxious Manual Ticket Volume",
        description: "Failing to notify users instantaneously regarding pending statuses spikes customer center calls by 42%.",
        badge: "Ops Overhead"
      }
    ],
    insight: "PM Solution: Build an Auto-Query Loop. On database pending state, invoke automatic ping queries every 10s for the first minute, then transition gracefully into a client push-notification."
  },
  {
    id: "bbps-slide-3",
    title: "Optimized Unified Biller API Payload",
    category: "The API Paradigm",
    subtitle: "A cleaner, robust payload design for robust developers",
    summary: "Standard BBPS payloads are bloated and leak internal bank metadata. Designing a unified, slimmed developer schema simplifies integration pipelines and cuts merchant developer onboarding times by 45%.",
    points: [
      {
        title: "Sanitized Identifier Mapping",
        description: "Abstracting utility provider formats (Consumer ID, Account Number) into a single, clean 'bill_discovery_token'.",
        badge: "Schema Level"
      },
      {
        title: "Atomic State Callback Objects",
        description: "Webhooks should carry single, guaranteed nested state vectors (status, error_reason, banking_ref_id) to eliminate client payload confusion.",
        badge: "Webhook Logic"
      },
      {
        title: "Optimized Billing Payload Size",
        description: "A lightweight payload with compressed arrays cuts cellular data consumption on edge networks, and supports faster parsing in slower processor environments.",
        badge: "Performance"
      }
    ],
    insight: "PM Checklist: Always provide comprehensive offline debugger payloads. Speed up third-party app integration from 14 days down to 2 days."
  },
  {
    id: "bbps-slide-4",
    title: "Conversion Optimization Playbook",
    category: "PM Playbook",
    subtitle: "Tactics that drove +18% billing success on corporate accounts",
    summary: "A world-class product manager optimizes the funnel at every stage. Applying these payments checkout best-practices directly influences net conversion yields.",
    points: [
      {
        title: "Auto-Discovery via Saved Credentials",
        description: "Parse customer phone numbers to secure pre-approved bills from recurring suppliers in the background, eliminating prompt fields.",
        badge: "Smart Billing"
      },
      {
        title: "Dynamic Smart Routing Retries",
        description: "If an active bank node is slow, automatically switch behind-the-scenes acquiring pathways without requiring user re-authentication.",
        badge: "Acquirer Smart Routing"
      },
      {
        title: "Clear Interactive Status Screen",
        description: "A countdown-timer state card on pending states halts anxiety-induced app-closings, protecting conversions.",
        badge: "UX Treatment"
      }
    ],
    insight: "Product Outcome: Applying these billing techniques turned cold integration dashboards into frictionless, value-adding fintech pipelines."
  }
];
