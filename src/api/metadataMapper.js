// Maps normalized provider items into a richer metadata shape used by forms.

/**
 * Converts CrossRef-style date objects  {"date-parts":[[2023,1,15]]}
 * or plain strings/numbers to a "YYYY-MM-DD" (or "YYYY") string.
 * Returns null when nothing useful is found.
 */
const flattenDate = (val) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  // CrossRef object: { "date-parts": [[2023, 1, 15]] }
  if (val["date-parts"] && Array.isArray(val["date-parts"])) {
    const parts = val["date-parts"][0];
    if (!parts || !parts.length) return null;
    const [y, m, d] = parts;
    if (y && m && d)
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (y && m) return `${y}-${String(m).padStart(2, "0")}`;
    return String(y);
  }
  // Some APIs wrap in { value: "..." }
  if (val.value) return flattenDate(val.value);
  return null;
};
export const parseAuthorName = (name) => {
  if (!name) return { first: "", last: "" };
  // If name has comma, assume "Last, First" or "Last, F." pattern
  if (name.includes(",")) {
    const parts = name.split(",");
    const last = parts[0].trim();
    const first = parts.slice(1).join(",").trim();
    return { first, last };
  }
  // Otherwise assume "First Middle Last"
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return { first: "", last: parts[0] };
  const last = parts.pop();
  const first = parts.join(" ");
  return { first, last };
};

export const mapToFormMetadata = (item) => {
  // item is a normalized object from searchApis (has source, title, authors[], doi, isbn, publisher, year, url, raw)
  const mapped = {
    // generic fields
    title: item.title || "",
    authors: (item.authors || []).map((a) => {
      const parsed = parseAuthorName(a);
      return { original: a, firstName: parsed.first, lastName: parsed.last };
    }),
    doi: item.doi || null,
    isbn: item.isbn || null,
    publisher: item.publisher || null,
    year: item.year || null,
    url: item.url || null,
    source: item.source || null,
    raw: item.raw || item,

    // book-specific
    titleOfTheItem: item.title || null,
    edition:
      item.raw && (item.raw.edition || item.raw.editions)
        ? item.raw.edition || item.raw.editions
        : null,
    seriesTitleAndNumber:
      item.raw && (item.raw.series || item.raw["series-title"])
        ? item.raw.series || item.raw["series-title"]
        : null,
    subsidiaryTitles: item.raw && item.raw.subtitle ? item.raw.subtitle : null,
    standardIdentifier: item.isbn || item.doi || null,
    availiabilityAndAccess: item.url || item.doi || null,
    place:
      item.raw &&
      (item.raw.place ||
        item.raw["publisher-place"] ||
        (item.raw.address && item.raw.address.city))
        ? item.raw.place ||
          item.raw["publisher-place"] ||
          (item.raw.address && item.raw.address.city)
        : null,
    dateOfPublication: flattenDate(
      item.raw &&
        (item.raw.publishedDate ||
          item.raw["published-print"] ||
          item.raw["issued"]),
    ),

    // serial/journal-specific
    titleOfTheSerial: item.title || null,
    numeration:
      item.raw && (item.raw.volume || item.raw.issue || item.raw.numeration)
        ? item.raw.volume || item.raw.issue || item.raw.numeration
        : null,
    volume:
      item.raw &&
      (item.raw.volume || (item.raw.volumeInfo && item.raw.volumeInfo.volume))
        ? item.raw.volume || (item.raw.volumeInfo && item.raw.volumeInfo.volume)
        : null,
    issue:
      item.raw &&
      (item.raw.issue || (item.raw.volumeInfo && item.raw.volumeInfo.issue))
        ? item.raw.issue || (item.raw.volumeInfo && item.raw.volumeInfo.issue)
        : null,

    // contribution-specific
    titleOfTheContribution: item.title || null,
    titleOfTheHostItem:
      item.raw &&
      (item.raw.containerTitle || item.raw["host-title"] || item.raw.source)
        ? item.raw.containerTitle || item.raw["host-title"] || item.raw.source
        : null,
    rangeOfPageNumbersOfTheContribution:
      item.raw && (item.raw.page || item.raw.pages || item.raw.pagination)
        ? item.raw.page || item.raw.pages || item.raw.pagination
        : null,

    // website-specific
    pageTitle: item.raw && item.raw.title ? item.raw.title : null,
    websiteTitle: item.raw && item.raw.source ? item.raw.source : null,

    // patent-specific
    patentNumber:
      item.raw &&
      (item.raw.patentNumber ||
        item.raw.patent_number ||
        item.raw.publicationNumber)
        ? item.raw.patentNumber ||
          item.raw.patent_number ||
          item.raw.publicationNumber
        : null,
    dateOfApplication: flattenDate(
      item.raw && (item.raw.applicationDate || item.raw["application-date"]),
    ),
    dateOfIssuance: flattenDate(
      item.raw && (item.raw.publicationDate || item.raw["issued"]),
    ),

    // misc
    webpageTitle: item.raw && item.raw.title ? item.raw.title : null,
    websiteTitleAlt: item.raw && item.raw.source ? item.raw.source : null,
    dateOfCitation: null,
  };
  return mapped;
};

export default {
  parseAuthorName,
  mapToFormMetadata,
};
