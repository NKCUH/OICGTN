import React, { createContext, useState } from "react";

export const MetadataContext = createContext({
  metadata: null,
  setMetadata: () => {},
  selectedMetadata: null,
  setSelectedMetadata: () => {},
  applyMetadata: () => {},
  chosenForm: null,
  setChosenForm: () => {},
});

export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState(null); // applied metadata visible to forms
  const [selectedMetadata, setSelectedMetadata] = useState(null); // preview buffer
  const [chosenForm, setChosenForm] = useState(null);

  const applyMetadata = (payload = {}, fields = null, form = null) => {
    // payload is the mapped metadata object; fields is array of keys to pick (if null pick all)
    if (!payload) return;
    const out = {};
    if (!fields) {
      Object.assign(out, payload);
    } else {
      for (const k of fields) {
        if (payload[k] !== undefined) out[k] = payload[k];
      }
      // authors handled specially
      if (fields.includes("authors") && payload.authors) out.authors = payload.authors;
    }
    // Always set the date of citation to the current date (date of search/apply)
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      if (!out.dateOfCitation) out.dateOfCitation = payload.dateOfCitation || today;
    } catch (err) {
      // ignore
    }
    // Ensure URL / availability is present when available from payload
    if (!out.url && (payload.url || (payload.raw && payload.raw.url))) {
      out.url = payload.url || (payload.raw && payload.raw.url) || null;
    }
    if (!out.availiabilityAndAccess && (payload.url || payload.doi)) {
      out.availiabilityAndAccess = payload.url || payload.doi || out.availiabilityAndAccess;
    }
    setMetadata(out);
    setChosenForm(form || null);
    setSelectedMetadata(null);
  };

  return (
    <MetadataContext.Provider value={{ metadata, setMetadata, selectedMetadata, setSelectedMetadata, applyMetadata, chosenForm, setChosenForm }}>
      {children}
    </MetadataContext.Provider>
  );
};

export default MetadataContext;
