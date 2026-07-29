export interface ContentSection {
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface Supplication {
  id: string;
  title: string;
  description: string;
  type: 'dua' | 'ziyarat';
  content: ContentSection[];
}

export const supplications: Supplication[] = [
  {
    id: 'kumayl',
    title: 'Dua Kumayl',
    description: 'Recited on Thursday nights for forgiveness.',
    type: 'dua',
    content: [
      {
        arabic: 'اللّهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيْءٍ',
        transliteration: 'allahumma inni as-aluka bi-rahmatikal-lati wasi`at kulla shay',
        translation: 'O Allah, I ask You by Your mercy, which embraces all things;'
      },
      {
        arabic: 'وَبِقُوَّتِكَ الَّتِي قَهَرْتَ بِها كُلَّ شَيْءٍ، وَخَضَعَ لَها كُلَّ شَيْءٍ، وَذَلَّ لَها كُلَّ شَيْءٍ',
        transliteration: 'wa bi-quwwatikal-lati qaharta biha kulla shay, wa khada`a laha kullu shay, wa dhalla laha kullu shay',
        translation: 'And by Your strength, through which You dominate all things, and toward which all things are humble and before which all things are lowly;'
      },
      {
        arabic: 'وَبِجَبَرُوتِكَ الَّتِي غَلَبْتَ بِها كُلَّ شَيْءٍ',
        transliteration: 'wa bi-jabarutikal-lati ghalabta biha kulla shay',
        translation: 'And by Your invincibility through which You overwhelm all things;'
      },
      {
        arabic: 'وَبِعِزَّتِكَ الَّتِي لا يَقُومُ لَها شَيْءٌ',
        transliteration: 'wa bi-`izzatikal-lati la yaqumu laha shay',
        translation: 'And by Your might, which nothing can resist;'
      },
      {
        arabic: 'وَبِعَظَمَتِكَ الَّتِي مَلأَتْ كُلَّ شَيْءٍ',
        transliteration: 'wa bi-`azamatikal-lati mala-at kulla shay',
        translation: 'And by Your greatness, which has filled all things;'
      }
      // Add more lines as needed
    ]
  },
  {
    id: 'ahd',
    title: 'Dua al-Ahd',
    description: 'A pledge of allegiance to the Imam of the Time (ajtf).',
    type: 'dua',
    content: [
      {
        arabic: 'اللّهُمَّ رَبَّ النُّورِ الْعَظِيمِ، وَرَبَّ الْكُرْسِيِّ الرَّفِيعِ',
        transliteration: 'allahumma rabba an-nuril-`azimi, wa rabbal-kursiyyir-rafi`i',
        translation: 'O Allah, Lord of the Great Light, Lord of the Elevated Throne;'
      },
      {
        arabic: 'وَرَبَّ الْبَحْرِ الْمَسْجُورِ، وَمُنْزِلَ التَّوْراةِ وَالاِنْجِيلِ وَالزَّبُورِ',
        transliteration: 'wa rabbal-bahril-masjuri, wa munzilat-tawrati wal-injili waz-zabur',
        translation: 'Lord of the swollen ocean, and the Revealer of the Torah, the Gospel, and the Psalms;'
      }
    ]
  },
  {
    id: 'nudba',
    title: 'Dua al-Nudba',
    description: 'Lamentation for the Imam, recited on Friday mornings.',
    type: 'dua',
    content: [
      {
        arabic: 'الْحَمْدُ للهِ رَبِّ الْعالَمِينَ، وَصَلَّى الله عَلى سَيِّدِنا مُحَمَّدٍ نَبِيِّهِ وَآلِهِ سَلَّمَ تَسْلِيماً',
        transliteration: 'alhamdu lillahi rabbil-`alamin, wa salla allahu `ala sayyidina muhammadin nabiyyihi wa alihi sallama tasliman',
        translation: 'Praise be to Allah, the Lord of the worlds, and peace be upon our Master Muhammad, His Prophet, and upon his Household.'
      }
    ]
  },
  {
    id: 'tawassul',
    title: 'Dua Tawassul',
    description: 'Seeking intercession through the Ahl al-Bayt.',
    type: 'dua',
    content: [
      {
        arabic: 'اللّهُمَّ إِنِّي أَسْأَلُكَ وَأَتَوَجَّهُ إِلَيْكَ بِنَبِيِّكَ نَبِيِّ الرَّحْمَةِ، مُحَمَّدٍ صَلَّى الله عَلَيْهِ وَآلِهِ',
        transliteration: 'allahumma inni as-aluka wa atawajjahu ilayka binabiyyika nabiyyir-rahmati muhammadin salla allahu `alayhi wa alih',
        translation: 'O Allah, I beseech You, and I turn towards You, through Your Prophet, the Prophet of Mercy, Muhammad, may Allah bless him and his Progeny.'
      }
    ]
  },
  {
    id: 'faraj',
    title: 'Dua Faraj (Ilahi Azuma)',
    description: 'Supplication for relief and the reappearance of the Imam.',
    type: 'dua',
    content: [
      {
        arabic: 'إِلهِي عَظُمَ الْبَلاءُ، وَبَرِحَ الْخَفاءُ، وَانْكَشَفَ الْغِطاءُ، وَانْقَطَعَ الرَّجاءُ',
        transliteration: 'ilahi `azumal-bala-u wa barihal-khafa-u wankashafal-ghita-u wanqata`ar-raja-u',
        translation: 'O my God, the calamity has become massive, the hidden has become evident, the veil has been lifted, and all hopes have been cut off.'
      },
      {
        arabic: 'وَضَاقَتِ الاَرْضُ وَمُنِعَتِ السَّماءُ، وأَنْتَ الْمُسْتَعانُ، وَإِلَيْكَ الْمُشْتَكىٰ',
        transliteration: 'wa daqatil-ardu wa muni`atis-sama-u, wa antal-musta`anu, wa ilaykal-mushtaka',
        translation: 'The earth has become narrow and the sky is withheld. And You are the One whose help is sought, and to You is the complaint.'
      },
      {
        arabic: 'وَعَلَيْكَ الْمُعَوَّلُ فِي الشِّدَّةِ وَالرَّخاءِ',
        transliteration: 'wa `alaykal-mu`awwalu fish-shiddati war-rakha-i',
        translation: 'And upon You is the reliance in hardship and ease.'
      },
      {
        arabic: 'اللّهُمَّ صَلِّ عَلىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ، أُولِي الاَمْرِ الَّذِينَ فَرَضْتَ عَلَيْنا طاعَتَهُمْ، وَعَرَّفْتَنا بِذلِكَ مَنْزِلَتَهُمْ',
        transliteration: 'allahumma salli `ala muhammadin wa ali muhammadin, ulil-amril-ladhina faradta `alayna ta`atahum, wa `arraftana bidhalika manzilatahum',
        translation: 'O Allah, bless Muhammad and the Family of Muhammad, the possessors of authority whose obedience You have made obligatory upon us, and through that made us know their station.'
      },
      {
        arabic: 'فَفَرِّجْ عَنَّا بِحَقِّهِمْ فَرَجاً عاجِلاً قَرِيباً كَلَمْحِ الْبَصَرِ أَوْ هُوَ أَقْرَبُ',
        transliteration: 'fafarrij `anna bihaqqihim farajan `ajilan qariban kalamhil-basari aw huwa aqrab',
        translation: 'So bring us joy for their sake, a quick and near joy, like the blink of an eye or closer.'
      },
      {
        arabic: 'يا مُحَمَّدُ يا عَلِيُّ، يا عَلِيُّ يا مُحَمَّدُ',
        transliteration: 'ya muhammadu ya `aliyyu, ya `aliyyu ya muhammad',
        translation: 'O Muhammad! O Ali! O Ali! O Muhammad!'
      },
      {
        arabic: 'اِكْفِيانِي فَإِنَّكُما كافِيانِ، وَانْصُرانِي فَإِنَّكُما ناصِرانِ',
        transliteration: 'ikfiyani fa-innakuma kafiyani, wansurani fa-innakuma nasirani',
        translation: 'Suffice me, for you two are sufficient, and help me, for you two are helpers.'
      },
      {
        arabic: 'يا مَوْلانا يا صاحِبَ الزَّمانِ',
        transliteration: 'ya mawlana ya sahibaz-zaman',
        translation: 'O our Master, O Master of the Time!'
      },
      {
        arabic: 'الْغَوْثَ الْغَوْثَ الْغَوْثَ، أَدْرِكْنِي أَدْرِكْنِي أَدْرِكْنِي، السَّاعَةَ السَّاعَةَ السَّاعَةَ، الْعَجَلَ الْعَجَلَ الْعَجَلَ',
        transliteration: 'al-ghawthal-ghawthal-ghawth, adrikni adrikni adrikni, as-sa`atas-sa`atas-sa`ah, al-`ajalal-`ajalal-`ajal',
        translation: 'Help! Help! Help! Rescue me! Rescue me! Rescue me! This hour! This hour! This hour! Hurry! Hurry! Hurry!'
      },
      {
        arabic: 'يا أَرْحَمَ الرَّاحِمِينَ، بِحَقِّ مُحَمَّدٍ وَآلِهِ الطَّاهِرِينَ',
        transliteration: 'ya arhamar-rahimina, bihaqqi muhammadin wa alihit-tahirin',
        translation: 'O Most Merciful of the merciful, for the sake of Muhammad and his pure Family.'
      }
    ]
  },
  {
    id: 'yastasheer',
    title: 'Dua Yastasheer',
    description: 'A profound dua taught by Imam Ali (as).',
    type: 'dua',
    content: [
      {
        arabic: 'الْحَمْدُ للهِ الَّذِي لا إِلهَ إِلاَّ هُوَ، الْمَلِكُ الْحَقُّ الْمُبِينُ',
        transliteration: 'alhamdu lillahil-ladhi la ilaha illa huwal-malikul-haqqul-mubin',
        translation: 'Praise be to Allah, there is no god but He, the Sovereign, the Truth, the Evident.'
      }
    ]
  },
  {
    id: 'saba',
    title: 'Dua Sabah',
    description: 'Morning prayer by Imam Ali (as).',
    type: 'dua',
    content: [
      {
        arabic: 'اللّهُمَّ يَا مَنْ دَلَعَ لِسَانَ الصَّبَاحِ بِنُطْقِ تَبَلُّجِهِ',
        transliteration: 'allahumma ya man dala`a lisanas-sabahi binutqi taballujihi',
        translation: 'O Allah, O He Who caused the dawn’s tongue to speak with the eloquence of its brightness.'
      }
    ]
  },
  {
    id: 'ashura',
    title: 'Ziyarat Ashura',
    description: 'Salutation to Imam Hussain (as).',
    type: 'ziyarat',
    content: [
      {
        arabic: 'اَلسَّلامُ عَلَيْكَ يا أَبا عَبْدِاللهِ، اَلسَّلامُ عَلَيْكَ يَا بْنَ رَسُولِ اللهِ',
        transliteration: 'assalamu `alayka ya aba `abdillah, assalamu `alayka yabna rasulillah',
        translation: 'Peace be upon you, O Abu `Abdillah. Peace be upon you, O son of the Messenger of Allah.'
      },
      {
        arabic: 'اَلسَّلامُ عَلَيْكَ يَا بْنَ أَمِيرِ الْمُؤْمِنِينَ وَابْنَ سَيِّدِ الْوَصِيِّينَ',
        transliteration: 'assalamu `alayka yabna amiril-mu\'minina wabna sayyidil-wasiyyin',
        translation: 'Peace be upon you, O son of the Commander of the Faithful and the son of the master of the successors.'
      }
    ]
  },
  {
    id: 'hussain-karbala',
    title: 'Ziyarat of Imam Hussain (AS) in Karbala',
    description: 'Comprehensive salutation while visiting Karbala.',
    type: 'ziyarat',
    content: [
      {
        arabic: 'اَلسَّلامُ عَلَيْكَ يا وارِثَ آدَمَ صِفْوَةِ اللهِ',
        transliteration: 'assalamu `alayka ya waritha adama sifwatillah',
        translation: 'Peace be upon you, O inheritor of Adam, the chosen of Allah.'
      }
    ]
  },
  {
    id: 'masouma',
    title: 'Ziyarat Lady Masouma (SA)',
    description: 'Salutation for Lady Fatima Masouma (sa) in Qom.',
    type: 'ziyarat',
    content: [
      {
        arabic: 'اَلسَّلامُ عَلَىٰ آدَمَ صَفْوَةِ ٱللَّهِ',
        transliteration: 'assalamu `ala adama safwatillah',
        translation: 'Peace be upon Adam, the sincere friend of Allah.'
      },
      {
        arabic: 'اَلسَّلامُ عَلَيْكِ يَا بِنْتَ رَسُولِ ٱللَّهِ',
        transliteration: 'assalamu `alayki ya binta rasulillah',
        translation: 'Peace be upon you, O daughter of the Messenger of Allah.'
      }
    ]
  },
  {
    id: 'waritha',
    title: 'Ziyarat Waritha',
    description: 'Identifying Imam Hussain as the heir of Prophets.',
    type: 'ziyarat',
    content: [
      {
        arabic: 'اَلسَّلامُ عَلَيْكَ يا وارِثَ نُوح نَبِيِّ اللهِ',
        transliteration: 'assalamu `alayka ya waritha nuhin nabiyyillah',
        translation: 'Peace be upon you, O inheritor of Noah, the Prophet of Allah.'
      }
    ]
  },
  {
    id: 'aminullah',
    title: 'Ziyarat Aminullah',
    description: 'Salutation to Imam Ali (as) and all Imams.',
    type: 'ziyarat',
    content: [
      {
        arabic: 'اَلسَّلامُ عَلَيْكَ يا أَمِينَ اللهِ فِي أَرْضِهِ وَحُجَّتَهُ عَلى عِبادِهِ',
        transliteration: 'assalamu `alayka ya aminallahi fi ardihi wa hujjatahu `ala `ibadih',
        translation: 'Peace be upon you, O the trustee of Allah in His earth and His proof over His servants.'
      }
    ]
  }
];
