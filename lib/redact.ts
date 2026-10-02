// Mask personal data before it's written to logs.
const EMAIL = /([A-Za-z0-9._%+-])[A-Za-z0-9._%+-]*@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;
const PHONE = /(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}\b/g; // Indian mobile numbers

export function redact(text: string): string {
  return text
    .replace(EMAIL, '$1***@$2')    // priya@example.com -> p***@example.com
    .replace(PHONE, '[phone]');     // +91 98765 43210   -> [phone]
}