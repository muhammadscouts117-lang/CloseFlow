const tiers = [
  {
    id: "starter",
    name: "Starter",
    price: "GBP 0.99",
    leadCap: 10,
    analytics: false,
    customScoring: false,
    summary: "Solo rep essentials with a focused top-10 list."
  },
  {
    id: "growth",
    name: "Growth",
    price: "GBP 29",
    leadCap: 50,
    analytics: false,
    customScoring: false,
    summary: "Deeper pipeline visibility for fast-moving individual reps."
  },
  {
    id: "pro",
    name: "Pro",
    price: "GBP 99",
    leadCap: 250,
    analytics: true,
    customScoring: false,
    summary: "Manager-ready visibility with team analytics and larger lists."
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "GBP 500+",
    leadCap: Infinity,
    analytics: true,
    customScoring: true,
    summary: "Unlimited volume, custom scoring logic, and leadership insight."
  }
];

const defaultWeights = {
  dealValue: 24,
  recency: 26,
  intent: 22,
  closeWindow: 18,
  stage: 10
};

const sampleDeals = [
  {
    id: "1",
    name: "Maya Patel",
    company: "Northstar Labs",
    stage: "Proposal Sent",
    value: 18000,
    daysSinceLastContact: 5,
    intent: "High",
    closeDate: "2026-04-24",
    owner: "Alex",
    email: "maya@northstarlabs.co",
    phone: "+44 20 1000 2001"
  },
  {
    id: "2",
    name: "Jordan Lee",
    company: "Aperture Freight",
    stage: "Demo Booked",
    value: 9500,
    daysSinceLastContact: 2,
    intent: "High",
    closeDate: "2026-04-22",
    owner: "Alex",
    email: "jordan@aperturefreight.com",
    phone: "+44 20 1000 2002"
  },
  {
    id: "3",
    name: "Nina Alvarez",
    company: "Summit Grid",
    stage: "Negotiation",
    value: 42000,
    daysSinceLastContact: 8,
    intent: "Medium",
    closeDate: "2026-04-29",
    owner: "Priya",
    email: "nina@summitgrid.com",
    phone: "+44 20 1000 2003"
  },
  {
    id: "4",
    name: "Callum Price",
    company: "Dockside Health",
    stage: "Qualified",
    value: 7200,
    daysSinceLastContact: 11,
    intent: "Medium",
    closeDate: "2026-05-03",
    owner: "Priya",
    email: "callum@docksidehealth.com",
    phone: "+44 20 1000 2004"
  },
  {
    id: "5",
    name: "Sara Ibrahim",
    company: "Bluepeak AI",
    stage: "Demo Completed",
    value: 21000,
    daysSinceLastContact: 4,
    intent: "High",
    closeDate: "2026-04-26",
    owner: "Theo",
    email: "sara@bluepeak.ai",
    phone: "+44 20 1000 2005"
  },
  {
    id: "6",
    name: "Louis Gray",
    company: "FieldForge",
    stage: "New Lead",
    value: 3600,
    daysSinceLastContact: 14,
    intent: "Low",
    closeDate: "2026-05-16",
    owner: "Theo",
    email: "louis@fieldforge.io",
    phone: "+44 20 1000 2006"
  },
  {
    id: "7",
    name: "Talia Brooks",
    company: "Vantage Retail",
    stage: "Negotiation",
    value: 51000,
    daysSinceLastContact: 3,
    intent: "High",
    closeDate: "2026-04-21",
    owner: "Alex",
    email: "talia@vantageretail.com",
    phone: "+44 20 1000 2007"
  },
  {
    id: "8",
    name: "Marcus Chen",
    company: "Signal Finance",
    stage: "Qualified",
    value: 12000,
    daysSinceLastContact: 7,
    intent: "Medium",
    closeDate: "2026-04-30",
    owner: "Priya",
    email: "marcus@signalfinance.co",
    phone: "+44 20 1000 2008"
  },
  {
    id: "9",
    name: "Emma Rowe",
    company: "Anchor Security",
    stage: "Proposal Sent",
    value: 26500,
    daysSinceLastContact: 6,
    intent: "High",
    closeDate: "2026-04-25",
    owner: "Theo",
    email: "emma@anchorsecurity.io",
    phone: "+44 20 1000 2009"
  },
  {
    id: "10",
    name: "Noah Bell",
    company: "Terra Motion",
    stage: "Demo Booked",
    value: 8800,
    daysSinceLastContact: 1,
    intent: "Medium",
    closeDate: "2026-04-23",
    owner: "Alex",
    email: "noah@terramotion.com",
    phone: "+44 20 1000 2010"
  },
  {
    id: "11",
    name: "Aisha Rahman",
    company: "Beacon Ops",
    stage: "Qualified",
    value: 15400,
    daysSinceLastContact: 10,
    intent: "High",
    closeDate: "2026-05-01",
    owner: "Priya",
    email: "aisha@beaconops.com",
    phone: "+44 20 1000 2011"
  },
  {
    id: "12",
    name: "Evan Scott",
    company: "Horizon Fleet",
    stage: "New Lead",
    value: 5400,
    daysSinceLastContact: 12,
    intent: "Low",
    closeDate: "2026-05-12",
    owner: "Theo",
    email: "evan@horizonfleet.com",
    phone: "+44 20 1000 2012"
  }
];

