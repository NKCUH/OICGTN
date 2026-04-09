import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Copy from "../Copy/Copy";
import Row from "react-bootstrap/Row";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MetadataContext } from "../../context/MetadataContext";
import { mapToFormMetadata } from "../../api/metadataMapper";

const SerialContributionForm = ({ type }) => {
  const [serialContributionCitation, setSerialContributionCitation] = useState({
    lastName: "",
    firstName: "",
    year: "",
    titleOfTheContribution: "",
    additionalGeneralInformation: "",
    titleOfTheHostSerial: "",
    mediumDesignation: "",
    subsidiaryTitles: "",
    edition: "",
    place: "",
    publisher: "",
    dateOfPublication: "",
    numeration: "",
    pageStart: "",
    pageEnd: "",
    dateOfCitation: "",
    standardIdentifier: "",
    availabilityAndAccess: "",
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
    setSerialContributionCitation({
      ...serialContributionCitation,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // small debug log so we can see click activity in the console
    try {
      console.log("SerialContribution: submit triggered");
    } catch (err) {}
    setResult(true);
  };

  // const [copy, setCopy] = useState(false);

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
    if (event.target.name === "firstName") data[index][0] = event.target.value;
    else data[index][1] = event.target.value;
    setFormFields(data);
  };

  const handleCreatorTypeChange = (event, index) => {
    let data = [...creatorTypes];
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
  const [medium, setMedium] = useState([""]);
  const [edition, setEdition] = useState([""]);
  const [numeration, setNumeration] = useState([{ type: "", value: "" }]);
  const [publisher, setPublisher] = useState([""]);
  const [standardIdentifier, setStandarIdentifier] = useState([""]);
  const [availability, setAvailability] = useState([""]);
  const { metadata, chosenForm } = useContext(MetadataContext);
  const isOnline = type === "online";
  useEffect(() => {
    if (!metadata) return;
    if (chosenForm && chosenForm !== "serial-contribution" && chosenForm !== "")
      return;
    setSerialContributionCitation((prev) => ({
      ...prev,
      titleOfTheContribution: metadata.title || prev.titleOfTheContribution,
      year: metadata.year || prev.year,
      titleOfTheHostSerial:
        metadata.websiteTitle || metadata.title || prev.titleOfTheHostSerial,
      publisher: metadata.publisher || prev.publisher,
      place: metadata.place || prev.place,
      dateOfPublication: metadata.dateOfPublication || prev.dateOfPublication,
      numeration: metadata.volume || prev.numeration,
      pageStart:
        metadata.pages && metadata.pages.toString().split(/[-–]/)[0]
          ? metadata.pages.toString().split(/[-–]/)[0]
          : prev.pageStart,
      pageEnd:
        metadata.pages && metadata.pages.toString().split(/[-–]/)[1]
          ? metadata.pages.toString().split(/[-–]/)[1]
          : prev.pageEnd,
      availabilityAndAccess:
        metadata.url || metadata.doi || prev.availabilityAndAccess,
    }));
    if (metadata.volume) {
      setNumeration([{ type: "Volume", value: metadata.volume }]);
    }
    if (metadata.authors && metadata.authors.length > 0) {
      const newFields = metadata.authors.map((a) => [
        a.firstName || "",
        a.lastName || "",
      ]);
      setFormFields(newFields.length ? newFields : [["", ""]]);
      setCreatorTypes(newFields.map(() => ""));
    }
  }, [metadata, chosenForm]);

  const handleTypeChange = (event, index) => {
    let data = [...numeration];
    data[index].type = event.target.value;
    setNumeration(data);
  };

  const handleValueChange = (event, index) => {
    let data = [...numeration];
    data[index].value = event.target.value;
    setNumeration(data);
  };

  const addField = (UseStateName, stateName, obj) => {
    UseStateName([...stateName, obj]);
  };
  const addCreatorField = () => {
    const previousType = creatorTypes[creatorTypes.length - 1] || "";
    setFormFields([...formFields, ["", ""]]);
    setCreatorTypes([...creatorTypes, previousType]);
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
      <ToastContainer />
      <div className="serial">
        <Form onSubmit={handleSubmit}>
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
                        <option value>Choose...</option>
                        <option>Author</option>
                        <option>Editor</option>
                        <option>Translator</option>
                        <option>Organisation</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFname">
                      <Form.Control
                        onChange={(event) => handleFormChange(event, index)}
                        value={item[1]}
                        name="lastName"
                        type="text"
                        placeholder="Enter Last Name"
                      />
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
            <Form.Label column sm={3} className="text-start"><b>Title</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.titleOfTheContribution}
                name="titleOfTheContribution"
                type="text"
                placeholder="Enter Title"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Date of Publication (Year)</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.year}
                name="year"
                type="text"
                placeholder="Enter Year"
              />
            </Col>
          </Form.Group>

          {false && (
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formAdditional">
                <Form.Label>Additional General Information</Form.Label>
                <Form.Select
                  onChange={(e) => onChanging(e)}
                  value={
                    serialContributionCitation.additionalGeneralInformation
                  }
                  name="additionalGeneralInformation"
                >
                  <option value>Choose...</option>
                  <option>Classification</option>
                  <option>Price and availability</option>
                  <option>Languages</option>
                  <option>Other information</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formHost">
                <Form.Label><b>Journal Name</b></Form.Label>
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={serialContributionCitation.titleOfTheHostSerial}
                  name="titleOfTheHostSerial"
                  type="text"
                  placeholder="Enter Journal Name "
                />
              </Form.Group>
            </Row>
          )}

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Journal Name</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.titleOfTheHostSerial}
                name="titleOfTheHostSerial"
                type="text"
                placeholder="Enter Journal Name "
              />
            </Col>
          </Form.Group>

          {false && (
            <Row className="mb-3">
              <Form.Label>Medium Degination</Form.Label>
              {medium.map((item, index) => {
                return (
                  <Row key={index} className="mt-2">
                    <Form.Group as={Col} controlId="formMedia">
                      <Form.Select>
                        <option value>Choose...</option>
                        <option>Online</option>
                        <option>Database Online</option>
                        <option>Journal Online</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSubsidiary">
                      <Form.Control
                        onChange={(event) =>
                          handleInputChange(event, setMedium, medium, index)
                        }
                        value={item}
                        name="mediumDesignation"
                        type="text"
                        placeholder="Enter Medium Designation "
                      />
                    </Form.Group>
                    {medium.length !== 1 ? (
                      <div as={Col} className="col-sm-1">
                        <Button
                          className="removebutton md:!mt-0 !mt-2"
                          onClick={() => removeField(setMedium, medium, index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}

                    {medium.length - 1 === index && (
                      <div as={Col} className="col-sm-1">
                        <Button
                          className="addbutton md:!mt-0 !mt-2"
                          onClick={() => addField(setMedium, medium, "")}
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
              <Form.Group as={Col} controlId="formSubsidiary">
                <Form.Label>Subsidiary Titles</Form.Label>
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={serialContributionCitation.subsidiaryTitles}
                  name="subsidiaryTitles"
                  type="text"
                  placeholder="Enter Title "
                />
              </Form.Group>
            </Row>
          )}

          {false && (
            <Row className="mb-3">
              <Form.Label>Edition</Form.Label>
              {edition.map((item, index) => {
                return (
                  <Row key={index} className="mt-2">
                    <Form.Group as={Col} controlId="formEdition">
                      <Form.Select>
                        <option value>Choose...</option>
                        <option>Edition</option>
                        <option>Version</option>
                        <option>Revised edition</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPlace">
                      <Form.Control
                        onChange={(event) =>
                          handleInputChange(event, setEdition, edition, index)
                        }
                        value={item}
                        name="edition"
                        type="text"
                        placeholder="Enter Edition "
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
              <Form.Group as={Col} controlId="formPlace">
                <Form.Label>Place</Form.Label>
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={serialContributionCitation.place}
                  name="place"
                  type="text"
                  placeholder="Enter Place"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPublication">
                <Form.Label>Date of Publication</Form.Label>
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={serialContributionCitation.dateOfPublication}
                  name="dateOfPublication"
                  type="text"
                  placeholder="Enter Date"
                />
              </Form.Group>
            </Row>
          )}
          {false && (
            <Row className="mb-3">
              <Form.Label>Publisher</Form.Label>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Select>
                  <option>Choose...</option>
                  <option>Publisher</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formRange">
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={serialContributionCitation.publisher}
                  name="publisher"
                  type="text"
                  placeholder="Enter Publisher "
                />
              </Form.Group>
            </Row>
          )}
          <Form.Group as={Row} className="mb-3 align-items-start">
            <Form.Label column sm={3} className="fw-bold text-start"><b>Volume/Number/Issue</b></Form.Label>
            <Col sm={9}>
              {numeration.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Select
                      value={item.type}
                      onChange={(event) => handleTypeChange(event, index)}
                    >
                      <option value="">Choose...</option>
                      <option>Volume</option>
                      <option>Number</option>
                      <option>Issue</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formRange">
                    <Form.Control
                      value={item.value}
                      onChange={(event) => handleValueChange(event, index)}
                      type="text"
                      placeholder="Enter Numeration"
                    />
                  </Form.Group>
                  {numeration.length !== 1 ? (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="removebutton md:!mt-0 !mt-2"
                        onClick={() =>
                          removeField(setNumeration, numeration, index)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}

                  {numeration.length - 1 === index && (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="addbutton md:!mt-0 !mt-2"
                        onClick={() =>
                          addField(setNumeration, numeration, {
                            type: "",
                            value: "",
                          })
                        }
                      >
                        ADD
                      </Button>
                    </div>
                  )}
                </Row>
              );
            })}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="text-start"><b>Page Start</b></Form.Label>
            <Col sm={4}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.pageStart}
                name="pageStart"
                type="text"
                placeholder="Enter Page Start"
              />
            </Col>
            <Form.Label column sm={1} className="text-start"><b>Page End</b></Form.Label>
            <Col sm={4}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.pageEnd}
                name="pageEnd"
                type="text"
                placeholder="Enter Page End"
              />
            </Col>
          </Form.Group>

          {isOnline && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3} className="text-start"><b>DOI</b></Form.Label>
              <Col sm={9}>
                <Form.Control
                  onChange={(event) =>
                    handleInputChange(event, setStandarIdentifier, standardIdentifier, 0)
                  }
                  value={standardIdentifier[0] || ""}
                  name="standardIdentifier"
                  type="text"
                  placeholder="Enter DOI"
                />
              </Col>
            </Form.Group>
          )}
          {isOnline && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3} className="text-start"><b>URL</b></Form.Label>
              <Col sm={9}>
                <Form.Control
                  onChange={(event) =>
                    handleInputChange(event, setAvailability, availability, 0)
                  }
                  value={availability[0] || ""}
                  name="availabilityAndAccess"
                  type="text"
                  placeholder="Enter URL"
                />
              </Col>
            </Form.Group>
          )}
          {false && (
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={serialContributionCitation.location}
                  name="location"
                  type="text"
                  placeholder="Enter Location"
                />
              </Form.Group>
            </Row>
          )}

          <div>
            <center>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
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
                {formatAuthors(formFields, "reference")}
                {serialContributionCitation.year === "" ? (
                  ""
                ) : (
                  <>
                    [{serialContributionCitation.year}]{". "}
                  </>
                )}
                {serialContributionCitation.titleOfTheContribution === "" ? (
                  ""
                ) : (
                  <>
                    {serialContributionCitation.titleOfTheContribution}
                    {". "}
                  </>
                )}
                {serialContributionCitation.additionalGeneralInformation ===
                "" ? (
                  ""
                ) : (
                  <>
                    {serialContributionCitation.additionalGeneralInformation}
                    {". "}
                  </>
                )}
                {serialContributionCitation.titleOfTheHostSerial === "" ? (
                  ""
                ) : (
                  <>
                    In:{" "}
                    <span className="title">
                      {serialContributionCitation.titleOfTheHostSerial}
                    </span>
                    {". "}
                  </>
                )}
                {medium.length <= 1 &&
                (medium[0] === "" || medium[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    [
                    {medium.map((item, key) => {
                      return (
                        <span key={key}>
                          {item}
                          {key < medium.length - 1 && ", "}
                        </span>
                      );
                    })}
                    ]{". "}
                  </>
                )}
                {serialContributionCitation.subsidiaryTitles === "" ? (
                  ""
                ) : (
                  <>
                    <span className="title">
                      {serialContributionCitation.subsidiaryTitles}
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
                {serialContributionCitation.place === "" ? (
                  ""
                ) : (
                  <>
                    {serialContributionCitation.place}
                    {": "}
                  </>
                )}
                {serialContributionCitation.publisher === "" ? (
                  ""
                ) : (
                  <>
                    {serialContributionCitation.publisher}
                    {", "}
                  </>
                )}
                {serialContributionCitation.year === "" &&
                serialContributionCitation.dateOfPublication !== "" ? (
                  <>
                    {serialContributionCitation.dateOfPublication}
                    {". "}
                  </>
                ) : (
                  ""
                )}
                {(() => {
                  let volume = "";
                  let number = "";
                  let issue = "";
                  numeration.forEach((item) => {
                    if (item.type === "Volume" && item.value.trim())
                      volume = item.value.trim();
                    if (item.type === "Number" && item.value.trim())
                      number = item.value.trim();
                    if (item.type === "Issue" && item.value.trim())
                      issue = item.value.trim();
                  });
                  let numStr = "";
                  if (volume) {
                    numStr += volume;
                    if (number) numStr += `(${number})`;
                    else if (issue) numStr += `(${issue})`;
                  } else if (number) {
                    numStr += number;
                  } else if (issue) {
                    numStr += issue;
                  }
                  return numStr ? `${numStr}. ` : "";
                })()}
                {(serialContributionCitation.pageStart === "" &&
                  serialContributionCitation.pageEnd === "") ? (
                  ""
                ) : (
                  <>
                    {"pp. "}
                    {serialContributionCitation.pageStart}
                    {serialContributionCitation.pageEnd
                      ? `–${serialContributionCitation.pageEnd}`
                      : ""}
                    {". "}
                  </>
                )}
                {serialContributionCitation.dateOfCitation === "" ? (
                  ""
                ) : (
                  <>
                    [viewed {serialContributionCitation.dateOfCitation}]{". "}
                  </>
                )}
                {isOnline ? (
                  standardIdentifier[0] && standardIdentifier[0] !== "" ? (
                    <>
                      DOI {standardIdentifier[0]}
                      {". "}
                    </>
                  ) : (
                    ""
                  )
                ) : standardIdentifier.length <= 1 &&
                  (standardIdentifier[0] === "" ||
                    standardIdentifier[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    {standardIdentifier.map((item, index) => {
                      return (
                        <span key={index}>
                          ISSN {standardIdentifier[index]}
                          {index < standardIdentifier.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {". "}
                  </>
                )}{" "}
                {availability.length <= 1 &&
                (availability[0] === "" || availability[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    Available from:{" "}
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
                )}
                {serialContributionCitation.location === "" ? (
                  ""
                ) : (
                  <>
                    At: [{serialContributionCitation.location}]{". "}
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
                  {formatAuthors(formFields, "inText")}
                  {(serialContributionCitation.year === "" &&
                  serialContributionCitation.pageStart === "" &&
                  serialContributionCitation.pageEnd === "") ? (
                    ""
                  ) : (
                    <>
                      {" ("}
                      {serialContributionCitation.year}
                      {(serialContributionCitation.pageStart !== "" ||
                        serialContributionCitation.pageEnd !== "") ? (
                        <>
                          {serialContributionCitation.year !== "" && ", "}
                          p. {serialContributionCitation.pageStart}
                          {serialContributionCitation.pageEnd
                            ? `–${serialContributionCitation.pageEnd}`
                            : ""}
                        </>
                      ) : (
                        ""
                      )}
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
                  {serialContributionCitation.year === "" ? (
                    ""
                  ) : (
                    <>
                      {" "}
                      {serialContributionCitation.year}
                    </>
                  )}
                  {(serialContributionCitation.pageStart !== "" ||
                    serialContributionCitation.pageEnd !== "") ? (
                    <>
                      {", "}
                      p. {serialContributionCitation.pageStart}
                      {serialContributionCitation.pageEnd
                        ? `–${serialContributionCitation.pageEnd}`
                        : ""}
                    </>
                  ) : (
                    ""
                  )}
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

export default SerialContributionForm;
