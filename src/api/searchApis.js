// Minimal aggregator for several free bibliographic APIs.
// This file provides a single `searchAll(query)` function that tries
// Crossref (DOI/title), OpenLibrary (ISBN/title), Google Books and a few others
// and returns an array of normalized metadata objects.

const safeFetch = async (url, opts = {}) => {
  try {
    const res = await fetch(url, opts);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("fetch error", url, err);
    return null;
  }
};

const normalizeCrossref = (item) => {
  const title = (item.title && item.title[0]) || item.title;
  const authors = (item.author || []).map((a) => [a.given, a.family].filter(Boolean).join(" "));
  return {
    source: "crossref",
    title,
    authors,
    doi: item.DOI || item.doi,
    publisher: item.publisher,
    year: item.issued && item.issued["date-parts"] ? item.issued["date-parts"][0][0] : undefined,
    raw: item,
  };
};

const crossrefSearch = async (q) => {
  // If q looks like a DOI, query directly
  const doiLike = q.match(/10\.\d{4,}\/\S+/);
  if (doiLike) {
    const url = `https://api.crossref.org/works/${encodeURIComponent(doiLike[0])}`;
    const j = await safeFetch(url);
    if (j && j.message) return [normalizeCrossref(j.message)];
    return [];
  }

  // general query
  const url = `https://api.crossref.org/works?query.title=${encodeURIComponent(q)}&rows=5`;
  const j = await safeFetch(url);
  if (!j || !j.message || !j.message.items) return [];
  return j.message.items.map(normalizeCrossref);
};

const normalizeOpenLibrary = (doc) => {
  return {
    source: "openlibrary",
    title: doc.title,
    authors: doc.author_name || [],
    isbn: (doc.isbn && doc.isbn[0]) || undefined,
    year: doc.first_publish_year,
    publisher: (doc.publisher && doc.publisher[0]) || undefined,
    raw: doc,
  };
};

const openLibrarySearch = async (q) => {
  // If q is ISBN
  const isbnMatch = q.replace(/[^0-9Xx]/g, "");
  if (isbnMatch.length === 10 || isbnMatch.length === 13) {
    const url = `https://openlibrary.org/isbn/${isbnMatch}.json`;
    const j = await safeFetch(url);
    if (!j) return [];
    return [normalizeOpenLibrary(j)];
  }
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=5`;
  const j = await safeFetch(url);
  if (!j || !j.docs) return [];
  return j.docs.map(normalizeOpenLibrary);
};

const normalizeGoogle = (it) => {
  const v = it.volumeInfo || {};
  return {
    source: "google",
    title: v.title,
    authors: v.authors || [],
    isbn: (v.industryIdentifiers && v.industryIdentifiers[0] && v.industryIdentifiers[0].identifier) || undefined,
    publisher: v.publisher,
    year: v.publishedDate && v.publishedDate.split("-")[0],
    url: v.infoLink,
    raw: it,
  };
};

const googleBooksSearch = async (q) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=5`;
  const j = await safeFetch(url);
  if (!j || !j.items) return [];
  return j.items.map(normalizeGoogle);
};

// DOAJ search (no key required for simple queries)
const doajSearch = async (q) => {
  const url = `https://doaj.org/api/v2/search/articles/${encodeURIComponent(q)}`;
  const j = await safeFetch(url);
  if (!j || !j.results) return [];
  return j.results.map((r) => ({
    source: "doaj",
    title: r.title,
    authors: r.bibjson && r.bibjson.author ? r.bibjson.author.map((a) => a.name) : [],
    url: r.bibjson && r.bibjson.link && r.bibjson.link[0] && r.bibjson.link[0].url,
    raw: r,
  }));
};

const doabSearch = async (q) => {
  const url = `https://www.doabooks.org/api/v2/search/?q=${encodeURIComponent(q)}`;
  const j = await safeFetch(url);
  if (!j || !j.results) return [];
  return j.results.map((r) => ({
    source: "doab",
    title: r.title,
    authors: r.authors || [],
    url: r.link,
    raw: r,
  }));
};

