import {
  advanceMonth, canRunCollectionsPush, DECISION, hireAssistant, setAskRent, setRenewalIncrease,
  toggleCollectionsPush, type GameState,
} from "../sim/engine";
import { newGame } from "../sim/state";
import { scorecard } from "../sim/scorecard";
import { RESERVE_TARGET } from "../sim/ledgers";

const money = (n: number) => (n < 0 ? "-$" : "$") + Math.abs(Math.round(n)).toLocaleString("en-US");
const pct = (n: number) => (n * 100).toFixed(1) + "%";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let state: GameState = newGame();
const app = document.getElementById("app")!;

function render(): void {
  const r = state.lastResult;
  const rows = r ? r.communities : [];
  const card = scorecard(state);
  app.innerHTML = `
    <main>
      <header>
        <h1>Property Empire AI</h1>
        <p class="sub">Vertical slice · market-rate residential · Sacramento region</p>
      </header>
      <section class="kpis">
        <div><span>Month</span><strong>${MONTHS[state.month - 1]} ${state.year}</strong></div>
        <div><span>Corporate cash</span><strong>${money(state.cash)}</strong></div>
        <div><span>Net last month</span><strong>${r ? money(r.net) : "—"}</strong></div>
        <div><span>Runway</span><strong>${r && r.runwayMonths !== null ? r.runwayMonths.toFixed(1) + " months" : r ? "cash-positive" : "—"}</strong></div>
      </section>
      <section class="controls">
        <button id="advance">Close month</button>
        <button id="hire" ${state.assistantHired ? "disabled" : ""}>
          ${state.assistantHired ? "Assistant hired" : "Hire assistant (−$4,473/mo)"}
        </button>
      </section>
      <section>
        <h2>Communities and decisions</h2>
        <table>
          <thead><tr><th>Community</th><th>Units</th><th>Ask rent</th><th>Renewal increase</th><th>Occupancy</th><th>Resident satisfaction</th><th>Collections push</th><th>Last close revenue</th></tr></thead>
          <tbody>
            ${state.communities.map((c) => {
              const row = rows.find((x) => x.id === c.id);
              const canPush = canRunCollectionsPush(c);
              return `<tr>
                <td>${c.name}</td><td>${c.units}</td>
                <td><button data-act="ask" data-id="${c.id}" data-d="-${DECISION.askStep}">−</button>
                    ${money(c.askRent)}
                    <button data-act="ask" data-id="${c.id}" data-d="${DECISION.askStep}">+</button></td>
                <td><button data-act="inc" data-id="${c.id}" data-d="-${DECISION.increaseStep}">−</button>
                    ${(c.renewalIncrease * 100).toFixed(0)}%
                    <button data-act="inc" data-id="${c.id}" data-d="${DECISION.increaseStep}">+</button></td>
                <td>${pct(c.occupancy)}</td>
                <td>${Math.round(c.rs)}</td>
                <td><button data-act="push" data-id="${c.id}" ${canPush || c.pushThisMonth ? "" : "disabled"}>
                    ${c.pushThisMonth ? "On for next close" : canPush ? "Run push" : "Blocked (RS below 60)"}</button></td>
                <td>${row ? money(row.revenue) : "—"}</td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Owner trusts and statements (P0 §2)</h2>
        <p class="note">Owner Trusts are held separately from corporate cash. Fees reach the company only through the sweep on the following close.</p>
        <table>
          <thead><tr><th>Community</th><th>Owner Trust</th><th>Fees owed to company</th><th>Last sweep to company</th><th>Last owner distribution</th><th>Last collected rent</th></tr></thead>
          <tbody>
            ${state.communities.map((c) => {
              const last = [...state.statements].reverse().find((x) => x.id === c.id);
              return `<tr><td>${c.name}</td><td>${money(c.ownerTrust)}</td><td>${money(c.feesOwed)}</td>
                <td>${last ? money(last.feesSwept) : "—"}</td><td>${last ? money(last.distribution) : "—"}</td>
                <td>${last ? money(last.collectedRent) : "—"}</td></tr>`;
            }).join("")}
          </tbody>
        </table>
        <p class="note">Last close: sweeps received by the company ${r ? money(r.sweepsReceived) : "—"}. Owner statements issued: ${state.statements.length}.</p>
      </section>
      <section>
        <h2>Owner Capital Reserve and security deposits (P0 §2.1)</h2>
        <p class="note">The reserve is owner money, restricted to capital and emergency repairs. Security deposits are resident money held in trust. Neither is company cash.</p>
        <table>
          <thead><tr><th>Community</th><th>Owner Capital Reserve (target ${money(RESERVE_TARGET)})</th><th>Security deposits held (residents)</th><th>Move-ins, last close</th><th>Move-outs, last close</th><th>Deposits refunded, last close</th><th>Refunds still owed (21-day window)</th></tr></thead>
          <tbody>
            ${state.communities.map((c) => {
              const f = r ? r.deposits.find((x) => x.id === c.id) : undefined;
              return `<tr><td>${c.name}</td><td>${money(c.reserve)}</td><td>${money(c.depositHeld)}</td>
                <td>${f ? f.movesIn.toFixed(1) : "—"}</td><td>${f ? f.moveOuts.toFixed(1) : "—"}</td>
                <td>${f ? money(f.refunded) : "—"}</td><td>${money(c.refundsPayable)}</td></tr>`;
            }).join("")}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Staff</h2>
        <table>
          <thead><tr><th>Person</th><th>Role</th><th>Utilization</th><th>Burnout</th></tr></thead>
          <tbody>
            ${state.staff.map((s) => {
              const u = state.assistantHired && s.id === "coordinator" ? s.workload - 52.8 : s.workload;
              return `<tr><td>${s.name}</td><td>${s.role}</td><td>${(u / s.capacity * 100).toFixed(0)}%</td><td>${Math.round(s.burnout)}</td></tr>`;
            }).join("")}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Twelve-month scorecard</h2>
        <table>
          <thead><tr><th>#</th><th>Criterion</th><th>Status</th><th>Detail</th></tr></thead>
          <tbody>
            ${card.map((c) => `<tr><td>${c.id}</td><td>${c.name}</td><td class="st-${c.status.replace(" ", "-")}">${c.status}</td><td>${c.detail}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>
      <footer>Milestone 4: owner capital reserve transfers, security deposit trust, 21-day refund timing, and the reserve draw cap. Not built yet: random events, reserve draws from repairs, bids, inspections, and the remaining screens.</footer>
    </main>`;

  document.getElementById("advance")!.addEventListener("click", () => { state = advanceMonth(state); render(); });
  document.getElementById("hire")!.addEventListener("click", () => { state = hireAssistant(state); render(); });
  app.querySelectorAll<HTMLButtonElement>("button[data-act]").forEach((b) => {
    b.addEventListener("click", () => {
      const id = b.dataset.id!;
      const d = Number(b.dataset.d);
      const c = state.communities.find((x) => x.id === id)!;
      if (b.dataset.act === "ask") state = setAskRent(state, id, Math.max(0, c.askRent + d));
      if (b.dataset.act === "inc") state = setRenewalIncrease(state, id, c.renewalIncrease + d);
      if (b.dataset.act === "push") state = toggleCollectionsPush(state, id);
      render();
    });
  });
}

render();
