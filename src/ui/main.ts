import { advanceMonth, hireAssistant, type GameState } from "../sim/engine";
import { newGame } from "../sim/state";

const money = (n: number) => (n < 0 ? "-$" : "$") + Math.abs(Math.round(n)).toLocaleString("en-US");
const pct = (n: number) => (n * 100).toFixed(1) + "%";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let state: GameState = newGame();
const app = document.getElementById("app")!;

function render(): void {
  const r = state.lastResult;
  const net = r ? r.net : null;
  const revenue = r ? r.revenue : null;
  const expenses = r ? r.expenses : null;
  const burn = r ? r.runwayMonths : null;
  const rows = r ? r.communities : [];
  app.innerHTML = `
    <main>
      <header>
        <h1>Property Empire AI</h1>
        <p class="sub">Vertical slice · market-rate residential · Sacramento region</p>
      </header>
      <section class="kpis">
        <div><span>Month</span><strong>${MONTHS[state.month - 1]} ${state.year}</strong></div>
        <div><span>Corporate cash</span><strong>${money(state.cash)}</strong></div>
        <div><span>Net last month</span><strong>${net === null ? "—" : money(net)}</strong></div>
        <div><span>Runway</span><strong>${burn === null ? "cash-positive" : burn.toFixed(1) + " months"}</strong></div>
      </section>
      <section class="controls">
        <button id="advance">Close month</button>
        <button id="hire" ${state.assistantHired ? "disabled" : ""}>
          ${state.assistantHired ? "Assistant hired" : "Hire assistant (−$4,473/mo)"}
        </button>
      </section>
      <section>
        <h2>Communities</h2>
        <table>
          <thead><tr><th>Community</th><th>Units</th><th>Occupancy</th><th>Collected rent</th><th>Fee</th><th>Leasing fees</th><th>Resident satisfaction</th></tr></thead>
          <tbody>
            ${state.communities.map((c) => {
              const row = rows.find((x) => x.id === c.id);
              return `<tr>
                <td>${c.name}</td><td>${c.units}</td><td>${pct(c.occupancy)}</td>
                <td>${row ? money(row.collectedRent) : "—"}</td>
                <td>${row ? money(row.fee) : "—"}</td>
                <td>${row ? money(row.leasingFee) : "—"}</td>
                <td>${Math.round(c.rs)}</td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Staff</h2>
        <table>
          <thead><tr><th>Person</th><th>Role</th><th>Utilization</th><th>Burnout</th></tr></thead>
          <tbody>
            ${state.staff.map((s) => `<tr><td>${s.name}</td><td>${s.role}</td>
              <td>${(s.workload / s.capacity * 100).toFixed(0)}%</td><td>${Math.round(s.burnout)}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Last month</h2>
        <p>Revenue ${revenue === null ? "—" : money(revenue)} · Expenses ${expenses === null ? "—" : money(expenses)}</p>
      </section>
      <footer>Milestone 1: monthly close, staffing, and the opening P&amp;L. Events, the collections push, and the remaining screens are not built yet.</footer>
    </main>`;
  document.getElementById("advance")!.addEventListener("click", () => { state = advanceMonth(state); render(); });
  document.getElementById("hire")!.addEventListener("click", () => { state = hireAssistant(state); render(); });
}

render();
