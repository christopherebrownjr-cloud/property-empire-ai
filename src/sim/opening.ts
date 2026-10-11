// Opening state for the vertical slice (P0 spec v1.9, §1).
// Every value cites its P0 section. Changing one is a design change.

export interface Community {
  id: string;
  name: string;
  units: number;
  avgRent: number;        // §1.2
  baseOcc: number;        // §3.2 Base (Larkspur 0.91, Stillwater 0.92, Cinder Hollow 0.88)
  feePct: number;         // §1.2 (6.0%, 5.5%, 7.0%)
  minFee: number;         // §1.5 monthly minimum (0 = none)
  newLeaseFee: number;    // §1.5 (350, 300, 400)
  renewalFee: number;     // §1.5 (150, 150, none)
  occupancy: number;      // §3.2 pinned opening occupancy (93.4%, 94.4%, 90.4%)
  rs: number;             // §3.2 opening resident satisfaction
  askRent: number;        // §3.2 P_gap: asking rent; opening = market
  renewalIncrease: number; // §3.8 decision: renewal increase (0.03 = 3%); opening 0
  rentIndex: number;      // rent base relative to opening; opening 1
  pushThisMonth: boolean; // §3.5 collections push, set by decision before close
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  monthlyCost: number;    // §1.4 burdened cost
  workload: number;       // §4.4 task points per month
  capacity: number;       // §1.3 capacity points
  burnout: number;        // §1.3 starting burnout
}


export const OPENING_COMMUNITIES: Community[] = [
  { id: "larkspur", name: "Larkspur Court", units: 64, avgRent: 1780, baseOcc: 0.91, feePct: 0.06,
    minFee: 0, newLeaseFee: 350, renewalFee: 150, occupancy: 0.934, rs: 60,
    askRent: 1780, renewalIncrease: 0, rentIndex: 1, pushThisMonth: false },
  { id: "stillwater", name: "Stillwater Terrace", units: 40, avgRent: 1950, baseOcc: 0.92, feePct: 0.055,
    minFee: 1200, newLeaseFee: 300, renewalFee: 150, occupancy: 0.944, rs: 60,
    askRent: 1950, renewalIncrease: 0, rentIndex: 1, pushThisMonth: false },
  { id: "cinder", name: "Cinder Hollow Flats", units: 28, avgRent: 1650, baseOcc: 0.88, feePct: 0.07,
    minFee: 1500, newLeaseFee: 400, renewalFee: 0, occupancy: 0.904, rs: 60,
    askRent: 1650, renewalIncrease: 0, rentIndex: 1, pushThisMonth: false },
];

// §1.4: six new leases and four renewals a month, split by unit share (§17).
export const NEW_LEASES_PER_MONTH = 6;
export const RENEWALS_PER_MONTH = 4;

export const OPENING_STAFF: Staff[] = [
  { id: "founder", name: "Founder-CEO (player)", role: "Founder", monthlyCost: 4000,
    workload: 65.5, capacity: 100, burnout: 35 },
  { id: "coordinator", name: "Ilse Varrin", role: "Leasing & Resident Coordinator",
    monthlyCost: 52000 / 12 * 1.22, workload: 96.8, capacity: 100, burnout: 20 },
];

// §1.4 non-staff operating costs, monthly.
export const OPERATING_COSTS: { label: string; amount: number }[] = [
  { label: "Bookkeeping", amount: 1200 },
  { label: "Software and systems", amount: 900 },
  { label: "Office", amount: 1600 },
  { label: "Insurance", amount: 1350 },
  { label: "Marketing and listings", amount: 700 },
  { label: "Legal and professional reserve", amount: 400 },
  { label: "Miscellaneous", amount: 400 },
];

// §1.4 opening cash and §1.6 revolving line (undrawn).
export const OPENING_CASH = 48000;
export const REVOLVER_LIMIT = 30000;

// §1.4 opening month is October (Q4 season, §3.2).
export const OPENING_MONTH = { year: 2026, month: 10 };
