/* ============================================================
   بيانات مخطط أسبقيات المقررات — فرع الهندسة المعلوماتية (ITE)
   المصدر: الصفحة الرسمية لبرنامج ITE على موقع الجامعة الافتراضية
   السورية (svuonline.org/ar/program/ite) — قوائم المقررات الرسمية
   بأسبقياتها ووحداتها المعتمدة، بالإضافة إلى النماذج الاسترشادية
   لكل مسار تخصصي (توزيع المقررات على الفصول S1–S10).

   ملاحظات على البيانات:
   - مقرر "إدارة المشاريع المعلوماتية" GPM601: ورد في صفحة الجامعة
     أن أسبقيته "BSE501" وهو على الأرجح خطأ مطبعي؛ تم اعتماده هنا
     كـ BSE601 (هندسة البرمجيات 1).
   - مقرر "الرؤية الحاسوبية" ACV601: ورد في صفحة الجامعة أن أسبقيته
     "IIP601" وهو خطأ مطبعي واضح؛ تم تصحيحه إلى AIP601.
   - مساري "تعلم الآلة (ML)" و"الأمن السيبراني (CS)" أحدث من
     القائمة الرسمية المنشورة، ووردت مقرراتهما فقط في النماذج
     الاسترشادية (وثائق Word) دون أن تُدرَج بعد في قائمة المقررات
     الرسمية. بعض رموز مقررات مسار ML (إنترنت الأشياء وسلاسل الكتل،
     التعلم العميق) لم تُذكر في تلك الوثائق، فاعتُمدت رموز مقترحة
     (MBC601 و MDL601)، كما استُبدل الرمز المكرر AES601 (الذي ورد
     لمادتين مختلفتين في وثيقة ML) برمز مقترح MDA601 لمادة "تحليل
     البيانات الضخمة" في مسار ML تحديدًا لتفادي تعارض الرموز.
   ============================================================ */

const CATEGORIES = {
  general: { label: "مقررات عامة",       color: "#4CAF7D" },
  basic:   { label: "مقررات أساسية",      color: "#5C8DFF" },

  "track-ai-ml": { label: "تخصص: تعلم الآلة",          color: "#8E44AD" },
  "track-ai-is": { label: "تخصص: الأنظمة الذكية",       color: "#AF7AC5" },
  "track-se-ds": { label: "تخصص: علم البيانات",         color: "#2E86C1" },
  "track-se-sd": { label: "تخصص: تطوير البرمجيات",      color: "#F39C12" },
  "track-scn-cs":{ label: "تخصص: الأمن السيبراني",      color: "#C0392B" },
  "track-scn-ns":{ label: "تخصص: أنظمة الشبكات",        color: "#16A085" },
};

const TRACKS = [
  { id: "ai-ml",  group: "الذكاء الصنعي (AI)",              label: "مسار تعلم الآلة (ML)",        color: "#8E44AD" },
  { id: "ai-is",  group: "الذكاء الصنعي (AI)",              label: "مسار الأنظمة الذكية (IS)",     color: "#AF7AC5" },
  { id: "se-ds",  group: "هندسة البرمجيات (SE)",            label: "مسار علم البيانات (DS)",       color: "#2E86C1" },
  { id: "se-sd",  group: "هندسة البرمجيات (SE)",            label: "مسار تطوير البرمجيات (SD)",    color: "#F39C12" },
  { id: "scn-cs", group: "النظم والشبكات الحاسوبية (SCN)",  label: "مسار الأمن السيبراني (CS)",    color: "#C0392B" },
  { id: "scn-ns", group: "النظم والشبكات الحاسوبية (SCN)",  label: "مسار أنظمة الشبكات (NS)",      color: "#16A085" },
];

const SECTION_ORDER = [
  "general","basic",
  "track-ai-ml","track-ai-is","track-se-ds","track-se-sd","track-scn-cs","track-scn-ns"
];