const stageScores = {
  "New Lead": 0.3,
  Qualified: 0.55,
  "Demo Booked": 0.72,
  "Demo Completed": 0.82,
  "Proposal Sent": 0.92,
  Negotiation: 1
};

const intentScores = {
  Low: 0.35,
  Medium: 0.7,
  High: 1
};

const state = {
  tierId: "starter",
  deals: sampleDeals.map(addDealDefaults),
  weights: { ...defaultWeights }
};

const tierSelector = document.getElementById("tierSelector");
const leadCapLabel = document.getElementById("leadCapLabel");
const analyticsLabel = document.getElementById("analyticsLabel");
const customLogicLabel = document.getElementById("customLogicLabel");
const visibleCountBadge = document.getElementById("visibleCountBadge");
const gatingBadge = document.getElementById("gatingBadge");
const hitList = document.getElementById("hitList");
const scoringControls = document.getElementById("scoringControls");
const scoringHint = document.getElementById("scoringHint");
const metricsGrid = document.getElementById("metricsGrid");
const analyticsPanel = document.getElementById("analyticsPanel");
const analyticsContent = document.getElementById("analyticsContent");
const completionPercent = document.getElementById("completionPercent");
const uploadStatus = document.getElementById("uploadStatus");
const csvInput = document.getElementById("csvInput");
const loadSampleButton = document.getElementById("loadSampleButton");
const cardTemplate = document.getElementById("dealCardTemplate");

function addDealDefaults(deal, index = 0) {
  return {
    id: String(deal.id ?? Date.now() + index),
    name: deal.name || "Unknown contact",
    company: deal.company || "Unknown company",
    stage: deal.stage || "New Lead",
    value: Number(deal.value) || 0,
    daysSinceLastContact: Number(deal.daysSinceLastContact) || 0,
    intent: deal.intent || "Medium",
    closeDate: deal.closeDate || "",
    owner: deal.owner || "Unassigned",
    email: deal.email || "",
    phone: deal.phone || "",
    actions: {
      call: false,
      email: false,
      proposal: false
    }
  };
}

function getCurrentTier() {
  return tiers.find((tier) => tier.id === state.tierId);
}

function scoreDeal(deal) {
  const normalizedValue = Math.min(deal.value / 50000, 1);
  const normalizedRecency = Math.min(deal.daysSinceLastContact / 14, 1);
  const normalizedIntent = intentScores[deal.intent] ?? 0.65;
  const normalizedStage = stageScores[deal.stage] ?? 0.4;
  const daysToClose = daysUntil(deal.closeDate);
  const normalizedCloseWindow = daysToClose <= 0 ? 1 : Math.max(0, 1 - daysToClose / 21);

  const weights = state.weights;
  const weightedTotal =
    normalizedValue * weights.dealValue +
    normalizedRecency * weights.recency +
    normalizedIntent * weights.intent +
    normalizedCloseWindow * weights.closeWindow +
    normalizedStage * weights.stage;

  return Math.round(weightedTotal);
}

function getDealReason(deal, score) {
  const reasons = [];

  if (deal.value >= 20000) {
    reasons.push("high contract value");
  }
  if (deal.daysSinceLastContact >= 7) {
    reasons.push("stale follow-up risk");
  }
  if ((intentScores[deal.intent] ?? 0) >= 0.9) {
    reasons.push("strong buyer intent");
  }
  if (daysUntil(deal.closeDate) <= 5) {
    reasons.push("close date is near");
  }
  if (reasons.length === 0) {
    reasons.push("healthy mid-funnel momentum");
  }

  return `Priority score ${score}. Focus now because of ${reasons.join(", ")}.`;
}

function getVisibleDeals() {
  const tier = getCurrentTier();
  const scored = state.deals
    .map((deal) => ({ ...deal, score: scoreDeal(deal) }))
    .sort((a, b) => b.score - a.score);

  return tier.leadCap === Infinity ? scored : scored.slice(0, tier.leadCap);
}

function daysUntil(dateString) {
  if (!dateString) {
    return 30;
  }
  const today = new Date("2026-04-20T00:00:00");
  const date = new Date(`${dateString}T00:00:00`);
  const diff = date.getTime() - today.getTime();
  return Math.round(diff / 86400000);
}