// Basic semantic scholar integration (public endpoints may be rate limited)
const semanticSearch = async (q) => {
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(q)}&limit=5&fields=title,authors,year,externalIds`;
  const j = await safeFetch(url);
  if (!j || !j.data) return [];
  return j.data.map((p) => ({
    source: "semanticscholar",
    title: p.title,
    authors: (p.authors || []).map((a) => a.name),
    year: p.year,
    doi: p.externalIds && p.externalIds.DOI,
    raw: p,
  }));
};

const locSearch = async (q) => {
  const url = `https://www.loc.gov/books/?fo=json&at=results&st=list&q=${encodeURIComponent(q)}`;
  const j = await safeFetch(url);
  if (!j || !j.results) return [];
  return j.results.map((r) => ({
    source: "loc",
    title: r.title,
    year: r.date,
    url: r.url,
    raw: r,
  }));
};

// WIPO / Patentscope placeholder: configurable via environment variable VITE_WIPO_API_URL
// If you have a WIPO API endpoint, set VITE_WIPO_API_URL in your .env and it will be queried.
const wipoSearch = async (q) => {
  try {
    const base = import.meta.env.VITE_WIPO_API_URL;
    if (!base) return [];
    const url = `${base}?q=${encodeURIComponent(q)}`;
    const j = await safeFetch(url);
    if (!j || !j.results) return [];
    return j.results.map((r) => ({
      source: "wipo",
      title: r.title || r.inventionTitle,
      authors: r.applicants ? r.applicants.map((a) => a.name) : [],
      doi: r.doi,
      url: r.link || r.patentLink,
      raw: r,
    }));
  } catch (err) {
    return [];
  }
};

// simple token set Jaccard similarity for fuzzy dedupe
const tokenize = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter(Boolean);
const jaccard = (a, b) => {
  const A = new Set(a);
  const B = new Set(b);
  const inter = [...A].filter((x) => B.has(x)).length;
  const uni = new Set([...A, ...B]).size;
  return uni === 0 ? 0 : inter / uni;
};

const mergeItems = (items) => {
  const merged = [];
  for (const it of items) {
    const keyCandidates = [it.doi, it.isbn, (it.title || "").toLowerCase()];
    // try exact doi/isbn match first
    let found = null;
    if (it.doi) found = merged.find((m) => m.doi && m.doi.toLowerCase() === it.doi.toLowerCase());
    if (!found && it.isbn) found = merged.find((m) => m.isbn && m.isbn.toLowerCase() === it.isbn.toLowerCase());
    if (!found) {
      // fuzzy by title using Jaccard
      const tokens = tokenize(it.title || "");
      found = merged.find((m) => {
        const t2 = tokenize(m.title || "");
        return jaccard(tokens, t2) > 0.65; // threshold
      });
    }
    if (found) {
      // merge fields conservatively
      found.raw = found.raw || {};
      found.raw = { ...it.raw, ...found.raw };
      found.source = `${found.source},${it.source}`;
      found.authors = Array.from(new Set([...(found.authors || []), ...(it.authors || [])]));
      found.doi = found.doi || it.doi;
      found.isbn = found.isbn || it.isbn;
      found.url = found.url || it.url;
      found.publisher = found.publisher || it.publisher;
      found.year = found.year || it.year;
      found.title = found.title || it.title;
    } else {
      merged.push({ ...it });
    }
  }
  return merged;
};

export const searchAll = async (q) => {
  // Call a few providers in parallel, gather normalized items and dedupe by title/doi/isbn
  const promises = [crossrefSearch(q), openLibrarySearch(q), googleBooksSearch(q), doajSearch(q), doabSearch(q), semanticSearch(q), locSearch(q), wipoSearch(q)];
  const groups = await Promise.all(promises.map((p) => p.catch((_) => [])));
  const flat = groups.flat().filter(Boolean);
  const merged = mergeItems(flat);
  return merged;
};

export default {
  searchAll,
};