const DESC_TEMPLATES = {
  general: "مقرر عام يواكب متطلبات الجامعة وينمّي مهارات الطالب العامة والمهنية.",
  basic: "مقرر أساسي في هندسة المعلوماتية يغطي مفاهيم جوهرية مشتركة بين جميع الاختصاصات.",
  "track-ai-ml": "مقرر تخصصي ضمن مسار تعلم الآلة (ML) من اختصاص الذكاء الصنعي.",
  "track-ai-is": "مقرر تخصصي ضمن مسار الأنظمة الذكية (IS) من اختصاص الذكاء الصنعي.",
  "track-se-ds": "مقرر تخصصي ضمن مسار علم البيانات (DS) من اختصاص هندسة البرمجيات.",
  "track-se-sd": "مقرر تخصصي ضمن مسار تطوير البرمجيات (SD) من اختصاص هندسة البرمجيات.",
  "track-scn-cs":"مقرر تخصصي ضمن مسار الأمن السيبراني (CS) من اختصاص النظم والشبكات الحاسوبية.",
  "track-scn-ns":"مقرر تخصصي ضمن مسار أنظمة الشبكات (NS) من اختصاص النظم والشبكات الحاسوبية.",
};

const TERM_LABELS = ["", "الأول","الثاني","الثالث","الرابع","الخامس","السادس","السابع","الثامن","التاسع","العاشر"];

