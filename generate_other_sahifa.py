import re

mapping = {
    'sahifa-sajjadiya-abasing-himself-before-god': 'الصحيفة السجادية - دعاؤه في التذلل لله عز وجل',
    'sahifa-sajjadiya-blessings-upon-gods-messenger': 'الصحيفة السجادية - دعاؤه في الصلاة على رسول الله (ص)',
    'sahifa-sajjadiya-farewell-to-the-month-of-ramadan': 'الصحيفة السجادية - دعاؤه في وداع شهر رمضان',
    'sahifa-sajjadiya-for-his-neighbours-and-friends': 'الصحيفة السجادية - دعاؤه لجيرانه وأوليائه',
    'sahifa-sajjadiya-for-the-coming-of-the-month-of-ramadan': 'الصحيفة السجادية - دعاؤه عند دخول شهر رمضان',
    'sahifa-sajjadiya-his-supplication-for-good-outcomes': 'الصحيفة السجادية - دعاؤه في طلب العافية',
    'sahifa-sajjadiya-his-supplication-for-help-in-repaying-debts': 'الصحيفة السجادية - دعاؤه في قضاء الدين',
    'sahifa-sajjadiya-his-supplication-for-himself-and-the-people-under-his-guardianship': 'الصحيفة السجادية - دعاؤه لنفسه وأهل ولايته',
    'sahifa-sajjadiya-his-supplication-for-his-children': 'الصحيفة السجادية - دعاؤه لولده',
    'sahifa-sajjadiya-his-supplication-for-his-parents': 'الصحيفة السجادية - دعاؤه لأبويه',
    'sahifa-sajjadiya-his-supplication-for-the-people-of-the-frontiers': 'الصحيفة السجادية - دعاؤه لأهل الثغور',
    'sahifa-sajjadiya-his-supplication-in-asking-for-covering-and-protection': 'الصحيفة السجادية - دعاؤه في طلب الستر والوقاية',
    'sahifa-sajjadiya-his-supplication-in-asking-for-the-best': 'الصحيفة السجادية - دعاؤه في الاستخارة',
    'sahifa-sajjadiya-his-supplication-in-asking-for-water-during-a-drought': 'الصحيفة السجادية - دعاؤه في الاستسقاء',
    'sahifa-sajjadiya-his-supplication-in-confession-and-in-seeking-repentance-toward-god': 'الصحيفة السجادية - دعاؤه في الاعتراف وطلب التوبة',
    'sahifa-sajjadiya-his-supplication-in-fear': 'الصحيفة السجادية - دعاؤه عند الخوف',
    'sahifa-sajjadiya-his-supplication-in-fleeing-to-god-for-protection': 'الصحيفة السجادية - دعاؤه في اللجأ إلى الله',
    'sahifa-sajjadiya-his-supplication-in-giving-thanks': 'الصحيفة السجادية - دعاؤه في الشكر',
    'sahifa-sajjadiya-his-supplication-in-hardship-effort-and-difficult-affairs': 'الصحيفة السجادية - دعاؤه في المهمات',
    'sahifa-sajjadiya-his-supplication-in-imploring-god': 'الصحيفة السجادية - دعاؤه في التضرع والاستكانة',
    'sahifa-sajjadiya-his-supplication-in-seeking-needs-from-god': 'الصحيفة السجادية - دعاؤه في طلب الحوائج',
    'sahifa-sajjadiya-his-supplication-in-seeking-pardon-and-mercy': 'الصحيفة السجادية - دعاؤه في العفو والرحمة',
    'sahifa-sajjadiya-his-supplication-in-the-morning-and-evening': 'الصحيفة السجادية - دعاؤه في الصباح والمساء',
    'sahifa-sajjadiya-his-supplication-on-noble-moral-traits': 'الصحيفة السجادية - دعاؤه في مكارم الأخلاق',
    'sahifa-sajjadiya-his-supplication-on-the-day-of-arafa': 'الصحيفة السجادية - دعاؤه في يوم عرفة',
    'sahifa-sajjadiya-his-supplication-on-the-day-of-sacrifice-and-on-friday': 'الصحيفة السجادية - دعاؤه في يوم الأضحى والجمعة',
    'sahifa-sajjadiya-his-supplication-when-his-provision-was-stinted': 'الصحيفة السجادية - دعاؤه عند تقتير الرزق',
    'sahifa-sajjadiya-his-supplication-when-sick': 'الصحيفة السجادية - دعاؤه إذا مرض',
    'sahifa-sajjadiya-in-asking-pardon': 'الصحيفة السجادية - دعاؤه في طلب العفو',
    'sahifa-sajjadiya-in-asking-release-from-sins-and-seeking-pardon': 'الصحيفة السجادية - دعاؤه في طلب الإقالة',
    'sahifa-sajjadiya-in-calling-down-blessings-on-the-bearers-of-the-throne-and-every-angel-brought-near': 'الصحيفة السجادية - دعاؤه في الصلاة على حملة العرش',
    'sahifa-sajjadiya-in-calling-down-blessings-upon-the-followers-of-and-the-attesters-to-the-messengers': 'الصحيفة السجادية - دعاؤه في الصلاة على أتباع الرسل',
    'sahifa-sajjadiya-in-confessing-sins-after-finishing-the-night-prayer': 'الصحيفة السجادية - دعاؤه بعد صلاة الليل',
    'sahifa-sajjadiya-in-mentioning-and-asking-for-repentance': 'الصحيفة السجادية - دعاؤه في التوبة',
    'sahifa-sajjadiya-in-pleading-and-abasement': 'الصحيفة السجادية - دعاؤه في التذلل',
    'sahifa-sajjadiya-in-praise-of-god': 'الصحيفة السجادية - التحميد لله عز وجل',
    'sahifa-sajjadiya-in-satisfaction-when-he-looked-upon-the-companions-of-this-world': 'الصحيفة السجادية - دعاؤه إذا نظر إلى أهل الدنيا',
    'sahifa-sajjadiya-in-seeking-asylum-with-god': 'الصحيفة السجادية - دعاؤه في الاستعاذة',
    'sahifa-sajjadiya-in-yearning-to-ask-forgiveness-from-god': 'الصحيفة السجادية - دعاؤه في الاستغفار',
    'sahifa-sajjadiya-on-the-day-of-fast-breaking-and-on-friday': 'الصحيفة السجادية - دعاؤه في يوم الفطر والجمعة',
    'sahifa-sajjadiya-removal-of-worries': 'الصحيفة السجادية - دعاؤه في كشف الهموم',
    'sahifa-sajjadiya-repelling-the-trickery-of-enemies': 'الصحيفة السجادية - دعاؤه في دفع كيد الأعداء',
    'sahifa-sajjadiya-seeking-refuge-from-hateful-things': 'الصحيفة السجادية - دعاؤه في الاستعاذة من المكاره',
    'sahifa-sajjadiya-the-supplication-for-friday': 'الصحيفة السجادية - دعاء يوم الجمعة',
    'sahifa-sajjadiya-the-supplication-for-monday': 'الصحيفة السجادية - دعاء يوم الاثنين',
    'sahifa-sajjadiya-the-supplication-for-saturday': 'الصحيفة السجادية - دعاء يوم السبت',
    'sahifa-sajjadiya-the-suppリューション-for-sunday': 'الصحيفة السجادية - دعاء يوم الأحد',
    'sahifa-sajjadiya-the-supplication-for-thursday': 'الصحيفة السجادية - دعاء يوم الخميس',
    'sahifa-sajjadiya-the-supplication-for-tuesday': 'الصحيفة السجادية - دعاء يوم الثلاثاء',
    'sahifa-sajjadiya-the-supplication-for-wednesday': 'الصحيفة السجادية - دعاء يوم الأربعاء',
    'sahifa-sajjadiya-upon-completing-a-reading-of-the-quran': 'الصحيفة السجادية - دعاؤه عند ختم القرآن',
    'sahifa-sajjadiya-when-faced-with-a-worrisome-task': 'الصحيفة السجادية - دعاؤه عند المهمات',
    'sahifa-sajjadiya-when-he-asked-god-for-well-being': 'الصحيفة السجادية - دعاؤه في طلب العافية',
    'sahifa-sajjadiya-when-he-looked-at-the-new-crescent-moon': 'الصحيفة السجادية - دعاؤه عند رؤية الهلال',
    'sahifa-sajjadiya-when-he-mentioned-satan-and-sought-refuge-from-him': 'الصحيفة السجادية - دعاؤه في الاستعاذة من الشيطان',
    'sahifa-sajjadiya-when-he-remembered-death': 'الصحيفة السجادية - دعاؤه إذا ذكر الموت',
    'sahifa-sajjadiya-when-he-saw-clouds-and-lightening-and-heard-the-thunder': 'الصحيفة السجادية - دعاؤه عند رؤية السحاب',
    'sahifa-sajjadiya-when-he-was-afflicted-or-saw-someone-afflicted-with-the-disgrace-of-sin': 'الصحيفة السجادية - دعاؤه إذا ابتلي',
    'sahifa-sajjadiya-when-hostility-was-shown-to-him': 'الصحيفة السجادية - دعاؤه إذا اعتدي عليه',
    'sahifa-sajjadiya-when-perils-were-repelled-or-requests-quickly-granted': 'الصحيفة السجادية - دعاؤه إذا دفع عنه كيد',
    'sahifa-sajjadiya-when-something-made-him-sorrowful': 'الصحيفة السجادية - دعاؤه إذا حزنه أمر',
}

with open('src/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# For ur and fa, I'll just use the arabic titles because in Islamic texts Persian/Urdu usually keep the Arabic title.
# I'll just replace "الصحيفة السجادية" with "صحیفه سجادیه" for FA and UR.

for k, v in mapping.items():
    key_name = 'title_' + k.replace('-', '_')
    v_fa = v.replace('الصحيفة السجادية', 'صحیفه سجادیه')
    # Find the line in fa/ur and replace it
    pattern_fa = r'(' + key_name + r':\s*)"صحیف[هة] سجادی[هة]\s*-[^"]*"'
    
    # We replace everything that matches
    content = re.sub(pattern_fa, r'\1"' + v_fa + '"', content)

# For hindi, let's just transliterate or use the hindi script prefix "सहीफ़ा सज्जादिया -" and keep the english meaning, or use the arabic meaning.
# Actually, the user just wants it not to be half English half Arabic.
# "सहीफ़ा सज्जादिया - ..." is fine for Hindi if it's transliterated, but I don't have Hindi transliterations. So I will leave Hindi as is.

with open('src/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)
