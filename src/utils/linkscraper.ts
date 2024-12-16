/**
 * Link scraping utilities for finding Terms of Service links
 */
import type { ScrapedLink } from "../types";

const TOS_KEYWORDS = [
  "terms",
  "terms of service",
  "terms & conditions",
  "terms and conditions",
  "legal",
  "privacy policy",
  "user agreement",
  "tos",
  "eula",
  "end user license agreement",
  "data policy",
  "cookie policy",
  "terms-of-service",
  "terms-of-use",
  "privacy",
  "policy",
  "guidelines",
  "terms of use",
  "privacy notice",
  "service agreement",
  "privacy-statement",
];

// Calculate confidence score for a link
function calculateConfidence(link: HTMLAnchorElement): number {
  const text = link.textContent?.toLowerCase() || "";
  const href = link.href.toLowerCase();

  const LEGAL_PATTERNS = [
    /\/terms\b/i,
    /\/tos\b/i,
    /\/legal\b/i,
    /\/policy\b/i,
    /\/privacy\b/i,
    /\/agreement\b/i,
    /\/disclaimer\b/i,
    /\bterms\b.*\.(com|net|org|io|gov)/i,
    /\/docs\/terms\b/i,
    /\/help\/legal\b/i,
  ];

  // Check if link text matches any ToS keywords
  const hasKeyword = TOS_KEYWORDS.some(
    (keyword) => text.includes(keyword) || href.includes(keyword)
  );

  const matchesPattern = LEGAL_PATTERNS.some((pattern) => pattern.test(href));

  if (!hasKeyword && !matchesPattern) return 0;

  let score = 0;

  if (hasKeyword) score += 0.4;
  if (matchesPattern) score += 0.5;

  if (/\/(help|docs|support)\//.test(href) && matchesPattern) score += 0.1;

  return Math.min(score, 1); // Cap at 1
}

// Main scraping function that runs in the context of the active tab
export async function scrapeLegalLinks(): Promise<ScrapedLink[]> {
  try {
    // Development mode check
    if (typeof chrome === "undefined" || !chrome.tabs) {
      alert("No active tabs found");
      return [];
    }

    // Get active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    console.log(tab.id);
    if (!tab.id) throw new Error("No active tab found");

    // Execute scraping in the context of the active tab
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // This function runs in the context of the web page
        const footerLinks = Array.from(
          document.querySelectorAll('a[href*="/terms"]')
        ) as HTMLAnchorElement[];

        console.log(footerLinks);

        return footerLinks.map((link) => ({
          url: link.href,
          text: link.textContent || "",
        }));
      },
    });
    // Process and filter results
    const links = results[0]?.result;
    if (!links) throw new Error("No links found");

    return links
      .map((link) => {
        console.log(link.url);
        const tempLink = document.createElement("a");
        tempLink.href = link.url;
        tempLink.textContent = link.text;

        return {
          url: link.url,
          text: link.text,
          confidence: calculateConfidence(tempLink),
        };
      })
      .filter((link) => link.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence);
  } catch (error) {
    console.error("Error scraping legal links:", error);
    return [];
  }
}
