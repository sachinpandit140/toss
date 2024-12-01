export type Page = 'home' | 'about' | 'result' | 'history';

export interface StorageResult {
  foundLinks?: string[];
}

export interface NavigationProps {
  backToHome: () => void;
}

export interface ResultProps extends NavigationProps {
  url: string;
}