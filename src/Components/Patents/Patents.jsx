import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Copy from "../Copy/Copy";
import { useRef } from "react";
import { toast } from "react-toastify";
import { MetadataContext } from "../../context/MetadataContext";

const PatentsForm = () => {
  const [patentsCitation, setPatentsCitation] = useState({
    // creatorName[0][0]-> first name of 1st creator
    // creatorName[0][1]-> first name of 2nd creator
    patientApplicationCountry: "",
    standardIdentifiersOfCreator: "",
    titleOfTheInformationSource: "",
    seriesTitle: "",
    subsidiaryCreator: "",
    dateOfApplication: "",
    dateOfIssuance: "",
    patentNumber: "",
    persistentIdentifiers: "",
    itemAttributes: "",
    dateOfCitation: "",
    location: "",
    relationships: "",
  });
  const ref = useRef(null);

  const [result, setResult] = useState(false);
  const onChanging = (e) => {
    const name = e.target.name;
    setPatentsCitation({ ...patentsCitation, [name]: e.target.value });
  };

  //   const [copySuccess, setCopySuccess] = useState("");

  // const copyToClipBoard = async () => {
  //   const copyMe = document.getElementById("outputResult").innerHTML;
  //   try {
  //     await navigator.clipboard.writeText(copyMe);
  //     // setCopySuccess("Copied!")
  //   } catch (err) {
  //     // setCopySuccess("Failed to copy!");
  //   }
  // };

  const [formFields, setFormFields] = useState([["", ""]]);
  const [creatorTypes, setCreatorTypes] = useState([""]);
  const { metadata, chosenForm } = useContext(MetadataContext);

  // Safely converts CrossRef-style date objects or plain values to a string
  const safeDate = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number") return String(val);
    if (val["date-parts"] && Array.isArray(val["date-parts"])) {
      const parts = val["date-parts"][0];
      if (!parts || !parts.length) return "";
      const [y, m, d] = parts;
      if (y && m && d)
        return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      if (y && m) return `${y}-${String(m).padStart(2, "0")}`;
      return String(y);
    }
    return "";
  };

  useEffect(() => {
    if (!metadata) return;
    if (chosenForm && chosenForm !== "patent" && chosenForm !== "") return;
    setPatentsCitation((prev) => ({
      ...prev,
      titleOfTheInformationSource:
        metadata.title || prev.titleOfTheInformationSource,
      dateOfIssuance:
        safeDate(metadata.dateOfPublication) ||
        safeDate(metadata.dateOfIssuance) ||
        prev.dateOfIssuance,
      dateOfApplication:
        safeDate(metadata.dateOfApplication) || prev.dateOfApplication,
      patentNumber: metadata.patentNumber || prev.patentNumber,
      persistentIdentifiers:
        metadata.doi || metadata.url || prev.persistentIdentifiers,
      publisher: metadata.publisher || prev.publisher,
    }));

    if (metadata.authors && metadata.authors.length > 0) {
      const newFields = metadata.authors.map((a) => [
        a.firstName || "",
        a.lastName || "",
      ]);
      setFormFields(newFields.length ? newFields : [["", ""]]);
    }
  }, [metadata, chosenForm]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    if (event.target.name == "firstName") data[index][0] = event.target.value;
    else data[index][1] = event.target.value;
    setFormFields(data);
  };
  const copytext = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    toast.success("Copied to Clipboard");
  };

  const formatCreatorForCitation = (firstName, lastName) => {
    const safeFirst = (firstName || "").trim();
    const safeLast = (lastName || "").trim();
    const firstInitial = safeFirst
      ? `${safeFirst.charAt(0).toUpperCase()}.`
      : "";
    const upperLast = safeLast ? safeLast.toUpperCase() : "";
    if (!upperLast && !firstInitial) return "";
    if (!upperLast) return `${firstInitial}, `;
    if (!firstInitial) return `${upperLast}, `;
    return `${upperLast}, ${firstInitial}, `;
  };

  const formatCreatorInline = (firstName, lastName) => {
    const safeFirst = (firstName || "").trim();
    const safeLast = (lastName || "").trim();
    const firstInitial = safeFirst
      ? `${safeFirst.charAt(0).toUpperCase()}.`
      : "";
    const upperLast = safeLast ? safeLast.toUpperCase() : "";
    return [firstInitial, upperLast].filter(Boolean).join(" ");
  };

  const getLastName = (firstName, lastName) => {
    const safeLast = (lastName || "").trim();
    return safeLast ? safeLast.toUpperCase() : "";
  };

  const getYear = (date) => {
    if (!date) return "";
    const dateStr = String(date);
    const match = dateStr.match(/\b\d{4}\b/);
    return match ? match[0] : "";
  };

  const addField = (UseStateName, stateName, obj) => {
    UseStateName([...stateName, obj]);
  };
  const removeField = (UseStateName, stateName, index) => {
    stateName.splice(index, 1);
    UseStateName([...stateName]);
  };

  const handleCreatorTypeChange = (event, index) => {
    const data = [...creatorTypes];
    data[index] = event.target.value;
    setCreatorTypes(data);
  };

  const addCreatorField = () => {
    const previousType = creatorTypes[creatorTypes.length - 1] || "";
    setFormFields([...formFields, ["", ""]]);
    setCreatorTypes([...creatorTypes, previousType]);
  };

  const removeCreatorField = (index) => {
    const nextFormFields = [...formFields];
    const nextTypes = [...creatorTypes];
    nextFormFields.splice(index, 1);
    nextTypes.splice(index, 1);
    setFormFields(nextFormFields);
    setCreatorTypes(nextTypes);
  };

  return (
    <>
      <div className="serial">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setResult(true);
          }}
        >
          <Form.Group as={Row} className="mb-3 align-items-start">
            <Form.Label column sm={3} className="fw-bold text-start">
              Name of Creator(s)
            </Form.Label>
            <Col sm={9}>
              {formFields.map((item, index) => {
                return (
                  <Row key={index} className="mb-3 align-items-center">
                    <Form.Group as={Col} controlId="formLname">
                      <Form.Select
                        value={creatorTypes[index] || ""}
                        onChange={(event) =>
                          handleCreatorTypeChange(event, index)
                        }
                      >
                        <option>---Select Type ---</option>
                        <option>Author</option>
                        <option>Editor</option>
                        <option>Reviewer</option>
                        <option>Translator</option>
                        <option>Organisation</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control
                        onChange={(event) => handleFormChange(event, index)}
                        value={item[0]}
                        name="firstName"
                        type="text"
                        placeholder="Enter First Name"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control
                        onChange={(event) => handleFormChange(event, index)}
                        value={item[1]}
                        name="lastName"
                        type="text"
                        placeholder="Enter Last Name"
                      />
                    </Form.Group>
                    {formFields.length !== 1 ? (
                      <div as={Col} className="col-sm-1">
                        <Button
                          className="removebutton md:!mt-0 !mt-2"
                          onClick={() => removeCreatorField(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Row>
                );
              })}
              <Button
                variant="link"
                className="ps-0 text-decoration-none"
                onClick={addCreatorField}
              >
                Add another Creator
              </Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Patent application country</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.patientApplicationCountry}
                name="patientApplicationCountry"
                type="text"
                placeholder="Enter Country"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Title</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.titleOfTheInformationSource}
                name="titleOfTheInformationSource"
                type="text"
                placeholder="Enter Title"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Date</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.dateOfApplication}
                name="dateOfApplication"
                type="text"
                placeholder="Enter Date"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Patent Number</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.patentNumber}
                name="patentNumber"
                type="text"
                placeholder="Enter Patent Number"
              />
            </Col>
          </Form.Group>
          <div>
            <center>
              <Button variant="primary" type="submit">
                Get Citation
              </Button>
            </center>
          </div>
        </Form>
      </div>
      {result === false ? (
        ""
      ) : (
        <div id="outputBox">
          <center>
            <h2 style={{textAlign: "center"}}>Your Resulted Citation</h2>
          </center>
          <br />
          {/* SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]
          . Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume)
          , Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location]. */}

          <div style={{ textAlign: "left" }}>
            <div id="output">
              <p ref={ref} id="outputResult">
                {formFields.map((item, index) => {
                  const formatted = formatCreatorForCitation(item[0], item[1]);
                  if (!formatted) return null;
                  return <span key={index}>{formatted}</span>;
                })}
                {patentsCitation.patientApplicationCountry === "" ? (
                  ""
                ) : (
                  <>
                    {patentsCitation.patientApplicationCountry}
                    {". "}
                  </>
                )}
                {patentsCitation.standardIdentifiersOfCreator === "" ? (
                  ""
                ) : (
                  <>
                    {patentsCitation.standardIdentifiersOfCreator}
                    {". "}
                  </>
                )}
                {patentsCitation.titleOfTheInformationSource === "" ? (
                  ""
                ) : (
                  <>
                    <i>{patentsCitation.titleOfTheInformationSource}</i>
                    {". "}
                  </>
                )}
                {patentsCitation.seriesTitle === "" ? (
                  ""
                ) : (
                  <>
                    {patentsCitation.seriesTitle}
                    {". "}
                  </>
                )}
                {patentsCitation.subsidiaryCreator === "" ? (
                  ""
                ) : (
                  <>
                    {patentsCitation.subsidiaryCreator}
                    {". "}
                  </>
                )}
                {patentsCitation.dateOfApplication === "" ? (
                  ""
                ) : (
                  <>
                    {patentsCitation.dateOfApplication}
                    {". "}
                  </>
                )}
                {patentsCitation.patentNumber === "" ? (
                  ""
                ) : (
                  <>
                    Patent Number {patentsCitation.patentNumber}
                    {". "}
                  </>
                )}
                {patentsCitation.itemAttributes === "" ? (
                  ""
                ) : (
                  <>
                    {patentsCitation.itemAttributes}
                    {". "}
                  </>
                )}
                {patentsCitation.dateOfCitation === "" ? (
                  ""
                ) : (
                  <>
                    [viewed {patentsCitation.dateOfCitation}]{". "}
                  </>
                )}
                {patentsCitation.location === "" ? (
                  ""
                ) : (
                  <>
                    [{patentsCitation.location}]{". "}
                  </>
                )}
                {patentsCitation.relationships === "" ? (
                  ""
                ) : (
                  <>
                    {patentsCitation.relationships}
                    {". "}
                  </>
                )}
              </p>
              <Copy refs={ref} />
              <div className="md:flex  gap-10 mx-10">
                <span className="text-gray-400 w-24">Narrative</span>
                <p
                  onClick={(e) => {
                    copytext(e);
                  }}
                  className="text-blue-500 cursor-pointer"
                >
                  {formFields.map((item, index) => {
                    const lastName = getLastName(item[0], item[1]);
                    if (!lastName) return null;
                    return (
                      <span key={index}>
                        {lastName}
                        {index < formFields.length - 1 ? " & " : ""}
                      </span>
                    );
                  })}
                  ({getYear(patentsCitation.dateOfApplication)})
                </p>
              </div>
              <div className="md:flex  gap-10 mx-10">
                <span className="text-gray-400 w-24">Parenthetical</span>
                <p
                  onClick={(e) => {
                    copytext(e);
                  }}
                  className="text-blue-500 cursor-pointer"
                >
                  (
                  {formFields.map((item, index) => {
                    const lastName = getLastName(item[0], item[1]);
                    if (!lastName) return null;
                    return (
                      <span key={index}>
                        {lastName}
                        {index < formFields.length - 1 ? " & " : ""}
                      </span>
                    );
                  })}
                  {getYear(patentsCitation.dateOfApplication) ? ` ${getYear(patentsCitation.dateOfApplication)}` : ""})
                </p>
              </div>
            </div>
            {/* <button
              className="btn btn-primary my-2"
              onClick={() => copyToClipBoard()}
            >
              Copy
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PatentsForm;
