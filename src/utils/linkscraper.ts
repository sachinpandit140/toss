/**
 * Link scraping utilities for finding Terms of Service links
 */
import type { ScrapedLink } from "../types";

// Common terms used in ToS link text
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
];

// Calculate confidence score for a link
function calculateConfidence(link: HTMLAnchorElement): number {
  const text = link.textContent?.toLowerCase() || "";
  const href = link.href.toLowerCase();

  // Check if link text matches any ToS keywords
  const hasKeyword = TOS_KEYWORDS.some(
    (keyword) => text.includes(keyword) || href.includes(keyword)
  );

  if (!hasKeyword) return 0;

  let score = 0;

  // Increase score based on various factors
  if (link.closest("footer")) score += 0.3;
  if (href.includes("terms") || href.includes("tos")) score += 0.3;
  if (text.includes("terms of service")) score += 0.4;
  if (href.includes("/legal/") || href.includes("/terms/")) score += 0.2;

  return Math.min(score, 1); // Cap at 1
}

// Main scraping function that runs in the context of the active tab
export async function scrapeLegalLinks(): Promise<ScrapedLink[]> {
  try {
    // Development mode check
    if (typeof chrome === "undefined" || !chrome.tabs) {
      console.log("Development mode - returning mock data");
      return [
        {
          url: "https://example.com/terms",
          text: "Terms of Service",
          confidence: 1,
        },
      ];
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
