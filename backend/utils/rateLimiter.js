const buckets = new Map(); // userId -> { count, ts }
const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 20;


export function checkRateLimit(userId) {
if (!userId) return false;
const now = Date.now();
const entry = buckets.get(userId) || { count: 0, ts: now };
if (now - entry.ts > WINDOW_MS) {
buckets.set(userId, { count: 1, ts: now });
return false;
}
if (entry.count >= MAX_PER_WINDOW) return true; // rate limited
entry.count += 1;
buckets.set(userId, entry);
return false;
}