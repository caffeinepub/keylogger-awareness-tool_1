// Educational content for each test scenario
// Awareness-focused, defensive tone, no instructions enabling wrongdoing

export interface ScenarioContent {
  id: string;
  title: string;
  content: string;
}

export const scenarioLearningContent: Record<string, ScenarioContent> = {
  'low-risk': {
    id: 'low-risk',
    title: 'Understanding Low-Risk Behavior',
    content: 'Low-risk typing patterns typically involve simple, everyday text without sensitive information. These patterns include casual messages, general notes, or basic web searches. While keyloggers can capture this data, it usually doesn\'t contain immediately exploitable information. However, even seemingly harmless data can be used to build profiles or identify patterns over time. Best practice: Always assume any device could be monitored and avoid typing sensitive information on untrusted systems.',
  },
  'medium-risk': {
    id: 'medium-risk',
    title: 'Recognizing Medium-Risk Patterns',
    content: 'Medium-risk behavior involves typing that includes numbers, mixed content, or longer text sequences. This might include addresses, phone numbers, or detailed personal information. Keyloggers capturing this data can piece together identity information, contact details, or behavioral patterns. The risk escalates when multiple data points are combined. Protection tip: Use password managers to avoid typing credentials, and be cautious about entering personal details on public or shared computers.',
  },
  'high-risk': {
    id: 'high-risk',
    title: 'High-Risk Typing Behavior',
    content: 'High-risk patterns emerge when typing includes password-like structures, administrative terms, or sensitive keywords. These patterns often combine uppercase letters, numbers, and special characters—typical of secure passwords. Keyloggers specifically target these patterns because they likely represent authentication credentials. Once captured, attackers can gain unauthorized access to accounts, systems, or sensitive data. Defense strategy: Never type passwords directly; use biometric authentication, hardware keys, or trusted password managers instead.',
  },
  'password-pattern': {
    id: 'password-pattern',
    title: 'Password Pattern Recognition',
    content: 'Strong password formats are immediately recognizable to keyloggers through their characteristic structure: mixed case, numbers, and special characters. Advanced keyloggers use pattern recognition to flag potential passwords for priority extraction. Even if the password itself is strong, typing it on a compromised system renders it useless. This is why password reuse is so dangerous—one compromised password can unlock multiple accounts. Security measure: Enable two-factor authentication (2FA) on all accounts to add a layer of protection beyond passwords.',
  },
  'rapid-typing': {
    id: 'rapid-typing',
    title: 'Rapid Typing Detection',
    content: 'Typing speed analysis is a sophisticated keylogger technique that identifies when users are entering memorized information, such as passwords or PINs. Rapid, consistent typing without pauses suggests the user isn\'t thinking about what they\'re typing—a strong indicator of credential entry. This behavioral analysis helps attackers prioritize which captured data to examine first. Awareness: Varying your typing speed won\'t protect you on a compromised system; the solution is to avoid typing sensitive information altogether.',
  },
  'sensitive-keywords': {
    id: 'sensitive-keywords',
    title: 'Sensitive Keyword Targeting',
    content: 'Modern keyloggers employ keyword filtering to automatically flag entries containing terms like "password," "admin," "login," "credit card," or "SSN." This allows attackers to efficiently process large volumes of captured data by focusing on high-value information. Even typing these words in non-sensitive contexts can trigger alerts. The presence of these keywords often indicates that valuable data is nearby in the keystroke log. Prevention: Assume any text containing sensitive keywords will be flagged and prioritized for analysis.',
  },
  'long-input': {
    id: 'long-input',
    title: 'Extended Input Sessions',
    content: 'Long typing sessions are particularly valuable to keyloggers because they provide rich contextual data with increased probability that sensitive information appears somewhere in the text. Extended inputs might include emails, documents, chat conversations, or form submissions. Attackers use natural language processing to extract valuable information from lengthy captures. The more you type on an untrusted system, the more data points you provide for analysis. Safety rule: Minimize all typing on untrusted systems, and never type sensitive content regardless of session length.',
  },
  'false-positive': {
    id: 'false-positive',
    title: 'Understanding False Positives',
    content: 'False positives occur when security systems incorrectly flag normal, legitimate behavior as suspicious. This can happen when innocent text coincidentally matches risk patterns—for example, discussing security topics or typing technical documentation. While frustrating, false positives are preferable to false negatives (missing real threats). Modern detection systems balance sensitivity and specificity, but no system is perfect. User awareness: If flagged incorrectly, understand that the system is erring on the side of caution to protect you.',
  },
  'auto-block-trigger': {
    id: 'auto-block-trigger',
    title: 'Automatic Blocking Systems',
    content: 'Auto-blocking is a protective mechanism that immediately stops input when extremely high-risk patterns are detected. This prevents further exposure of sensitive information once credential-like patterns are identified. While this can interrupt legitimate work, it serves as a critical safety net on potentially compromised systems. In real-world scenarios, such blocking might manifest as account lockouts, session terminations, or security alerts. Best practice: If auto-blocking occurs, stop immediately, verify system security, and change any credentials that may have been exposed.',
  },
  'mixed-patterns': {
    id: 'mixed-patterns',
    title: 'Multiple Risk Factor Detection',
    content: 'Mixed pattern scenarios combine multiple risk indicators: sensitive keywords, password-like structures, rapid typing, and contextual clues. This combination creates a high-confidence detection that credentials or sensitive data are being entered. Keyloggers use multi-factor analysis to reduce false positives while ensuring real threats are caught. When multiple risk factors align, the probability of capturing valuable data increases dramatically. Defense: The presence of any single risk factor should prompt caution; multiple factors demand immediate action to protect your information.',
  },
  'public-shared-computer-login': {
    id: 'public-shared-computer-login',
    title: 'Public Computer Login Risks',
    content: 'Logging into personal accounts on public or shared computers (libraries, cafes, hotels, airports) is extremely dangerous. These systems are prime targets for keyloggers because they serve many users, often lack proper security updates, and may be physically accessible to attackers who can install malicious software or hardware keyloggers. Every keystroke—including your username and password—can be captured and transmitted to attackers. Even "secure" public computers can be compromised. Critical safety rules: Never log into banking, email, or social media on public computers. If absolutely necessary, change your password immediately from a trusted device. Use guest/incognito mode and always log out completely. Better alternatives: Use your personal device with mobile data, or wait until you have access to a trusted computer.',
  },
};

export function getScenarioContent(scenarioId: string): ScenarioContent | null {
  return scenarioLearningContent[scenarioId] || null;
}
