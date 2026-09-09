/* ============================================================
   بيانات مخطط أسبقيات المقررات — فرع الهندسة المعلوماتية (ITE)
   مصدر البيانات: مخطط الأسبقيات الرسمي (PDF) — تم ترقيمه يدويًا.
   ملاحظة: بعض أسهم الأسبقية في المخطط الأصلي كثيفة ومتشابكة، فقد
   بُذل best-effort لتفسيرها. يُنصح بمراجعة المخطط الأصلي عند الشك.
   ============================================================ */

// تصنيفات المقررات الأساسية/العامة (لون كل تصنيف)
const CATEGORIES = {
  math:     { label: "أساسيات رياضية وبرمجية", color: "#5C8DFF" },
  science:  { label: "أساسيات علمية",           color: "#F4B740" },
  core:     { label: "أساسيات هندسة معلوماتية", color: "#F16A6A" },
  general:  { label: "مقررات عامة",             color: "#4CAF7D" },
  systems:  { label: "أنظمة وأمن معلوماتي",      color: "#35C9C1" },
  project:  { label: "مشاريع تخرج",             color: "#FF8C42" },
  lang:     { label: "اللغة الإنجليزية",         color: "#95A5A6" },

  "track-ai-ml": { label: "تخصص: تعلم الآلة",          color: "#8E44AD" },
  "track-ai-is": { label: "تخصص: الأنظمة الذكية",       color: "#AF7AC5" },
  "track-se-ds": { label: "تخصص: علم البيانات",         color: "#2E86C1" },
  "track-se-sd": { label: "تخصص: تطوير البرمجيات",      color: "#F39C12" },
  "track-scn-cs":{ label: "تخصص: الأمن السيبراني",      color: "#C0392B" },
  "track-scn-ns":{ label: "تخصص: أنظمة الشبكات",        color: "#16A085" },
};

// المسارات التخصصية القابلة للتصفية
const TRACKS = [
  { id: "ai-ml",  group: "الذكاء الصنعي (AI)",              label: "مسار تعلم الآلة (ML)",        color: "#8E44AD" },
  { id: "ai-is",  group: "الذكاء الصنعي (AI)",              label: "مسار الأنظمة الذكية (IS)",     color: "#AF7AC5" },
  { id: "se-ds",  group: "هندسة البرمجيات (SE)",            label: "مسار علم البيانات (DS)",       color: "#2E86C1" },
  { id: "se-sd",  group: "هندسة البرمجيات (SE)",            label: "مسار تطوير البرمجيات (SD)",    color: "#F39C12" },
  { id: "scn-cs", group: "النظم والشبكات الحاسوبية (SCN)",  label: "مسار الأمن السيبراني (CS)",    color: "#C0392B" },
  { id: "scn-ns", group: "النظم والشبكات الحاسوبية (SCN)",  label: "مسار أنظمة الشبكات (NS)",      color: "#16A085" },
];

const SECTION_ORDER = [
  "math","science","core","general","systems","project","lang",
  "track-ai-ml","track-ai-is","track-se-ds","track-se-sd","track-scn-cs","track-scn-ns"
];

const DESC_TEMPLATES = {
  math: "مقرر أساسي في الرياضيات أو أساسيات البرمجة، يبني القاعدة المعرفية اللازمة لمقررات التخصص اللاحقة.",
  science: "مقرر علمي أساسي يرسّخ المفاهيم النظرية والتطبيقية الداعمة لفرع الهندسة المعلوماتية.",
  core: "مقرر أساسي في هندسة المعلوماتية يغطي مفاهيم جوهرية في علوم الحاسوب وتطبيقاته.",
  general: "مقرر عام يواكب متطلبات الجامعة وينمّي مهارات الطالب العامة والمهنية.",
  systems: "مقرر يتناول جوانب الأنظمة والأمن المعلوماتي والنمذجة والتحقق من الجودة.",
  project: "مقرر مشروع تطبيقي يدمج معارف الطالب المكتسبة سابقًا في حل مسألة هندسية متكاملة.",
  lang: "مقرر ضمن سلسلة اللغة الإنجليزية المتدرّجة بحسب مستوى الإتقان.",
  "track-ai-ml": "مقرر تخصصي ضمن مسار تعلم الآلة (ML) من اختصاص الذكاء الصنعي.",
  "track-ai-is": "مقرر تخصصي ضمن مسار الأنظمة الذكية (IS) من اختصاص الذكاء الصنعي.",
  "track-se-ds": "مقرر تخصصي ضمن مسار علم البيانات (DS) من اختصاص هندسة البرمجيات.",
  "track-se-sd": "مقرر تخصصي ضمن مسار تطوير البرمجيات (SD) من اختصاص هندسة البرمجيات.",
  "track-scn-cs":"مقرر تخصصي ضمن مسار الأمن السيبراني (CS) من اختصاص النظم والشبكات الحاسوبية.",
  "track-scn-ns":"مقرر تخصصي ضمن مسار أنظمة الشبكات (NS) من اختصاص النظم والشبكات الحاسوبية.",
};

