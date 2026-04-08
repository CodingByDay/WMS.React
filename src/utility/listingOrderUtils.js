function deepFindOrderKey(o, depth = 0) {
  if (!o || typeof o !== "object" || depth > 10) return null;
  const keys = [
    "Key",
    "key",
    "acKey",
    "LinkKey",
    "OrderKey",
    "orderKey",
    "DocumentKey",
    "documentKey",
  ];
  for (const k of keys) {
    if (k in o) {
      const v = o[k];
      if (v != null && v !== "") return String(v);
    }
  }
  if (Array.isArray(o)) {
    for (const el of o) {
      const f = deepFindOrderKey(el, depth + 1);
      if (f != null && f !== "") return f;
    }
    return null;
  }
  for (const v of Object.values(o)) {
    if (v && typeof v === "object") {
      const f = deepFindOrderKey(v, depth + 1);
      if (f != null && f !== "") return f;
    }
  }
  return null;
}

/**
 * After a listing SQL refresh, find acKey values that were not present before createOrder
 * (used when the API returns Success but no Key).
 */
export function pickNovelOrderKeyFromRows(previousKeys, rows) {
  if (!Array.isArray(rows)) return null;
  const prev =
    previousKeys instanceof Set
      ? previousKeys
      : new Set(
          Array.isArray(previousKeys)
            ? previousKeys.map((k) => String(k))
            : [],
        );
  const current = [];
  for (const r of rows) {
    if (r && r.acKey != null && r.acKey !== "") {
      current.push(String(r.acKey));
    }
  }
  const novel = current.filter((k) => !prev.has(k));
  if (novel.length === 1) return novel[0];
  /** Multiple new keys (rare); last in result set is the best guess */
  if (novel.length > 1 && prev.size > 0) return novel[novel.length - 1];
  return null;
}

/**
 * Best-effort extraction of the new order key from createOrder API payload
 * (shape varies by backend; used to focus the new row in the listing grid).
 */
export function pickCreatedOrderKey(response) {
  if (!response || typeof response !== "object") return null;
  const direct =
    response.Key ??
    response.key ??
    response.acKey ??
    response.LinkKey ??
    response.OrderKey ??
    response.orderKey;
  if (direct != null && direct !== "") return String(direct);
  const data = response.Data;
  if (data && typeof data === "object") {
    const inner =
      data.Key ?? data.key ?? data.acKey ?? data.LinkKey ?? data.OrderKey;
    if (inner != null && inner !== "") return String(inner);
  }
  const nested = deepFindOrderKey(response);
  if (nested != null && nested !== "") return nested;
  return null;
}

function deepFindPositionItemId(o, depth = 0) {
  if (!o || typeof o !== "object" || depth > 10) return null;
  const keys = [
    "ItemID",
    "itemID",
    "ItemId",
    "itemId",
    "OrderItemID",
    "orderItemID",
    "LineID",
    "lineID",
  ];
  for (const k of keys) {
    if (k in o) {
      const v = o[k];
      if (v != null && v !== "") return v;
    }
  }
  if (Array.isArray(o)) {
    for (const el of o) {
      const f = deepFindPositionItemId(el, depth + 1);
      if (f != null && f !== "") return f;
    }
    return null;
  }
  for (const v of Object.values(o)) {
    if (v && typeof v === "object") {
      const f = deepFindPositionItemId(v, depth + 1);
      if (f != null && f !== "") return f;
    }
  }
  return null;
}

/**
 * New line id from setOrderItem / createPosition response (for positions grid focus).
 */
export function pickCreatedPositionItemId(response) {
  if (!response || typeof response !== "object") return null;
  const direct =
    response.ItemID ??
    response.itemID ??
    response.ItemId ??
    response.itemId ??
    response.ID ??
    response.Id;
  if (direct != null && direct !== "") return direct;
  const data = response.Data;
  if (data && typeof data === "object") {
    const inner =
      data.ItemID ??
      data.itemID ??
      data.ItemId ??
      data.ID ??
      data.Id;
    if (inner != null && inner !== "") return inner;
  }
  const nested = deepFindPositionItemId(response);
  if (nested != null && nested !== "") return nested;
  return null;
}

export function formatJsonForDisplay(value) {
  try {
    if (typeof value === "string") return value;
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function toDateInputValue(raw) {
  if (raw == null || raw === "") return "";
  if (typeof raw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const date = raw instanceof Date ? raw : new Date(raw);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

/**
 * API often sends "2023-09-15T12:01:00" (no TZ). For listing grid + filter we only care
 * about the calendar day in local time — use a Date at local midnight so DevExtreme
 * date column and FilterRow compare by date, not time.
 */
export function toLocalDateAtMidnight(raw) {
  if (raw == null || raw === "") return null;
  if (raw instanceof Date) {
    if (Number.isNaN(raw.getTime())) return null;
    return new Date(raw.getFullYear(), raw.getMonth(), raw.getDate());
  }
  if (typeof raw === "string") {
    const s = raw.trim();
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) {
      const y = Number(m[1]);
      const mo = Number(m[2]) - 1;
      const d = Number(m[3]);
      return new Date(y, mo, d);
    }
    const parsed = new Date(s);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Date(
      parsed.getFullYear(),
      parsed.getMonth(),
      parsed.getDate(),
    );
  }
  return null;
}
