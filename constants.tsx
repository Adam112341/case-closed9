
import React from 'react';

export const GAME_TITLE = 'Case Closed';

export const TRANSLATIONS = {
  en: {
    newCase: 'New AI-Generated Case',
    downloadCase: 'Download New Case',
    offlineCases: 'Archive Files',
    solveCase: 'Solve Case',
    overview: 'Dossier',
    suspects: 'Suspects',
    evidence: 'Evidence',
    statements: 'Testimonies',
    whoDidIt: 'Who is the perpetrator?',
    check: 'Confirm Solution',
    cancel: 'Abort',
    correct: 'Case Successfully Solved',
    incorrect: 'Wrong Accusation',
    explanation: 'Detailed Reconstruction:',
    backToMenu: 'Bureau Mainframe',
    generating: 'Generating Case...',
    consultingOSINT: 'Synthesizing evidence and cross-referencing alibis...',
    bureauOfInvestigation: 'Bureau of Investigation',
    alibi: 'Alibi',
    motive: 'Motive',
    type: 'Crime Category',
    difficulty: 'Priority',
    settings: 'System Configuration',
    language: 'Protocol Language',
    physical: 'Physical',
    digital: 'Digital',
    financial: 'Financial',
    forensic: 'Forensic',
    selectLanguage: 'Initialize System Protocol',
    offlineEmpty: 'Archive is empty. Download a dossier first.',
    downloaded: 'Dossier archived for offline access',
    play: 'Open File',
    delete: 'Shred',
    soundEffects: 'Acoustic Feedback',
    visualFX: 'Vignette & Grain FX',
    forensicDetail: 'Visual Reconstruction Quality',
    prefDifficulty: 'Standard Case Priority',
    on: 'Active',
    off: 'Disabled',
    save: 'Apply Changes',
    generationError: 'Investigation generation failed. Please check your connection.',
    // Lab UI
    forensicLab: 'Forensic Lab',
    searchTool: 'OSINT Search',
    sketchTool: 'Visual Sketch',
    videoTool: 'Reconstruction',
    processing: 'Analyzing Data...',
    searchPlaceholder: 'Enter name, location or evidence item...',
    generate: 'Process',
    sources: 'Investigation Sources',
    uploadImage: 'Upload Starting Frame',
    // Meta Labels
    officialDossier: 'Official Dossier',
    fileStatus: 'File Status',
    underInvestigation: 'Investigation in Progress',
    incidentProfile: 'Incident Profile',
    eyesOnly: 'EYES ONLY',
    subjectProfiles: 'Subject Profiles',
    reportedAlibi: 'Reported Alibi',
    suspectedMotive: 'Suspected Motive',
    forensicExhibits: 'Forensic Exhibits',
    officialScan: 'Official Scan',
    witnessTranscripts: 'Witness Transcripts',
    confirmedPerpetrators: 'Confirmed Perpetrators',
    identScan: 'IDENT-SCAN',
    logRef: 'LOG REF',
    awaitingReconstruction: 'Awaiting Reconstruction',
    bureauFile: 'Bureau File',
    // Difficulty and Quality
    Easy: 'Low Priority',
    Medium: 'Normal Priority',
    Hard: 'Critical Priority',
    '1K': 'Standard (1K)',
    '2K': 'Enhanced (2K)',
    '4K': 'Full Forensic (4K)',
  },
  fr: {
    newCase: 'Nouvelle Affaire (IA)',
    downloadCase: 'Télécharger Dossier',
    offlineCases: 'Archives du Bureau',
    solveCase: 'Résoudre l\'Affaire',
    overview: 'Dossier',
    suspects: 'Suspects',
    evidence: 'Preuves',
    statements: 'Témoignages',
    whoDidIt: 'Qui est le coupable ?',
    check: 'Confirmer l\'Accusation',
    cancel: 'Annuler',
    correct: 'Affaire Classée',
    incorrect: 'Accusation Erronée',
    explanation: 'Reconstitution des Faits :',
    backToMenu: 'Menu Principal',
    generating: 'Génération de l\'Affaire...',
    consultingOSINT: 'Synthèse des preuves et vérification des alibis...',
    bureauOfInvestigation: 'Bureau d\'Investigation',
    alibi: 'Alibi',
    motive: 'Mobile',
    type: 'Type de Crime',
    difficulty: 'Priorité',
    settings: 'Configuration Système',
    language: 'Langue du Protocole',
    physical: 'Physique',
    digital: 'Numérique',
    financial: 'Financier',
    forensic: 'Scientifique',
    selectLanguage: 'Initialisation du Protocole',
    offlineEmpty: 'L\'archive est vide. Téléchargez un dossier.',
    downloaded: 'Dossier archivé pour accès hors-ligne.',
    play: 'Ouvrir le Dossier',
    delete: 'Détruire',
    soundEffects: 'Effets Sonores',
    visualFX: 'Vignette & Grain',
    forensicDetail: 'Qualité de Reconstruction',
    prefDifficulty: 'Difficulté Standard',
    on: 'Actif',
    off: 'Désactivé',
    save: 'Enregistrer',
    generationError: 'Échec de la génération. Vérifiez votre connexion.',
    // Lab UI
    forensicLab: 'Laboratoire de Police Scientifique',
    searchTool: 'Recherche OSINT',
    sketchTool: 'Croquis Visuel',
    videoTool: 'Reconstitution',
    processing: 'Analyse des données...',
    searchPlaceholder: 'Entrez un nom, un lieu ou une pièce à conviction...',
    generate: 'Traiter',
    sources: 'Sources de l\'Enquête',
    uploadImage: 'Télécharger Image de Départ',
    // Meta Labels
    officialDossier: 'Dossier Officiel',
    fileStatus: 'Statut du Fichier',
    underInvestigation: 'Enquête en Cours',
    incidentProfile: 'Profil de l\'Incident',
    eyesOnly: 'CONFIDENTIEL',
    subjectProfiles: 'Fiches des Suspects',
    reportedAlibi: 'Alibi Déclaré',
    suspectedMotive: 'Mobile Présumé',
    forensicExhibits: 'Pièces à Conviction',
    officialScan: 'Scan Officiel',
    witnessTranscripts: 'Dépositions des Témoins',
    confirmedPerpetrators: 'Coupables Identifiés',
    identScan: 'SCAN-IDENT',
    logRef: 'Réf. Registre',
    awaitingReconstruction: 'En attente de reconstitution',
    bureauFile: 'Fiche du Bureau',
    // Difficulty and Quality
    Easy: 'Basse Priorité',
    Medium: 'Priorité Normale',
    Hard: 'Priorité Critique',
    '1K': 'Standard (1K)',
    '2K': 'Améliorée (2K)',
    '4K': 'Forensique Totale (4K)',
  },
  ar: {
    newCase: 'قضية جديدة (ذكاء اصطناعي)',
    downloadCase: 'تحميل ملف جديد',
    offlineCases: 'الأرشيف',
    solveCase: 'إغلاق القضية',
    overview: 'الملف',
    suspects: 'المشتبه بهم',
    evidence: 'الأدلة',
    statements: 'الشهادات',
    whoDidIt: 'من ارتكب الجريمة؟',
    check: 'تأكيد الإغلاق',
    cancel: 'إلغاء',
    correct: 'تم إغلاق القضية بنجاح',
    incorrect: 'إغلاق خاطئ',
    explanation: 'إعادة بناء الأحداث:',
    backToMenu: 'العودة للمكتب',
    generating: 'جاري إنشاء الملف...',
    consultingOSINT: 'البحث في قواعد البيانات ومحاكاة البيانات الجنائية...',
    bureauOfInvestigation: 'مكتب التحقيقات',
    alibi: 'العذر',
    motive: 'الدافع',
    type: 'نوع الجريمة',
    difficulty: 'الأولوية',
    settings: 'الإعدادات',
    language: 'لغة النظام',
    physical: 'مادي',
    digital: 'رقمي',
    financial: 'مالي',
    forensic: 'جنائي',
    selectLanguage: 'تفعيل بروتول النظام',
    offlineEmpty: 'الأرشيف فارغ. قم بتحميل ملف أولاً.',
    downloaded: 'تم حفظ الملف للوصول دون إنترنت',
    play: 'فتح الملف',
    delete: 'إتلاف',
    soundEffects: 'المؤثرات الصوتية',
    visualFX: 'تأثيرات بصرية',
    forensicDetail: 'جودة إعادة البناء البصري',
    prefDifficulty: 'أولوية القضية القياسية',
    on: 'مفعل',
    off: 'معطل',
    save: 'تطبيق',
    generationError: 'فشل إنشاء القضية. يرجى التحقق من الاتصال.',
    // Lab UI
    forensicLab: 'المختبر الجنائي',
    searchTool: 'بحث مفتوح المصدر',
    sketchTool: 'مخطط بصري',
    videoTool: 'إعادة بناء الفيديو',
    processing: 'جاري تحليل البيانات...',
    searchPlaceholder: 'أدخل اسماً، مكاناً أو دليلاً...',
    generate: 'معالجة',
    sources: 'مصادر التحقيق',
    uploadImage: 'رفع صورة البداية',
    // Meta Labels
    officialDossier: 'الملف الرسمي',
    fileStatus: 'حالة الملف',
    underInvestigation: 'قيد التحقيق',
    incidentProfile: 'ملف الحادث',
    eyesOnly: 'سري للغاية',
    subjectProfiles: 'ملفات المشتبه بهم',
    reportedAlibi: 'العذر المعلن',
    suspectedMotive: 'الدافع المشتبه به',
    forensicExhibits: 'الأدلة الجنائية',
    officialScan: 'مسح رسمي',
    witnessTranscripts: 'نصوص الشهادات',
    confirmedPerpetrators: 'الجناة المؤكدون',
    identScan: 'مسح الهوية',
    logRef: 'مرجع السجل',
    awaitingReconstruction: 'في انتظار إعادة بناء الفيديو',
    bureauFile: 'ملف المكتب',
    // Difficulty and Quality
    Easy: 'أولوية منخفضة',
    Medium: 'أولوية عادية',
    Hard: 'أولوية حرجة',
    '1K': 'قياسي (1K)',
    '2K': 'محسن (2K)',
    '4K': 'جنائي كامل (4K)',
  },
};