/* كل مقرر: code, name, credits, category, tracks[], prereq[] */
const COURSES = [
  // ---------- أساسيات رياضية وبرمجية ----------
  { code:"BLA401", name:"الجبر الخطي", credits:5, category:"math", tracks:[], prereq:[] },
  { code:"BMA401", name:"التحليل الرياضي 1", credits:5, category:"math", tracks:[], prereq:[] },
  { code:"BMA402", name:"التحليل الرياضي 2", credits:5, category:"math", tracks:[], prereq:["BMA401"] },
  { code:"BLC401", name:"الدارات المنطقية", credits:5, category:"math", tracks:[], prereq:[] },
  { code:"BCA501", name:"بنيان الحاسوب 1", credits:6, category:"math", tracks:[], prereq:["BLC401"] },
  { code:"BPG401", name:"برمجة 1", credits:5, category:"math", tracks:[], prereq:[] },
  { code:"BPG402", name:"برمجة 2", credits:5, category:"math", tracks:[], prereq:["BPG401"] },
  { code:"BWP401", name:"برمجة الويب 1", credits:5, category:"math", tracks:[], prereq:["BPG402"] },
  { code:"GOE301", name:"مدخل إلى التعليم الإلكتروني", credits:5, category:"math", tracks:[], prereq:[] },

  // ---------- أساسيات علمية ----------
  { code:"BNA401", name:"تحليل عددي", credits:5, category:"science", tracks:[], prereq:["BLA401"] },
  { code:"BSP501", name:"معالجة إشارة", credits:5, category:"science", tracks:[], prereq:["BMA402"] },
  { code:"BTS501", name:"نظم الاتصالات", credits:5, category:"science", tracks:[], prereq:["BMA402"] },
  { code:"BDM501", name:"الرياضيات المتقطعة", credits:5, category:"science", tracks:[], prereq:["BLC401"] },
  { code:"BPG601", name:"برمجة 3", credits:5, category:"science", tracks:[], prereq:["BPG402"] },
  { code:"BPH401", name:"الفيزياء", credits:5, category:"science", tracks:[], prereq:[] },
  { code:"GCS301", name:"المهارات الحاسوبية", credits:4, category:"science", tracks:[], prereq:[] },
  { code:"GTW301", name:"مهارات التواصل والكتابة العلمية", credits:4, category:"science", tracks:[], prereq:[] },

  // ---------- أساسيات هندسة معلوماتية ----------
  { code:"GMN401", name:"أساسيات الإدارة", credits:4, category:"core", tracks:[], prereq:["BNA401"] },
  { code:"BCG601", name:"البيانات", credits:6, category:"core", tracks:[], prereq:["BSP501"] },
  { code:"BNT501", name:"الشبكات الحاسوبية 1", credits:6, category:"core", tracks:[], prereq:["BTS501"] },
  { code:"BPS601", name:"الاحتمالات والإحصاء", credits:6, category:"core", tracks:[], prereq:["BMA402"] },
  { code:"BAU501", name:"أوتومات ولغات صورية", credits:5, category:"core", tracks:[], prereq:["BDM501"] },
  { code:"BOSL501",name:"معمل نظم تشغيل 1", credits:4, category:"core", tracks:[], prereq:["BCA501"] },
  { code:"BOS501", name:"نظم تشغيل 1", credits:4, category:"core", tracks:[], prereq:["BCA501"] },
  { code:"BWP501", name:"برمجة الويب 2", credits:5, category:"core", tracks:[], prereq:["BWP401"] },
  { code:"BDA501", name:"بنى المعطيات والخوارزميات 1", credits:6, category:"core", tracks:[], prereq:["BPG402"] },
  { code:"BDB501", name:"نظم قواعد البيانات 1", credits:4, category:"core", tracks:[], prereq:["BDA501"] },
  { code:"BDBL501",name:"مخبر نظم قواعد البيانات 1", credits:4, category:"core", tracks:[], prereq:["BDB501"] },
  { code:"BID601", name:"تحليل وتصميم نظم المعلومات", credits:6, category:"core", tracks:[], prereq:["BDA501","BDB501"] },
  { code:"BAI501", name:"الذكاء الصنعي", credits:6, category:"core", tracks:[], prereq:["BDA501"] },
  { code:"BIA601", name:"الخوارزميات الذكية", credits:5, category:"core", tracks:[], prereq:["BAI501"] },
  { code:"BSE601", name:"هندسة البرمجيات 1", credits:6, category:"core", tracks:[], prereq:["BPG601"] },
  { code:"BEC401", name:"الدارات الإلكترونية", credits:5, category:"core", tracks:[], prereq:["BPH401"] },

  // ---------- مقررات عامة ----------
  { code:"GAC501", name:"المحاسبة", credits:5, category:"general", tracks:[], prereq:["GMN401"] },
  { code:"BMM601", name:"نظم الوسائط المتعددة", credits:6, category:"general", tracks:[], prereq:["BCG601"] },
  { code:"BCM601", name:"المترجمات", credits:6, category:"general", tracks:[], prereq:["BAU501"] },
  { code:"BMP601", name:"نظم تطبيقات النقال", credits:6, category:"general", tracks:[], prereq:["BWP501"] },
  { code:"GPM601", name:"إدارة المشاريع المعلوماتية", credits:6, category:"general", tracks:[], prereq:["BSE601"] },
  { code:"GET601", name:"أخلاقيات المهنة والمجتمع", credits:6, category:"general", tracks:[], prereq:["GPM601"] },

  // ---------- أنظمة وأمن معلوماتي ----------
  { code:"BSM601", name:"النمذجة والمحاكاة والتحقق", credits:5, category:"systems", tracks:[], prereq:["BPR601"] },
  { code:"BIS601", name:"أمن نظم المعلومات", credits:6, category:"systems", tracks:[], prereq:["BPR601"] },
  { code:"GEP601", name:"نظرية المعرفة وعلوم الحاسب", credits:4, category:"systems", tracks:[], prereq:["GET601"] },

  // ---------- مشاريع ----------
  { code:"BPR601", name:"مشروع 1", credits:6, category:"project", tracks:[], prereq:["BID601"] },
  { code:"BPR602", name:"مشروع 2", credits:10, category:"project", tracks:[], prereq:["BPR601"] },

  // ---------- اللغة الإنجليزية ----------
  { code:"L1", name:"اللغة الإنجليزية 1", credits:3, category:"lang", tracks:[], prereq:[] },
  { code:"L2", name:"اللغة الإنجليزية 2", credits:3, category:"lang", tracks:[], prereq:["L1"] },
  { code:"L3", name:"اللغة الإنجليزية 3", credits:3, category:"lang", tracks:[], prereq:["L2"] },
  { code:"L4", name:"اللغة الإنجليزية 4", credits:3, category:"lang", tracks:[], prereq:["L3"] },
  { code:"L5", name:"اللغة الإنجليزية 5", credits:3, category:"lang", tracks:[], prereq:["L4"] },

  // ================= تخصص الذكاء الصنعي — مسار تعلم الآلة (ML) =================
  { code:"AML601", name:"تعلم الآلة", credits:6, category:"track-ai-ml", tracks:["ai-ml"], prereq:["BPS601"] },
  { code:"MDA601", name:"تحليل البيانات الضخمة", credits:6, category:"track-ai-ml", tracks:["ai-ml"], prereq:["BAI501"] },
  { code:"MBC601", name:"إنترنت الأشياء وسلاسل الكتل", credits:6, category:"track-ai-ml", tracks:["ai-ml"], prereq:["BIA601"] },
  { code:"MDL601", name:"التعلم العميق", credits:6, category:"track-ai-ml", tracks:["ai-ml"], prereq:["BAI501","BIA601"] },
  { code:"ANN601", name:"الشبكات العصبونية والمنطق العائم", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is"], prereq:["BAI501","BIA601"] },
  { code:"AIP601", name:"معالجة الصورة الرقمية (باللغة الإنجليزية)", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is"], prereq:["L4","BCG601"] },
  { code:"ANL601", name:"معالجة اللغات الطبيعية", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is"], prereq:["AIP601","ANN601"] },
  { code:"ACV601", name:"الرؤية الحاسوبية (باللغة الإنجليزية)", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is"], prereq:["AIP601"] },
  { code:"SIR601", name:"استرجاع المعلومات", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is","se-ds","se-sd"], prereq:["BDA501","BDM501"] },

  // ================= تخصص الذكاء الصنعي — مسار الأنظمة الذكية (IS) =================
  { code:"AES601", name:"النظم الخبيرة", credits:6, category:"track-ai-is", tracks:["ai-is"], prereq:["GPM601"] },
  { code:"SSW601", name:"الويب الدلالي", credits:6, category:"track-ai-is", tracks:["ai-is","se-ds","se-sd"], prereq:["BWP501"] },
  { code:"AVR601", name:"الواقع الافتراضي", credits:6, category:"track-ai-is", tracks:["ai-is"], prereq:["SIR601","ACV601"] },

  // ================= هندسة البرمجيات — مسار علم البيانات (DS) =================
  { code:"DSA601", name:"الإحصاء وتحليل البيانات", credits:4, category:"track-se-ds", tracks:["se-ds"], prereq:["BPS601"] },
  { code:"DDV601", name:"التمثيل المرئي للبيانات", credits:5, category:"track-se-ds", tracks:["se-ds"], prereq:["DSA601"] },
  { code:"SDE601", name:"التنقيب في البيانات", credits:6, category:"track-se-ds", tracks:["se-ds","se-sd"], prereq:["BID601"] },
  { code:"SDB601", name:"نظم قواعد البيانات 2", credits:4, category:"track-se-ds", tracks:["se-ds","se-sd"], prereq:["BIA601"] },
  { code:"DNL601", name:"قواعد بيانات NoSQL", credits:6, category:"track-se-ds", tracks:["se-ds"], prereq:["BDB501"] },
  { code:"DOB601", name:"البيانات المفتوحة والبيانات الضخمة", credits:6, category:"track-se-ds", tracks:["se-ds"], prereq:["BDB501"] },
  { code:"DPD601", name:"برمجة خاصة بعلم البيانات", credits:5, category:"track-se-ds", tracks:["se-ds"], prereq:["BPG601"] },
  { code:"DBD601", name:"مواضيع متقدمة في البيانات الضخمة", credits:6, category:"track-se-ds", tracks:["se-ds"], prereq:["DNL601","DOB601","DPD601"] },

  // ================= هندسة البرمجيات — مسار تطوير البرمجيات (SD) =================
  { code:"SSE602", name:"هندسة البرمجيات 2 (باللغة الإنجليزية)", credits:5, category:"track-se-sd", tracks:["se-sd"], prereq:["L4","GPM601"] },
  { code:"SSQ601", name:"جودة البرمجيات (باللغة الإنجليزية)", credits:5, category:"track-se-sd", tracks:["se-sd"], prereq:["SSE602"] },
  { code:"SAD601", name:"تحليل وتصميم الخوارزميات", credits:6, category:"track-se-sd", tracks:["se-sd"], prereq:["BIA601","BID601"] },
  { code:"SDA601", name:"بنى المعطيات والخوارزميات 2", credits:5, category:"track-se-sd", tracks:["se-sd"], prereq:["BIA601","BCM601"] },
  { code:"SDBL601",name:"مخبر نظم قواعد البيانات 2", credits:4, category:"track-se-sd", tracks:["se-sd"], prereq:["SDB601"] },
  { code:"SCP601", name:"مشروع مبرمجات", credits:6, category:"track-se-sd", tracks:["se-sd"], prereq:["SDA601","SDB601","SDE601"] },

  // ================= النظم والشبكات — مسار الأمن السيبراني (CS) =================
  { code:"CSM601", name:"إدارة الأمن", credits:6, category:"track-scn-cs", tracks:["scn-cs"], prereq:["GPM601"] },
  { code:"CIR601", name:"الاستجابة للحوادث الأمنية", credits:4, category:"track-scn-cs", tracks:["scn-cs"], prereq:["L4"] },
  { code:"NOS601", name:"نظم التشغيل 2 (باللغة الإنجليزية)", credits:4, category:"track-scn-cs", tracks:["scn-cs","scn-ns"], prereq:["BOS501"] },
  { code:"CSO601", name:"أمن نظم التشغيل", credits:6, category:"track-scn-cs", tracks:["scn-cs"], prereq:["NOS601"] },
  { code:"NNT601", name:"الشبكات الحاسوبية 2", credits:6, category:"track-scn-cs", tracks:["scn-cs","scn-ns"], prereq:["BNT501"] },
  { code:"CCR601", name:"نظم التعمية", credits:5, category:"track-scn-cs", tracks:["scn-cs"], prereq:["BPG601"] },
  { code:"CEH601", name:"الاختراق الأخلاقي", credits:6, category:"track-scn-cs", tracks:["scn-cs"], prereq:["CSO601","NNT601","CCR601"] },
  { code:"CMS601", name:"الأمن في النظم الحديثة", credits:6, category:"track-scn-cs", tracks:["scn-cs"], prereq:["NNT601"] },
  { code:"NSS601", name:"أمن الشبكات الحاسوبية", credits:6, category:"track-scn-cs", tracks:["scn-cs","scn-ns"], prereq:["BIS601"] },

  // ================= النظم والشبكات — مسار أنظمة الشبكات (NS) =================
  { code:"NOSL601",name:"مخبر نظم التشغيل 2", credits:4, category:"track-scn-ns", tracks:["scn-ns"], prereq:["L4","NOS601"] },
  { code:"NDS601", name:"النظم الموزعة والسحابية (باللغة الإنجليزية)", credits:6, category:"track-scn-ns", tracks:["scn-ns"], prereq:["NOS601"] },
  { code:"NCA601", name:"بنيان الحاسوب 2", credits:6, category:"track-scn-ns", tracks:["scn-ns"], prereq:["BCA501"] },
  { code:"NNP601", name:"برمجة التطبيقات الشبكية", credits:5, category:"track-scn-ns", tracks:["scn-ns"], prereq:["BPG402"] },
  { code:"NNM601", name:"إدارة الشبكات", credits:6, category:"track-scn-ns", tracks:["scn-ns"], prereq:["NNT601"] },
  { code:"NNS601", name:"خدمات شبكية", credits:6, category:"track-scn-ns", tracks:["scn-ns"], prereq:["NNT601"] },
  { code:"NRT601", name:"نظم الزمن الحقيقي", credits:6, category:"track-scn-ns", tracks:["scn-ns"], prereq:["NNS601","NNM601"] },
];

// فهرسة سريعة بالكود
const COURSE_MAP = {};
COURSES.forEach(c => COURSE_MAP[c.code] = c);

// حساب المقررات المعتمِدة (dependents) لكل مقرر
COURSES.forEach(c => c.dependents = []);
COURSES.forEach(c => {
  c.prereq.forEach(p => {
    if (COURSE_MAP[p]) COURSE_MAP[p].dependents.push(c.code);
  });
});

// حساب كامل سلسلة الأسبقية (الأجداد) لمقرر معيّن
function getAncestors(code, seen) {
  seen = seen || new Set();
  const c = COURSE_MAP[code];
  if (!c) return seen;
  c.prereq.forEach(p => {
    if (!seen.has(p)) {
      seen.add(p);
      getAncestors(p, seen);
    }
  });
  return seen;
}

// ملاحظات المخطط الأصلي (أسفل الصفحة الأولى من الـ PDF)
const NOTES = [
  "ألوان الأسهم في المخطط لا تحمل دلالة، وُضعت فقط للتمييز البصري بين الأسهم.",
  "الحد الأدنى لتنزيل المواد كل ترم هو 16 نقطة، والحد الأعلى 36 نقطة.",
  "اختيار الاختصاص إجباري عند الحصول على 160 نقطة على الأقل (بعد الترفيع للسنة الرابعة).",
  "يكفي تنزيل أسبقيات المادة ليقدر الطالب من تنزيلها، حتى لو رسب في إحداها. مثال: طالب رسب في «تحليل 1» يمكنه تنزيل «تحليل 2» معه أو منفردًا في الفصل التالي.",
  "مواد اللغة الإنجليزية استثناء: يجب ترفيع (النجاح في) المادة فعليًا للانتقال إلى المستوى التالي، لا يكفي مجرد تنزيلها.",
  "عند تنزيل مادة إنجليزي في بداية الترم تُحتسب نقطة واحدة مؤقتًا، وبعد الترفيع نهاية الترم يصبح مجموع نقاط المستوى 3 نقاط.",
];

const CREDIT_THRESHOLDS = [
  { year: "الثانية", min: 40 },
  { year: "الثالثة", min: 100 },
  { year: "الرابعة", min: 160 },
  { year: "الخامسة", min: 220 },
];
