import crypto from "node:crypto";

const SPREADSHEET_ID = "13xqcvsFYK587vdd430OeH0B6oKAz9Ysfi0djyEOxlOA";

type LeadType = "Player" | "Academy";

type TabConfig = {
  title: string;
  prefix: string;
  blankFields: string[];
  keys: [string, string][];
};

const TABS: Record<LeadType, TabConfig> = {
  Player: {
    title: "Player Leads",
    prefix: "PL",
    blankFields: ["submittedAt", "playerName", "mobile"],
    keys: [
      ["leadId", "lead id"],
      ["submittedAt", "date & time"],
      ["leadType", "lead type"],
      ["playerName", "player full name"],
      ["age", "age"],
      ["mobile", "mobile"],
      ["sports", "sport"],
      ["academyName", "academy"],
      ["coach", "coach"],
      ["location", "location"],
      ["leadSource", "lead source"],
      ["status", "status"],
      ["assignedTo", "assigned"],
      ["followUp", "follow-up"],
      ["notes", "notes"],
    ],
  },
  Academy: {
    title: "Academy Leads",
    prefix: "AL",
    blankFields: ["submittedAt", "academyName", "contactPerson", "mobile", "email"],
    keys: [
      ["leadId", "lead id"],
      ["submittedAt", "date & time"],
      ["leadType", "lead type"],
      ["academyName", "academy name"],
      ["sports", "sport"],
      ["contactPerson", "contact person"],
      ["mobile", "mobile"],
      ["email", "email"],
      ["athletes", "athlete"],
      ["location", "location"],
      ["leadSource", "lead source"],
      ["status", "status"],
      ["assignedTo", "assigned"],
      ["followUp", "follow-up"],
      ["notes", "notes"],
    ],
  },
};

export type AcademyLeadInput = {
  leadType: LeadType;
  playerName?: string;
  age?: string;
  coach?: string;
  academyName?: string;
  sports?: string;
  contactPerson?: string;
  mobile?: string;
  email?: string;
  athletes?: string;
  location?: string;
  notes?: string;
  leadSource?: string;
  status?: string;
  submittedAt?: string;
};

function privateKey() {
  let key = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").trim();
  // Vercel / dashboard pastes often wrap the PEM in quotes or use literal \n.
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n");
}

async function accessToken(useSubject: boolean) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = privateKey();
  if (!email || !key) throw new Error("Google sheet credentials are not configured");
  const now = Math.floor(Date.now() / 1000);
  const claim: Record<string, string | number> = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  if (useSubject && process.env.GOOGLE_SERVICE_ACCOUNT_SUBJECT) {
    claim.sub = process.env.GOOGLE_SERVICE_ACCOUNT_SUBJECT;
  }
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify(claim)).toString("base64url");
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  const assertion = `${header}.${payload}.${signer.sign(key, "base64url")}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const body = (await response.json()) as { access_token?: string; error_description?: string; error?: string };
  if (!response.ok || !body.access_token) {
    throw new Error(body.error_description || body.error || "Google auth failed");
  }
  return body.access_token;
}

async function sheetsFetch(token: string, path: string, options: RequestInit = {}) {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      typeof body === "object" && body && "error" in body
        ? String((body as { error?: { message?: string } }).error?.message || "Google sheet request failed")
        : "Google sheet request failed";
    const error = new Error(message) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  return body as { values?: string[][]; spreadsheetId?: string };
}

function columnLetter(index: number) {
  let value = index + 1;
  let letters = "";
  while (value > 0) {
    const remainder = (value - 1) % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    value = Math.floor((value - 1) / 26);
  }
  return letters;
}

function quoteSheet(title: string) {
  return `'${String(title).replace(/'/g, "''")}'`;
}

function headerMap(row: string[], keys: [string, string][]) {
  const map: Record<string, number> = {};
  row.forEach((cell, index) => {
    const name = String(cell || "").toLowerCase();
    for (const [key, needle] of keys) {
      if (map[key] === undefined && name.includes(needle)) map[key] = index;
    }
  });
  return map;
}

function isBlankLead(row: string[], columns: Record<string, number>, fields: string[]) {
  return fields.every((field) => {
    const index = columns[field];
    return index === undefined || !String(row[index] || "").trim();
  });
}

function stamp() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value || "";
  return `${part("day")} ${part("month")} ${part("year")}, ${part("hour")}:${part("minute")} IST`;
}

async function sheetToken() {
  try {
    const token = await accessToken(false);
    await sheetsFetch(token, "?fields=spreadsheetId");
    return token;
  } catch (error) {
    const status = (error as { status?: number }).status;
    if (status !== 403 || !process.env.GOOGLE_SERVICE_ACCOUNT_SUBJECT) throw error;
    return accessToken(true);
  }
}

export async function saveAcademyLead(lead: AcademyLeadInput) {
  const tab = TABS[lead.leadType] || TABS.Academy;
  const token = await sheetToken();
  const title = tab.title;
  const quoted = quoteSheet(title);
  const existing = await sheetsFetch(token, `/values/${encodeURIComponent(`${quoted}!A1:Z400`)}`);
  const rows = existing.values || [];
  let headerIndex = rows.findIndex((row) => {
    const columns = headerMap(row, tab.keys);
    return columns.mobile !== undefined && (columns.playerName !== undefined || columns.academyName !== undefined);
  });
  if (headerIndex < 0) headerIndex = 1;
  const columns = headerMap(rows[headerIndex] || [], tab.keys);
  const width = Math.max(...Object.values(columns), 14) + 1;
  const dataRows = rows.slice(headerIndex + 1);
  const blankOffset = dataRows.findIndex((row) => isBlankLead(row, columns, tab.blankFields));
  const rowNumber = headerIndex + 1 + (blankOffset >= 0 ? blankOffset + 1 : dataRows.length + 1);
  const usedIds = dataRows.reduce((max, row) => {
    const match = String(row[columns.leadId] || "").match(new RegExp(`^${tab.prefix}-(\\d+)$`));
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  const current = blankOffset >= 0 ? dataRows[blankOffset] : [];
  const cells = Array.from({ length: width }, (_, index) => current[index] || "");
  const write = (key: string, value: string | undefined | null) => {
    if (columns[key] === undefined || value === undefined || value === null) return;
    cells[columns[key]] = value;
  };
  write("leadId", `${tab.prefix}-${String(usedIds + 1).padStart(4, "0")}`);
  write("submittedAt", lead.submittedAt || stamp());
  write("leadType", tab === TABS.Player ? "Player" : "Academy");
  write("playerName", lead.playerName);
  write("age", lead.age);
  write("coach", lead.coach);
  write("academyName", lead.academyName);
  write("sports", lead.sports);
  write("contactPerson", lead.contactPerson);
  write("mobile", lead.mobile);
  write("email", lead.email);
  write("athletes", lead.athletes);
  write("location", lead.location);
  write("leadSource", lead.leadSource || "Website");
  write("status", lead.status || "New");
  write("notes", lead.notes);
  const range = `${quoted}!A${rowNumber}:${columnLetter(width - 1)}${rowNumber}`;
  await sheetsFetch(token, `/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    body: JSON.stringify({ values: [cells] }),
  });
  return { row: rowNumber, tab: title };
}