function currency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}

function renderTierSelector() {
  tierSelector.innerHTML = "";
  const currentTier = getCurrentTier();

  tiers.forEach((tier) => {
    const button = document.createElement("button");
    button.className = `tier-option${tier.id === state.tierId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="tier-title">
        <strong>${tier.name}</strong>
        <span class="tier-summary">${tier.summary}</span>
      </span>
      <span class="tier-price">${tier.price}</span>
    `;
    button.addEventListener("click", () => {
      state.tierId = tier.id;
      if (!getCurrentTier().customScoring) {
        state.weights = { ...defaultWeights };
      }
      render();
    });
    tierSelector.appendChild(button);
  });

  leadCapLabel.textContent = currentTier.leadCap === Infinity ? "Unlimited" : `${currentTier.leadCap} records`;
  analyticsLabel.textContent = currentTier.analytics ? "Included" : "Upgrade required";
  customLogicLabel.textContent = currentTier.customScoring ? "Included" : "Enterprise only";
}

function renderScoringControls() {
  const currentTier = getCurrentTier();
  scoringControls.innerHTML = "";

  Object.entries(state.weights).forEach(([key, value]) => {
    const control = document.createElement("div");
    control.className = "control-group";
    const label = prettifyWeightLabel(key);
    control.innerHTML = `
      <div class="control-topline">
        <strong>${label}</strong>
        <span>${value}</span>
      </div>
      <input type="range" min="0" max="40" step="1" value="${value}" ${currentTier.customScoring ? "" : "disabled"} />
    `;
    const input = control.querySelector("input");
    input.addEventListener("input", (event) => {
      state.weights[key] = Number(event.target.value);
      render();
    });
    scoringControls.appendChild(control);
  });

  scoringHint.textContent = currentTier.customScoring
    ? "Enterprise mode is active. Tune the rule weights to match your closing motion."
    : "Enterprise unlocks custom scoring logic. Other tiers use CloseFlow defaults.";
}

function renderHitList() {
  const currentTier = getCurrentTier();
  const visibleDeals = getVisibleDeals();
  const truncatedCount = Math.max(state.deals.length - visibleDeals.length, 0);

  visibleCountBadge.textContent = `${visibleDeals.length} of ${state.deals.length} records`;
  gatingBadge.textContent = truncatedCount
    ? `${currentTier.name} shows top ${visibleDeals.length}; upgrade to unlock ${truncatedCount} more`
    : `${currentTier.name} mode`;

  hitList.innerHTML = "";

  if (visibleDeals.length === 0) {
    hitList.innerHTML = `<div class="empty-state">Upload a pipeline CSV or load the sample data to generate your hit list.</div>`;
    completionPercent.textContent = "0%";
    return;
  }

  const totalActions = visibleDeals.length * 3;
  const completedActions = visibleDeals.reduce((sum, deal) => {
    return sum + Object.values(deal.actions).filter(Boolean).length;
  }, 0);
  completionPercent.textContent = `${Math.round((completedActions / totalActions) * 100)}%`;

  visibleDeals.forEach((deal) => {
    const fragment = cardTemplate.content.cloneNode(true);
    fragment.querySelector(".deal-company").textContent = deal.company;
    fragment.querySelector(".deal-name").textContent = deal.name;
    fragment.querySelector(".score-pill").textContent = `${deal.score} pts`;

    const meta = fragment.querySelector(".deal-meta");
    meta.append(
      createMetaTag(`Stage: ${deal.stage}`),
      createMetaTag(`Value: ${currency(deal.value)}`),
      createMetaTag(`Owner: ${deal.owner}`),
      createMetaTag(`Last touch: ${deal.daysSinceLastContact}d ago`)
    );

    fragment.querySelector(".deal-reason").textContent = getDealReason(deal, deal.score);

    const actionRow = fragment.querySelector(".action-row");
    const actionGroup = document.createElement("div");
    actionGroup.className = "action-group";

    ["call", "email", "proposal"].forEach((actionKey) => {
      const chip = document.createElement("label");
      chip.className = "action-chip";
      chip.innerHTML = `
        <input type="checkbox" ${deal.actions[actionKey] ? "checked" : ""} />
        <span>${prettifyWeightLabel(actionKey)}</span>
      `;
      chip.querySelector("input").addEventListener("change", (event) => {
        const targetDeal = state.deals.find((item) => item.id === deal.id);
        targetDeal.actions[actionKey] = event.target.checked;
        renderHitList();
        renderMetrics();
      });
      actionGroup.appendChild(chip);
    });

    const cta = document.createElement("a");
    cta.className = "cta-link";
    cta.href = deal.email ? `mailto:${deal.email}` : "#";
    cta.textContent = deal.email ? "Open outreach" : "No email on file";

    actionRow.append(actionGroup, cta);
    hitList.appendChild(fragment);
  });
}

