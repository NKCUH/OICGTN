import React, { useRef, useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import Copy from "../Copy/Copy";
import { MetadataContext } from "../../context/MetadataContext";
const ContributionForm = () => {
  const [contributionCitation, setContributionCitation] = useState({
    // lastName: "",
    // firstName: "",
    year: "",
    titleOfTheContribution: "",
    additionalGeneralInformation: "",
    nameOfCreatorsOfTheHostItem: "",
    titleOfTheHostItem: "",
    mediumDesignation: "",
    // mapSeriesDesignation: "",
    // scale: "",
    subsidiaryTitles: "",
    edition: "",
    subsidiaryCreatorOfTheHostItem: "",
    place: "",
    publisher: "",
    dateOfPublication: "",
    numeration: "",
    rangeOfPageNumbersOfTheContribution: "",
    // dateOfUpdate: "",
    dateOfCitation: "",
    seriesTitleAndNumber: "",
    standardIdentifier: "",
    availiabilityAndAccess: "",
    location: "",
  });
  const copytext = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    toast.success("Copied to Clipboard");
  };

  const getAuthorDisplayName = (firstName, lastName, mode) => {
    const safeFirst = (firstName || "").trim();
    const safeLast = (lastName || "").trim();
    const upperLast = safeLast ? safeLast.toUpperCase() : "";

    if (mode === "inText") {
      return upperLast;
    }

    const firstInitial = safeFirst ? `${safeFirst.charAt(0).toUpperCase()}.` : "";
    if (!upperLast && !firstInitial) return "";
    if (!upperLast) return `${firstInitial}, `;
    if (!firstInitial) return `${upperLast}, `;
    return `${upperLast}, ${firstInitial}, `;
  };

  const formatAuthors = (authors, mode) => {
    const normalizedAuthors = authors
      .map((author) => getAuthorDisplayName(author[0], author[1], mode))
      .filter(Boolean);

    if (normalizedAuthors.length === 0) return "";

    if (normalizedAuthors.length > 5) {
      return `${normalizedAuthors.slice(0, 5).join(mode === "reference" ? "" : ", ")} et al.`;
    }

    if (mode === "inText") {
      if (normalizedAuthors.length === 2) {
        return normalizedAuthors.join(" & ");
      }

      return normalizedAuthors.join(", ");
    }

    return normalizedAuthors.join("");
  };
  const ref = useRef();
  const [result, setResult] = useState(false);
  const onChanging = (e) => {
    const name = e.target.name;
    setContributionCitation({
      ...contributionCitation,
      [name]: e.target.value,
    });
  };

  // const [copy, setCopy] = useState("");

  // const copyToClipBoard = async () => {
  //   const copyMe = document.getElementById("outputResult").innerHTML;
  //   try {
  //     await navigator.clipboard.writeText(copyMe);
  //     setCopy(true);
  //   } catch (err) {
  //     setCopy(false);
  //   }
  // };

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    if (event.target.name == "firstName") data[index][0] = event.target.value;
    else data[index][1] = event.target.value;
    setFormFields(data);
  };

  const handleCreatorTypeChange = (event, index) => {
    const data = [...creatorTypes];
    data[index] = event.target.value;
    setCreatorTypes(data);
  };

  const handleInputChange = (event, UseStateName, stateName, index) => {
    let data = [...stateName];
    data[index] = event.target.value;
    UseStateName(data);
  };

  // multi field inputs (first name ,last name, type, medium designation, edition, publisher, standard identifier, availability and access)

  const [formFields, setFormFields] = useState([["", ""]]);
  const [creatorTypes, setCreatorTypes] = useState([""]);
  const [creatorHost, setCreatorHost] = useState([""]);
  const [edition, setEdition] = useState([""]);
  const [numeration, setNumeration] = useState([""]);
  const [publisher, setPublisher] = useState([""]);
  const [standardIdentifier, setStandarIdentifier] = useState([""]);
  const [availability, setAvailability] = useState([""]);

  const { metadata, chosenForm } = useContext(MetadataContext);
  useEffect(() => {
    if (!metadata) return;
    if (chosenForm && chosenForm !== "book-contribution" && chosenForm !== "")
      return;
    // map relevant fields
    setContributionCitation((prev) => ({
      ...prev,
      titleOfTheContribution: metadata.title || prev.titleOfTheContribution,
      year: metadata.year || prev.year,
      titleOfTheHostItem: metadata.title || prev.titleOfTheHostItem,
      publisher: metadata.publisher || prev.publisher,
      place: metadata.place || prev.place,
      dateOfPublication: metadata.dateOfPublication || prev.dateOfPublication,
      numeration: metadata.volume || prev.numeration,
      rangeOfPageNumbersOfTheContribution:
        metadata.pages || prev.rangeOfPageNumbersOfTheContribution,
      availiabilityAndAccess:
        metadata.url || metadata.doi || prev.availiabilityAndAccess,
      edition: metadata.edition || prev.edition,
    }));

    if (metadata.authors && metadata.authors.length > 0) {
      const newFields = metadata.authors.map((a) => [
        a.firstName || "",
        a.lastName || "",
      ]);
      setFormFields(newFields.length ? newFields : [["", ""]]);
      setCreatorTypes(newFields.map(() => ""));
    }
    if (metadata.isbn || metadata.doi)
      setStandarIdentifier([metadata.isbn || metadata.doi]);
  }, [metadata, chosenForm]);

  const addCreatorField = () => {
    const previousType = creatorTypes[creatorTypes.length - 1] || "";
    setFormFields([...formFields, ["", ""]]);
    setCreatorTypes([...creatorTypes, previousType]);
  };
  const addField = (UseStateName, stateName, obj) => {
    UseStateName([...stateName, obj]);
  };
  const removeField = (UseStateName, stateName, index) => {
    stateName.splice(index, 1);
    UseStateName([...stateName]);
  };

  const removeCreatorField = (index) => {
    const nextFields = [...formFields];
    const nextTypes = [...creatorTypes];
    nextFields.splice(index, 1);
    nextTypes.splice(index, 1);
    setFormFields(nextFields);
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

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>Chapter Title</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.titleOfTheContribution}
                name="titleOfTheContribution"
                type="text"
                placeholder="Enter Chapter Title"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>Book Title</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.titleOfTheHostItem}
                name="titleOfTheHostItem"
                type="text"
                placeholder="Enter Book Title"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-start">
            <Form.Label column sm={3} className="fw-bold">
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
                        <option>Reviewer</option>
                        <option>Reviser</option>
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
                      <Col className="col-sm-1">
                        <Button
                          className="removebutton md:!mt-0 !mt-2"
                          onClick={() => removeCreatorField(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    ) : null}
                    {formFields.length - 1 === index ? (
                      <Col className="col-sm-1">
                        <Button
                          className="addbutton md:!mt-0 !mt-2"
                          onClick={addCreatorField}
                        >
                          ADD
                        </Button>
                      </Col>
                    ) : null}
                  </Row>
                );
              })}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-start">
            <Form.Label column sm={3} className="fw-bold">
              Editor
            </Form.Label>
            <Col sm={9}>
              {creatorHost.map((item, index) => {
                return (
                  <Row key={index} className="mt-2 align-items-center">
                    <Form.Group as={Col} controlId="formHost">
                      <Form.Control
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            setCreatorHost,
                            creatorHost,
                            index,
                          )
                        }
                        value={item}
                        name="titleOfTheHostItem"
                        type="text"
                        placeholder="Enter Editor"
                      />
                    </Form.Group>
                    {creatorHost.length !== 1 ? (
                      <Col className="col-sm-1">
                        <Button
                          className="removebutton md:!mt-0 !mt-2"
                          onClick={() =>
                            removeField(setCreatorHost, creatorHost, index)
                          }
                        >
                          Remove
                        </Button>
                      </Col>
                    ) : null}
                    {creatorHost.length - 1 === index ? (
                      <Col className="col-sm-1">
                        <Button
                          className="addbutton md:!mt-0 !mt-2"
                          onClick={() => addField(setCreatorHost, creatorHost, "")}
                        >
                          ADD
                        </Button>
                      </Col>
                    ) : null}
                  </Row>
                );
              })}
            </Col>
          </Form.Group>

          {/* <Row className="mb-3">
            <Form.Group as={Col} controlId="formMap">
              <Form.Label>Map series designation</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.mapSeriesDesignation}
                name="mapSeriesDesignation"
                type="text"
                placeholder="Enter Designation "
              />
            </Form.Group>
          </Row> */}

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>Place</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.place}
                name="place"
                type="text"
                placeholder="Enter Place"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 align-items-start">
            <Form.Label column sm={3} className="fw-bold">
              Publisher
            </Form.Label>
            <Col sm={9}>
              {publisher.map((item, index) => {
                return (
                  <Row key={index} className="mt-1 align-items-center">
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Control
                        onChange={(event) =>
                          handleInputChange(event, setPublisher, publisher, index)
                        }
                        value={item}
                        name="dateOfPublication"
                        type="text"
                        placeholder="Enter Publisher"
                      />
                    </Form.Group>
                    {publisher.length !== 1 ? (
                      <div className="col-sm-1">
                        <Button
                          className="removebutton md:!mt-0 !mt-2"
                          onClick={() =>
                            removeField(setPublisher, publisher, index)
                          }
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
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>Date of Publication(Year)</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.year}
                name="year"
                type="text"
                placeholder="Enter Year"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              <b>Page range</b>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.rangeOfPageNumbersOfTheContribution}
                name="rangeOfPageNumbersOfTheContribution"
                type="text"
                placeholder="Enter Range "
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>DOI</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(event) =>
                  handleInputChange(
                    event,
                    setStandarIdentifier,
                    standardIdentifier,
                    0,
                  )
                }
                value={standardIdentifier[0] || ""}
                name="standardIdentifier"
                type="text"
                placeholder="Enter DOI"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>URL</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(event) =>
                  handleInputChange(
                    event,
                    setAvailability,
                    availability,
                    0,
                  )
                }
                value={availability[0] || ""}
                name="availiabilityAndAccess"
                type="text"
                placeholder="Enter URL"
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
            <h2>Your Resulted Citation </h2>
          </center>
          <br />
          {/* SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]
          . Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume)
          , Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location]. */}

          <center>
            <div id="output">
              <p ref={ref} id="outputResult">
                {formatAuthors(formFields, "reference")}
                {contributionCitation.year === "" ? (
                  ""
                ) : (
                  <>
                    [{contributionCitation.year}]{". "}
                  </>
                )}
                {contributionCitation.titleOfTheContribution === "" ? (
                  ""
                ) : (
                  <>
                    {contributionCitation.titleOfTheContribution}
                    {". "}
                  </>
                )}
                {/* {addGenInfo.map((item, index) => {
                  return (
                    <div key={index}>
                      {addGenInfo[index]} {item.addGenInfo === "" ? "" : ","}{" "}
                    </>
                  );
                })} */}
                {creatorHost.length <= 1 &&
                (creatorHost[0] === "" || creatorHost[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    In:{" "}
                    {creatorHost.map((item, index) => {
                      return (
                        <span key={index}>
                          {creatorHost[index]}
                          {index < creatorHost.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {", "}
                  </>
                )}
                {contributionCitation.titleOfTheHostItem === "" ? (
                  ""
                ) : (
                  <>
                    ed.{" "}
                    <span className="title">
                      {contributionCitation.titleOfTheHostItem}
                    </span>
                    {". "}
                  </>
                )}

                {contributionCitation.subsidiaryTitles === "" ? (
                  ""
                ) : (
                  <>
                    <span className="title">
                      {contributionCitation.subsidiaryTitles}
                    </span>
                    {". "}
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
                {contributionCitation.subsidiaryCreatorOfTheHostItem === "" ? (
                  ""
                ) : (
                  <>
                    {contributionCitation.subsidiaryCreatorOfTheHostItem}
                    {". "}
                  </>
                )}
                {contributionCitation.place === "" ? (
                  ""
                ) : (
                  <>{contributionCitation.place}: </>
                )}
                {publisher.length <= 1 &&
                (publisher[0] === "" || publisher[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    {publisher.map((item, index, key) => {
                      return (
                        <span key={index}>
                          {publisher[index]}
                          {index < publisher.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {", "}
                  </>
                )}
                {contributionCitation.dateOfPublication === "" ? (
                  ""
                ) : (
                  <>
                    {contributionCitation.dateOfPublication}
                    {", "}
                  </>
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
                {contributionCitation.rangeOfPageNumbersOfTheContribution ===
                "" ? (
                  ""
                ) : (
                  <>
                    {"pp. "}
                    {contributionCitation.rangeOfPageNumbersOfTheContribution}
                    {". "}
                  </>
                )}
                {contributionCitation.dateOfCitation === "" ? (
                  ""
                ) : (
                  <>
                    viewed [{contributionCitation.dateOfCitation}]{". "}{" "}
                  </>
                )}
                {contributionCitation.seriesTitleAndNumber === "" ? (
                  ""
                ) : (
                  <>
                    {contributionCitation.seriesTitleAndNumber}
                    {". "}
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
                          DOI {standardIdentifier[index]}
                          {index < standardIdentifier.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {". "}
                  </>
                )}
                {availability.length <= 1 &&
                (availability[0] === "" || availability[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    Available from:  
                    {availability.map((item, index) => {
                      return (
                        <span key={index}>
                          {availability[index]}
                          {index < availability.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {". "}
                  </>
                )}{" "}
                {contributionCitation.location === "" ? (
                  ""
                ) : (
                  <>At: [{contributionCitation.location}].</>
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
                  {formatAuthors(formFields, "inText")}{" "}
                  {contributionCitation.year === "" &&
                  contributionCitation.rangeOfPageNumbersOfTheContribution ===
                    "" ? (
                    ""
                  ) : (
                    <>
                      {"("}
                      {contributionCitation.year}
                      {contributionCitation.rangeOfPageNumbersOfTheContribution ===
                      ""
                        ? ""
                        : `${contributionCitation.year === "" ? "" : ", "}p. ${contributionCitation.rangeOfPageNumbersOfTheContribution}`}
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
                  {formatAuthors(formFields, "inText")}
                  {contributionCitation.year === "" ? (
                    ""
                  ) : (
                    <>
                      {" "}
                      {contributionCitation.year}
                    </>
                  )}
                  {contributionCitation.rangeOfPageNumbersOfTheContribution ===
                  ""
                    ? ""
                    : ", p. "}
                  {contributionCitation.rangeOfPageNumbersOfTheContribution}
                  {")"}
                </p>
              </div>
            </div>
            {/* <button
              className="btn btn-primary my-2"
              onClick={() => copyToClipBoard()}
            >
              {copy ? "Copied" : "Copy"}
            </button> */}
          </center>
        </div>
      )}
    </>
  );
};

export default ContributionForm;
