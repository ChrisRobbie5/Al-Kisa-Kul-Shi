const list = [
  { id: 'kumayl', title: 'Dua Kumayl', description: 'Recited on Thursday nights for forgiveness.' },
  { id: 'ahd', title: 'Dua al-Ahd', description: 'A pledge of allegiance to the Imam of the Time.' },
  { id: 'nudba', title: 'Dua Nudba', description: 'Lamentation for the Imam, recited on Fridays.' },
  { id: 'sabah', title: 'Dua Sabah', description: 'Morning prayer by Imam Ali (as).' },
  { id: 'mashlool', title: 'Dua Mashlool', description: 'Known as the supplication of the youth stricken for his sin.' },
  { id: 'tawassul', title: 'Dua Tawassul', description: 'Supplication of Entreaty to the 14 Infallibles.' },
  { id: 'faraj', title: 'Dua Faraj', description: 'Prayer for the hastened return of Imam Mahdi (ajtf).' },
  { id: 'ashura', title: 'Ziyarat Ashura', description: 'Salutation to Imam Hussain (as).' },
  { id: 'warith', title: 'Ziyarat Warith', description: 'Identifying Imam Hussain as the heir of Prophets.' },
  { id: 'jamia', title: 'Ziyarat Jamia Kabira', description: 'Comprehensive salutation to the Imams.' },
  { id: 'aal-yasin', title: 'Ziyarat Aal Yasin', description: 'Salutation to the Imam of the Time (ajtf).' },
  { id: 'karbala', title: 'Ziyarat Imam Hussain in Karbala', description: 'Salutation for visitation in Karbala.' },
  { id: 'masouma', title: 'Ziyarat Lady Masouma', description: 'Salutation to Lady Masouma (SA) in Qom.' }
];

console.log("English:");
list.forEach(item => {
  console.log(`    title_${item.id}: '${item.title}',`);
  console.log(`    desc_${item.id}: '${item.description}',`);
});
