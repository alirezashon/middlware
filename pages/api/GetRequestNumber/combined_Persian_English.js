const cities = {
	"Hashtgerd": "هشتگرد",
	"Karaj": "کرج",
	"Kamal Shahr": "کمال شهر",
	"Baghestan": "باغستان",
	"Chaharbagh": "چهارباغ",
	"Eshtehard": "اشتهارد",
	"Fardis": "فردیس",
	"Garmdareh": "گرمدره",
	"Gohardasht": "گوهردشت",
	"Golshahr": "گلشهر",
	"Hesarak": "حصارک",
	"Kelak": "کلاک",
	"Mahdasht": "ماهدشت",
	"malard": "ملارد",
	"Meshkindasht": "مشکیندشت",
	"Mohammad Shahr": "محمد شهر",
	"Nazarabad": "نظرآباد",
	"Nesa": "نسا",
	"Rajai Shahr": "رجایی شهر",
	"Safadasht": "صفادشت",
	"Sarasiab": "سرآسیاب",
	"Savojbolagh": "ساوجبلاغ",
	"Taleghan": "طالقان",
	"Andisheh": "اندیشه",
	"Ardabil": "اردبیل",
	"Aslan Duz": "اصلان دوز",
	"Bilehsavar": "بیله سوار",
	"Germi": "گرمی",
	"Khalkhal": "خلخال",
	"Kowsar": "کوثر",
	"Meshginshahr": "مشگین شهر",
	"Namin": "نمین",
	"Nir": "نیر",
	"Parsabad": "پارس آباد",
	"Sareyn": "سرعین",
	"Tazeh Kand-e Angut": "تازه کند انگوت",
	"garmi": "گرمی",
	"Bazargan": "بازرگان",
	"Serow": "سروو",
	"Baruq": "باروق",
	"Bukan": "بوکان",
	"Chahar Borj": "چهار برج",
	"Chaldoran": "چالدران",
	"Chaypareh": "چایپاره",
	"Khoy": "خوی",
	"Mahabad": "مهاباد",
	"Maku": "ماکو",
	"Miandoab": "میاندوآب",
	"Naqadeh": "نقده",
	"Orumiyeh": "ارومیه",
	"Oshnaviyeh": "اشنویه",
	"Piranshahr": "پیرانشهر",
	"Poldasht": "پلدشت",
	"Qarah Zia od Din": "قره ضیاء الدین",
	"Salmas": "سلماس",
	"Sardasht": "سردشت",
	"Shahindezh": "شاهیندژ",
	"Showt": "شوت",
	"Takab": "تکاب",
	"Ahar": "اهر",
	"Ajabshir": "عجب شیر",
	"Azarshahr": "آذرشهر",
	"Bonab": "بناب",
	"Bostanabad": "بستان آباد",
	"Charuymaq": "چارویماق",
	"GOOGAN": "گوگان",
	"HADISHAHR": "هادیشهر",
	"Hashtrud": "هشترود",
	"Heris": "هریس",
	"Hurand": "هوراند",
	"Jolfa": "جلفا",
	"Kaleybar": "کلیبر",
	"Khoda Afarin": "خدا آفرین",
	"Kuzeh Kanan": "کوزه کنان",
	"Malekan": "ملکان",
	"Maragheh": "مراغه",
	"Marand": "مرند",
	"MEHRABAN": "مهرابان",
	"Mianeh": "میانه",
	"Osku": "اسکو",
	"Qarah Aghaj": "قره آغاج",
	"Sahand": "سهند",
	"Sarab": "سراب",
	"Shabestar": "شبستر",
	"Tabriz": "تبریز",
	"TASOOJ": "تاسوج",
	"Varzaqan": "ورزقان",
	"Gharah Aghaj": "قره آغاج",
	"Asaluyeh": "عسلویه",
	"Genaveh": "گناوه",
	"Borazjan": "برازجان",
	"Bushehr": "بوشهر",
	"nakhl taghi": "نخل تقی",
	"Sadabad": "سعدآباد",
	"sahmo jonobi": "سهمو جنوبی",
	"sahmo shomali": "سهمو شمالی",
	"Siraaf": "سیراف",
	"Tang-e Eram": "تنگ ارم",
	"Tangestan": "تنگستان",
	"vahdatieh": "وحدتیه",
	"zabar": "زبار",
	"Abdan": "آبدان",
	"bardkhun": "بردخون",
	"ahram": "اهرم",
	"Ahrom": "اهرم",
	"akhand": "آخوند",
	"Alishahr": "عالیشهر",
	"badoleh": "بدوله",
	"bandar rig": "دکل بندر",
	"basatin": "بساتین",
	"Benod": "بنود",
	"chahmobarak": "چاهمبارک",
	"choghadak": "چغادک",
	"Dasht-e Palang": "دشت پلنگ",
	"Dashtestan": "دشتستان",
	"Dashti": "دشتی",
	"Dayyer": "روز",
	"delvar": "دلوار",
	"Deylam": "دیلم",
	"Ganaveh": "گناوه",
	"haleh": "هاله",
	"Jam": "مربا",
	"Kangan": "کنگان",
	"Khark": "خارک",
	"khormoj": "خورموج",
	"Lavar-e Saheli": "لاور ساحلی",
	"Ardal": "اردل",
	"Babaheydar": "باباحیدر",
	"Bazoft": "بازفت",
	"Ben": "بن",
	"Boldaji": "بولداجی",
	"Borujen": "بروجن",
	"Chelgerd": "چلگرد",
	"Farrokhshahr": "فرخ شهر",
	"Farsan": "فارسان",
	"Gahru": "گهرو",
	"Hafshajan": "هفشجان",
	"Junqan": "جونقان",
	"Khanmirza": "خانمیرزا",
	"Kiar": "کیار",
	"Kuhrang": "کوهرنگ",
	"Lordegan": "لردگان",
	"Saman": "سامان",
	"Samsami": "صمصامی",
	"Shahrekord": "شهرکرد",
	"Sureshjan": "سورشجان",
	"Junghan": "جونگان",
	"Mal-e Khalifeh": "مال خلیفه",
	"Shahr-e Kord": "شهرکرد",
	"Region 1": "منطقه 1",
	"Region 2": "منطقه 2",
	"Region 3": "منطقه 3",
	"Region 4": "منطقه 4",
	"Region 5": "منطقه 5",
	"Region 6": "منطقه 6",
	"Region 7": "منطقه 7",
	"Baharestan": "بهارستان",
	"Esfahan": "اصفهان",
	"Fereydan": "فریدن",
	"Fereydunshahr": "فریدونشهر",
	"Fulad shahr": "فولاد شهر",
	"Fulademobarake": "فولادموبارکه",
	"Fuladshahr": "فولادشهر",
	"Ghahdarijan": "قهدریجان",
	"Ghaleshur": "قالشور",
	"Golpayegan": "گلپایگان",
	"Gugad": "گوگاد",
	"Herand": "هراند",
	"Hunejan": "هونهجان",
	"Kashan": "کاشان",
	"Kelishad": "کلیشاد",
	"Khansar": "خوانسار",
	"Kharzugh": "خرزوق",
	"Khazagh": "خزاق",
	"Khomeini Shahr": "خمینی شهر",
	"Khur and Biabanak": "خور و بیابانک",
	"Kuhpayeh": "کوهپایه",
	"Langan": "لانگان",
	"Lenjan": "لنجان",
	"Majlesi": "مجلسی",
	"Meymeh": "میمه",
	"mobarake": "مبارکه",
	"Mobarakeh": "مبارکه",
	"Nain": "نایین",
	"Najafabad": "نجف آباد",
	"Natanz": "نطنز",
	"Nikabad": "نیک آباد",
	"NushAbad": "نوش آباد",
	"Pirbakran": "پیربکران",
	"Ramsheh": "رامشه",
	"Rustaye eshen": "روستای ایشن",
	"Semirom": "سمیرم",
	"Sepahan Shahr": "سپاهان شهر",
	"Shahin Shahr": "شاهین شهر",
	"Shahreza": "شهرضا",
	"Tiran and Karvan": "تیران و کاروان",
	"Varnamkhast": "ورنامخواست",
	"Varzaneh": "ورزنه",
	"Zarinshahr": "زرین شهر",
	"Dorcheh": "درچه",
	"Donbi": "دنبی",
	"Hasanabad": "حسن آباد",
	"Malvajerd": "ملواجرد",
	"naeen": "نائین",
	"Zavareh": "زواره",
	"Aran and Bidgol": "آران و بیدگل",
	"Ardestan": "اردستان",
	"Badrud": "بادرود",
	"Baghebahadoran": "باغبهادران",
	"Bideh": "بیده",
	"Borkhar": "برخوار",
	"Buin and Miandasht": "بوئین و میاندشت",
	"Chadegan": "چادگان",
	"Charkhab": "چرخاب",
	"Daran": "داران",
	"Dastgerdbarkhar": "دستگردبرخوار",
	"Dehaqan": "دهاقان",
	"Deris": "دریس",
	"Dolatabad": "دولت آباد",
	"Falavarjan": "فلاورجان",
	"Shiraz": "شیراز",
	"Meymand": "میمند",
	"Hamashahr": "هماشهر",
	"Abadeh": "آباده",
	"Arsanjan": "ارسنجان",
	"Bahman": "بهمن",
	"Bajgah": "باجگاه",
	"Bavanat": "بوانات",
	"beyza": "بیزا",
	"Bighard": "بیگارد",
	"bishaboor": "بیشابور",
	"Borak": "بوراک",
	"Darab": "داراب",
	"Eqlid": "اقلید",
	"Eshkanan": "اشکانان",
	"Estahban": "استهبان",
	"Evaz": "اواز",
	"Farashband": "فراشبند",
	"Fasa": "فسا",
	"Firuzabad": "فیروزآباد",
	"Fishvar": "فیش ور",
	"Galleh Dar": "گاله در",
	"Gerash": "گراش",
	"Hajjiabad": "حاجی آباد",
	"Hermud": "هرمود",
	"Jahrom": "جهرم",
	"Juyom": "جویوم",
	"Karzin": "کارزین",
	"Kavar": "کوار",
	"Kazerun": "کازرون",
	"Khafr": "خفر",
	"Kharameh": "خرامه",
	"Khonj": "خنج",
	"Khorrambid": "خرمبید",
	"Kurdeh": "کورده",
	"Lamerd": "لامرد",
	"Lar": "لار",
	"Larestan": "لارستان",
	"Mamasani": "ممسنی",
	"Marvdasht": "مرودشت",
	"Mohr": "مهر",
	"Neyriz": "نی ریز",
	"Nourabad": "نورآباد",
	"Pasargad": "پاسارگاد",
	"Qir and Karzin": "قیر و کارزین",
	"Rostam": "رستم",
	"Sadra": "صدرا",
	"Safashahr": "صفاشهر",
	"Sarchehan": "سرچهان",
	"Sarvestan": "سروستان",
	"Sepidan": "سپیدان",
	"Zarghan": "زرقان",
	"Zarrindasht": "زرین دشت",
	"Rasht": "رشت",
	"Bandar Anzali": "بندر انزلی",
	"Amlash": "املش",
	"Astane ye Ashrafiyeh": "آستانه اشرفیه",
	"Astara": "آستارا",
	"Bandar-e-Anzali": "بندر انزلی",
	"Chaboksar": "چابکسر",
	"Fouman": "فومن",
	"Khomam": "خمام",
	"khoshkebijar": "خشکبیجار",
	"kochesfehan": "کوچصفهان",
	"Lahijan": "لاهیجان",
	"Langerud": "لنگرود",
	"Lowshan": "لوشان",
	"Manjil": "منجیل",
	"Masal": "ماسال",
	"Rezvanshahr": "رضوانشهر",
	"Rudbar": "رودبار",
	"Rudsar": "رودسر",
	"Sangar": "سنگر",
	"Shaft": "شفت",
	"Siahkal": "سیاهکل",
	"Sowmeeh sara": "صومعه سارا",
	"Talesh": "تالش",
	"Aliabad": "علی آباد",
	"Aqqala": "آق قلا",
	"yasgani": "یاسگانی",
	"Azadshahr": "آزادشهر",
	"Bandar-e-gaz": "بندرگز",
	"Bandar-e-Torkaman": "بندرترکمان",
	"Fazelabad": "فاضل آباد",
	"Galikash": "گالیکش",
	"Gomishan": "گمیشان",
	"Gonbad-e-Kavus": "گنبدکاووس",
	"Gorgan": "گرگان",
	"Kalaleh": "کلاله",
	"Khanbebin": "خانببین",
	"Kordkuy": "کردکوی",
	"Maraveh Tapeh": "مراوه تپه",
	"Minudasht": "مینودشت",
	"Ramian": "رامیان",
	"Gonbad-e Kavus": "گنبدکاووس",
	"Hamedan": "همدان",
	"Jowkar": "جوکار",
	"Asadabad": "اسدآباد",
	"Bahar": "بهار",
	"Famenin": "فامنین",
	"Gorveh darjazin": "گروه درجزین",
	"Kabudarahang": "کبودرآهنگ",
	"Lalejin": "لالجین",
	"Malayer": "ملایر",
	"Molla Bodagh": "ملا بوداق",
	"Nahavand": "نهاوند",
	"Nahavand Cement Factory": "کارخانه سیمان نهاوند",
	"Qahavand": "قهاوند",
	"Razan": "رزن",
	"Shirin Su": "شیرین سو",
	"shirinsu": "شیرینسو",
	"Tuyserkan": "تویسرکان",
	"Abumusa": "ابوموسا",
	"Bandar-e-Abbas": "بندرعباس",
	"Bandar-e-Lengeh": "بندر لنگه",
	"Bashagard": "بشاگرد",
	"Bastak": "بستک",
	"dargahan": "درگهان",
	"Farur": "فارور",
	"Great Tunb": "تنب عالی",
	"Hajiabad": "حاجی آباد",
	"Hanguye": "هانگویه",
	"Hendorabi": "هندورابی",
	"Hengam": "هنگام",
	"Hormoz": "هرمز",
	"Jask": "جاسک",
	"Khamir": "خمیر",
	"Kish": "کیش",
	"Larak": "لارک",
	"Lavan": "لاوان",
	"Lesser Tunb": "تنب کوچک",
	"Minab": "میناب",
	"Parsian": "پارسیان",
	"Qeshm": "قشم",
	"Rudan": "رودان",
	"Shahr Jadid-e Alavi": "شهر جدید علوی",
	"Siri": "سیری",
	"Sirik": "سیریک",
	"Tabl": "جدول",
	"Haji abad": "حاجی آباد",
	"Bandar Abbas": "بندرعباس",
	"Ilam": "ایلام",
	"Balavah": "بالاوه",
	"Abdanan": "آبدانان",
	"Arkavaz": "ارکواز",
	"Badreh": "بدره",
	"Chardavol": "چرداول",
	"Chavar": "چوار",
	"Darreh shahr": "دره شهر",
	"Dehloran": "دهلران",
	"Eyvan": "ایوان",
	"Holeylan": "هولیلان",
	"Lumar": "لومار",
	"Mehran": "مهران",
	"Sarableh": "سرابله",
	"Malekshahi": "ملکشاهی",
	"Shirvan": "شیروان",
	"Anar": "انار",
	"Anbarabad": "عنبرآباد",
	"Arzuiyeh": "آرزویه",
	"Baft": "بافت",
	"Bahreman": "بهرمان",
	"Bam": "بام",
	"Bardsir": "بردسیر",
	"Darb-e Behesht": "درب بهشت",
	"Fahraj": "فهرج",
	"Faryab": "فاریاب",
	"Jiroft": "جیرفت",
	"Kahnuj": "کهنوج",
	"Kerman": "کرمان",
	"Koshkoueieh": "کوشکویه",
	"Kuhbanan": "کوهبنان",
	"Manujan": "منوجان",
	"Mes-e Sarcheshmeh": "مس سرچشمه",
	"Narmashir": "نرماشیر",
	"Qhale Ganj": "قلعه گنج",
	"Rabor": "رابر",
	"Rafsanjan": "رفسنجان",
	"Ravar": "راور",
	"Rigan": "ریگان",
	"Rudbar-e-Jonub": "رودبار جنوب",
	"Safaiyeh": "صفاییه",
	"Shahr-e-Babak": "شهربابک",
	"Siriz": "سیریز",
	"Sirjan": "سیرجان",
	"Zarand": "زرند",
	"Rayen": "راین",
	"Bahraman": "بهرامان",
	"Kermanshah": "کرمانشاه",
	"Eslam Abade Gharb": "اسلام آباد غرب",
	"Bisotoun": "بیستون",
	"Dalahu": "دالاهو",
	"Eslamabad-e Gharb": "اسلام آباد غرب",
	"Gilan-e-gharb": "گیلانغرب",
	"Harsin": "هرسین",
	"Javanrud": "جوانرود",
	"Kangavar": "کنگاور",
	"kerend-e gharb": "کرند غرب",
	"Paveh": "پاوه",
	"Qasr-e-Shirin": "قصرشیرین",
	"Ravansar": "روانسر",
	"Sahneh": "صحنه",
	"Salas-e Babajani": "ثلاث باباجانی",
	"Sarpol-e-Zahab": "سرپل ذهاب",
	"Sonqor": "سنقر",
	"Tazehabad": "تازه آباد",
	"Arian Shahr": "آرین شهر",
	"Asadiyeh": "اسدیه",
	"Birjand": "بیرجند",
	"Boshruyeh": "بشرویه",
	"Darmian": "درمیان",
	"Eshqabad": "عشق آباد",
	"Ferdows": "فردوس",
	"Khezri": "خضری",
	"Khusf": "خوسف",
	"Nehbandan": "نهبندان",
	"Qaen": "قاین",
	"Sarayan": "سرایان",
	"Sarbisheh": "سربیشه",
	"Tabas": "طبس",
	"Zirkuh": "زیرکوه",
	"Bajestan": "بجستان",
	"Bakharz": "باخارز",
	"Bardaskan": "بردسکن",
	"Binalud": "بینالود",
	"CHAPESHLOO": "چاپشلو",
	"Chenaran": "چناران",
	"Dargaz": "درگز",
	"darKalate": "دارکالات",
	"Darrud": "دررود",
	"Davarzan": "داورزن",
	"Fariman": "فریمان",
	"Feyz Abad": "فیض آباد",
	"Firuzeh": "فیروزه",
	"Golbahar": "گلبهار",
	"Gonabad": "گناباد",
	"Joghatai": "جغتای",
	"Jowayin": "جواین",
	"Kalat": "کلات",
	"Kashmar": "کاشمر",
	"Khaf": "خواف",
	"Khalilabad": "خلیل آباد",
	"Khoshab": "خوشاب",
	"Kuhsorkh": "کوهسرخ",
	"Mahvelat": "مهولت",
	"Mashhad": "مشهد",
	"NasrAbad": "نصرآباد",
	"Neghab": "نگهاب",
	"Neyshabur": "نیشابور",
	"Qasem Abad": "قاسم آباد",
	"Quchan": "قوچان",
	"Rivash": "ریواش",
	"Roshtkhar": "رشتخوار",
	"Sabzevar": "سبزوار",
	"SALEH ABAD": "صالح آباد",
	"Sarakhs": "سرخس",
	"Shandiz": "شاندیز",
	"Sheshtomad": "ششتومد",
	"Taybad": "تایباد",
	"Torbat-e-Heydarieh": "تربت حیدریه",
	"Torbat-e-Jam": "تربت جام",
	"Torqabeh": "طرقبه",
	"Zaveh": "زاوه",
	"Zeberkhan": "زبرخان",
	"Ashkhaneh": "آشخانه",
	"Bojnurd": "بجنورد",
	"Esfarayen": "اسفراین",
	"Faruj": "فاروج",
	"Garmeh": "گرمه",
	"Jajrom": "جاجرم",
	"Maneh and Samalqan": "مانه و سملقان",
	"Raz and Jargalan": "راز و جرگلان",
	"Safi Abad": "صفی آباد",
	"Dezful": "دزفول",
	"Mahshahr": "ماهشهر",
	"Ahvaz": "اهواز",
	"Arvand Free Zone": "منطقه آزاد اروند",
	"Abadan": "آبادان",
	"Aghajari": "آغاجاری",
	"Andika": "اندیکا",
	"Andimeshk": "اندیمشک",
	"Baghmalek": "باغملک",
	"Bandar Imam Khomeini": "بندر امام خمینی",
	"Bavi": "باوی",
	"Behbahan": "بهبهان",
	"Dasht-e-Azadegan": "دشت آزادگان",
	"Dehdez": "دهدز",
	"Gotvand": "گتوند",
	"Haftkel": "هفتکل",
	"Hamidiyeh": "حمیدیه",
	"Hendijan": "هندیجان",
	"Hoveyzeh": "هویزه",
	"Izeh": "ایذه",
	"Karun": "کارون",
	"Khorramshahr": "خرمشهر",
	"Lali": "لالی",
	"Masjed Soleyman": "مسجد سلیمان",
	"Mollasani": "ملاثانی",
	"Omidiyeh": "امیدیه",
	"Ramhormoz": "رامهرمز",
	"Ramshir": "رامشیر",
	"Sarbandar": "سربندر",
	"Shadegan": "شادگان",
	"Shahr Jadid-e Ramin": "شهر جدید رامین",
	"Shirin Shahr": "شیرین شهر",
	"Shush": "ساکت باش",
	"Shushtar": "شوشتر",
	"Susangerd": "سوسنگرد",
	"Bahmai": "بهمئی",
	"Basht": "باشت",
	"Boyer-Ahmad": "بویراحمد",
	"Charam": "چرام",
	"Dana": "دانا",
	"Dehdasht": "دهدشت",
	"Dogonbadan": "دوگنبدان",
	"Gachsaran": "گچساران",
	"Kohgiluyeh": "کهگیلویه",
	"Landeh": "لنده",
	"Likak": "لیکک",
	"Margon": "مارگون",
	"yasuj": "یاسوج",
	"Suq": "سوق",
	"Yasuj": "یاسوج",
	"Baneh": "بانه",
	"Saqqez": "سقز",
	"Sanandaj": "سنندج",
	"Marivan": "مریوان",
	"Bashmaq": "باشماق",
	"Avihang": "آویهنگ",
	"Bijar": "بیجار",
	"Dehgolan": "دهگلان",
	"Divandarreh": "دیواندره",
	"Gol Tappeh": "گل تپه",
	"Kamyaran": "کامیاران",
	"Negel": "نگل",
	"Qorveh": "قروه",
	"Sarvabad": "سروآباد",
	"Shuyesheh": "شویشه",
	"Yasukand": "یاسوکند",
	"Zarrineh": "زرینه",
	"Khorram Abad": "خرم آباد",
	"Noorabad": "نورآباد",
	"Aleshtar": "الشتر",
	"Aligudarz": "الیگودرز",
	"Azna": "ازنا",
	"Borujerd": "بروجرد",
	"Chegeni": "چگنی",
	"Delfan": "دلفان",
	"Dorud": "دورود",
	"Dowreh": "دوره",
	"Kahriz-e Varvasht": "کهریز وروشت",
	"Khorramabad": "خرم آباد",
	"Kuhdasht": "کوهدشت",
	"Kunani": "کونانی",
	"noor abad": "نور آباد",
	"Pol-e Dokhtar": "پلدختر",
	"Romeshgan": "رومشگان",
	"Selseleh": "سلسله",
	"Sepid dasht": "سپید دشت",
	"Saveh": "ساوه",
	"Arak": "اراک",
	"Ashtian": "آشتیان",
	"Delijan": "دلیجان",
	"Farahan": "فراهان",
	"Farmahin": "فرمهین",
	"Gharqabad": "غرق آباد",
	"Khomein": "خمین",
	"Khondab": "خنداب",
	"Komijan": "کمیجان",
	"Mahallat": "محلات",
	"Nimvar": "نیم ور",
	"Nowbaran": "نوبران",
	"Oshtorjan": "اشتورجان",
	"Shazand": "شازند",
	"Tafresh": "تفرش",
	"Zarandieh": "زرندیه",
	"Amirkabir": "امیرکبیر",
	"Chalus": "چالوس",
	"Fereydun Kenar": "فریدون کنار",
	"Nur": "نور",
	"Sari": "ساری",
	"Babolsar": "بابلسر",
	"Tonekabon": "تنکابن",
	"Ramsar": "رامسر",
	"Nowshahr": "نوشهر",
	"Babol": "بابل",
	"Abbasabad": "عباس آباد",
	"Amol": "آمل",
	"Behshahr": "بهشهر",
	"Fereydunkenar": "فریدونکنار",
	"Galugah": "گالوگاه",
	"Hichrod": "هیچرود",
	"Yazd": "یزد",
	"Izadshahr": "ایزدشهر",
	"Juybar": "جویبار",
	"Kelarabad": "کلارآباد",
	"Kelardasht": "کلاردشت",
	"Kia Kola": "کیا کلا",
	"Kojur": "کجور",
	"Mahmudabad": "محمودآباد",
	"Miandorud": "میاندورود",
	"Namakabrud": "نمکابرود",
	"Neka": "نکا",
	"North Savadkuh": "سوادکوه شمالی",
	"Noshahr": "نوشهر",
	"Qaemshahr": "قائم شهر",
	"Royan": "رویان",
	"Salman Shahr": "سلمان شهر",
	"Savadkuh": "سوادکوه",
	"Simorgh": "سیمرغ",
	"Surak": "سورک",
	"Zirab": "زیراب",
	"Abgarm": "آبگرم",
	"Abyek": "آبیک",
	"Alborz": "البرز",
	"Avaj": "آوج",
	"Buin Zahra": "بوئین زهرا",
	"Danesfahan": "دانسفهان",
	"Hesar": "حصار",
	"Judaki": "جودکی",
	"Kashkevar": "کشکور",
	"Khorramdasht": "خرمدشت",
	"Minudasht Alamut": "مینودشت الموت",
	"Mir Khavand-e Olya": "میر خاوند علیا",
	"Mohammadiyeh": "محمدیه",
	"Qazvin": "قزوین",
	"Qorveh Darjazin": "قروه درجزین",
	"Sangan-e Sofla": "سنگان سفلی",
	"Shahr Sanaati Alborz": "شهر صنعتی البرز",
	"Takestan": "تاکستان",
	"Ziaabad": "ضیاء آباد",
	"eghbalieh": "اقبالیه",
	"mohammadieh": "محمدیه",
	"Pardisan": "پردیسان",
	"Qom": "قم",
	"Jafarie": "جعفری",
	"Tehran": "تهران",
	"Gilan": "گیلان",
	"Golestan": "گلستان",
	"Mazandaran": "مازندران",
	"Khorasan jonubi": "خراسان جنوبی",
	"Khorasan Razavi": "خراسان رضوی",
	"Khorasan shomali": "خراسان شمالی",
	"Semnan": "سمنان",
	"Sistan va Baluchestan": "سیستان و بلوچستان",
	"Chaharmahal va Bakhtiari": "چهارمحال و بختیاری",
	"Markazi": "مرکزی",
	"Fars": "فارس",
	"Hormozgan": "هرمزگان",
	"Khuzestan": "خوزستان",
	"Kohgeluyeh va Boyer-Ahmad": "کهگلویه و بویراحمد",
	"Lorestan": "لرستان",
	"Zanjan": "زنجان",
	"Azarbaijan Gharbi": "آذربایجان غربی",
	"Azarbaijan sharghi": "آذربایجان شرقی",
	"Kurdestan": "کردستان",
	"Aradan": "آرادان",
	"Beyarjomand": "بیارجمند",
	"Damghan": "دامغان",
	"Eyvanekey": "ایوانکی",
	"Garmsar": "گرمسار",
	"Mehdishahr": "مهدیشهر",
	"Meyami": "میامی",
	"Shahmirzad": "شهمیرزاد",
	"Shahrud": "شاهرود",
	"Sorkheh": "سرخه",
	"Zahedan": "زاهدان",
	"Iranshahr": "ایرانشهر",
	"Chabahar": "چابهار",
	"Bampur": "بمپور",
	"Bazman": "بزمان",
	"Dalgan": "دالگان",
	"Fanuj": "فنوج",
	"Hamun": "هامون",
	"Hirmand": "هیرمند",
	"KAFE BALOCHI": "کافه بلوچی",
	"Khash": "خاش",
	"Konarak": "کنارک",
	"Lashar": "لاشار",
	"Mehrestan": "مهرستان",
	"Mirjaveh": "میرجاوه",
	"Nikshahr": "نیکشهر",
	"Nimruz": "نیمروز",
	"Qasr-e-Qand": "قصرقند",
	"Ramshar": "رامشار",
	"rusk": "سوخاری",
	"Saravan": "سراوان",
	"Sarbaz": "سرباز",
	"Sib and Suran": "سیب و سوران",
	"Taftan": "تفتان",
	"Zabol": "زابل",
	"Zahak": "ضحاک",
	"Zarabad": "زرآباد",
	"Zehak": "ضحاک",
	"Rask": "راسک",
	"Nimrus": "نیمروس",
	"Eslamshahr": "اسلامشهر",
	"Shahriyar": "شهریار",
	"Pardis": "پردیس",
	"Lavasan": "لواسان",
	"Rey": "ری",
	"Parand": "پرند",
	"Malard": "ملارد",
	"Sulqan": "سولقان",
	"andishe": "اندیشه",
	"Baghershahr": "باقرشهر",
	"Bumehen": "بومهن",
	"Damavand": "دماوند",
	"Fasham": "فشم",
	"Firuzkuh": "فیروزکوه",
	"forodgah emam khomeyni": "فرودگاه امام خمینی",
	"ghiamdasht": "قیامدشت",
	"Hasan abad": "حسن آباد",
	"Islamshahr": "اسلامشهر",
	"Jajrood": "جاجرود",
	"Kahrizak": "کهریزک",
	"khavarshahr": "خاورشهر",
	"Meigon": "میگون",
	"meygon": "میگون",
	"Nasim Shahr": "نسیم شهر",
	"Pakdasht": "پاکدشت",
	"Pishva": "پیشوا",
	"Qarchak": "قرچک",
	"Qods": "قدس",
	"Robat Karim": "رباط کریم",
	"Rudehen": "رودهن",
	"Sabashahr": "صباشهر",
	"Saleh Abad": "صالح آباد",
	"shahr sanati shamsabad": "شهر صنعتی شمس آباد",
	"Shahriar": "شهریار",
	"shams abad": "شمس آباد",
	"Shemiranat": "شمیرانات",
	"shemshak": "شمشک",
	"shorabad": "شورآباد",
	"Varamin": "ورامین",
	"Vavan": "واوان",
	"VPN (M002)": "VPN (M002)",
	"Quality Control (M004)": "کنترل کیفیت (M004)",
	"Scrap (M007)": "قراضه (M007)",
	"B2B - Sales (M008)": "B2B - فروش (M008)",
	"Kouhe Nour (M009)": "کوه نور (M009)",
	"Civil and Install (M006)": "Civil and Install (M006)",
	"Telecom (M001)": "مخابرات (M001)",
	"Modem's Store (M003)": "فروشگاه مودم (M003)",
	"User _ Store": "کاربر _ فروشگاه",
	"IT-Infra Store": "فروشگاه IT-Infra",
	"IT-Infra Customer Store": "فروشگاه مشتریان IT-Infra",
	"HD Store": "فروشگاه HD",
	"Customer _ Store": "مشتری _ فروشگاه",
	"Abarkuh": "ابرکوه",
	"Ardekan": "اردکان",
	"Ashkezar": "اشکذر",
	"Bafq": "بافق",
	"Bahabad": "بهاباد",
	"Chadormelo": "چادرملو",
	"Garizat": "گاریزات",
	"Harat": "هرات",
	"Khatam": "خاتم",
	"Maruset": "مروست",
	"Mehriz": "مهریز",
	"Meybod": "میبد",
	"Nasrabad": "نصرآباد",
	"Shahediyeh": "شاهدیه",
	"Taft": "تفت",
	"Zarch": "زارچ",
	"Zardeyn": "زردین",
	"Do Tappeh": "انجام تپه",
	"Zarrin Rud": "زرین رود",
	"Zarrinabad": "زرین آباد",
	"Saidabad": "سعیدآباد",
	"Halab": "حلب",
	"AB BAR": "آب بر",
	"Abhar": "ابهر",
	"Dandi": "دندی",
	"Garmab": "گرماب",
	"Hidaj": "هیداج",
	"Ijrud": "ایجرود",
	"Khodabandeh": "خدابنده",
	"Khorramdarreh": "خرمدره",
	"Mahneshan": "ماهنشان",
	"Qarah Buteh": "قره بوته",
	"Qeydar": "قیدار",
	"Sain Qaleh": "سین قلعه",
	"Soltaniyeh": "سلطانیه",
	"Tarom": "طارم"
}
export default cities