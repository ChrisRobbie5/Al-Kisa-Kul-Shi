const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Color replacements
  content = content.replace(/bg-\[\#0f172a\]/g, 'bg-slate-50 dark:bg-[#0f172a]');
  content = content.replace(/bg-\[\#0b1121\]/g, 'bg-white dark:bg-[#0b1121]');
  content = content.replace(/text-slate-200/g, 'text-slate-800 dark:text-slate-200');
  content = content.replace(/text-slate-300/g, 'text-slate-700 dark:text-slate-300');
  content = content.replace(/text-slate-400/g, 'text-slate-500 dark:text-slate-400');
  content = content.replace(/text-slate-500/g, 'text-slate-400 dark:text-slate-500');
  content = content.replace(/text-white/g, 'text-slate-900 dark:text-white');
  content = content.replace(/border-slate-800/g, 'border-slate-200 dark:border-slate-800');
  content = content.replace(/from-\[\#09152b\]/g, 'from-slate-100 dark:from-[#09152b]');
  content = content.replace(/via-\[\#0f172a\]/g, 'via-slate-50 dark:via-[#0f172a]');
  content = content.replace(/to-\[\#0f172a\]/g, 'to-slate-50 dark:to-[#0f172a]');
  
  // Specific fix for text-amber-50 to text-slate-800 in light mode
  content = content.replace(/text-amber-50(?!0)/g, 'text-slate-800 dark:text-amber-50');
  content = content.replace(/text-slate-100/g, 'text-slate-900 dark:text-slate-100');

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Theme replacement complete!');