function createMetaTag(text) {
  const tag = document.createElement("span");
  tag.className = "meta-group";
  tag.textContent = text;
  return tag;
}

function renderMetrics() {
  const visibleDeals = getVisibleDeals();
  const currentTier = getCurrentTier();
  const pipelineValue = visibleDeals.reduce((sum, deal) => sum + deal.value, 0);
  const highIntentCount = visibleDeals.filter((deal) => deal.intent === "High").length;
  const overdueCount = visibleDeals.filter((deal) => deal.daysSinceLastContact >= 7).length;
  const completedActions = visibleDeals.reduce((sum, deal) => {
    return sum + Object.values(deal.actions).filter(Boolean).length;
  }, 0);

  const metrics = [
    { label: "Visible pipeline", value: currency(pipelineValue) },
    { label: "High-intent deals", value: String(highIntentCount) },
    { label: "Stale follow-ups", value: String(overdueCount) },
    {
      label: currentTier.analytics ? "Actions completed" : "Execution signals",
      value: String(completedActions)
    }
  ];

  metricsGrid.innerHTML = "";
  metrics.forEach((metric) => {
    const card = document.createElement("div");
    card.className = "metric-card";
    card.innerHTML = `
      <span class="metric-label">${metric.label}</span>
      <strong>${metric.value}</strong>
    `;
    metricsGrid.appendChild(card);
  });
}

function renderAnalytics() {
  const currentTier = getCurrentTier();
  analyticsContent.innerHTML = "";

  if (!currentTier.analytics) {
    analyticsPanel.style.opacity = "0.6";
    analyticsContent.innerHTML = `<div class="empty-state">Team analytics unlock on Pro and Enterprise.</div>`;
    return;
  }

  analyticsPanel.style.opacity = "1";
  const grouped = getVisibleDeals().reduce((acc, deal) => {
    if (!acc[deal.owner]) {
      acc[deal.owner] = { count: 0, value: 0, score: 0 };
    }
    acc[deal.owner].count += 1;
    acc[deal.owner].value += deal.value;
    acc[deal.owner].score += deal.score;
    return acc;
  }, {});

  Object.entries(grouped)
    .sort((a, b) => b[1].score - a[1].score)
    .forEach(([owner, stats]) => {
      const row = document.createElement("div");
      row.className = "analytics-row";
      row.innerHTML = `
        <div>
          <strong>${owner}</strong>
          <span>${stats.count} active deals</span>
        </div>
        <div>
          <strong>${currency(stats.value)}</strong>
          <span>${Math.round(stats.score / stats.count)} avg score</span>
        </div>
      `;
      analyticsContent.appendChild(row);
    });
}

function prettifyWeightLabel(key) {
  const map = {
    dealValue: "Deal value",
    recency: "Recency gap",
    intent: "Intent",
    closeWindow: "Close window",
    stage: "Stage momentum",
    call: "Log call",
    email: "Send email",
    proposal: "Advance deal"
  };
  return map[key] || key;
}

function parseCsv(text) {
  const rows = text
    .trim()
    .split(/\r?\n/)
    .map((row) => splitCsvLine(row));

  if (rows.length < 2) {
    throw new Error("CSV needs a header row and at least one record.");
  }

  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map((columns, index) => {
    const record = {};
    headers.forEach((header, columnIndex) => {
      record[header] = columns[columnIndex] || "";
    });
    return addDealDefaults(
      {
        id: `csv-${index + 1}`,
        name: record.name,
        company: record.company,
        stage: record.stage,
        value: record.value,
        daysSinceLastContact: record.dayssincelastcontact || record.dayssincecontact,
        intent: record.intent,
        closeDate: record.closedate,
        owner: record.owner,
        email: record.email,
        phone: record.phone
      },
      index
    );
  });
}

function splitCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function normalizeHeader(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

csvInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    state.deals = parseCsv(text);
    uploadStatus.textContent = `Loaded ${state.deals.length} deals from ${file.name}.`;
    render();
  } catch (error) {
    uploadStatus.textContent = error.message;
  } finally {
    csvInput.value = "";
  }
});

loadSampleButton.addEventListener("click", () => {
  state.deals = sampleDeals.map(addDealDefaults);
  uploadStatus.textContent = "Loaded the sample pipeline. You can replace it with your own CSV any time.";
  render();
});

function render() {
  renderTierSelector();
  renderScoringControls();
  renderHitList();
  renderMetrics();
  renderAnalytics();
}

render();
