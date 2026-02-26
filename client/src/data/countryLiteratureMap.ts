import type { LiteratureTradition } from "../types/literatureTradition";

const countryLiteratureMap: Record<string, LiteratureTradition> = {
  "Russia": { subject: "russian literature", label: "Russian Literature" },
  "Japan": { subject: "japanese literature", label: "Japanese Literature" },
  "Argentina": { subject: "argentine literature", label: "Argentine Literature" },
  "Brazil": { subject: "brazilian literature", label: "Brazilian Literature" },
  "India": { subject: "indian literature", label: "Indian Literature" },
  "Norway": { subject: "norwegian literature", label: "Norwegian Literature" },
  "Poland": { subject: "polish literature", label: "Polish Literature" },
  "Senegal": { subject: "senegalese literature", label: "Senegalese Literature" },
  "China": { subject: "chinese literature", label: "Chinese Literature" },
  "Egypt": { subject: "egyptian literature", label: "Egyptian Literature" },
  "Greece": { subject: "greek literature", label: "Greek Literature" },
  "Turkey": { subject: "turkish literature", label: "Turkish Literature" },
  "South Korea": { subject: "korean literature", label: "Korean Literature" },
  "Colombia": { subject: "colombian literature", label: "Colombian Literature" },
  "Panama": { subject: "panamanian literature", label: "Panamanian Literature" },
  "Australia": { subject: "australian literature", label: "Australian Literature" },
  "Ukraine": { subject: "ukrainian literature", label: "Ukrainian Literature" },
  "Iceland": { subject: "icelandic literature", label: "Icelandic Literature" },
  // "USA": { subject: "american literature", label: "American Literature" },
  // "South Africa": { subject: "south african literature", label: "South African Literature" },
  // "Canada": { subject: "canadian literature", label: "Canadian Literature" },
  // "Algeria": { subject: "algerian literature", label: "Algerian Literature" },

}

export default countryLiteratureMap;