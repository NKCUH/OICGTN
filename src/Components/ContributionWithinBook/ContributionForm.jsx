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
  }
  const ref = useRef()
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

  const handleInputChange = (event, UseStateName, stateName, index) => {
    let data = [...stateName];
    data[index] = event.target.value;
    UseStateName(data);
  };

  // multi field inputs (first name ,last name, type, medium designation, edition, publisher, standard identifier, availability and access)

  const [formFields, setFormFields] = useState([["", ""]]);
  const [addGenInfo, setAddGenInfo] = useState([""]);
  const [creatorHost, setCreatorHost] = useState([""]);
  const [medium, setMedium] = useState([""]);
  const [edition, setEdition] = useState([""]);
  const [numeration, setNumeration] = useState([""]);
  const [publisher, setPublisher] = useState([""]);
  const [standardIdentifier, setStandarIdentifier] = useState([""]);
  const [availability, setAvailability] = useState([""]);

  const { metadata, chosenForm } = useContext(MetadataContext);
  useEffect(() => {
    if (!metadata) return;
    if (chosenForm && chosenForm !== "book-contribution" && chosenForm !== "") return;
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
      rangeOfPageNumbersOfTheContribution: metadata.pages || prev.rangeOfPageNumbersOfTheContribution,
      availiabilityAndAccess: metadata.url || metadata.doi || prev.availiabilityAndAccess,
      edition: metadata.edition || prev.edition,
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
            <Form.Label>Name of creator(s)</Form.Label>
            {formFields.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formLname">
                    <Form.Select
                      defaultValue="Choose..."
                    >
                      <option value>Choose...</option>
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
                      value={item[1]}
                      name="lastName"
                      type="text"
                      placeholder="Enter Last Name"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formFname">
                    {/* <Form.Label>First Name</Form.Label> */}
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
                    </div>
                  )}
                </Row>
              );
            })}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.year}
                name="year"
                type="text"
                placeholder="Enter Year"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formContribution">
              <Form.Label>Title of the contribution</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.titleOfTheContribution}
                name="titleOfTheContribution"
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label>Additional General Information</Form.Label>
            {addGenInfo.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formAdditional">
                    <Form.Select
                      //  onChange={(e) => onChanging(e)}
                      //  value={contributionCitation.additionalGeneralInformation}
                      //  name="additionalGeneralInformation"
                      defaultValue="Choose..."
                    >
                      <option value>Choose...</option>
                      <option>Classification</option>
                      <option>Price and availability</option>
                      <option>Languages</option>
                      <option>Other information</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formAdditional">
                    <Form.Control
                      onChange={(event) =>
                        handleInputChange(
                          event,
                          setAddGenInfo,
                          addGenInfo,
                          index
                        )
                      }
                      value={item}
                      name="additionalGeneralInformation"
                      type="text"
                      placeholder="Enter Additional General Information"
                    />
                  </Form.Group>
                  {addGenInfo.length !== 1 ? (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="removebutton md:!mt-0 !mt-2"
                        onClick={() =>
                          removeField(setAddGenInfo, addGenInfo, index)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}

                  {addGenInfo.length - 1 === index && (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="addbutton md:!mt-0 !mt-2"
                        onClick={() => addField(setAddGenInfo, addGenInfo, "")}
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
            <Form.Label>Name of creators of the host item</Form.Label>
            {creatorHost.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formName">
                    <Form.Select defaultValue="Choose...">
                      <option value>Choose...</option>
                      <option>Author</option>
                                           
                      <option>Editor</option>
                      <option>Reviewer</option>
                      <option>Reviser</option>
                      <option>Translator</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formHost">
                    <Form.Control
                      onChange={(event) =>
                        handleInputChange(
                          event,
                          setCreatorHost,
                          creatorHost,
                          index
                        )
                      }
                      value={item}
                      name="titleOfTheHostItem"
                      type="text"
                      placeholder="Enter Name of creators of the host item "
                    />
                  </Form.Group>

                  {creatorHost.length !== 1 ? (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="removebutton md:!mt-0 !mt-2"
                        onClick={() =>
                          removeField(setCreatorHost, creatorHost, index)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}

                  {creatorHost.length - 1 === index && (
                    <div as={Col} className="col-sm-1">
                      <Button
                        className="addbutton md:!mt-0 !mt-2"
                        onClick={() =>
                          addField(setCreatorHost, creatorHost, "")
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
            <Form.Group as={Col} controlId="formHost">
              <Form.Label>Title of the host Item</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.titleOfTheHostItem}
                name="titleOfTheHostItem"
                type="text"
                placeholder="Enter Title "
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label>Medium Designation</Form.Label>
            {medium.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formMedia">
                    <Form.Select defaultValue="Choose...">
                      <option value>Choose...</option>
                      <option>Online</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formMap">
                    {/* <Form.Label>Map series designation</Form.Label> */}
                    <Form.Control
                      onChange={(event) =>
                        handleInputChange(event, setMedium, medium, index)
                      }
                      value={item}
                      name="mapSeriesDesignation"
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
          <Row className="mb-3">
            {/* <Form.Group as={Col} controlId="formScale">
              <Form.Label>Scale</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.scale}
                name="scale"
                type="text"
                placeholder="Enter Scale"
              />
            </Form.Group> */}
            <Form.Group as={Col} controlId="formSubsidiary">
              <Form.Label>Subsidiary Titles</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.subsidiaryTitles}
                name="subsidiaryTitles"
                type="text"
                placeholder="Enter Title "
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
            <Form.Group as={Col} controlId="formCreator">
              <Form.Label>Subsidiary Creator of host item</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.subsidiaryCreatorOfTheHostItem}
                name="subsidiaryCreatorOfTheHostItem"
                type="text"
                placeholder="Enter Subsidiary Creator"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.place}
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
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Select
                      name="publisher"
                      defaultValue="Choose..."
                    >
                      <option value>Choose...</option>
                      <option>Publisher</option>
                                                                                                                                    
                    </Form.Select>
                  </Form.Group>
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
            <Form.Group as={Col} controlId="formPublication">
              <Form.Label>Date of Publication</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.dateOfPublication}
                name="dateOfPublication"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Label>Numeration (of volume)</Form.Label>
            {numeration.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Select name="numeration" defaultValue="Choose...">
                      <option value>Choose...</option>
                      <option>Volume</option>
                      <option>Number</option>
                      <option>Issue</option>
                                                                                                                                                          
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formRange">
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
                      name="rangeOfPageNumbersOfTheContribution"
                      type="text"
                      placeholder="Enter Numeration "
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
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formRange">
              <Form.Label>
                Range of page number(s) of the contribution
              </Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.rangeOfPageNumbersOfTheContribution}
                name="rangeOfPageNumbersOfTheContribution"
                type="text"
                placeholder="Enter Range "
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* <Form.Group as={Col} controlId="formUpdate">
              <Form.Label>Date of update/revision</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.dateOfUpdate}
                name="dateOfUpdate"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group> */}
            <Form.Group as={Col} controlId="formCitation">
              <Form.Label>Date of citation</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.dateOfCitation}
                name="dateOfCitation"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formTitle">
              <Form.Label>Series title and number</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.seriesTitleAndNumber}
                name="seriesTitleAndNumber"
                type="text"
                placeholder="Enter Title "
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
                      <option value>Choose...</option>
                      <option>ISBN</option>
                      <option>eISBN</option>
                                       
                      <option>DOI</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formTitle">
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
                      name="seriesTitleAndNumber"
                      type="text"
                      placeholder="Enter Title "
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
            <Form.Label>Availability and access</Form.Label>
            {availability.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formAccess">
                    <Form.Select defaultValue="Choose...">
                      <option value>Choose...</option>
                      <option>DOI</option>
                      <option>URI</option>
                      <option>URL</option>
                                                                  
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formLocation">
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
                      name="availiabilityAndAccess"
                      type="text"
                      placeholder="Enter Availability and access"
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
            <Form.Group as={Col} controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={contributionCitation.location}
                name="location"
                type="text"
                placeholder="Enter Location"
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
            <h2>Your Resulted Citation </h2>
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
                {contributionCitation.subsidiaryTitles === "" ? "" : (<>
                  <span className="title">{contributionCitation.subsidiaryTitles}</span>{". "}
                </>)}
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
                {contributionCitation.subsidiaryCreatorOfTheHostItem === "" ? "" : (<>
                  {contributionCitation.subsidiaryCreatorOfTheHostItem}{". "}
                </>)}
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
                    {"pp. "}{contributionCitation.rangeOfPageNumbersOfTheContribution}
                     {". "}
                  </>
                )}
                {contributionCitation.dateOfCitation === "" ? (
                  ""
                ) : (
                  <>viewed [{contributionCitation.dateOfCitation}]{". "} </>
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
                          ISBN {standardIdentifier[index]}
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
                    Available from: [
                    {availability.map((item, index) => {
                      return (
                        <span key={index}>
                          {availability[index]}
                          {index < availability.length - 1 && ", "}
                        </span>
                      );
                    })}
                    ]{". "}
                  </>
                )} {contributionCitation.location === "" ? (
                  ""
                ) : (
                  <>At: [{contributionCitation.location}].</>
                )}
              </p>
              <Copy refs={ref} />
            
            <div className="md:flex  gap-10 mx-10">

              <span className="text-gray-400 w-24">Narrative</span>
              <p onClick={(e) =>{copytext(e)}} className="text-blue-500 cursor-pointer">
                {formFields.map((item, index) => {
                  return (
                    <span key={index}>
                      {item[0].replace(/^./, char => char.toUpperCase())}
                      {item[0] === "" || item[0] === undefined ? "" : " "}
                      {item[1].replace(/^./, char => char.toUpperCase())}
                      {item[1] === "" || item[1] === undefined ? "" : ""}
                    </span>
                  );
                })}
                {" "}
                {contributionCitation.year === "" ? (
                  ""
                ) : (
                  <>
                    {"("}
                    {contributionCitation.year}

                  </>
                )}
                {contributionCitation.rangeOfPageNumbers === "" ? "" : ", "}
                {contributionCitation.rangeOfPageNumbersOfTheContribution}
                {contributionCitation.rangeOfPageNumbers !== "" || contributionCitation.year != "" ? ")" : ""}
                
              </p>
            </div>
              <div className="md:flex  gap-10 mx-10">

              <span className="text-gray-400 w-24">Parenthetical</span>
              <p onClick={(e) =>{copytext(e)}} className="text-blue-500 cursor-pointer">
                {formFields.map((item, index) => {
                  return (
                    <span key={index}>
                    {"("}
                      {item[0].replace(/^./, char => char.toUpperCase())}
                      {item[0] === "" || item[0] === undefined ? "" : " "}
                      {item[1].replace(/^./, char => char.toUpperCase())}
                      {item[1] === "" || item[1] === undefined ? "" : ""}
                    </span>
                  );
                })}
                {" "}
                {contributionCitation.year === "" ? (
                  ""
                ) : (
                  <>
                    {contributionCitation.year}
                  </>
                )}
                {contributionCitation.rangeOfPageNumbers === "" ? "" : ", "}
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
