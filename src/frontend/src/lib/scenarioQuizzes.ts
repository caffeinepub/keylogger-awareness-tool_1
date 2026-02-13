// Quiz data for each test scenario
// Educational/defensive tone, 5 questions per scenario

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ScenarioQuiz {
  scenarioId: string;
  questions: QuizQuestion[];
}

export const scenarioQuizzes: Record<string, ScenarioQuiz> = {
  'low-risk': {
    scenarioId: 'low-risk',
    questions: [
      {
        question: 'Why should you be cautious even when typing "low-risk" content?',
        options: [
          'Low-risk content is never monitored',
          'Data can be used to build profiles over time',
          'Keyloggers only capture passwords',
          'Simple text is automatically encrypted',
        ],
        correctIndex: 1,
        explanation: 'Even seemingly harmless data can be used to build behavioral profiles and identify patterns over time.',
      },
      {
        question: 'What is the best practice when using untrusted systems?',
        options: [
          'Type quickly to avoid detection',
          'Only use lowercase letters',
          'Assume any device could be monitored',
          'Clear your browser history after use',
        ],
        correctIndex: 2,
        explanation: 'Always assume any device could be monitored and avoid typing sensitive information on untrusted systems.',
      },
      {
        question: 'What type of information is considered "low-risk"?',
        options: [
          'Credit card numbers',
          'Casual messages and general notes',
          'Social Security numbers',
          'Bank account passwords',
        ],
        correctIndex: 1,
        explanation: 'Low-risk content typically includes casual messages, general notes, or basic web searches without sensitive information.',
      },
      {
        question: 'Can low-risk data become dangerous over time?',
        options: [
          'No, it remains harmless forever',
          'Only if combined with passwords',
          'Yes, when multiple data points are combined',
          'Only on public computers',
        ],
        correctIndex: 2,
        explanation: 'Multiple low-risk data points can be combined to create detailed profiles or identify exploitable patterns.',
      },
      {
        question: 'What should you avoid on shared computers?',
        options: [
          'Using the mouse',
          'Typing any sensitive information',
          'Opening web browsers',
          'Adjusting screen brightness',
        ],
        correctIndex: 1,
        explanation: 'Never type sensitive information on shared or public computers, as they may be compromised with keyloggers.',
      },
    ],
  },
  'medium-risk': {
    scenarioId: 'medium-risk',
    questions: [
      {
        question: 'What characterizes medium-risk typing behavior?',
        options: [
          'Only typing letters',
          'Typing that includes numbers and mixed content',
          'Using only special characters',
          'Typing in all caps',
        ],
        correctIndex: 1,
        explanation: 'Medium-risk behavior involves typing that includes numbers, mixed content, or longer text sequences like addresses or phone numbers.',
      },
      {
        question: 'Why is typing phone numbers considered medium-risk?',
        options: [
          'Phone numbers are always encrypted',
          'They can be used for identity verification',
          'Keyloggers cannot capture numbers',
          'Phone numbers are too short to matter',
        ],
        correctIndex: 1,
        explanation: 'Phone numbers and similar personal details can be used for identity verification, social engineering, or building comprehensive profiles.',
      },
      {
        question: 'What tool helps avoid typing credentials directly?',
        options: [
          'Antivirus software',
          'Password managers',
          'Web browsers',
          'Email clients',
        ],
        correctIndex: 1,
        explanation: 'Password managers allow you to avoid typing credentials directly, reducing exposure to keyloggers.',
      },
      {
        question: 'How do keyloggers use medium-risk data?',
        options: [
          'They ignore it completely',
          'They piece together identity information',
          'They only store it temporarily',
          'They automatically delete it',
        ],
        correctIndex: 1,
        explanation: 'Keyloggers can piece together identity information, contact details, and behavioral patterns from medium-risk data.',
      },
      {
        question: 'When does medium-risk data become more dangerous?',
        options: [
          'Never, it stays the same',
          'Only at night',
          'When multiple data points are combined',
          'Only on weekends',
        ],
        correctIndex: 2,
        explanation: 'The risk escalates significantly when multiple data points are combined to create a complete picture of a target.',
      },
    ],
  },
  'high-risk': {
    scenarioId: 'high-risk',
    questions: [
      {
        question: 'What makes typing behavior "high-risk"?',
        options: [
          'Typing very slowly',
          'Using only lowercase letters',
          'Password-like structures with mixed characters',
          'Typing in a foreign language',
        ],
        correctIndex: 2,
        explanation: 'High-risk patterns include password-like structures combining uppercase, lowercase, numbers, and special characters.',
      },
      {
        question: 'Why do keyloggers specifically target high-risk patterns?',
        options: [
          'They are easier to capture',
          'They likely represent authentication credentials',
          'They take up less storage space',
          'They are more common',
        ],
        correctIndex: 1,
        explanation: 'High-risk patterns likely represent authentication credentials that can grant unauthorized access to accounts and systems.',
      },
      {
        question: 'What is the best alternative to typing passwords?',
        options: [
          'Writing them on paper',
          'Using the same password everywhere',
          'Biometric authentication or hardware keys',
          'Typing them very quickly',
        ],
        correctIndex: 2,
        explanation: 'Biometric authentication, hardware keys, or trusted password managers eliminate the need to type passwords directly.',
      },
      {
        question: 'What happens when a strong password is typed on a compromised system?',
        options: [
          'The password remains secure',
          'It becomes useless once captured',
          'The system automatically encrypts it',
          'Nothing, strong passwords cannot be captured',
        ],
        correctIndex: 1,
        explanation: 'Even strong passwords become useless once captured by a keylogger on a compromised system.',
      },
      {
        question: 'What additional security layer protects beyond passwords?',
        options: [
          'Using longer passwords',
          'Changing passwords monthly',
          'Two-factor authentication (2FA)',
          'Using special characters',
        ],
        correctIndex: 2,
        explanation: 'Two-factor authentication (2FA) adds a crucial layer of protection beyond passwords, even if they are compromised.',
      },
    ],
  },
  'password-pattern': {
    scenarioId: 'password-pattern',
    questions: [
      {
        question: 'How do keyloggers recognize password patterns?',
        options: [
          'By file size',
          'Through characteristic structure: mixed case, numbers, special characters',
          'By typing speed only',
          'They cannot recognize patterns',
        ],
        correctIndex: 1,
        explanation: 'Keyloggers recognize passwords through their characteristic structure combining mixed case, numbers, and special characters.',
      },
      {
        question: 'What do advanced keyloggers do with detected password patterns?',
        options: [
          'Delete them immediately',
          'Ignore them',
          'Flag them for priority extraction',
          'Encrypt them for safety',
        ],
        correctIndex: 2,
        explanation: 'Advanced keyloggers use pattern recognition to flag potential passwords for priority extraction and analysis.',
      },
      {
        question: 'Why is password reuse particularly dangerous?',
        options: [
          'It makes passwords easier to remember',
          'One compromised password can unlock multiple accounts',
          'Reused passwords are stronger',
          'It has no additional risk',
        ],
        correctIndex: 1,
        explanation: 'Password reuse is extremely dangerous because one compromised password can unlock multiple accounts across different services.',
      },
      {
        question: 'Does a strong password protect you on a compromised system?',
        options: [
          'Yes, strong passwords are always safe',
          'No, typing it on a compromised system renders it useless',
          'Only if it has special characters',
          'Only if it is very long',
        ],
        correctIndex: 1,
        explanation: 'No password strength can protect you if you type it on a compromised system with a keylogger installed.',
      },
      {
        question: 'What security measure adds protection beyond passwords?',
        options: [
          'Using more special characters',
          'Typing passwords backwards',
          'Enabling two-factor authentication (2FA)',
          'Changing passwords daily',
        ],
        correctIndex: 2,
        explanation: 'Two-factor authentication (2FA) provides essential protection even if passwords are compromised by keyloggers.',
      },
    ],
  },
  'rapid-typing': {
    scenarioId: 'rapid-typing',
    questions: [
      {
        question: 'What does rapid typing speed indicate to keyloggers?',
        options: [
          'The user is a professional typist',
          'The user is entering memorized information like passwords',
          'The text is not important',
          'The system is running fast',
        ],
        correctIndex: 1,
        explanation: 'Rapid, consistent typing without pauses suggests the user is entering memorized information such as passwords or PINs.',
      },
      {
        question: 'How do keyloggers use typing speed analysis?',
        options: [
          'To improve system performance',
          'To identify and prioritize credential entry',
          'To measure user productivity',
          'They do not analyze typing speed',
        ],
        correctIndex: 1,
        explanation: 'Typing speed analysis helps attackers identify when users are entering credentials and prioritize that captured data.',
      },
      {
        question: 'Will varying your typing speed protect you on a compromised system?',
        options: [
          'Yes, it completely prevents detection',
          'No, the solution is to avoid typing sensitive information',
          'Only if you type very slowly',
          'Only if you type very quickly',
        ],
        correctIndex: 1,
        explanation: 'Varying typing speed will not protect you on a compromised system; the only solution is to avoid typing sensitive information altogether.',
      },
      {
        question: 'What is behavioral analysis in keylogging?',
        options: [
          'Analyzing user emotions',
          'Studying typing patterns to identify credential entry',
          'Measuring keyboard quality',
          'Testing internet speed',
        ],
        correctIndex: 1,
        explanation: 'Behavioral analysis studies typing patterns, speed, and rhythm to identify when users are entering sensitive information like credentials.',
      },
      {
        question: 'What should you do instead of typing passwords?',
        options: [
          'Type them very quickly',
          'Type them very slowly',
          'Use password managers or biometric authentication',
          'Type them in random order',
        ],
        correctIndex: 2,
        explanation: 'Use password managers, biometric authentication, or hardware keys to avoid typing passwords on potentially compromised systems.',
      },
    ],
  },
  'sensitive-keywords': {
    scenarioId: 'sensitive-keywords',
    questions: [
      {
        question: 'What are sensitive keywords in keylogging?',
        options: [
          'Common words like "the" and "and"',
          'Terms like "password," "admin," "login," "credit card"',
          'Technical jargon',
          'Foreign language words',
        ],
        correctIndex: 1,
        explanation: 'Sensitive keywords include terms like "password," "admin," "login," "credit card," or "SSN" that indicate valuable data.',
      },
      {
        question: 'How do modern keyloggers use keyword filtering?',
        options: [
          'To delete unwanted data',
          'To automatically flag entries containing high-value terms',
          'To improve typing speed',
          'To correct spelling errors',
        ],
        correctIndex: 1,
        explanation: 'Keyword filtering allows keyloggers to automatically flag and prioritize entries containing high-value terms for efficient data processing.',
      },
      {
        question: 'Can typing sensitive keywords in non-sensitive contexts trigger alerts?',
        options: [
          'No, context is always understood',
          'Yes, even non-sensitive usage can trigger alerts',
          'Only on Tuesdays',
          'Only in email applications',
        ],
        correctIndex: 1,
        explanation: 'Even typing sensitive keywords in non-sensitive contexts can trigger alerts, as automated systems flag the keywords themselves.',
      },
      {
        question: 'Why do attackers prioritize keyword-flagged data?',
        options: [
          'It is easier to read',
          'It indicates valuable information is nearby',
          'It takes less storage space',
          'It is more colorful',
        ],
        correctIndex: 1,
        explanation: 'The presence of sensitive keywords often indicates that valuable data like credentials or financial information is nearby in the keystroke log.',
      },
      {
        question: 'What should you assume about text containing sensitive keywords?',
        options: [
          'It will be ignored by monitoring software',
          'It will be flagged and prioritized by monitoring software',
          'It will be automatically encrypted',
          'It will be deleted immediately',
        ],
        correctIndex: 1,
        explanation: 'Assume any text containing sensitive keywords will be flagged and prioritized by monitoring software for detailed analysis.',
      },
    ],
  },
  'long-input': {
    scenarioId: 'long-input',
    questions: [
      {
        question: 'Why are long typing sessions valuable to keyloggers?',
        options: [
          'They are easier to store',
          'They provide rich contextual data with increased probability of sensitive information',
          'They are faster to transmit',
          'They are not valuable',
        ],
        correctIndex: 1,
        explanation: 'Long typing sessions provide rich contextual data with increased probability that sensitive information appears somewhere in the text.',
      },
      {
        question: 'What might extended inputs include?',
        options: [
          'Only single words',
          'Emails, documents, chat conversations, or form submissions',
          'Only numbers',
          'Only special characters',
        ],
        correctIndex: 1,
        explanation: 'Extended inputs might include emails, documents, chat conversations, or form submissions—all potentially containing sensitive information.',
      },
      {
        question: 'How do attackers process lengthy keystroke captures?',
        options: [
          'They ignore them as too long',
          'They use natural language processing to extract valuable information',
          'They only read the first sentence',
          'They delete them immediately',
        ],
        correctIndex: 1,
        explanation: 'Attackers use natural language processing and automated analysis to extract valuable information from lengthy captures.',
      },
      {
        question: 'What is the relationship between typing length and risk?',
        options: [
          'Longer typing is always safer',
          'Length does not matter',
          'More typing provides more data points for analysis',
          'Shorter typing is always riskier',
        ],
        correctIndex: 2,
        explanation: 'The more you type on an untrusted system, the more data points you provide for analysis and the higher the probability of exposing sensitive information.',
      },
      {
        question: 'What should you do on untrusted systems?',
        options: [
          'Type as much as possible',
          'Only type in short bursts',
          'Minimize all typing, especially of sensitive content',
          'Type only in uppercase',
        ],
        correctIndex: 2,
        explanation: 'Minimize all typing on untrusted systems, and never type sensitive content regardless of the length of your session.',
      },
    ],
  },
  'false-positive': {
    scenarioId: 'false-positive',
    questions: [
      {
        question: 'What is a false positive in security systems?',
        options: [
          'A real threat that is detected',
          'Normal behavior incorrectly flagged as suspicious',
          'A positive attitude toward security',
          'A correctly identified password',
        ],
        correctIndex: 1,
        explanation: 'A false positive occurs when security systems incorrectly flag normal, legitimate behavior as suspicious or threatening.',
      },
      {
        question: 'What can cause false positives?',
        options: [
          'Actual malicious behavior',
          'Legitimate text that coincidentally matches risk patterns',
          'Turning off the computer',
          'Using antivirus software',
        ],
        correctIndex: 1,
        explanation: 'False positives occur when innocent text coincidentally matches risk patterns, such as discussing security topics or typing technical documentation.',
      },
      {
        question: 'Are false positives preferable to false negatives?',
        options: [
          'No, false negatives are better',
          'Yes, missing real threats is more dangerous',
          'They are equally bad',
          'Neither should ever occur',
        ],
        correctIndex: 1,
        explanation: 'False positives are preferable to false negatives (missing real threats) because erring on the side of caution protects users better.',
      },
      {
        question: 'How do modern detection systems handle false positives?',
        options: [
          'They eliminate them completely',
          'They ignore the problem',
          'They balance sensitivity and specificity',
          'They only focus on false negatives',
        ],
        correctIndex: 2,
        explanation: 'Modern detection systems balance sensitivity (catching threats) and specificity (avoiding false alarms), though no system is perfect.',
      },
      {
        question: 'What should you understand if flagged incorrectly?',
        options: [
          'The system is broken and useless',
          'You should disable all security',
          'The system is erring on the side of caution to protect you',
          'You are definitely doing something wrong',
        ],
        correctIndex: 2,
        explanation: 'If flagged incorrectly, understand that the system is erring on the side of caution to protect you from potential threats.',
      },
    ],
  },
  'auto-block-trigger': {
    scenarioId: 'auto-block-trigger',
    questions: [
      {
        question: 'What is auto-blocking in security systems?',
        options: [
          'Blocking all internet traffic',
          'Immediately stopping input when high-risk patterns are detected',
          'Preventing users from typing anything',
          'Blocking only email applications',
        ],
        correctIndex: 1,
        explanation: 'Auto-blocking is a protective mechanism that immediately stops input when extremely high-risk patterns are detected.',
      },
      {
        question: 'Why does auto-blocking occur?',
        options: [
          'To annoy users',
          'To prevent further exposure of sensitive information',
          'To save battery power',
          'To improve typing speed',
        ],
        correctIndex: 1,
        explanation: 'Auto-blocking prevents further exposure of sensitive information once credential-like patterns are identified.',
      },
      {
        question: 'How might auto-blocking manifest in real-world scenarios?',
        options: [
          'Computer shutting down',
          'Account lockouts, session terminations, or security alerts',
          'Faster internet speed',
          'Automatic password changes',
        ],
        correctIndex: 1,
        explanation: 'In real-world scenarios, auto-blocking might manifest as account lockouts, session terminations, or security alerts.',
      },
      {
        question: 'What should you do if auto-blocking occurs?',
        options: [
          'Keep trying to type',
          'Restart the computer immediately',
          'Stop, verify system security, and change exposed credentials',
          'Ignore it and continue working',
        ],
        correctIndex: 2,
        explanation: 'If auto-blocking occurs, stop immediately, verify system security, and change any credentials that may have been exposed.',
      },
      {
        question: 'Is auto-blocking interrupting legitimate work a problem?',
        options: [
          'Yes, it should never interrupt work',
          'No, it serves as a critical safety net on potentially compromised systems',
          'Only if it happens frequently',
          'Only on weekends',
        ],
        correctIndex: 1,
        explanation: 'While auto-blocking can interrupt legitimate work, it serves as a critical safety net on potentially compromised systems.',
      },
    ],
  },
  'mixed-patterns': {
    scenarioId: 'mixed-patterns',
    questions: [
      {
        question: 'What are mixed pattern scenarios?',
        options: [
          'Typing in multiple languages',
          'Combining multiple risk indicators in one input',
          'Using different keyboards',
          'Typing at varying speeds',
        ],
        correctIndex: 1,
        explanation: 'Mixed pattern scenarios combine multiple risk indicators: sensitive keywords, password-like structures, rapid typing, and contextual clues.',
      },
      {
        question: 'Why do mixed patterns create high-confidence detections?',
        options: [
          'They are easier to analyze',
          'Multiple aligned risk factors increase probability of capturing valuable data',
          'They take less time to process',
          'They are more common',
        ],
        correctIndex: 1,
        explanation: 'When multiple risk factors align, the probability of capturing valuable data increases dramatically, creating high-confidence detections.',
      },
      {
        question: 'How do keyloggers use multi-factor analysis?',
        options: [
          'To slow down the system',
          'To reduce false positives while ensuring real threats are caught',
          'To increase storage requirements',
          'To confuse users',
        ],
        correctIndex: 1,
        explanation: 'Keyloggers use multi-factor analysis to reduce false positives while ensuring real threats are caught effectively.',
      },
      {
        question: 'What should prompt caution when typing?',
        options: [
          'Only when all risk factors are present',
          'The presence of any single risk factor',
          'Only on Mondays',
          'Only when typing passwords',
        ],
        correctIndex: 1,
        explanation: 'The presence of any single risk factor should prompt caution; multiple factors demand immediate action to protect your information.',
      },
      {
        question: 'What action do multiple risk factors demand?',
        options: [
          'Typing faster',
          'Ignoring the warnings',
          'Immediate action to protect your information',
          'Continuing as normal',
        ],
        correctIndex: 2,
        explanation: 'Multiple risk factors demand immediate action to protect your information from potential compromise.',
      },
    ],
  },
  'public-shared-computer-login': {
    scenarioId: 'public-shared-computer-login',
    questions: [
      {
        question: 'Why are public computers prime targets for keyloggers?',
        options: [
          'They are faster than personal computers',
          'They serve many users and may lack security updates',
          'They have better internet connections',
          'They are always monitored by staff',
        ],
        correctIndex: 1,
        explanation: 'Public computers serve many users, often lack proper security updates, and may be physically accessible to attackers who can install malicious software.',
      },
      {
        question: 'What can be captured when you log in on a public computer?',
        options: [
          'Only your username',
          'Every keystroke including username and password',
          'Only your browsing history',
          'Nothing if you use incognito mode',
        ],
        correctIndex: 1,
        explanation: 'Every keystroke—including your username and password—can be captured and transmitted to attackers on compromised public computers.',
      },
      {
        question: 'What should you NEVER do on public computers?',
        options: [
          'Browse news websites',
          'Log into banking, email, or social media',
          'Use the mouse',
          'Adjust screen brightness',
        ],
        correctIndex: 1,
        explanation: 'Never log into banking, email, or social media on public computers due to the extreme risk of credential theft.',
      },
      {
        question: 'If you must use a public computer, what should you do afterward?',
        options: [
          'Nothing, you are safe if you logged out',
          'Change your password immediately from a trusted device',
          'Wait a week before using your account again',
          'Delete your browsing history',
        ],
        correctIndex: 1,
        explanation: 'If you must use a public computer, change your password immediately from a trusted device to protect your account.',
      },
      {
        question: 'What is the best alternative to using public computers?',
        options: [
          'Using public computers in incognito mode',
          'Typing very quickly on public computers',
          'Use your personal device with mobile data',
          'Using public computers only on weekends',
        ],
        correctIndex: 2,
        explanation: 'The best alternative is to use your personal device with mobile data, or wait until you have access to a trusted computer.',
      },
    ],
  },
};

export function getScenarioQuiz(scenarioId: string): ScenarioQuiz | null {
  return scenarioQuizzes[scenarioId] || null;
}
