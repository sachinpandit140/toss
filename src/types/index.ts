export type Page = "home" | "about" | "result" | "history" | "select";

export interface StorageResult {
  foundLinks?: string[];
}

export interface NavigationProps {
  backToHome: () => void;
}

export interface ResultProps extends NavigationProps {
  url: string;
}

export interface ScrapedLink {
  url: string;
  confidence: number;
}
