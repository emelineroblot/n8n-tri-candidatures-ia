// Anonymisation d'un CV avant envoi à l'IA (copiée dans les nœuds « Anonymiser le CV » des workflows 01 et 04).
// Déterministe, sans service externe. Remplace les données personnelles par des balises explicites.
// Limite connue : un nom propre cité ailleurs que dans l'en-tête (ex. « recommandé par Jean Dupont ») peut passer.
function anonymiser(texte, nomsConnus) {
  let t = String(texte || '');
  let n = 0;
  const remplacer = (re, balise) => {
    t = t.replace(re, (...m) => { n++; return typeof balise === 'function' ? balise(...m) : balise; });
  };
  const echap = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const L = '\\p{L}';

  // 1. Coordonnées (avant les noms : un nom remplacé dans une adresse email casserait sa détection)
  remplacer(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, '[EMAIL]');
  remplacer(/(?:https?:\/\/|www\.)\S+|\blinkedin\.com\/\S+/gi, '[LIEN]');
  remplacer(/(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}/g, '[TÉLÉPHONE]');
  remplacer(/\b\d{1,4}\s?(?:bis|ter)?,?\s+(?:rue|avenue|av\.|boulevard|bd|impasse|allée|chemin|place|route|quai|cours|square|lotissement)\b[^\n|]*/giu, '[ADRESSE]');
  remplacer(/\b\d{5}\s+[\p{Lu}][\p{L}' -]+/gu, '[ADRESSE]');
  // Ville de la ligne de contact (« email | téléphone | Ville »)
  remplacer(/(\[TÉLÉPHONE\]\s*\|\s*)[\p{L}' -]+/gu, (m, avant) => `${avant}[VILLE]`);

  // 2. Nom et prénom : expéditeur du mail + première ligne du CV
  const mots = new Set();
  for (const nom of nomsConnus) {
    for (const m of String(nom || '').split(/[\s,;|]+/)) {
      const propre = m.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
      if (propre.length >= 2) mots.add(propre);
    }
  }
  for (const m of [...mots].sort((a, b) => b.length - a.length)) {
    remplacer(new RegExp(`(?<![${L}])${echap(m)}(?![${L}])`, 'giu'), '[CANDIDAT]');
  }
  t = t.replace(/\[CANDIDAT\](?:[\s-]+\[CANDIDAT\])+/g, '[CANDIDAT]');

  // 3. Informations que l'IA ne doit pas connaître
  remplacer(/\b(?:date de naissance|né|née)\s*(?:le|:)?\s*\d{1,2}[\/.\- ]\s*(?:\d{1,2}|[\p{L}]+)[\/.\- ]\s*\d{2,4}/giu, '[INFO RETIRÉE]');
  remplacer(/\b(?:âge\s*:?\s*)?[1-7]\d\s?ans\b(?!\s*(?:d['’]|de\s|en\s|chez|dans|au\s|à\s|comme|sur\s|passés|d’))/giu, '[ÂGE]');
  remplacer(/\bnationalit[ée]\s*:?\s*[\p{L}-]+/giu, '[INFO RETIRÉE]');
  remplacer(/\b(?:mari[ée]e?|célibataire|pacs[ée]e?|divorc[ée]e?|veuf|veuve|en couple)\b(?:\s*,?\s*\d+\s*enfants?)?/giu, '[INFO RETIRÉE]');
  remplacer(/\b\d+\s*enfants?\b/giu, '[INFO RETIRÉE]');
  remplacer(/\b(?:photo|permis de séjour|titre de séjour|religion|handicap|RQTH)\b[^\n|]*/giu, '[INFO RETIRÉE]');

  return { texte: t, remplacements: n };
}

// Nom à écrire dans le Sheet (jamais envoyé à l'IA) : expéditeur du mail, sinon première ligne du CV.
function nomCandidat(nomExpediteur, texte) {
  const premiere = String(texte || '').split('\n').map(l => l.replace(/^[#*\s]+|[*\s]+$/g, '')).find(l => l.length > 2) || '';
  return (nomExpediteur || '').trim() || premiere;
}

if (typeof module !== 'undefined') module.exports = { anonymiser, nomCandidat };
