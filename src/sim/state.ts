import { OPENING_CASH, OPENING_COMMUNITIES, OPENING_MONTH, OPENING_STAFF, REVOLVER_LIMIT } from "./opening";
import type { GameState } from "./engine";

export function newGame(): GameState {
  return {
    year: OPENING_MONTH.year,
    month: OPENING_MONTH.month,
    monthsElapsed: 0,
    cash: OPENING_CASH,
    revolverLimit: REVOLVER_LIMIT,
    communities: OPENING_COMMUNITIES.map((c) => ({ ...c })),
    staff: OPENING_STAFF.map((s) => ({ ...s })),
    assistantHired: false,
    history: [],
  };
}
