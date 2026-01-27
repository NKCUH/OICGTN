Search integration notes
========================

What I added
------------
- A global search box displayed in the header: `src/Components/Search/SearchBox.jsx` and `search.css`.
- A small API aggregator at `src/api/searchApis.js` that queries several free public APIs and returns normalized metadata.
- A React context `src/context/MetadataContext.jsx` used to share the chosen metadata across pages.
- Autofill wiring in `BooksForm.jsx` and `SerialForm.jsx` so selected metadata populates the form fields.

APIs used (no server-side proxy required for basic usage)
----------------------------------------------------
- Crossref (https://api.crossref.org) — works for DOIs and title queries (no API key).
- OpenLibrary (https://openlibrary.org) — ISBN and title searches (no API key).
- Google Books (https://www.googleapis.com/books/v1) — public queries; for higher quota use an API key.
- DOAJ, DOAB — public endpoints used for additional matches (no key required for read-only search).
- Semantic Scholar (https://api.semanticscholar.org) — has public endpoints but can be rate limited; consider getting an API key for production.
- Library of Congress (https://www.loc.gov) — used for title searches and basic metadata (no key required).

Notes, limitations and next steps
--------------------------------
- Some APIs are rate-limited or require API keys for production use. The current implementation uses public endpoints without keys and is intended for prototyping.
- Google Books can be used without an API key for small volumes, but add a key if you expect heavy usage.
- WorldCat, many national bibliographies and some publisher services require API keys or institutional access; they are not integrated here.
- The aggregator normalizes items but doesn't yet attempt deep merging; it returns the first 5–10 items from several sources and deduplicates by DOI/ISBN/title.
- Security: keys (if added) should be stored on the server side or in environment variables; avoid embedding private keys in client JS.

How to use
----------
1. Start the dev server (e.g. `npm run dev` or `npm start` depending on project scripts).
2. Use the search box in the header. After searching, click a result to copy its normalized metadata to the global metadata context.
3. Open the Book or Serial form page; the form fields will populate automatically from the selected metadata.

Extending
---------
- Add more providers (WorldCat, Crossref funder/publisher endpoints, national APIs) in `src/api/searchApis.js` and normalize them.
- Improve deduplication and merging logic (fuzzy matching, confidence scores).
- Add an explicit "Paste to form" UI so users can choose which form to autofill when multiple forms are visible.
