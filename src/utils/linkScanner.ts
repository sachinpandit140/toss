export const findLegalLinks = (document: Document): string[] => {
    const links = Array.from(document.getElementsByTagName('a'));
    
    const legalKeywords = [
      'terms',
      'tos',
      'terms of service',
      'privacy',
      'legal',
      'policy',
      'conditions',
      'guidelines',
      'eula',
      'gdpr',
      'terms-of-service',
      'privacy-policy',
      'cookie-policy',
      'privacy-notice',
      'privacy-statement'
    ];
  
    return links
      .filter(link => {
        const href = link.href.toLowerCase();
        const text = link.textContent?.toLowerCase() || '';
        return legalKeywords.some(keyword => 
          href.includes(keyword) || text.includes(keyword)
        );
      })
      .map(link => link.href);
  };