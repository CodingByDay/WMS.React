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
  return null;
}

export function toDateInputValue(raw) {
  if (raw == null || raw === "") return "";
  if (typeof raw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const date = raw instanceof Date ? raw : new Date(raw);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}
