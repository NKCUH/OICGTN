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
  const [standardIdentifiersOfCreator, setStandardIdentifiersOfCreator] =
    useState([""]);
  const [edition, setEdition] = useState([""]);
  const [publisher, setPublisher] = useState([""]);
  const [numeration, setNumeration] = useState([""]);
  const [standardIdentifier, setStandarIdentifier] = useState([""]);
  const [availability, setAvailability] = useState([""]);

  const { metadata, chosenForm } = useContext(MetadataContext);
  useEffect(() => {
    if (!metadata) return;
    if (chosenForm && chosenForm !== "website" && chosenForm !== "") return;
    setWebsitesCitation((prev) => ({
      ...prev,
      pageTitle: metadata.webpageTitle || metadata.title || prev.pageTitle,
      websiteTitle: metadata.websiteTitle || metadata.publisher || prev.websiteTitle,
      dateOfPublication: metadata.dateOfPublication || prev.dateOfPublication,
      place: metadata.place || prev.place,
      publisher: metadata.publisher || prev.publisher,
      availabilityAndAccess: metadata.url || metadata.doi || prev.availabilityAndAccess,
      dateOfCitation: metadata.dateOfCitation || prev.dateOfCitation,
    }));

    if (metadata.authors && metadata.authors.length > 0) {
      const newFields = metadata.authors.map((a) => [a.firstName || "", a.lastName || ""]);
      setFormFields(newFields.length ? newFields : [["", ""]]);
    }
    if (metadata.isbn || metadata.doi) setStandarIdentifier([metadata.isbn || metadata.doi]);
  }, [metadata, chosenForm]);

  const addField = (UseStateName, stateName, obj) => {
    UseStateName([...stateName, obj]);
  };
  const removeField = (UseStateName, stateName, index) => {
    stateName.splice(index, 1);
    UseStateName([...stateName]);
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
          <Row className="mb-3">
            <Form.Label>
              <p>Name of Creator(s)</p>
            </Form.Label>
            {formFields.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formLname">
                    <Form.Select name="lastName" defaultValue="Choose...">
                      <option>---Select Type ---</option>
                      <option>Author</option>
                      <option>Editor</option>
                      <option>Designer</option>
                      <option>Reviewer</option>
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
                        onClick={() =>
                          removeField(setFormFields, formFields, index)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {formFields.length - 1 === index && (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="addbutton md:!mt-0 !mt-2"
                        onClick={() =>
                          addField(setFormFields, formFields, ["", ""])
                        }
                      >
                        ADD
                      </Button>
                      {/* <Button className="addbutton md:!mt-0 !mt-2" onClick={addFields}>
                        ADD
                      </Button> */}
                    </div>
                  )}
                </Row>
              );
            })}
          </Row>

          <Row className="mb-3">
            <Form.Label>
              Standard Identifiers of creaters' public identities
            </Form.Label>
            {standardIdentifiersOfCreator.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formIdentifier">
                    <Form.Select defaultValue="Choose...">
                      <option>---Select Standar Identifier---</option>
                      <option>eISSN</option>
                      <option>eISBN</option>
                      <option>DOI</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formPlace">
                    <Form.Control
                      onChange={(event) =>
                        handleInputChange(
                          event,
                          setStandardIdentifiersOfCreator,
                          standardIdentifiersOfCreator,
                          index
                        )
                      }
                      value={item}
                      name="standardIdentifierR"
                      type="text"
                      placeholder="Enter Standard Identifier"
                    />
                  </Form.Group>
                  {standardIdentifier.length !== 1 ? (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="removebutton md:!mt-0 !mt-2"
                        onClick={() =>
                          removeField(
                            setStandarIdentifier,
                            standardIdentifier,
                            index
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {standardIdentifier.length - 1 === index && (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="addbutton md:!mt-0 !mt-2"
                        onClick={() =>
                          addField(setStandarIdentifier, standardIdentifier, "")
                        }
                      >
                        ADD
                      </Button>
                    </div>
                  )}
                </Row>
              );
            })}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Page Title</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={websitesCitation.pageTitle}
                name="pageTitle"
                type="text"
                placeholder="Enter Page Title"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Website Title</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={websitesCitation.websiteTitle}
                name="websiteTitle"
                type="text"
                placeholder="Enter Website Title"
              />
            </Form.Group>
          </Row>

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
                        onClick={() => removeField(setEdition, edition, index)}
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

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Subsidiary Creator</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={websitesCitation.subsidiaryCreator}
                name="subsidiaryCreator"
                type="text"
                placeholder="Enter Subsidiary Creator"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Place</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={websitesCitation.place}
                name="place"
                type="text"
                placeholder="Enter Place"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label>Publisher</Form.Label>
            {publisher.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formPlace">
                    <Form.Select defaultValue="Choose...">
                      <option>---Select Publisher---</option>
                      <option>Publisher</option>
                      <option>Designer</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formPublisher">
                    <Form.Control
                      onChange={(event) =>
                        handleInputChange(event, setPublisher, publisher, index)
                      }
                      value={item}
                      name="publisher"
                      type="text"
                      placeholder="Enter Publisher    "
                    />
                  </Form.Group>

                  {publisher.length !== 1 ? (
                    <div as={Col} className="col-sm-1">
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
                  {publisher.length - 1 === index && (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="addbutton md:!mt-0 !mt-2"
                        onClick={() => addField(setPublisher, publisher, "")}
                      >
                        ADD
                      </Button>
                    </div>
                  )}
                </Row>
              );
            })}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date of Publication</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={websitesCitation.dateOfPublication}
                name="dateOfPublication"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Label>Numeration</Form.Label>
            {numeration.map((item, index) => {
              return (
                <Row key={index} className="mt-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Select defaultValue="Choose...">
                      <option>Choose...</option>
                      <option>Volume</option>
                      <option>Number</option>
                      <option>Issue</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control
                      onChange={(event) =>
                        handleInputChange(
                          event,
                          setNumeration,
                          numeration,
                          index
                        )
                      }
                      value={item}
                      name="numeration"
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
                        onClick={() => addField(setNumeration, numeration, "")}
                      >
                        ADD
                      </Button>
                    </div>
                  )}
                </Row>
              );
            })}
            {/* <Form.Group as={Col} controlId="formGridState">
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>Volume</option>
                <option>Number</option>
                <option>Issue</option>
                
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                onChange={(event) =>
                  handleInputChange(
                    event,
                    setNumeration,
                    numeration,
                    index
                  )
                }
                value={websitesCitation.numeration}
                name="numeration"
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
                        onClick={() => addField(setNumeration, numeration, "")}
                      >
                        ADD
                      </Button>
                    </div>
                  )} */}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Numeration Date</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                name="numerationDate"
                value={websitesCitation.numerationDate}
                type="text"
                placeholder="Enter Numeration Date"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Label>Standard Identifier</Form.Label>
            {standardIdentifier.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formIdentifier">
                    <Form.Select defaultValue="Choose...">
                      <option>---Select Standar Identifier---</option>
                      <option>eISSN</option>
                      <option>eISBN</option>
                      <option>DOI</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formPlace">
                    <Form.Control
                      onChange={(event) =>
                        handleInputChange(
                          event,
                          setStandarIdentifier,
                          standardIdentifier,
                          index
                        )
                      }
                      value={item}
                      name="standardIdentifierR"
                      type="text"
                      placeholder="Enter Standard Identifier"
                    />
                  </Form.Group>
                  {standardIdentifier.length !== 1 ? (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="removebutton md:!mt-0 !mt-2"
                        onClick={() =>
                          removeField(
                            setStandarIdentifier,
                            standardIdentifier,
                            index
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {standardIdentifier.length - 1 === index && (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="addbutton md:!mt-0 !mt-2"
                        onClick={() =>
                          addField(setStandarIdentifier, standardIdentifier, "")
                        }
                      >
                        ADD
                      </Button>
                    </div>
                  )}
                </Row>
              );
            })}
          </Row>

          <Row className="mb-3">
            <Form.Label>Availibility and Access</Form.Label>
            {availability.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formAvailability">
                    <Form.Select defaultValue="Choose...">
                      <option>---Select Availability and Access---</option>
                      <option>DOI</option>
                      <option>URI</option>
                      <option>URL</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formAvailability">
                    {/* <Form.Label>Location</Form.Label> */}
                    <Form.Control
                      onChange={(event) =>
                        handleInputChange(
                          event,
                          setAvailability,
                          availability,
                          index
                        )
                      }
                      value={item}
                      name="availabilityY"
                      type="text"
                      placeholder={"Enter availability"}
                    />
                  </Form.Group>
                  {availability.length !== 1 ? (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="removebutton md:!mt-0 !mt-2"
                        onClick={() =>
                          removeField(setAvailability, availability, index)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {availability.length - 1 === index && (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="addbutton md:!mt-0 !mt-2"
                        onClick={() =>
                          addField(setAvailability, availability, "")
                        }
                      >
                        ADD
                      </Button>
                    </div>
                  )}
                </Row>
              );
            })}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Relationships</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                name="relationships"
                value={websitesCitation.relationships}
                type="text"
                placeholder="Enter Relationships"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date of Citation</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                name="dateOfCitation"
                value={websitesCitation.dateOfCitation}
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
          </Row>

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
            <h2>Your Resulted Citation :- </h2>
          </center>
          <br />
          {/* SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]
          . Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume)
          , Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location]. */}

          <center>
            <div id="output">
              <p ref={ref} id="outputResult">
                {formFields.map((item, index) => {
                  return (
                    <span key={index}>
                      <span className="text-uppercase">
                        {item[1]}
                        {item[1] === "" || item[1] === undefined ? "" : ", "}
                      </span>
                      {item[0]}
                      {item[0] === "" || item[0] === undefined ? "" : ", "}
                    </span>
                  );
                })}

                {standardIdentifiersOfCreator.length <= 1 &&
                (standardIdentifiersOfCreator[0] === "" ||
                  standardIdentifiersOfCreator[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    [
                    {standardIdentifiersOfCreator.map((item, key) => {
                      return (
                        <span key={key}>
                          {item}
                          {key < standardIdentifiersOfCreator.length - 1 &&
                            ", "}
                        </span>
                      );
                    })}
                    ]{". "}
                  </>
                )}

                {/* {standardIdentifiersOfCreator.map((item, index) => {
                  return (
                    <span key={index}>
                      {standardIdentifiersOfCreator[index]} {index < standardIdentifiersOfCreator.length - 1 && ', '}{" "}
                    </>
                  );
                })}
               .{" "} */}

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
                  {formFields.length > 0 && formFields[0][0] !== ""
                    ? formFields.map((item, index) => {
                        return (
                          <span key={index}>
                            {item[0].replace(/^./, (char) =>
                              char.toUpperCase()
                            )}
                            {item[0] === "" || item[0] === undefined ? "" : " "}
                            {item[1].replace(/^./, (char) =>
                              char.toUpperCase()
                            )}
                            {item[1] === "" || item[1] === undefined ? "" : " "}
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
                  {formFields.length > 0 && formFields[0][0] !== ""
                    ? formFields.map((item, index) => {
                        return (
                          <span key={index}>
                            {item[0].replace(/^./, (char) =>
                              char.toUpperCase()
                            )}
                            {item[0] === "" || item[0] === undefined ? "" : " "}
                            {item[1].replace(/^./, (char) =>
                              char.toUpperCase()
                            )}
                            {item[1] === "" || item[1] === undefined ? "" : ""}
                          </span>
                        );
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
