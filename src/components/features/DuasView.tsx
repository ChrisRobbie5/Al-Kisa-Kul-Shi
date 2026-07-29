import React, { useState, useEffect } from "react";
import {
  Heart,
  Book,
  ArrowLeft,
  Loader2,
  Play,
  Rewind,
  FastForward,
  Palette,
  PieChart,
  Settings,
  Star,
} from "lucide-react";
import { useLanguage, AppLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { Tab } from "../../types";

interface CatalogItem {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string;
  type: "dua" | "ziyarat";
  filename: string;
}

const catalog: CatalogItem[] = [
  {
    id: "dua-al-asharat",
    title: "Dua Al Asharat",
    description: "Supplication.",
    type: "dua",
    filename: "dua-al-asharat.json",
  },
  {
    id: "dua-al-iftitah",
    title: "Dua Al Iftitah",
    description: "Supplication.",
    type: "dua",
    filename: "dua-al-iftitah.json",
  },
  {
    id: "dua-kumayl",
    title: "Dua Kumayl",
    description: "Supplication.",
    type: "dua",
    filename: "dua-kumayl.json",
  },
  {
    id: "dua-mashlool",
    title: "Dua Mashlool",
    description: "Supplication.",
    type: "dua",
    filename: "dua-mashlool.json",
  },
  {
    id: "dua-nudba",
    title: "Dua Nudba",
    description: "Supplication.",
    type: "dua",
    filename: "dua-nudba.json",
  },
  {
    id: "dua-sabah",
    title: "Dua Sabah",
    description: "Supplication.",
    type: "dua",
    filename: "dua-sabah.json",
  },
  {
    id: "sahifa-sajjadiya-abasing-himself-before-god",
    title: "Sahifa Sajjadiya Abasing Himself Before God",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-abasing-himself-before-god.json",
  },
  {
    id: "sahifa-sajjadiya-blessings-upon-gods-messenger",
    title: "Sahifa Sajjadiya Blessings Upon Gods Messenger",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-blessings-upon-gods-messenger.json",
  },
  {
    id: "sahifa-sajjadiya-farewell-to-the-month-of-ramadan",
    title: "Sahifa Sajjadiya Farewell To The Month Of Ramadan",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-farewell-to-the-month-of-ramadan.json",
  },
  {
    id: "sahifa-sajjadiya-for-his-neighbours-and-friends",
    title: "Sahifa Sajjadiya For His Neighbours And Friends",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-for-his-neighbours-and-friends.json",
  },
  {
    id: "sahifa-sajjadiya-for-the-coming-of-the-month-of-ramadan",
    title: "Sahifa Sajjadiya For The Coming Of The Month Of Ramadan",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-for-the-coming-of-the-month-of-ramadan.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-for-good-outcomes",
    title: "Sahifa Sajjadiya His Supplication For Good Outcomes",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-for-good-outcomes.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-for-help-in-repaying-debts",
    title: "Sahifa Sajjadiya His Supplication For Help In Repaying Debts",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-for-help-in-repaying-debts.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-for-himself-and-the-people-under-his-guardianship",
    title:
      "Sahifa Sajjadiya His Supplication For Himself And The People Under His Guardianship",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-for-himself-and-the-people-under-his-guardianship.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-for-his-children",
    title: "Sahifa Sajjadiya His Supplication For His Children",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-for-his-children.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-for-his-parents",
    title: "Sahifa Sajjadiya His Supplication For His Parents",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-for-his-parents.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-for-the-people-of-the-frontiers",
    title: "Sahifa Sajjadiya His Supplication For The People Of The Frontiers",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-for-the-people-of-the-frontiers.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-asking-for-covering-and-protection",
    title:
      "Sahifa Sajjadiya His Supplication In Asking For Covering And Protection",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-in-asking-for-covering-and-protection.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-asking-for-the-best",
    title: "Sahifa Sajjadiya His Supplication In Asking For The Best",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-in-asking-for-the-best.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-asking-for-water-during-a-drought",
    title:
      "Sahifa Sajjadiya His Supplication In Asking For Water During A Drought",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-in-asking-for-water-during-a-drought.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-confession-and-in-seeking-repentance-toward-god",
    title:
      "Sahifa Sajjadiya His Supplication In Confession And In Seeking Repentance Toward God",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-in-confession-and-in-seeking-repentance-toward-god.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-fear",
    title: "Sahifa Sajjadiya His Supplication In Fear",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-in-fear.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-fleeing-to-god-for-protection",
    title: "Sahifa Sajjadiya His Supplication In Fleeing To God For Protection",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-in-fleeing-to-god-for-protection.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-giving-thanks",
    title: "Sahifa Sajjadiya His Supplication In Giving Thanks",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-in-giving-thanks.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-hardship-effort-and-difficult-affairs",
    title:
      "Sahifa Sajjadiya His Supplication In Hardship Effort And Difficult Affairs",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-in-hardship-effort-and-difficult-affairs.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-imploring-god",
    title: "Sahifa Sajjadiya His Supplication In Imploring God",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-in-imploring-god.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-seeking-needs-from-god",
    title: "Sahifa Sajjadiya His Supplication In Seeking Needs From God",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-in-seeking-needs-from-god.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-seeking-pardon-and-mercy",
    title: "Sahifa Sajjadiya His Supplication In Seeking Pardon And Mercy",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-in-seeking-pardon-and-mercy.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-in-the-morning-and-evening",
    title: "Sahifa Sajjadiya His Supplication In The Morning And Evening",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-in-the-morning-and-evening.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-on-noble-moral-traits",
    title: "Sahifa Sajjadiya His Supplication On Noble Moral Traits",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-on-noble-moral-traits.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-on-the-day-of-arafa",
    title: "Sahifa Sajjadiya His Supplication On The Day Of Arafa",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-on-the-day-of-arafa.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-on-the-day-of-sacrifice-and-on-friday",
    title:
      "Sahifa Sajjadiya His Supplication On The Day Of Sacrifice And On Friday",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-on-the-day-of-sacrifice-and-on-friday.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-when-his-provision-was-stinted",
    title: "Sahifa Sajjadiya His Supplication When His Provision Was Stinted",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-his-supplication-when-his-provision-was-stinted.json",
  },
  {
    id: "sahifa-sajjadiya-his-supplication-when-sick",
    title: "Sahifa Sajjadiya His Supplication When Sick",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-his-supplication-when-sick.json",
  },
  {
    id: "sahifa-sajjadiya-in-asking-pardon",
    title: "Sahifa Sajjadiya In Asking Pardon",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-in-asking-pardon.json",
  },
  {
    id: "sahifa-sajjadiya-in-asking-release-from-sins-and-seeking-pardon",
    title: "Sahifa Sajjadiya In Asking Release From Sins And Seeking Pardon",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-in-asking-release-from-sins-and-seeking-pardon.json",
  },
  {
    id: "sahifa-sajjadiya-in-calling-down-blessings-on-the-bearers-of-the-throne-and-every-angel-brought-near",
    title:
      "Sahifa Sajjadiya In Calling Down Blessings On The Bearers Of The Throne And Every Angel Brought Near",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-in-calling-down-blessings-on-the-bearers-of-the-throne-and-every-angel-brought-near.json",
  },
  {
    id: "sahifa-sajjadiya-in-calling-down-blessings-upon-the-followers-of-and-the-attesters-to-the-messengers",
    title:
      "Sahifa Sajjadiya In Calling Down Blessings Upon The Followers Of And The Attesters To The Messengers",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-in-calling-down-blessings-upon-the-followers-of-and-the-attesters-to-the-messengers.json",
  },
  {
    id: "sahifa-sajjadiya-in-confessing-sins-after-finishing-the-night-prayer",
    title:
      "Sahifa Sajjadiya In Confessing Sins After Finishing The Night Prayer",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-in-confessing-sins-after-finishing-the-night-prayer.json",
  },
  {
    id: "sahifa-sajjadiya-in-mentioning-and-asking-for-repentance",
    title: "Sahifa Sajjadiya In Mentioning And Asking For Repentance",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-in-mentioning-and-asking-for-repentance.json",
  },
  {
    id: "sahifa-sajjadiya-in-pleading-and-abasement",
    title: "Sahifa Sajjadiya In Pleading And Abasement",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-in-pleading-and-abasement.json",
  },
  {
    id: "sahifa-sajjadiya-in-praise-of-god",
    title: "Sahifa Sajjadiya In Praise Of God",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-in-praise-of-god.json",
  },
  {
    id: "sahifa-sajjadiya-in-satisfaction-when-he-looked-upon-the-companions-of-this-world",
    title:
      "Sahifa Sajjadiya In Satisfaction When He Looked Upon The Companions Of This World",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-in-satisfaction-when-he-looked-upon-the-companions-of-this-world.json",
  },
  {
    id: "sahifa-sajjadiya-in-seeking-asylum-with-god",
    title: "Sahifa Sajjadiya In Seeking Asylum With God",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-in-seeking-asylum-with-god.json",
  },
  {
    id: "sahifa-sajjadiya-in-yearning-to-ask-forgiveness-from-god",
    title: "Sahifa Sajjadiya In Yearning To Ask Forgiveness From God",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-in-yearning-to-ask-forgiveness-from-god.json",
  },
  {
    id: "sahifa-sajjadiya-on-the-day-of-fast-breaking-and-on-friday",
    title: "Sahifa Sajjadiya On The Day Of Fast Breaking And On Friday",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-on-the-day-of-fast-breaking-and-on-friday.json",
  },
  {
    id: "sahifa-sajjadiya-removal-of-worries",
    title: "Sahifa Sajjadiya Removal Of Worries",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-removal-of-worries.json",
  },
  {
    id: "sahifa-sajjadiya-repelling-the-trickery-of-enemies",
    title: "Sahifa Sajjadiya Repelling The Trickery Of Enemies",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-repelling-the-trickery-of-enemies.json",
  },
  {
    id: "sahifa-sajjadiya-seeking-refuge-from-hateful-things",
    title: "Sahifa Sajjadiya Seeking Refuge From Hateful Things",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-seeking-refuge-from-hateful-things.json",
  },
  {
    id: "sahifa-sajjadiya-the-supplication-for-friday",
    title: "Sahifa Sajjadiya The Supplication For Friday",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-the-supplication-for-friday.json",
  },
  {
    id: "sahifa-sajjadiya-the-supplication-for-monday",
    title: "Sahifa Sajjadiya The Supplication For Monday",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-the-supplication-for-monday.json",
  },
  {
    id: "sahifa-sajjadiya-the-supplication-for-saturday",
    title: "Sahifa Sajjadiya The Supplication For Saturday",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-the-supplication-for-saturday.json",
  },
  {
    id: "sahifa-sajjadiya-the-supplication-for-sunday",
    title: "Sahifa Sajjadiya The Supplication For Sunday",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-the-supplication-for-sunday.json",
  },
  {
    id: "sahifa-sajjadiya-the-supplication-for-thursday",
    title: "Sahifa Sajjadiya The Supplication For Thursday",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-the-supplication-for-thursday.json",
  },
  {
    id: "sahifa-sajjadiya-the-supplication-for-tuesday",
    title: "Sahifa Sajjadiya The Supplication For Tuesday",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-the-supplication-for-tuesday.json",
  },
  {
    id: "sahifa-sajjadiya-the-supplication-for-wednesday",
    title: "Sahifa Sajjadiya The Supplication For Wednesday",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-the-supplication-for-wednesday.json",
  },
  {
    id: "sahifa-sajjadiya-upon-completing-a-reading-of-the-quran",
    title: "Sahifa Sajjadiya Upon Completing A Reading Of The Quran",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-upon-completing-a-reading-of-the-quran.json",
  },
  {
    id: "sahifa-sajjadiya-when-faced-with-a-worrisome-task",
    title: "Sahifa Sajjadiya When Faced With A Worrisome Task",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-when-faced-with-a-worrisome-task.json",
  },
  {
    id: "sahifa-sajjadiya-when-he-asked-god-for-well-being",
    title: "Sahifa Sajjadiya When He Asked God For Well Being",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-when-he-asked-god-for-well-being.json",
  },
  {
    id: "sahifa-sajjadiya-when-he-looked-at-the-new-crescent-moon",
    title: "Sahifa Sajjadiya When He Looked At The New Crescent Moon",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-when-he-looked-at-the-new-crescent-moon.json",
  },
  {
    id: "sahifa-sajjadiya-when-he-mentioned-satan-and-sought-refuge-from-him",
    title:
      "Sahifa Sajjadiya When He Mentioned Satan And Sought Refuge From Him",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-when-he-mentioned-satan-and-sought-refuge-from-him.json",
  },
  {
    id: "sahifa-sajjadiya-when-he-remembered-death",
    title: "Sahifa Sajjadiya When He Remembered Death",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-when-he-remembered-death.json",
  },
  {
    id: "sahifa-sajjadiya-when-he-saw-clouds-and-lightening-and-heard-the-thunder",
    title:
      "Sahifa Sajjadiya When He Saw Clouds And Lightening And Heard The Thunder",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-when-he-saw-clouds-and-lightening-and-heard-the-thunder.json",
  },
  {
    id: "sahifa-sajjadiya-when-he-was-afflicted-or-saw-someone-afflicted-with-the-disgrace-of-sin",
    title:
      "Sahifa Sajjadiya When He Was Afflicted Or Saw Someone Afflicted With The Disgrace Of Sin",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-when-he-was-afflicted-or-saw-someone-afflicted-with-the-disgrace-of-sin.json",
  },
  {
    id: "sahifa-sajjadiya-when-hostility-was-shown-to-him",
    title: "Sahifa Sajjadiya When Hostility Was Shown To Him",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-when-hostility-was-shown-to-him.json",
  },
  {
    id: "sahifa-sajjadiya-when-perils-were-repelled-or-requests-quickly-granted",
    title:
      "Sahifa Sajjadiya When Perils Were Repelled Or Requests Quickly Granted",
    description: "Supplication.",
    type: "dua",
    filename:
      "sahifa-sajjadiya-when-perils-were-repelled-or-requests-quickly-granted.json",
  },
  {
    id: "sahifa-sajjadiya-when-something-made-him-sorrowful",
    title: "Sahifa Sajjadiya When Something Made Him Sorrowful",
    description: "Supplication.",
    type: "dua",
    filename: "sahifa-sajjadiya-when-something-made-him-sorrowful.json",
  },
  {
    id: "ziyarat-ashura",
    title: "Ziyarat Ashura",
    description: "Salutation.",
    type: "ziyarat",
    filename: "ziyarat-ashura.json",
  },
  {
    id: "ziyarat-jamia-kabira",
    title: "Ziyarat Jamia Kabira",
    description: "Salutation.",
    type: "ziyarat",
    filename: "ziyarat-jamia-kabira.json",
  },
  {
    id: "ziyarat-warith",
    title: "Ziyarat Warith",
    description: "Salutation.",
    type: "ziyarat",
    filename: "ziyarat-warith.json",
  },
  {
    id: "ziyrat-aale-yasin",
    title: "Ziyrat Aale Yasin",
    description: "Salutation.",
    type: "ziyarat",
    filename: "ziyrat-aale-yasin.json",
  },
];

interface ContentLine {
  index: number;
  kind: "arabic" | "translation" | "transliteration";
  text: string;
}

interface FetchedItem {
  lines: ContentLine[];
}

interface DuasViewProps {
  setActiveTab: (tab: Tab) => void;
  onOpenSettings?: () => void;
}

export function DuasView({ setActiveTab, onOpenSettings }: DuasViewProps) {
  const { language, showTranslation, translationLanguage, fontSize, t } =
    useLanguage();
  const { toggleDarkMode } = useTheme();
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [content, setContent] = useState<FetchedItem | null>(null);
  const [loading, setLoading] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favs.some((f: any) => f.id === selectedItem.id));
    }
  }, [selectedItem]);

  const toggleFavorite = () => {
    if (!selectedItem) return;
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFav = favs.some((f: any) => f.id === selectedItem.id);
    if (isFav) {
      const newFavs = favs.filter((f: any) => f.id !== selectedItem.id);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      setIsFavorite(false);
    } else {
      favs.push({ id: selectedItem.id, title: selectedItem.title, type: selectedItem.type });
      localStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setLoading(true);
      fetch(
        `https://raw.githubusercontent.com/adeeb10abbas/shia-library-json/main/db/duas/${selectedItem.filename}`,
      )
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((data) => {
          setContent(data);
          setLoading(false);
        })
        .catch((err) => {
          setContent({
            lines: [
              {
                index: 1,
                kind: "arabic" as const,
                text:
                  t("content_unavailable") ||
                  "Content currently unavailable for this specific dua.",
              },
            ],
          });
          setLoading(false);
        });
    }
  }, [selectedItem, t]);

  const translatedCatalog = catalog.map((item) => {
    const titleKey = `title_${item.id.replace(/-/g, '_')}`;
    const descKey = `desc_${item.id.replace(/-/g, '_')}`;
    const tTitle = t(titleKey);
    const tDesc = t(descKey);
    
    // Instead of doing individual translations for every dua, we can translate standard terms.
    let fallbackTitle = item.title;
    if (tTitle === titleKey) {
        fallbackTitle = fallbackTitle.replace('Dua', t('dua')).replace('Ziyarat', t('ziyarat'));
    }
    
    const translatedName = tTitle !== titleKey ? tTitle : fallbackTitle;
    const englishName = item.title;

    let displayTitle = englishName;
    let displaySubtitle = null;

    if (language === 'ar-fusha' || language === 'ar-iraqi') {
       displayTitle = translatedName;
    } else if (language === 'en') {
       displayTitle = englishName;
    } else {
       displayTitle = englishName;
       displaySubtitle = translatedName;
    }

    return {
      ...item,
      title: displayTitle,
      subtitle: displaySubtitle,
      description: tDesc !== descKey ? tDesc : (item.description === 'Supplication.' ? t('supplication_desc') : (item.description === 'Salutation.' ? t('salutation_desc') : item.description)),
    };
  });

  const duas = translatedCatalog.filter((s) => s.type === "dua");
  const ziyarats = translatedCatalog.filter((s) => s.type === "ziyarat");

  const renderPairedLines = () => {
    if (!content) return null;

    const pairs: { arabic: string; translation: string; index: number }[] = [];
    let currentArabic = "";
    let arrIndex = 0;

    content.lines.forEach((line) => {
      if (line.kind === "arabic") {
        if (currentArabic) {
          pairs.push({
            arabic: currentArabic,
            translation: "",
            index: arrIndex,
          });
          arrIndex++;
        }
        currentArabic = line.text;
      } else if (line.kind === "translation") {
        if (currentArabic) {
          pairs.push({
            arabic: currentArabic,
            translation: line.text,
            index: arrIndex,
          });
          arrIndex++;
          currentArabic = "";
        }
      }
    });
    if (currentArabic)
      pairs.push({ arabic: currentArabic, translation: "", index: arrIndex });

    const isRtl = ["ur", "fa", "ar-iraqi", "ar-fusha"].includes(
      translationLanguage,
    );

    return pairs.map((pair, idx) => (
      <div
        key={idx}
        className="flex flex-col space-y-8 pb-10 border-b border-slate-200 dark:border-slate-800/60 last:border-0 relative"
      >
        <p
          className="font-arabic text-center drop-shadow-sm text-slate-800 dark:text-amber-50"
          style={{ fontSize: `${fontSize}px`, lineHeight: 2 }}
          dir="rtl"
        >
          {pair.arabic}
        </p>
        {showTranslation && pair.translation && (
          <div className="pt-2">
            {translationLanguage !== "en" && (
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 text-center">
                {t("translation") || "Translation"}
              </div>
            )}
            <p
              className={`text-slate-400 dark:text-slate-500 dark:text-slate-400 text-lg md:text-xl font-display leading-relaxed ${isRtl ? "text-right" : "text-center"}`}
              dir={isRtl ? "rtl" : "ltr"}
            >
              {pair.translation}
            </p>
          </div>
        )}
      </div>
    ));
  };

  if (selectedItem) {
    return (
      <div className="animate-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto pb-12">
        <div className="flex items-center justify-between mb-8 sticky top-4 bg-slate-50 dark:bg-[#0f172a]/80 backdrop-blur-xl p-4 rounded-3xl z-40 border border-slate-200 dark:border-slate-800/60 shadow-xl flex-wrap gap-4">
          <button
            onClick={() => {
              setSelectedItem(null);
              setContent(null);
            }}
            className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 hover:text-amber-400 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{t("back")}</span>
          </button>
          <h2 className="text-xl font-bold font-arabic text-teal-500">
            {selectedItem.title}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full text-slate-400 hover:text-amber-500 transition-colors"
            >
              <Star
                className={`w-5 h-5 ${isFavorite ? "text-amber-500 fill-amber-500" : ""}`}
              />
            </button>
            <button
              onClick={() =>
                onOpenSettings ? onOpenSettings() : setActiveTab("settings")
              }
              className="p-2 rounded-full text-slate-400 hover:text-amber-500 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <header className="mb-12 text-center relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 blur-2xl">
            <div className="w-48 h-48 bg-teal-500/20 rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-teal-400 mb-4 font-display drop-shadow-md">
            {selectedItem.title}
          </h2>
          {selectedItem.subtitle && (
            <h3 className="text-2xl text-teal-400/80 mb-4 font-arabic">
              {selectedItem.subtitle}
            </h3>
          )}
          <p className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium tracking-wide text-lg">
            {selectedItem.description}
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
          </div>
        ) : (
          <div className="bg-white dark:bg-[#0b1121]/50 rounded-[3rem] p-6 md:p-14 border-t-4 border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, #0d9488 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            ></div>

            <div className="space-y-10 relative z-10">
              {renderPairedLines()}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-12">
      <header className="mb-12 text-center pt-8">
        <h2 className="text-4xl md:text-5xl font-bold text-teal-400 mb-3 font-display">
          {t("duas")}
        </h2>
      </header>

      <div className="space-y-16">
        <section>
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 font-display">
              {t("supplications") || "Supplications"}
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {duas.map((dua) => (
              <div
                key={dua.id}
                onClick={() => setSelectedItem(dua)}
                className="bg-white dark:bg-[#0b1121]/80 p-8 rounded-[2rem] border-l-4 border-amber-500 border-t border-r border-b border-slate-200 dark:border-slate-800/50 shadow-lg hover:shadow-amber-500/10 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <h4 className="font-bold text-2xl text-slate-800 dark:text-slate-200 group-hover:text-amber-400 transition-colors font-display mb-1">
                  {dua.title}
                </h4>
                {dua.subtitle && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
                    {dua.subtitle}
                  </p>
                )}
                {!dua.subtitle && <div className="h-2"></div>}
                <p className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {dua.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
              <Book className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 font-display">
              {t("visitations") || "Visitations (Ziyarats)"}
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {ziyarats.map((ziyarat) => (
              <div
                key={ziyarat.id}
                onClick={() => setSelectedItem(ziyarat)}
                className="bg-white dark:bg-[#0b1121]/80 p-8 rounded-[2rem] border-l-4 border-teal-500 border-t border-r border-b border-slate-200 dark:border-slate-800/50 shadow-lg hover:shadow-teal-500/10 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <h4 className="font-bold text-2xl text-slate-800 dark:text-slate-200 group-hover:text-teal-400 transition-colors font-display mb-1">
                  {ziyarat.title}
                </h4>
                {ziyarat.subtitle && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
                    {ziyarat.subtitle}
                  </p>
                )}
                {!ziyarat.subtitle && <div className="h-2"></div>}
                <p className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {ziyarat.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
