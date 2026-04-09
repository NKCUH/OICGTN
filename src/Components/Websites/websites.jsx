import React, { useRef, useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Copy from "../Copy/Copy";
import "./websites.css";
import { toast } from "react-toastify";
import { MetadataContext } from "../../context/MetadataContext";
const WebsitesForm = () => {
  const [websitesCitation, setWebsitesCitation] = useState({
    // lastName: "",
    // firstName: "",
    //standardIdentifiersOfCreator: "",
    pageTitle: "",
    websiteTitle: "",
    edition: "",
    formatAndResourceType: "",
    systemRequirements: "",
    subsidiaryCreator: "",
    place: "",
    publisher: "",
    dateOfPublication: "",
    numeration: "",
    numerationDate: "",
    standardIdentifier: "",
    availabilityAndAccess: "",
    relationships: "",
    dateOfCitation: "",
  });
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
  const ref = useRef();

  const [result, setResult] = useState(false);
  const onChanging = (e) => {
    const name = e.target.name;
    setWebsitesCitation({ ...websitesCitation, [name]: e.target.value });
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

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    if (event.target.name === "firstName") data[index][0] = event.target.value;
    else data[index][1] = event.target.value;
    setFormFields(data);
  };

  const handleInputChange = (event, UseStateName, stateName, index) => {
    let data = [...stateName];
    data[index] = event.target.value;
    UseStateName(data);
  };

  // multi field inputs (first name ,last name, type, medium designation, edition, publisher, standard identifier, availability and access)

  const [formFields, setFormFields] = useState([["", ""]]);
  const [creatorTypes, setCreatorTypes] = useState([""]);
  const [standardIdentifiersOfCreator, setStandardIdentifiersOfCreator] =
    useState([""]);
  const [edition, setEdition] = useState([""]);
  const [publisher, setPublisher] = useState([""]);
  const [numeration, setNumeration] = useState([""]);
  const [standardIdentifier, setStandarIdentifier] = useState([""]);
  const hasCreatorInput = formFields.some(
    (item) => (item[0] || "").trim() || (item[1] || "").trim(),
  );
  const { metadata, chosenForm } = useContext(MetadataContext);
  useEffect(() => {
    if (!metadata) return;
    if (chosenForm && chosenForm !== "website" && chosenForm !== "") return;
    setWebsitesCitation((prev) => ({
      ...prev,
      pageTitle: metadata.webpageTitle || metadata.title || prev.pageTitle,
      websiteTitle:
        metadata.websiteTitle || metadata.publisher || prev.websiteTitle,
      dateOfPublication: metadata.dateOfPublication || prev.dateOfPublication,
      place: metadata.place || prev.place,
      publisher: metadata.publisher || prev.publisher,
      availabilityAndAccess:
        metadata.url || metadata.doi || prev.availabilityAndAccess,
      dateOfCitation: metadata.dateOfCitation || prev.dateOfCitation,
    }));

    if (metadata.authors && metadata.authors.length > 0) {
      const newFields = metadata.authors.map((a) => [
        a.firstName || "",
        a.lastName || "",
      ]);
      setFormFields(newFields.length ? newFields : [["", ""]]);
    }
    if (metadata.isbn || metadata.doi)
      setStandarIdentifier([metadata.isbn || metadata.doi]);
  }, [metadata, chosenForm]);

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
                  <Row key={index} className="mt-2 align-items-center">
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
                        <option>Designer</option>
                        <option>Translator</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFname">
                      <Form.Control
                        onChange={(event) => handleFormChange(event, index)}
                        value={item[0]}
                        name="firstName"
                        type="text"
                        placeholder="Enter First Name"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formLname">
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

          {false && (
            <Row className="mb-3">
              <Form.Label>
                Standard Identifiers of creaters' public identities
              </Form.Label>
            </Row>
          )}

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Page Title</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={websitesCitation.pageTitle}
                name="pageTitle"
                type="text"
                placeholder="Enter Page Title"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Website Title</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={websitesCitation.websiteTitle}
                name="websiteTitle"
                type="text"
                placeholder="Enter Website Title"
              />
            </Col>
          </Form.Group>

          {false && (
            <Row className="mb-3">
              <Form.Label>Edition</Form.Label>
              {edition.map((item, index) => {
                return (
                  <Row key={index} className="mt-2">
                    <Form.Group as={Col} controlId="formEdition">
                      <Form.Select defaultValue="Choose...">
                        <option>---Select Edition---</option>
                        <option>Edition</option>
                        <option>Version</option>
                        <option>Revised Edition</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPlace">
                      <Form.Control
                        onChange={(event) =>
                          handleInputChange(event, setEdition, edition, index)
                        }
                        value={item}
                        name="editionN"
                        type="text"
                        placeholder="Enter edition"
                      />
                    </Form.Group>
                    {edition.length !== 1 ? (
                      <div as={Col} className="col-sm-1">
                        <Button
                          className="removebutton md:!mt-0 !mt-2"
                          onClick={() =>
                            removeField(setEdition, edition, index)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                    {edition.length - 1 === index && (
                      <div as={Col} className="col-sm-1">
                        <Button
                          className="addbutton md:!mt-0 !mt-2"
                          onClick={() => addField(setEdition, edition, "")}
                        >
                          ADD
                        </Button>
                      </div>
                    )}
                  </Row>
                );
              })}
            </Row>
          )}
          {false && (
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Format And Resource Type</Form.Label>
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={websitesCitation.formatAndResourceType}
                  name="formatAndResourceType"
                  type="text"
                  placeholder="Enter Format and Resource Type"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>System Requirements</Form.Label>
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={websitesCitation.systemRequirements}
                  name="systemRequirements"
                  type="text"
                  placeholder="Enter System Requirement"
                />
              </Form.Group>
            </Row>
          )}

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Date of Publication (Year)</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={websitesCitation.dateOfPublication}
                name="dateOfPublication"
                type="text"
                placeholder="Enter Date"
              />
            </Col>
          </Form.Group>
          {false && (
            <Row className="mb-3">
              <Form.Label>Numeration</Form.Label>
            </Row>
          )}

          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={3} className="fw-bold text-start">
              URL
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={websitesCitation.availabilityAndAccess}
                name="availabilityAndAccess"
                type="text"
                placeholder={"Enter URL"}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Date of Citation</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                name="dateOfCitation"
                value={websitesCitation.dateOfCitation}
                type="text"
                placeholder="Enter Date"
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
          <h2 style={{textAlign: "center"}}>Your Resulted Citation :- </h2>
          <br />
          {/* SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]
          . Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume)
          , Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location]. */}

          <center>
            <div id="output">
              <p ref={ref} id="outputResult">
                {formFields.map((item, index) => {
                  const formatted = formatCreatorForCitation(item[0], item[1]);
                  if (!formatted) return null;
                  return <span key={index}>{formatted}</span>;
                })}



                {websitesCitation.pageTitle === "" ? (
                  ""
                ) : (
                  <>
                    {websitesCitation.pageTitle}
                    {". "}
                  </>
                )}

                {websitesCitation.websiteTitle === "" ? (
                  ""
                ) : (
                  <>
                    In:{" "}
                    <span className="title">
                      {websitesCitation.websiteTitle}
                      {". "}
                    </span>
                  </>
                )}

                {edition.length <= 1 &&
                (edition[0] === "" || edition[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    {edition.map((item, index) => {
                      return (
                        <span key={index}>
                          {edition[index]}
                          {index < edition.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {". "}
                  </>
                )}

                {websitesCitation.formatAndResourceType === "" ? (
                  ""
                ) : (
                  <>
                    {websitesCitation.formatAndResourceType}
                    {". "}
                  </>
                )}

                {websitesCitation.systemRequirements === "" ? (
                  ""
                ) : (
                  <>
                    {websitesCitation.systemRequirements}
                    {". "}
                  </>
                )}

                {websitesCitation.subsidiaryCreator === "" ? (
                  ""
                ) : (
                  <>
                    {websitesCitation.subsidiaryCreator}
                    {". "}
                  </>
                )}

                {websitesCitation.place === "" ? (
                  ""
                ) : (
                  <>
                    {websitesCitation.place}
                    {": "}
                  </>
                )}
                {publisher.length <= 1 &&
                (publisher[0] === "" || publisher[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    {publisher.map((item, index) => {
                      return (
                        <span key={index}>
                          {publisher[index]}
                          {index < publisher.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {". "}
                  </>
                )}
                {/* {publisher.map((item, index) => {
                  return (
                    <span key={index}>
                      {publisher[index]} {index < publisher.length - 1 && ', '}{" "}
                    </>
                  );
                })} */}
                {websitesCitation.dateOfPublication === "" ? (
                  ""
                ) : (
                  <>{websitesCitation.dateOfPublication} </>
                )}
                {numeration.length <= 1 &&
                (numeration[0] === "" || numeration[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    {numeration.map((item, index) => {
                      return (
                        <span key={index}>
                          {numeration[index]}
                          {index < numeration.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {". "}
                  </>
                )}
                {websitesCitation.dateOfCitation === "" ? (
                  ""
                ) : (
                  <>
                    [viewed {websitesCitation.dateOfCitation}]{". "}
                  </>
                )}
                {standardIdentifier.length <= 1 &&
                (standardIdentifier[0] === "" ||
                  standardIdentifier[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    {standardIdentifier.map((item, index) => {
                      return (
                        <span key={index}>
                          {standardIdentifier[index]}
                          {index < standardIdentifier.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {". "}
                  </>
                )}
                {websitesCitation.availabilityAndAccess === "" ? (
                  ""
                ) : (
                  <>
                    Available from: {websitesCitation.availabilityAndAccess}
                    {". "}
                  </>
                )}
                {websitesCitation.relationships === "" ? (
                  ""
                ) : (
                  <>
                    {websitesCitation.relationships}
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
                  {hasCreatorInput
                    ? formFields.map((item, index) => {
                        const formatted = formatCreatorInline(item[0], item[1]);
                        if (!formatted) return null;
                        return (
                          <span key={index}>
                            {formatted}
                            {index < formFields.length - 1 ? ", " : ""}
                          </span>
                        );
                      })
                    : websitesCitation.pageTitle !== ""
                      ? websitesCitation.pageTitle
                      : websitesCitation.websiteTitle}{" "}
                  {websitesCitation.dateOfPublication === "" ? (
                    ""
                  ) : (
                    <>
                      {"("}
                      {websitesCitation.dateOfPublication}
                      {")"}
                    </>
                  )}
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
                  {"("}
                  {hasCreatorInput
                    ? formFields.map((item, index) => {
                        const formatted = formatCreatorInline(item[0], item[1]);
                        if (!formatted) return null;
                        return <span key={index}>{formatted}</span>;
                      })
                    : websitesCitation.pageTitle !== ""
                      ? websitesCitation.pageTitle
                      : websitesCitation.websiteTitle}
                  {websitesCitation.dateOfPublication === "" ? (
                    ""
                  ) : (
                    <> {websitesCitation.dateOfPublication}</>
                  )}
                  {")"}
                </p>
              </div>
            </div>
            {/* <button
              className="btn btn-primary my-2"
              onClick={() => copyToClipBoard()}
            >
              Copy
            </button> */}
          </center>
        </div>
      )}
    </>
  );
};

export default WebsitesForm;
