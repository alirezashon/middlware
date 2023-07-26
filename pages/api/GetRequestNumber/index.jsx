// pages/api/processData.tsx
import  citiesData from './combined_Persian_English.js';
// Sample agents object containing agent names
const agentsObject = {
  agentName: ['YAX', 'Tirajeh', 'Pishgaman', 'ide', 'پیشگامان سخت افزار تیراژه', 'زاگرس'],
};

// Sample cities array containing English city names
const citiesArray2 = ["Hashtgerd", "Karaj", "Kamal Shahr", "Baghestan", "Chaharbagh", "Eshtehard", "Fardis", "Garmdareh", "Gohardasht", "Golshahr", "Hashtgerd", "Hesarak", "Karaj", "Kelak", "Mahdasht", "malard", "Meshkindasht", "Mohammad Shahr", "Nazarabad", "Nesa", "Rajai Shahr", "Safadasht", "Sarasiab", "Savojbolagh", "Taleghan", "Andisheh", "Ardabil", "Ardabil", "Aslan Duz", "Bilehsavar", "Germi", "Khalkhal", "Kowsar", "Meshginshahr", "Namin", "Nir", "Parsabad", "Sareyn", "Tazeh Kand-e Angut", "garmi", "Bazargan", "Serow", "Baruq", "Bukan", "Chahar Borj", "Chaldoran", "Chaypareh", "Khoy", "Mahabad", "Maku", "Miandoab", "Naqadeh", "Orumiyeh", "Oshnaviyeh", "Piranshahr", "Poldasht", "Qarah Zia od Din", "Salmas", "Sardasht", "Shahindezh", "Showt", "Takab", "Ahar", "Ajabshir", "Azarshahr", "Bonab", "Bostanabad", "Charuymaq", "GOOGAN", "HADISHAHR", "Hashtrud", "Heris", "Hurand", "Jolfa", "Kaleybar", "Khoda Afarin", "Kuzeh Kanan", "Malekan", "Maragheh", "Marand", "MEHRABAN", "Mianeh", "Osku", "Qarah Aghaj", "Sahand", "Sarab", "Shabestar", "Tabriz", "TASOOJ", "Varzaqan", "Gharah Aghaj", "Mahabad", "Khoy", "Orumiyeh", "Bukan", "Tabriz", "Maragheh", "Marand", "Asaluyeh", "Genaveh", "Borazjan", "Bushehr", "nakhl taghi", "Sadabad", "sahmo jonobi", "sahmo shomali", "Siraaf", "Tang-e Eram", "Tangestan", "vahdatieh", "zabar", "Abdan", "bardkhun", "ahram", "Ahrom", "akhand", "Alishahr", "Asaluyeh", "badoleh", "bandar rig", "basatin", "Benod", "Borazjan", "Bushehr", "chahmobarak", "choghadak", "Dasht-e Palang", "Dashtestan", "Dashti", "Dayyer", "delvar", "Deylam", "Ganaveh", "haleh", "Jam", "Kangan", "Khark", "khormoj", "Lavar-e Saheli", "Ardal", "Babaheydar", "Bazoft", "Ben", "Boldaji", "Borujen", "Chelgerd", "Farrokhshahr", "Farsan", "Gahru", "Hafshajan", "Junqan", "Khanmirza", "Kiar", "Kuhrang", "Lordegan", "Saman", "Samsami", "Shahrekord", "Sureshjan", "Junghan", "Mal-e Khalifeh", "Shahr-e Kord", "Region 1", "Region 2", "Region 3", "Region 4", "Region 5", "Region 6", "Region 7", "Baharestan", "Esfahan", "Fereydan", "Fereydunshahr", "Fulad shahr", "Fulademobarake", "Fuladshahr", "Ghahdarijan", "Ghaleshur", "Golpayegan", "Gugad", "Herand", "Hunejan", "Kashan", "Kelishad", "Khansar", "Kharzugh", "Khazagh", "Khomeini Shahr", "Khur and Biabanak", "Kuhpayeh", "Langan", "Lenjan", "Majlesi", "Meymeh", "mobarake", "Mobarakeh", "Nain", "Najafabad", "Natanz", "Nikabad", "NushAbad", "Pirbakran", "Ramsheh", "Rustaye eshen", "Semirom", "Sepahan Shahr", "Shahin Shahr", "Shahreza", "Tiran and Karvan", "Varnamkhast", "Varzaneh", "Zarinshahr", "Dorcheh", "Donbi", "Hasanabad", "Malvajerd", "naeen", "Zavareh", "Aran and Bidgol", "Ardestan", "Badrud", "Baghebahadoran", "Baharestan", "Bideh", "Borkhar", "Buin and Miandasht", "Chadegan", "Charkhab", "Daran", "Dastgerdbarkhar", "Dehaqan", "Deris", "Dolatabad", "Esfahan", "Falavarjan", "Shiraz", "Meymand", "Hamashahr", "Abadeh", "Arsanjan", "Bahman", "Bajgah", "Bavanat", "beyza", "Bighard", "bishaboor", "Borak", "Darab", "Eqlid", "Eshkanan", "Estahban", "Evaz", "Farashband", "Fasa", "Firuzabad", "Fishvar", "Galleh Dar", "Gerash", "Hajjiabad", "Hermud", "Jahrom", "Juyom", "Karzin", "Kavar", "Kazerun", "Khafr", "Kharameh", "Khonj", "Khorrambid", "Kurdeh", "Lamerd", "Lar", "Larestan", "Mamasani", "Marvdasht", "Mohr", "Neyriz", "Nourabad", "Pasargad", "Qir and Karzin", "Rostam", "Sadra", "Safashahr", "Sarchehan", "Sarvestan", "Sepidan", "Shiraz", "Zarghan", "Zarrindasht", "Rasht", "Bandar Anzali", "Amlash", "Astane ye Ashrafiyeh", "Astara", "Bandar-e-Anzali", "Chaboksar", "Fouman", "Khomam", "khoshkebijar", "kochesfehan", "Lahijan", "Langerud", "Lowshan", "Manjil", "Masal", "Rasht", "Rezvanshahr", "Rudbar", "Rudsar", "Sangar", "Shaft", "Siahkal", "Sowmeeh sara", "Talesh", "Aliabad", "Aqqala", "yasgani", "Azadshahr", "Bandar-e-gaz", "Bandar-e-Torkaman", "Fazelabad", "Galikash", "Gomishan", "Gonbad-e-Kavus", "Gorgan", "Kalaleh", "Khanbebin", "Kordkuy", "Maraveh Tapeh", "Minudasht", "Ramian", "Gorgan", "Gonbad-e Kavus", "Hamedan", "Jowkar", "Asadabad", "Bahar", "Famenin", "Gorveh darjazin", "Hamedan", "Kabudarahang", "Lalejin", "Malayer", "Molla Bodagh", "Nahavand", "Nahavand Cement Factory", "Qahavand", "Razan", "Shirin Su", "shirinsu", "Tuyserkan", "Abumusa", "Bandar-e-Abbas", "Bandar-e-Lengeh", "Bashagard", "Bastak", "dargahan", "Farur", "Great Tunb", "Hajiabad", "Hanguye", "Hendorabi", "Hengam", "Hormoz", "Jask", "Khamir", "Kish", "Larak", "Lavan", "Lesser Tunb", "Minab", "Parsian", "Qeshm", "Rudan", "Shahr Jadid-e Alavi", "Siri", "Sirik", "Tabl", "Haji abad", "Bandar Abbas", "Kish", "Jask", "Ilam", "Balavah", "Abdanan", "Arkavaz", "Badreh", "Chardavol", "Chavar", "Darreh shahr", "Dehloran", "Eyvan", "Holeylan", "Ilam", "Lumar", "Mehran", "Sarableh", "Malekshahi", "Shirvan", "Anar", "Anbarabad", "Arzuiyeh", "Baft", "Bahreman", "Bam", "Bardsir", "Darb-e Behesht", "Fahraj", "Faryab", "Jiroft", "Kahnuj", "Kerman", "Koshkoueieh", "Kuhbanan", "Manujan", "Mes-e Sarcheshmeh", "Narmashir", "Qhale Ganj", "Rabor", "Rafsanjan", "Ravar", "Rigan", "Rudbar-e-Jonub", "Safaiyeh", "Shahr-e-Babak", "Siriz", "Sirjan", "Zarand", "Rayen", "Bahraman", "Kerman", "Jiroft", "Kermanshah", "Eslam Abade Gharb", "Bisotoun", "Dalahu", "Eslamabad-e Gharb", "Gilan-e-gharb", "Harsin", "Javanrud", "Kangavar", "kerend-e gharb", "Kermanshah", "Paveh", "Qasr-e-Shirin", "Ravansar", "Sahneh", "Salas-e Babajani", "Sarpol-e-Zahab", "Sonqor", "Tazehabad", "Arian Shahr", "Asadiyeh", "Birjand", "Boshruyeh", "Darmian", "Eshqabad", "Ferdows", "Hajjiabad", "Khezri", "Khusf", "Nehbandan", "Qaen", "Sarayan", "Sarbisheh", "Tabas", "Zirkuh", "Bajestan", "Bakharz", "Bardaskan", "Binalud", "CHAPESHLOO", "Chenaran", "Dargaz", "darKalate", "Darrud", "Davarzan", "Fariman", "Feyz Abad", "Firuzeh", "Golbahar", "Gonabad", "Joghatai", "Jowayin", "Kalat", "Kashmar", "Khaf", "Khalilabad", "Khoshab", "Kuhsorkh", "Mahvelat", "Mashhad", "NasrAbad", "Neghab", "Neyshabur", "Qasem Abad", "Quchan", "Rivash", "Roshtkhar", "Sabzevar", "SALEH ABAD", "Sarakhs", "Shandiz", "Sheshtomad", "Taybad", "Torbat-e-Heydarieh", "Torbat-e-Jam", "Torqabeh", "Zaveh", "Zeberkhan", "Ashkhaneh", "Bojnurd", "Esfarayen", "Faruj", "Garmeh", "Jajrom", "Maneh and Samalqan", "Raz and Jargalan", "Safi Abad", "Shirvan", "Birjand", "Neyshabur", "Mashhad", "Bojnurd", "Esfarayen", "Dezful", "Mahshahr", "Ahvaz", "Arvand Free Zone", "Abadan", "Abadan", "Aghajari", "Ahvaz", "Andika", "Andimeshk", "Baghmalek", "Bandar Imam Khomeini", "Bavi", "Behbahan", "Dasht-e-Azadegan", "Dehdez", "Dezful", "Gotvand", "Haftkel", "Hamidiyeh", "Hendijan", "Hoveyzeh", "Izeh", "Karun", "Khorramshahr", "Lali", "Mahshahr", "Masjed Soleyman", "Mollasani", "Omidiyeh", "Ramhormoz", "Ramshir", "Sarbandar", "Shadegan", "Shahr Jadid-e Ramin", "Shirin Shahr", "Shush", "Shushtar", "Susangerd", "Bahmai", "Basht", "Boyer-Ahmad", "Charam", "Dana", "Dehdasht", "Dogonbadan", "Gachsaran", "Kohgiluyeh", "Landeh", "Likak", "Margon", "yasuj", "Suq", "Dogonbadan", "Yasuj", "Baneh", "Saqqez", "Sanandaj", "Marivan", "Bashmaq", "Avihang", "Baneh", "Bijar", "Dehgolan", "Divandarreh", "Gol Tappeh", "Kamyaran", "Marivan", "Negel", "Qorveh", "Sanandaj", "Saqqez", "Sarvabad", "Shuyesheh", "Yasukand", "Zarrineh", "Khorram Abad", "Noorabad", "Aleshtar", "Aligudarz", "Azna", "Borujerd", "Chegeni", "Delfan", "Dorud", "Dowreh", "Kahriz-e Varvasht", "Khorramabad", "Kuhdasht", "Kunani", "noor abad", "Pol-e Dokhtar", "Romeshgan", "Selseleh", "Sepid dasht", "Saveh", "Arak", "Ashtian", "Delijan", "Farahan", "Farmahin", "Gharqabad", "Khomein", "Khondab", "Komijan", "Mahallat", "Nimvar", "Nowbaran", "Oshtorjan", "Saveh", "Shazand", "Tafresh", "Zarandieh", "Amirkabir", "Arak", "Chalus", "Fereydun Kenar", "Nur", "Sari", "Babolsar", "Tonekabon", "Ramsar", "Nowshahr", "Babol", "Abbasabad", "Amol", "Babol", "Babolsar", "Behshahr", "Chalus", "Fereydunkenar", "Galugah", "Hichrod", "Izadshahr", "Juybar", "Kelarabad", "Kelardasht", "Kia Kola", "Kojur", "Mahmudabad", "Miandorud", "Namakabrud", "Neka", "North Savadkuh", "Noshahr", "Nur", "Qaemshahr", "Ramsar", "Royan", "Salman Shahr", "Sari", "Savadkuh", "Simorgh", "Surak", "Tonekabon", "Zirab", "Abgarm", "Abyek", "Alborz", "Avaj", "Buin Zahra", "Danesfahan", "Hesar", "Judaki", "Kashkevar", "Khorramdasht", "Minudasht Alamut", "Mir Khavand-e Olya", "Mohammadiyeh", "Qazvin", "Qorveh Darjazin", "Sangan-e Sofla", "Shahr Sanaati Alborz", "Shirin Su", "Takestan", "Ziaabad", "eghbalieh", "mohammadieh", "Qazvin", "Pardisan", "Qom", "Jafarie", "Qom", "Alborz", "Tehran", "Gilan", "Golestan", "Mazandaran", "Ilam", "Khorasan jonubi", "Khorasan Razavi", "Khorasan shomali", "Semnan", "Sistan va Baluchestan", "Chaharmahal va Bakhtiari", "Esfahan", "Markazi", "Qom", "Bushehr", "Fars", "Hormozgan", "Kerman", "Yazd", "Hamedan", "Ilam", "Kermanshah", "Khuzestan", "Kohgeluyeh va Boyer-Ahmad", "Lorestan", "Qazvin", "Zanjan", "Ardabil", "Azarbaijan Gharbi", "Azarbaijan sharghi", "Kurdestan", "Semnan", "Aradan", "Beyarjomand", "Damghan", "Eyvanekey", "Garmsar", "Mehdishahr", "Meyami", "Semnan", "Shahmirzad", "Shahrud", "Sorkheh", "Zahedan", "Iranshahr", "Chabahar", "Bampur", "Bazman", "Chabahar", "Dalgan", "Fanuj", "Hamun", "Hirmand", "Iranshahr", "KAFE BALOCHI", "kerend-e gharb", "Khash", "Konarak", "Lashar", "Mehrestan", "Mirjaveh", "Nikshahr", "Nimruz", "Qasr-e-Qand", "Ramshar", "rusk", "Saravan", "Sarbaz", "Sib and Suran", "Taftan", "Zabol", "Zahak", "Zahedan", "Zarabad", "Zehak", "Rask", "Nimrus", "Tehran", "Eslamshahr", "Shahriyar", "Pardis", "Lavasan", "Rey", "Parand", "Andisheh", "Malard", "Eslamshahr", "Sulqan", "andishe", "Baghershahr", "Baharestan", "Bumehen", "Damavand", "Fasham", "Firuzkuh", "forodgah emam khomeyni", "ghiamdasht", "Hasan abad", "Islamshahr", "Jajrood", "Kahrizak", "khavarshahr", "Lavasan", "Malard", "Meigon", "meygon", "Nasim Shahr", "Pakdasht", "Parand", "Pardis", "Pishva", "Qarchak", "Qods", "Rey", "Robat Karim", "Rudehen", "Sabashahr", "Saleh Abad", "shahr sanati shamsabad", "Shahriar", "shams abad", "Shemiranat", "shemshak", "shorabad", "Tehran", "Varamin", "Vavan", "VPN (M002)", "Quality Control (M004)", "Scrap (M007)", "B2B - Sales (M008)", "Kouhe Nour (M009)", "Civil and Install (M006)", "Telecom (M001)", "Modem's Store (M003)", "User _ Store", "IT-Infra Store", "IT-Infra Customer Store", "HD Store", "Customer _ Store", "Yazd", "Abarkuh", "Ardekan", "Ashkezar", "Bafq", "Bahabad", "Chadormelo", "Garizat", "Harat", "Khatam", "Maruset", "Mehriz", "Meybod", "Nasrabad", "Shahediyeh", "Taft", "Yazd", "Zarch", "Zardeyn", "Zanjan", "Do Tappeh", "Zarrin Rud", "Zarrinabad", "Saidabad", "Halab", "AB BAR", "Abhar", "Dandi", "Garmab", "Hidaj", "Ijrud", "Khodabandeh", "Khorramdarreh", "Mahneshan", "Qarah Buteh", "Qeydar", "Sain Qaleh", "Soltaniyeh", "Tarom", "Zanjan"]
const citiesArray =["هشتگرد", "کرج", "کمال شهر", "باغستان", "چهارباغ", "اشتهارد", "فردیس", "گرمدره", "گوهردشت", "گلشهر", "هشتگرد", "حصارک", "کرج", "کلاک", "ماهدشت", "ملارد", "مشکیندشت", "محمد شهر", "نظرآباد", "نسا", "رجایی شهر", "صفادشت", "سرآسیاب", "ساوجبلاغ", "طالقان", "اندیشه", "اردبیل", "اردبیل", "اصلان دوز", "بیله سوار", "گرمی", "خلخال", "کوثر", "مشگین شهر", "نمین", "نیر", "پارس آباد", "سرعین", "تازه کند انگوت", "گرمی", "بازرگان", "سروو", "باروق", "بوکان", "چهار برج", "چالدران", "چایپاره", "خوی", "مهاباد", "ماکو", "میاندوآب", "نقده", "ارومیه", "اشنویه", "پیرانشهر", "پلدشت", "قره ضیاء الدین", "سلماس", "سردشت", "شاهیندژ", "شوت", "تکاب", "اهر", "عجب شیر", "آذرشهر", "بناب", "بستان آباد", "چارویماق", "گوگان", "هادیشهر", "هشترود", "هریس", "هوراند", "جلفا", "کلیبر", "خدا آفرین", "کوزه کنان", "ملکان", "مراغه", "مرند", "مهرابان", "میانه", "اسکو", "قره آغاج", "سهند", "سراب", "شبستر", "تبریز", "تاسوج", "ورزقان", "قره آغاج", "مهاباد", "خوی", "ارومیه", "بوکان", "تبریز", "مراغه", "مرند", "عسلویه", "گناوه", "برازجان", "بوشهر", "نخل تقی", "سعدآباد", "سهمو جنوبی", "سهمو شمالی", "سیراف", "تنگ ارم", "تنگستان", "وحدتیه", "زبار", "آبدان", "بردخون", "اهرم", "اهرم", "آخوند", "عالیشهر", "عسلویه", "بدوله", "دکل بندر", "بساتین", "بنود", "برازجان", "بوشهر", "چاهمبارک", "چغادک", "دشت پلنگ", "دشتستان", "دشتی", "روز", "دلوار", "دیلم", "گناوه", "هاله", "مربا", "کنگان", "خارک", "خورموج", "لاور ساحلی", "اردل", "باباحیدر", "بازفت", "بن", "بولداجی", "بروجن", "چلگرد", "فرخ شهر", "فارسان", "گهرو", "هفشجان", "جونقان", "خانمیرزا", "کیار", "کوهرنگ", "لردگان", "سامان", "صمصامی", "شهرکرد", "سورشجان", "جونگان", "مال خلیفه", "شهرکرد", "منطقه 1", "منطقه 2", "منطقه 3", "منطقه 4", "منطقه 5", "منطقه 6", "منطقه 7", "بهارستان", "اصفهان", "فریدن", "فریدونشهر", "فولاد شهر", "فولادموبارکه", "فولادشهر", "قهدریجان", "قالشور", "گلپایگان", "گوگاد", "هراند", "هونهجان", "کاشان", "کلیشاد", "خوانسار", "خرزوق", "خزاق", "خمینی شهر", "خور و بیابانک", "کوهپایه", "لانگان", "لنجان", "مجلسی", "میمه", "مبارکه", "مبارکه", "نایین", "نجف آباد", "نطنز", "نیک آباد", "نوش آباد", "پیربکران", "رامشه", "روستای ایشن", "سمیرم", "سپاهان شهر", "شاهین شهر", "شهرضا", "تیران و کاروان", "ورنامخواست", "ورزنه", "زرین شهر", "درچه", "دنبی", "حسن آباد", "ملواجرد", "نائین", "زواره", "آران و بیدگل", "اردستان", "بادرود", "باغبهادران", "بهارستان", "بیده", "برخوار", "بوئین و میاندشت", "چادگان", "چرخاب", "داران", "دستگردبرخوار", "دهاقان", "دریس", "دولت آباد", "اصفهان", "فلاورجان", "شیراز", "میمند", "هماشهر", "آباده", "ارسنجان", "بهمن", "باجگاه", "بوانات", "بیزا", "بیگارد", "بیشابور", "بوراک", "داراب", "اقلید", "اشکانان", "استهبان", "اواز", "فراشبند", "فسا", "فیروزآباد", "فیش ور", "گاله در", "گراش", "حاجی آباد", "هرمود", "جهرم", "جویوم", "کارزین", "کوار", "کازرون", "خفر", "خرامه", "خنج", "خرمبید", "کورده", "لامرد", "لار", "لارستان", "ممسنی", "مرودشت", "مهر", "نی ریز", "نورآباد", "پاسارگاد", "قیر و کارزین", "رستم", "صدرا", "صفاشهر", "سرچهان", "سروستان", "سپیدان", "شیراز", "زرقان", "زرین دشت", "رشت", "بندر انزلی", "املش", "آستانه اشرفیه", "آستارا", "بندر انزلی", "چابکسر", "فومن", "خمام", "خشکبیجار", "کوچصفهان", "لاهیجان", "لنگرود", "لوشان", "منجیل", "ماسال", "رشت", "رضوانشهر", "رودبار", "رودسر", "سنگر", "شفت", "سیاهکل", "صومعه سارا", "تالش", "علی آباد", "آق قلا", "یاسگانی", "آزادشهر", "بندرگز", "بندرترکمان", "فاضل آباد", "گالیکش", "گمیشان", "گنبدکاووس", "گرگان", "کلاله", "خانببین", "کردکوی", "مراوه تپه", "مینودشت", "رامیان", "گرگان", "گنبدکاووس", "همدان", "جوکار", "اسدآباد", "بهار", "فامنین", "گروه درجزین", "همدان", "کبودرآهنگ", "لالجین", "ملایر", "ملا بوداق", "نهاوند", "کارخانه سیمان نهاوند", "قهاوند", "رزن", "شیرین سو", "شیرینسو", "تویسرکان", "ابوموسا", "بندرعباس", "بندر لنگه", "بشاگرد", "بستک", "درگهان", "فارور", "تنب عالی", "حاجی آباد", "هانگویه", "هندورابی", "هنگام", "هرمز", "جاسک", "خمیر", "کیش", "لارک", "لاوان", "تنب کوچک", "میناب", "پارسیان", "قشم", "رودان", "شهر جدید علوی", "سیری", "سیریک", "جدول", "حاجی آباد", "بندرعباس", "کیش", "جاسک", "ایلام", "بالاوه", "آبدانان", "ارکواز", "بدره", "چرداول", "چوار", "دره شهر", "دهلران", "ایوان", "هولیلان", "ایلام", "لومار", "مهران", "سرابله", "ملکشاهی", "شیروان", "انار", "عنبرآباد", "آرزویه", "بافت", "بهرمان", "بام", "بردسیر", "درب بهشت", "فهرج", "فاریاب", "جیرفت", "کهنوج", "کرمان", "کوشکویه", "کوهبنان", "منوجان", "مس سرچشمه", "نرماشیر", "قلعه گنج", "رابر", "رفسنجان", "راور", "ریگان", "رودبار جنوب", "صفاییه", "شهربابک", "سیریز", "سیرجان", "زرند", "راین", "بهرامان", "کرمان", "جیرفت", "کرمانشاه", "اسلام آباد غرب", "بیستون", "دالاهو", "اسلام آباد غرب", "گیلانغرب", "هرسین", "جوانرود", "کنگاور", "کرند غرب", "کرمانشاه", "پاوه", "قصرشیرین", "روانسر", "صحنه", "ثلاث باباجانی", "سرپل ذهاب", "سنقر", "تازه آباد", "آرین شهر", "اسدیه", "بیرجند", "بشرویه", "درمیان", "عشق آباد", "فردوس", "حاجی آباد", "خضری", "خوسف", "نهبندان", "قاین", "سرایان", "سربیشه", "طبس", "زیرکوه", "بجستان", "باخارز", "بردسکن", "بینالود", "چاپشلو", "چناران", "درگز", "دارکالات", "دررود", "داورزن", "فریمان", "فیض آباد", "فیروزه", "گلبهار", "گناباد", "جغتای", "جواین", "کلات", "کاشمر", "خواف", "خلیل آباد", "خوشاب", "کوهسرخ", "مهولت", "مشهد", "نصرآباد", "نگهاب", "نیشابور", "قاسم آباد", "قوچان", "ریواش", "رشتخوار", "سبزوار", "صالح آباد", "سرخس", "شاندیز", "ششتومد", "تایباد", "تربت حیدریه", "تربت جام", "طرقبه", "زاوه", "زبرخان", "آشخانه", "بجنورد", "اسفراین", "فاروج", "گرمه", "جاجرم", "مانه و سملقان", "راز و جرگلان", "صفی آباد", "شیروان", "بیرجند", "نیشابور", "مشهد", "بجنورد", "اسفراین", "دزفول", "ماهشهر", "اهواز", "منطقه آزاد اروند", "آبادان", "آبادان", "آغاجاری", "اهواز", "اندیکا", "اندیمشک", "باغملک", "بندر امام خمینی", "باوی", "بهبهان", "دشت آزادگان", "دهدز", "دزفول", "گتوند", "هفتکل", "حمیدیه", "هندیجان", "هویزه", "ایذه", "کارون", "خرمشهر", "لالی", "ماهشهر", "مسجد سلیمان", "ملاثانی", "امیدیه", "رامهرمز", "رامشیر", "سربندر", "شادگان", "شهر جدید رامین", "شیرین شهر", "ساکت باش", "شوشتر", "سوسنگرد", "بهمئی", "باشت", "بویراحمد", "چرام", "دانا", "دهدشت", "دوگنبدان", "گچساران", "کهگیلویه", "لنده", "لیکک", "مارگون", "یاسوج", "سوق", "دوگنبدان", "یاسوج", "بانه", "سقز", "سنندج", "مریوان", "باشماق", "آویهنگ", "بانه", "بیجار", "دهگلان", "دیواندره", "گل تپه", "کامیاران", "مریوان", "نگل", "قروه", "سنندج", "سقز", "سروآباد", "شویشه", "یاسوکند", "زرینه", "خرم آباد", "نورآباد", "الشتر", "الیگودرز", "ازنا", "بروجرد", "چگنی", "دلفان", "دورود", "دوره", "کهریز وروشت", "خرم آباد", "کوهدشت", "کونانی", "نور آباد", "پلدختر", "رومشگان", "سلسله", "سپید دشت", "ساوه", "اراک", "آشتیان", "دلیجان", "فراهان", "فرمهین", "غرق آباد", "خمین", "خنداب", "کمیجان", "محلات", "نیم ور", "نوبران", "اشتورجان", "ساوه", "شازند", "تفرش", "زرندیه", "امیرکبیر", "اراک", "چالوس", "فریدون کنار", "نور", "ساری", "بابلسر", "تنکابن", "رامسر", "نوشهر", "بابل", "عباس آباد", "آمل", "بابل", "بابلسر", "بهشهر", "چالوس", "فریدونکنار", "گالوگاه", "هیچرود", "ایزدشهر", "جویبار", "کلارآباد", "کلاردشت", "کیا کلا", "کجور", "محمودآباد", "میاندورود", "نمکابرود", "نکا", "سوادکوه شمالی", "نوشهر", "نور", "قائم شهر", "رامسر", "رویان", "سلمان شهر", "ساری", "سوادکوه", "سیمرغ", "سورک", "تنکابن", "زیراب", "آبگرم", "آبیک", "البرز", "آوج", "بوئین زهرا", "دانسفهان", "حصار", "جودکی", "کشکور", "خرمدشت", "مینودشت الموت", "میر خاوند علیا", "محمدیه", "قزوین", "قروه درجزین", "سنگان سفلی", "شهر صنعتی البرز", "شیرین سو", "تاکستان", "ضیاء آباد", "اقبالیه", "محمدیه", "قزوین", "پردیسان", "قم", "جعفری", "قم", "البرز", "تهران", "گیلان", "گلستان", "مازندران", "ایلام", "خراسان جنوبی", "خراسان رضوی", "خراسان شمالی", "سمنان", "سیستان و بلوچستان", "چهارمحال و بختیاری", "اصفهان", "مرکزی", "قم", "بوشهر", "فارس", "هرمزگان", "کرمان", "یزد", "همدان", "ایلام", "کرمانشاه", "خوزستان", "کهگلویه و بویراحمد", "لرستان", "قزوین", "زنجان", "اردبیل", "آذربایجان غربی", "آذربایجان شرقی", "کردستان", "سمنان", "آرادان", "بیارجمند", "دامغان", "ایوانکی", "گرمسار", "مهدیشهر", "میامی", "سمنان", "شهمیرزاد", "شاهرود", "سرخه", "زاهدان", "ایرانشهر", "چابهار", "بمپور", "بزمان", "چابهار", "دالگان", "فنوج", "هامون", "هیرمند", "ایرانشهر", "کافه بلوچی", "کرند غرب", "خاش", "کنارک", "لاشار", "مهرستان", "میرجاوه", "نیکشهر", "نیمروز", "قصرقند", "رامشار", "سوخاری", "سراوان", "سرباز", "سیب و سوران", "تفتان", "زابل", "ضحاک", "زاهدان", "زرآباد", "ضحاک", "راسک", "نیمروس", "تهران", "اسلامشهر", "شهریار", "پردیس", "لواسان", "ری", "پرند", "اندیشه", "ملارد", "اسلامشهر", "سولقان", "اندیشه", "باقرشهر", "بهارستان", "بومهن", "دماوند", "فشم", "فیروزکوه", "فرودگاه امام خمینی", "قیامدشت", "حسن آباد", "اسلامشهر", "جاجرود", "کهریزک", "خاورشهر", "لواسان", "ملارد", "میگون", "میگون", "نسیم شهر", "پاکدشت", "پرند", "پردیس", "پیشوا", "قرچک", "قدس", "ری", "رباط کریم", "رودهن", "صباشهر", "صالح آباد", "شهر صنعتی شمس آباد", "شهریار", "شمس آباد", "شمیرانات", "شمشک", "شورآباد", "تهران", "ورامین", "واوان", "VPN (M002)", "کنترل کیفیت (M004)", "قراضه (M007)", "B2B - فروش (M008)", "کوه نور (M009)", "Civil and Install (M006)", "مخابرات (M001)", "فروشگاه مودم (M003)", "کاربر _ فروشگاه", "فروشگاه IT-Infra", "فروشگاه مشتریان IT-Infra", "فروشگاه HD", "مشتری _ فروشگاه", "یزد", "ابرکوه", "اردکان", "اشکذر", "بافق", "بهاباد", "چادرملو", "گاریزات", "هرات", "خاتم", "مروست", "مهریز", "میبد", "نصرآباد", "شاهدیه", "تفت", "یزد", "زارچ", "زردین", "زنجان", "انجام تپه", "زرین رود", "زرین آباد", "سعیدآباد", "حلب", "آب بر", "ابهر", "دندی", "گرماب", "هیداج", "ایجرود", "خدابنده", "خرمدره", "ماهنشان", "قره بوته", "قیدار", "سین قلعه", "سلطانیه", "طارم", "زنجان"]