export const DEFAULT_OFFLINE_CASES: any[] = [
  {
    id: 'off-1',
    title: {
      en: 'The Silent Vault',
      fr: 'Le Coffre Silencieux',
      ar: 'القبو الصامت'
    },
    type: {
      en: 'Theft',
      fr: 'Vol',
      ar: 'سرقة'
    },
    difficulty: 'Medium',
    description: {
      en: 'A diamond was stolen from a high-security vault with no signs of forced entry. Only three employees had access codes.',
      fr: 'Un diamant a été volé dans un coffre-fort de haute sécurité sans signe d\'effraction. Seuls trois employés avaient les codes d\'accès.',
      ar: 'سُرق ماسة من قبو عالي التأمين دون أي علامات على الاقتحام القسري. ثلاثة موظفين فقط كانوا يمتلكون أكواد الدخول.'
    },
    suspects: [
      { 
        id: 's1', 
        name: { en: 'James Miller', fr: 'James Miller', ar: 'جيمس ميلر' }, 
        description: { 
          en: 'Head of Security, 10 years experience.', 
          fr: 'Chef de la sécurité, 10 ans d\'expérience.', 
          ar: 'رئيس الأمن، خبرة ١٠ سنوات.' 
        }, 
        alibi: { 
          en: 'Claims to have been in the monitoring room alone.', 
          fr: 'Prétend avoir été seul dans la salle de surveillance.', 
          ar: 'يدعي أنه كان في غرفة المراقبة وحده.' 
        }, 
        motive: { 
          en: 'Recently denied a promotion.', 
          fr: 'Promotion récemment refusée.', 
          ar: 'رُفضت ترقيته مؤخراً.' 
        } 
      },
      { 
        id: 's2', 
        name: { en: 'Sarah Vance', fr: 'Sarah Vance', ar: 'سارة فانس' }, 
        description: { 
          en: 'Junior Clerk, started 3 months ago.', 
          fr: 'Commis junior, a commencé il y a 3 mois.', 
          ar: 'موظفة مبتدئة، بدأت منذ ٣ أشهر.' 
        }, 
        alibi: { 
          en: 'Claims to have been at the front desk.', 
          fr: 'Prétend avoir été à la réception.', 
          ar: 'تدعي أنها كانت في مكتب الاستقبال.' 
        }, 
        motive: { 
          en: 'Heavy gambling debts found in financial logs.', 
          fr: 'Lourdes dettes de jeu trouvées dans les registres financiers.', 
          ar: 'ديون قمار ثقيلة وُجدت في السجلات المالية.' 
        } 
      },
      { 
        id: 's3', 
        name: { en: 'Robert Chen', fr: 'Robert Chen', ar: 'روبرت تشين' }, 
        description: { 
          en: 'Maintenance Tech.', 
          fr: 'Technicien de maintenance.', 
          ar: 'فني صيانة.' 
        }, 
        alibi: { 
          en: 'Claims to have been fixing the air conditioning.', 
          fr: 'Prétend avoir été réparé la climatisation.', 
          ar: 'يدعي أنه كان يصلح مكيف الهواء.' 
        }, 
        motive: { 
          en: 'Distrust of corporate management.', 
          fr: 'Méfiance envers la direction de l\'entreprise.', 
          ar: 'عدم الثقة في إدارة الشركة.' 
        } 
      }
    ],
    evidence: [
      { 
        id: 'e1', 
        title: { en: 'Access Logs', fr: 'Journaux d\'Accès', ar: 'سجلات الدخول' }, 
        description: { 
          en: 'Sarah\'s code was used at 3:15 AM, but logs show she never clocked in that morning.', 
          fr: 'Le code de Sarah a été utilisé à 3h15, mais les registres montrent qu\'elle n\'a jamais pointé ce matin-là.', 
          ar: 'تم استخدام كود سارة في الساعة ٣:١٥ صباحاً، لكن السجلات تظهر أنها لم تسجل دخولها في ذلك الصباح.' 
        }, 
        type: 'digital' 
      },
      { 
        id: 'e2', 
        title: { en: 'Blue Fibers', fr: 'Fibres Bleues', ar: 'ألياف زرقاء' }, 
        description: { 
          en: 'Fibers found near the vault handle match the standard issue security uniform.', 
          fr: 'Les fibres trouvées près de la poignée du coffre correspondent à l\'uniforme de sécurité standard.', 
          ar: 'الألياف التي عُثر عليها بالقرب من مقبض القبو تطابق الزي الرسمي المخصص للأمن.' 
        }, 
        type: 'physical' 
      }
    ],
    statements: [
      { 
        id: 'st1', 
        witnessName: { en: 'Lobby Guard', fr: 'Garde du Hall', ar: 'حارس الردهة' }, 
        text: { 
          en: 'I saw Robert carrying a heavy toolbox out around 4:00 AM, which is unusual.', 
          fr: 'J\'ai vu Robert sortir avec une lourde boîte à outils vers 4h00, ce qui est inhabituel.', 
          ar: 'رأيت روبرت يحمل صندوق أدوات ثقيلاً في حوالي الساعة ٤:٠٠ صباحاً، وهو أمر غير معتاد.' 
        } 
      }
    ],
    solution: {
      perpetratorIds: ['s1', 's2'],
      explanation: {
        en: 'James provided Sarah with a security uniform and his monitoring room blind spots knowledge. Sarah used a cloned code to enter. They both split the diamond.',
        fr: 'James a fourni à Sarah un uniforme de sécurité et sa connaissance des angles morts de la salle de surveillance. Sarah a utilisé un code cloné pour entrer. Ils ont partagé le diamant.',
        ar: 'قام جيمس بتزويد سارة بزي أمني ومعرفته بالنقاط العمياء في غرفة المراقبة. استخدمت سارة كوداً منسوخاً للدخول. كلاهما تقاسم الماسة.'
      }
    }
  }
];