/* كل مقرر:
   code, name, nameEn, credits, category, tracks[],
   term            -> رقم الفصل الافتراضي (1..10)
   termByTrack      -> استثناءات: رقم الفصل حسب المسار عند الاختلاف
   termAlt          -> فصل إضافي (يظهر فيه المقرر أيضًا، مثل مشروع التخرج)
   prereq[]         -> رموز المتطلبات السابقة
   concurrent[]     -> مقررات تُنزَّل بالتوازي (مخابر غالبًا)
   creditGate       -> حد أدنى من الوحدات المعتمدة المطلوبة (إن وجد)
*/
const COURSES = [
  // ==================== مقررات عامة (General) ====================
  { code:"GCS301", name:"مهارات الحاسوب", nameEn:"Computer Skills – ICDL", credits:4, category:"general", tracks:[], term:1, prereq:[] },
  { code:"GOE301", name:"مدخل إلى التعلم الإلكتروني", nameEn:"Introduction to On-Line Education", credits:4, category:"general", tracks:[], term:1, prereq:[] },
  { code:"L1", name:"اللغة الإنكليزية (1)", nameEn:"English Language I", credits:0, category:"general", tracks:[], term:1, prereq:[] },
  { code:"GTW301", name:"مهارات التواصل والكتابة العلمية", nameEn:"Communication Skills and Technical Writing", credits:5, category:"general", tracks:[], term:2, prereq:["GCS301"] },
  { code:"L2", name:"اللغة الإنكليزية (2)", nameEn:"English Language II", credits:0, category:"general", tracks:[], term:2, prereq:["L1"] },
  { code:"L3", name:"اللغة الإنكليزية (3)", nameEn:"English Language III", credits:3, category:"general", tracks:[], term:3, prereq:["L2"] },
  { code:"GMN401", name:"أساسيات الإدارة", nameEn:"Fundamentals of Management", credits:4, category:"general", tracks:[], term:4, prereq:["BNA401"] },
  { code:"L4", name:"اللغة الإنكليزية (4)", nameEn:"English Language IV", credits:3, category:"general", tracks:[], term:4, prereq:["L3"] },
  { code:"GAC501", name:"المحاسبة", nameEn:"Accounting", credits:5, category:"general", tracks:[], term:5, prereq:["GMN401"] },
  { code:"L5", name:"اللغة الإنكليزية (5)", nameEn:"English Language V", credits:3, category:"general", tracks:[], term:5, prereq:["L4"] },
  { code:"GPM601", name:"إدارة المشاريع المعلوماتية", nameEn:"IT Project Management", credits:6, category:"general", tracks:[], term:7, prereq:["BSE601"] },
  { code:"GET601", name:"أخلاقيات المهنة والمجتمع", nameEn:"Ethics of Profession & Society", credits:6, category:"general", tracks:[], term:8, prereq:["GPM601"] },
  { code:"GEP601", name:"نظرية المعرفة وعلوم الحاسب", nameEn:"Epistemology & Computer Science", credits:4, category:"general", tracks:[], term:10, prereq:["GET601"] },

  // ==================== مقررات أساسية (Basic) ====================
  { code:"BPH401", name:"الفيزياء", nameEn:"Physics", credits:5, category:"basic", tracks:[], term:1, prereq:[] },
  { code:"BMA401", name:"التحليل الرياضي (1)", nameEn:"Mathematical Analysis I", credits:5, category:"basic", tracks:[], term:1, prereq:[] },
  { code:"BAS401", name:"بنى جبرية", nameEn:"Algebraic Structures", credits:5, category:"basic", tracks:[], term:1, prereq:[] },
  { code:"BPG401", name:"برمجة (1)", nameEn:"Programming I", credits:5, category:"basic", tracks:[], term:1, prereq:[] },
  { code:"BLA401", name:"الجبر الخطي", nameEn:"Linear Algebra", credits:5, category:"basic", tracks:[], term:2, prereq:["BMA401"] },
  { code:"BMA402", name:"التحليل الرياضي (2)", nameEn:"Mathematical Analysis II", credits:5, category:"basic", tracks:[], term:2, prereq:["BMA401"] },
  { code:"BEC401", name:"الدارات الإلكترونية", nameEn:"Electronic Circuits", credits:5, category:"basic", tracks:[], term:2, prereq:["BPH401"] },
  { code:"BLC401", name:"الدارات المنطقية", nameEn:"Logical Circuits", credits:5, category:"basic", tracks:[], term:2, prereq:["BAS401"] },
  { code:"BPG402", name:"برمجة (2)", nameEn:"Programming II", credits:5, category:"basic", tracks:[], term:2, prereq:["BPG401"] },
  { code:"BNA401", name:"تحليل عددي", nameEn:"Numerical Analysis", credits:5, category:"basic", tracks:[], term:3, prereq:["BLA401","BMA402"] },
  { code:"BWP401", name:"برمجة الويب (1)", nameEn:"Web Programming I", credits:5, category:"basic", tracks:[], term:3, prereq:["BPG402"] },
  { code:"BCA501", name:"بنيان الحاسوب (1)", nameEn:"Computer Architecture I", credits:6, category:"basic", tracks:[], term:3, prereq:["BLC401"] },
  { code:"BSP501", name:"معالجة إشارة", nameEn:"Signal Processing", credits:5, category:"basic", tracks:[], term:3, prereq:["BMA402"] },
  { code:"BDA501", name:"بنى المعطيات والخوارزميات (1)", nameEn:"Data Structures and Algorithms I", credits:6, category:"basic", tracks:[], term:3, prereq:["BPG402"] },
  { code:"BDM501", name:"الرياضيات المتقطعة", nameEn:"Discrete Mathematics", credits:5, category:"basic", tracks:[], term:4, prereq:["BLC401"] },
  { code:"BTS501", name:"نظم الاتصالات", nameEn:"Telecommunication Systems", credits:5, category:"basic", tracks:[], term:4, prereq:["BLC401","BMA402"] },
  { code:"BDB501", name:"نظم قواعد البيانات (1)", nameEn:"Database Systems I", credits:4, category:"basic", tracks:[], term:4, prereq:["BDA501"] },
  { code:"BDBL501",name:"مخبر نظم قواعد البيانات (1)", nameEn:"Database Systems I Lab", credits:4, category:"basic", tracks:[], term:4, prereq:[], concurrent:["BDB501"] },
  { code:"BWP501", name:"برمجة الويب (2)", nameEn:"Web Programming II", credits:5, category:"basic", tracks:[], term:4, prereq:["BWP401"], courseInfo:{
      goals:"يُعتبر مقرر «برمجة الويب 2» من المواد الأساسية في معارف المهندس المعلوماتي العملية، والتي ستسمح للطالب ببناء تطبيقات الويب الحقيقية. يعتمد هذا المقرر على اللغة مفتوحة المصدر والأكثر انتشارًا PHP مع التفاعل مع قواعد البيانات الموافقة MySQL. يستعرض المقرر أساسيات لغة البرمجة PHP مع التركيز على اتجاه البرمجة غرضية التوجّه، والآليات المثلى في التعامل مع قواعد البيانات، واستخدام التقانات المناسبة حين الحاجة مثل JSON وAJAX.",
      outcomes:[
        "تعلّم أساسيات لغة البرمجة PHP",
        "اكتساب مهارات متقدمة في البرمجة غرضية التوجّه باستخدام PHP",
        "تصميم وبناء نماذج الويب",
        "تعلّم إدارة الحالة",
        "تعلّم ربط عناصر التحكم مع البيانات",
        "تعلّم طرق التعامل مع قواعد البيانات",
        "تعلّم طرق التعامل مع قواعد البيانات برمجيًا",
        "تعلّم أساسيات JSON مع PHP",
        "تعلّم أساسيات AJAX مع PHP",
        "تعلّم التعامل مع الملفات",
      ],
      syllabus:[
        { num:"CH1", title:"أساسيات PHP", topics:["أساسيات PHP","المتغيرات وأنماط البيانات","التعابير","التعليمات الشرطية","تعليمات التكرار"] },
        { num:"CH2", title:"السلاسل النصية، الأعداد، المصفوفات", topics:["التعامل مع السلاسل النصية","التعامل مع الأرقام","المصفوفات المفهرسة","المصفوفات التجميعية"] },
        { num:"CH3", title:"الدوال", topics:["الدوال الجاهزة","تعريف الدوال","المعاملات","الاستدعاء بالقيمة","الاستدعاء بالمرجع"] },
        { num:"CH4", title:"الصفوف والأغراض", topics:["الصفوف والأغراض","الوراثة","الصفوف المجردة","السمات","الطرق والخصائص الساكنة"] },
        { num:"CH5", title:"النماذج Forms", topics:["معالجة طلبات النموذج","إرسال بيانات النموذج","أنواع عناصر الدخل في النموذج","الحفاظ على بيانات النموذج","التحقق من بيانات النموذج"] },
        { num:"CH6", title:"أساسيات التعامل مع قواعد البيانات", topics:["طرق الوصول لقاعدة البيانات","إنشاء قاعدة البيانات","إنشاء الجداول","التعامل مع بيانات الجداول","الاستعلام عن البيانات"] },
        { num:"CH7", title:"الحفاظ على الحالة", topics:["إدارة الكعكات (Cookies)","إدارة متغيرات الجلسة (Session)"] },
        { num:"CH8", title:"بناء نماذج قواعد البيانات CRUD", topics:["الإنشاء (Create)","القراءة (Read)","التعديل (Update)","الحذف (Delete)"] },
        { num:"CH9", title:"مهارات JSON", topics:["البيانات على الويب","ما هو JSON","شكل JSON","استخدام JSON مع PHP"] },
        { num:"CH10", title:"مهارات AJAX", topics:["ما هو AJAX","استخدام AJAX مع PHP","قواعد البيانات وAJAX","البحث المباشر وAJAX"] },
        { num:"CH11", title:"التعامل مع الملفات", topics:["فتح وقراءة الملفات","إنشاء وكتابة الملفات","تحميل الملفات"] },
        { num:"CH12", title:"أهم الدوال الشهيرة", topics:["التاريخ والوقت","السلاسل النصية","الدوال الرياضية","المصفوفات"] },
      ],
  } },
  { code:"BOS501", name:"نظم التشغيل (1)", nameEn:"Operating Systems I", credits:4, category:"basic", tracks:[], term:5, prereq:["BCA501","BPG402"] },
  { code:"BOSL501",name:"مخبر نظم التشغيل (1)", nameEn:"Operating Systems I Lab", credits:4, category:"basic", tracks:[], term:5, prereq:[], concurrent:["BOS501"] },
  { code:"BAU501", name:"أوتومات ولغات صورية", nameEn:"Automata & Formal Languages", credits:5, category:"basic", tracks:[], term:5, prereq:["BDM501","BDA501"] },
  { code:"BPG601", name:"برمجة (3)", nameEn:"Programming III", credits:5, category:"basic", tracks:[], term:5, prereq:["BPG402"] },
  { code:"BPS601", name:"الاحتمالات والإحصاء", nameEn:"Probability & Statistics", credits:6, category:"basic", tracks:[], term:5, prereq:["BDM501","BMA402"] },
  { code:"BAI501", name:"الذكاء الصنعي", nameEn:"Artificial Intelligence", credits:6, category:"basic", tracks:[], term:6, prereq:["BDA501"] },
  { code:"BNT501", name:"الشبكات الحاسوبية (1)", nameEn:"Computer Networks I", credits:6, category:"basic", tracks:[], term:6, prereq:["BTS501"] },
  { code:"BSE601", name:"هندسة البرمجيات (1)", nameEn:"Software Engineering I", credits:6, category:"basic", tracks:[], term:6, prereq:["BPG601"] },
  { code:"BCM601", name:"المترجمات", nameEn:"Compilers", credits:6, category:"basic", tracks:[], term:6, prereq:["BAU501"] },
  { code:"BCG601", name:"البيانيات", nameEn:"Computer Graphics", credits:6, category:"basic", tracks:[], term:6, prereq:["BSP501","BDA501"] },
  { code:"BIA601", name:"الخوارزميات الذكية", nameEn:"Intelligent Algorithms", credits:5, category:"basic", tracks:[], term:7, prereq:["BAI501"] },
  { code:"BID601", name:"تحليل وتصميم نظم المعلومات", nameEn:"Information Systems Analysis and Design", credits:6, category:"basic", tracks:[], term:7, prereq:["BDB501"] },
  { code:"BMM601", name:"نظم الوسائط المتعددة", nameEn:"Multimedia Systems", credits:6, category:"basic", tracks:[], term:7, prereq:["BCG601","BNT501"] },
  { code:"BMP601", name:"برمجة تطبيقات النقال", nameEn:"Mobile Applications Programming", credits:6, category:"basic", tracks:[], term:7, prereq:["BWP501"] },
  { code:"BPR601", name:"مشروع (1)", nameEn:"Project I", credits:6, category:"basic", tracks:[], term:8, prereq:["BIS601"], creditGate:180 },
  { code:"BIS601", name:"أمن نظم المعلومات", nameEn:"Information System Security", credits:6, category:"basic", tracks:[], term:9, prereq:["BOS501","BDB501","BNT501","GET601"] },
  { code:"BSM601", name:"النمذجة والمحاكاة والتحقق", nameEn:"Simulation, Modelling and Verification", credits:5, category:"basic", tracks:[], term:10, prereq:["BPG601","BPS601","BPR601"] },
  { code:"BPR602", name:"مشروع (2)", nameEn:"Project II", credits:10, category:"basic", tracks:[], term:9, termAlt:10, prereq:["BPR601"], creditGate:240 },

  // ================= تخصص الذكاء الصنعي — مسار تعلم الآلة (ML) =================
  { code:"MDA601", name:"تحليل البيانات الضخمة", nameEn:"Big Data Analysis", credits:6, category:"track-ai-ml", tracks:["ai-ml"], term:8, prereq:["BAI501"] },
  { code:"AIP601", name:"معالجة الصورة الرقمية (باللغة الإنكليزية)", nameEn:"Digital Image Processing (in English)", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is"], term:8, prereq:["BCG601","L5","BIA601"] },
  { code:"ANN601", name:"الشبكات العصبونية والمنطق العائم", nameEn:"Neural Networks & Fuzzy Logic", credits:5, category:"track-ai-ml", tracks:["ai-ml","ai-is"], term:8, prereq:["BAI501","BIA601"] },
  { code:"ACV601", name:"الرؤية الحاسوبية (باللغة الإنكليزية)", nameEn:"Computer Vision (in English)", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is"], term:9, prereq:["AIP601"] },
  { code:"ANL601", name:"معالجة اللغات الطبيعية", nameEn:"Natural Language Processing", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is"], term:9, prereq:["BAI501","AIP601"] },
  { code:"AML601", name:"تعلم الآلة", nameEn:"Machine Learning", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is"], term:9, termByTrack:{"ai-is":10}, prereq:["BPS601","BAI501","ANL601"] },
  { code:"SIR601", name:"استرجاع المعلومات", nameEn:"Information Retrieval", credits:6, category:"track-ai-ml", tracks:["ai-ml","ai-is","se-ds","se-sd"], term:10, prereq:["BDA501","BDM501"] },
  { code:"MBC601", name:"إنترنت الأشياء وسلاسل الكتل", nameEn:"Internet of Things and Blockchain", credits:6, category:"track-ai-ml", tracks:["ai-ml"], term:10, prereq:["BIA601"] },
  { code:"MDL601", name:"التعلم العميق", nameEn:"Deep Learning", credits:6, category:"track-ai-ml", tracks:["ai-ml"], term:10, prereq:["AML601"] },

  // ================= تخصص الذكاء الصنعي — مسار الأنظمة الذكية (IS) =================
  { code:"AES601", name:"النظم الخبيرة", nameEn:"Expert Systems", credits:6, category:"track-ai-is", tracks:["ai-is"], term:8, prereq:["BAI501","GPM601"] },
  { code:"SSW601", name:"الويب الدلالي", nameEn:"Semantic Web", credits:6, category:"track-ai-is", tracks:["ai-is","se-ds","se-sd"], term:10, termByTrack:{"ai-is":9}, prereq:["BWP501"] },
  { code:"AVR601", name:"الواقع الافتراضي", nameEn:"Virtual Reality", credits:6, category:"track-ai-is", tracks:["ai-is"], term:10, prereq:["BMM601","ACV601"] },

  // ================= هندسة البرمجيات — مسار علم البيانات (DS) =================
  { code:"DPD601", name:"برمجة خاصة بعلم البيانات", nameEn:"Programming for Data Science", credits:5, category:"track-se-ds", tracks:["se-ds"], term:8, prereq:["BPG601"] },
  { code:"DOB601", name:"البيانات المفتوحة والبيانات الضخمة", nameEn:"Open Data and Big Data", credits:6, category:"track-se-ds", tracks:["se-ds"], term:8, prereq:["BDB501"] },
  { code:"SDB601", name:"نظم قواعد البيانات (2)", nameEn:"Database Systems II", credits:4, category:"track-se-ds", tracks:["se-ds","se-sd"], term:8, prereq:["BDB501","BIA601"] },
  { code:"DNL601", name:"قواعد بيانات NoSQL", nameEn:"NoSQL Databases", credits:6, category:"track-se-ds", tracks:["se-ds"], term:8, prereq:["BDB501"] },
  { code:"DSA601", name:"الإحصاء وتحليل البيانات", nameEn:"Statistics and Data Analysis", credits:4, category:"track-se-ds", tracks:["se-ds"], term:9, prereq:["BPS601"] },
  { code:"DBD601", name:"مواضيع متقدمة في البيانات الضخمة", nameEn:"Advanced Topics in Big Data", credits:6, category:"track-se-ds", tracks:["se-ds"], term:9, prereq:["DNL601","DOB601","DPD601"] },
  { code:"SDE601", name:"التنقيب في البيانات", nameEn:"Data Mining", credits:6, category:"track-se-ds", tracks:["se-ds","se-sd"], term:9, prereq:["BPS601","BID601"] },
  { code:"DDV601", name:"التمثيل المرئي للبيانات", nameEn:"Data Visualization", credits:5, category:"track-se-ds", tracks:["se-ds"], term:10, prereq:["DSA601"] },

  // ================= هندسة البرمجيات — مسار تطوير البرمجيات (SD) =================
  { code:"SSE602", name:"هندسة البرمجيات (2) (باللغة الإنكليزية)", nameEn:"Software Engineering II (in English)", credits:5, category:"track-se-sd", tracks:["se-sd"], term:8, prereq:["GPM601","L5"] },
  { code:"SDA601", name:"بنى المعطيات والخوارزميات (2)", nameEn:"Data Structures & Algorithms II", credits:5, category:"track-se-sd", tracks:["se-sd"], term:8, prereq:["BDA501","BIA601"] },
  { code:"SDBL601",name:"مخبر نظم قواعد البيانات (2)", nameEn:"Database Systems II Lab", credits:4, category:"track-se-sd", tracks:["se-sd"], term:8, prereq:[], concurrent:["SDB601"] },
  { code:"SAD601", name:"تحليل وتصميم الخوارزميات", nameEn:"Algorithm Analysis & Design", credits:6, category:"track-se-sd", tracks:["se-sd"], term:9, prereq:["SDA601"] },
  { code:"SCP601", name:"مشروع مترجمات", nameEn:"Compiler Project", credits:6, category:"track-se-sd", tracks:["se-sd"], term:9, prereq:["BCM601","SSE602"] },
  { code:"SSQ601", name:"جودة البرمجيات (باللغة الإنكليزية)", nameEn:"Software Quality (in English)", credits:5, category:"track-se-sd", tracks:["se-sd"], term:10, prereq:["SSE602"] },

  // ================= النظم والشبكات — مسار الأمن السيبراني (CS) =================
  { code:"NSM601", name:"إدارة الأمن", nameEn:"Security Management", credits:6, category:"track-scn-cs", tracks:["scn-cs"], term:8, prereq:["GPM601"] },
  { code:"NCR601", name:"نظم التعمية", nameEn:"Cryptosystems", credits:5, category:"track-scn-cs", tracks:["scn-cs"], term:8, prereq:["BPG601"] },
  { code:"NOS601", name:"نظم التشغيل (2) (باللغة الإنكليزية)", nameEn:"Operating Systems II (in English)", credits:4, category:"track-scn-cs", tracks:["scn-cs","scn-ns"], term:8, prereq:["BOS501","L5","GPM601"] },
  { code:"NIR601", name:"الاستجابة للأحداث الأمنية", nameEn:"Security Incident Response", credits:4, category:"track-scn-cs", tracks:["scn-cs"], term:8, prereq:["L4"] },
  { code:"NSO601", name:"أمن نظم التشغيل", nameEn:"Security of Operating Systems", credits:6, category:"track-scn-cs", tracks:["scn-cs"], term:9, prereq:["NOS601"] },
  { code:"NNT601", name:"الشبكات الحاسوبية (2)", nameEn:"Computer Networks II", credits:6, category:"track-scn-cs", tracks:["scn-cs","scn-ns"], term:9, prereq:["BNT501","NOS601"] },
  { code:"NDS601", name:"النظم الموزعة والسحابية (باللغة الإنكليزية)", nameEn:"Distributed & Cloud Systems (in English)", credits:6, category:"track-scn-cs", tracks:["scn-cs","scn-ns"], term:9, prereq:["NOS601"] },
  { code:"NMS601", name:"الأمن في النظم الحديثة", nameEn:"Security in Modern Systems", credits:6, category:"track-scn-cs", tracks:["scn-cs"], term:10, prereq:["NNT601"] },
  { code:"NSS601", name:"أمن الشبكات الحاسوبية", nameEn:"Computer Networks Security", credits:6, category:"track-scn-cs", tracks:["scn-cs","scn-ns"], term:10, prereq:["BIS601"] },
  { code:"NEH601", name:"الاختراق الأخلاقي", nameEn:"Ethical Hacking", credits:6, category:"track-scn-cs", tracks:["scn-cs"], term:10, prereq:["NSO601","NNT601","NCR601"] },

  // ================= النظم والشبكات — مسار أنظمة الشبكات (NS) =================
  { code:"NCA601", name:"بنيان الحاسوب (2)", nameEn:"Computer Architecture II", credits:6, category:"track-scn-ns", tracks:["scn-ns"], term:8, prereq:["BCA501","BIA601"] },
  { code:"NNP601", name:"برمجة التطبيقات الشبكية", nameEn:"Network Application Programming", credits:5, category:"track-scn-ns", tracks:["scn-ns"], term:8, prereq:["BPG402","BNT501","BIA601"] },
  { code:"NOSL601",name:"مخبر نظم التشغيل (2)", nameEn:"Operating Systems II Lab", credits:4, category:"track-scn-ns", tracks:["scn-ns"], term:8, prereq:[], concurrent:["NOS601"] },
  { code:"NNS601", name:"خدمات شبكية", nameEn:"Network Services", credits:6, category:"track-scn-ns", tracks:["scn-ns"], term:9, prereq:["BNT501","NOS601"] },
  { code:"NNM601", name:"إدارة الشبكات", nameEn:"Network Management", credits:6, category:"track-scn-ns", tracks:["scn-ns"], term:10, prereq:["NNT601"] },
  { code:"NRT601", name:"نظم الزمن الحقيقي", nameEn:"Real Time Systems", credits:6, category:"track-scn-ns", tracks:["scn-ns"], term:10, prereq:["NOS601","NNS601"] },
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

// الفصل الفعلي لمقرر ضمن سياق مسار معيّن (أو الفصل الافتراضي)
function effectiveTerm(course, trackId) {
  if (trackId && course.termByTrack && course.termByTrack[trackId] != null) {
    return course.termByTrack[trackId];
  }
  return course.term;
}

// كل الفصول التي قد يظهر بها المقرر (للتصفية العامة دون تحديد مسار)
function allPossibleTerms(course) {
  const set = new Set([course.term]);
  if (course.termAlt) set.add(course.termAlt);
  if (course.termByTrack) Object.values(course.termByTrack).forEach(t => set.add(t));
  return Array.from(set);
}

/* ============================================================
   معلومات صفحة البرنامج الرسمية (svuonline.org/ar/program/ite)
   ============================================================ */
const PROGRAM_INFO = {
  goal: "يهدف برنامج الإجازة في الهندسة المعلوماتية (ITE) إلى إعداد مهندسي معلوماتية بشكل عام، وبشكل خاص مهندسي معلوماتية مختصين في هندسة البرمجيات، أو الذكاء الصنعي، أو النظم والشبكات الحاسوبية، يمتلكون المعارف والمهارات الأساسية في هذه العلوم الهندسية، من خلال بيئة تحفّز الطالب على التحصيل والتحليل والتركيب وتوليد الحلول وعمليات الابتكار والتجديد.",
  admission: [
    "شهادة الثانوية العلمية (حديثة أو قديمة) أو ما يعادلها، بمعدل 85% كحد أدنى، أو أي ضوابط أخرى يحددها مجلس الجامعة في بداية كل عام دراسي.",
    "أو شهادة الثانوية المهنية اختصاص معلوماتية أو تقنيات الحاسوب أو شبكات حاسوبية، بمعدل 95% كحد أدنى.",
  ],
  duration: [
    "ألا تتجاوز مدة الدراسة عشر سنوات، ويُعتبر الطالب مستنفدًا في حال تجاوز هذه المدة.",
    "يُشترط الحصول على الحد الأدنى من الوحدات المعتمدة الموضح في الجدول أدناه للترفيع إلى كل سنة دراسية.",
  ],
  grading: [
    "يُعدّ الطالب ناجحًا في المقرر إذا حصل على محصلة نهائية أكبر أو تساوي 60% من الدرجة العليا للمقرر.",
    "تُحتسب علامة المقرر من 100 درجة: درجة أعمال لا تزيد على 30%، وامتحان كتابي نهائي لا يقل عن 70%.",
  ],
  graduation: [
    "الحصول على 300 وحدة معتمدة على الأقل.",
    "النجاح في جميع المقررات العامة والأساسية.",
    "النجاح في جميع المواد الإلزامية للاختصاص الذي اختاره الطالب.",
    "النجاح في المشروعين: الأول (المشروع الفصلي) والثاني (مشروع التخرج).",
    "ألا تقل مدة الدراسة عن تسعة فصول، ولا تتجاوز عشر سنوات.",
    "الحصول على معدل نجاح لا يقل عن 60% في المقررات وفي كل من المشروعين.",
    "تسديد الرسوم والأقساط المالية المترتبة وفقًا للنظام المالي.",
    "تمنح الجامعة شهادة الإجازة في الهندسة المعلوماتية مع ذكر اسم الاختصاص عليها.",
  ],
  specialization: "اختيار الاختصاص (هندسة البرمجيات / الذكاء الصنعي / النظم والشبكات الحاسوبية) إجباري عند الحصول على 160 وحدة معتمدة على الأقل (بعد الترفيع إلى السنة الرابعة). ثم يختار الطالب أحد المسارين ضمن كل اختصاص.",
  source: "https://svuonline.org/ar/program/ite",
};

const CREDIT_THRESHOLDS = [
  { year: "الثانية", min: 40 },
  { year: "الثالثة", min: 100 },
  { year: "الرابعة", min: 160 },
  { year: "الخامسة", min: 220 },
];

// تُستخدم في صفحة "ملاحظات" المستقلة
const NOTES = [
  "ألا تتجاوز مدة الدراسة في الجامعة عشر سنوات؛ وفي حال تجاوز هذه المدة يُعتبر الطالب مستنفدًا.",
  "يُعدّ الطالب ناجحًا في المقرر إذا حصل على محصلة نهائية أكبر أو تساوي 60% من الدرجة العليا للمقرر.",
  "تُحتسب علامة المقرر من 100 درجة: 30% كحد أقصى درجة أعمال، و70% كحد أدنى امتحان كتابي نهائي.",
  "اختيار الاختصاص إجباري عند الحصول على 160 وحدة معتمدة على الأقل (بعد الترفيع للسنة الرابعة).",
  "يشترط للتسجيل في «مشروع 1» (BPR601) الحصول على 180 وحدة معتمدة على الأقل، وللتسجيل في «مشروع 2» (BPR602) الحصول على 240 وحدة معتمدة على الأقل مع تقديم مشروع 1.",
  "بعض المخابر (مثل مخبر نظم التشغيل ومخبر قواعد البيانات) تُنزَّل بالتوازي مع المقرر النظري المرتبط بها، لا كمتطلب سابق له.",
];