export default function handler(req, res) {
  try {
    const text = ' یزد ‍پیشگامان سخت افزار تیراژه 424413157-عامل فنی(205)23-03-1402';

    // Check if the 'text' field is present in the request body
    if (!text) {
      return res.status(400).json({ error: 'Missing required field: text' });
    }

    // Function to extract request numbers from the input text
    const extractRequestNumbers = (text) => {
      const regex = /\b\d{8,12}\b/g;
      const requestNumbers = text.match(regex);
      return requestNumbers ? requestNumbers[0] : null; // Return the first matched number or null
    };

    // Function to find the agent name that contains the text from the input string
    const findMatchingAgent = (str) => {
      const agentName = agentsObject.agentName.find((agent) => str.includes(agent));
      return agentName || null;
    };

    // Function to find the city name that contains the text from the input string
    const findMatchingCity = (str) => {
      const cityName = citiesArray.find((city) => str.includes(city));
      return cityName || null;
    };

    // Call the extractRequestNumbers function to get the number
    const requestNumber = extractRequestNumbers(text);

    // Process the input string and find the matching agent name and city name
    const matchedAgent = findMatchingAgent(text);
    const matchedCity = findMatchingCity(text);

    // Search for the city in the imported JSON file and find the key
  const matchedCityKey = Object.keys(citiesData).find((key) =>
    citiesData[key].includes(matchedCity)
  );

    // Return the extracted number, agent name, and city name in the response
    res.status(200).json({
      requestNumber,
      agentName: matchedAgent,
      cityName: matchedCity,
      matchedCityKey,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
}














// import { NextApiRequest, NextApiResponse } from 'next'

// // Sample agents object containing agent names
// const agentsObject = {
// 	agentName: [
// 		'YAX',
// 		'Tirajeh',
// 		'Pishgaman',
// 		'ide',
// 		'پیشگامان سخت افزار تیراژه',
// 		'زاگرس',
// 	],
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
// 	//   if (req.method === 'POST') {
// 	try {
// 		const text =
// 			'تهران ‍پیشگامان سخت افزار تیراژه 424413157-عامل فنی(205)23-03-1402'

// 	 if (!text) {
// 			return res.status(400).json({ error: 'Missing required field: text' })
// 		}

// 		// Function to extract request numbers from the input text
// 		const extractRequestNumbers = (text: string) => {
// 			const regex = /\b\d{8,12}\b/g
// 			const requestNumbers = text.match(regex)
// 			return requestNumbers ? requestNumbers[0] : null // Return the first matched number or null
// 		}

// 		// Function to find the agent name that contains the text from the input string
// 		const findMatchingAgent = (str: string): string | null => {
// 			const agentName = agentsObject.agentName.find((agent) =>
// 				str.includes(agent)
// 			)
// 			return agentName || null
// 		}

// 		// Call the extractRequestNumbers function to get the number
// 		const requestNumber = extractRequestNumbers(text)

// 		// Process the input string and find the matching agent name
// 		const matchedAgent = findMatchingAgent(text)

// 		// Return the extracted number and agent name in the response
// 		res.status(200).json({ requestNumber, agentName: matchedAgent })

// 	} catch (error) {
// 		console.error('Error:', error)
// 		res.status(500).json({ message: 'Server error.' })
// 	}
// 	//   } else {
// 	//     return res.status(405).json({ error: 'Method not allowed' });
// 	//   }
// }






















// // pages/api/extractNumbers.tsx

// import { NextApiRequest, NextApiResponse } from 'next';

// const extractNumbersAPI = (req: NextApiRequest, res: NextApiResponse) => {
// //   if (req.method === 'POST') {
//     try {
//       const  text  = 'تهران ‍پیشگامان سخت افزار تیراژه 424413157-عامل فنی(205)23-03-1402';

//       // Check if the 'text' field is present in the request body
//     //   if (!text) {
//     //     return res.status(400).json({ error: 'Missing required field: text' });
//     //   }

//       // Function to extract request numbers from the input text
//       const extractRequestNumbers = (text: string) => {
//         const regex = /\b\d{8,12}\b/g;
//         const requestNumbers = text.match(regex);
//         return requestNumbers || [];
//       };

//       // Call the extractRequestNumbers function to get the numbers
//       const numbers = extractRequestNumbers(text);

//       // Return the extracted numbers in the response
//       return res.status(200).json({ numbers });
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal server error' });
//     }
// //   } else {
// //     return res.status(405).json({ error: 'Method not allowed' });
// //   }
// };

// export default extractNumbersAPI;
