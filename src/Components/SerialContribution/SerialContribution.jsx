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

const SerialContributionForm = () => {
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
    rangeOfPageNumbers: "",
    dateOfCitation: "",
    standardIdentifier: "",
    availabilityAndAccess: "",
    location: "",
  });
    const copytext = (e) => {
      navigator.clipboard.writeText(e.target.innerText);
      toast.success("Copied to Clipboard");
    }
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

  const handleInputChange = (event, UseStateName, stateName, index) => {
    let data = [...stateName];
    data[index] = event.target.value;
    UseStateName(data);
  };

  // multi field inputs (first name ,last name, type, medium designation, edition, publisher, standard identifier, availability and access)

  const [formFields, setFormFields] = useState([["", ""]]);
  const [medium, setMedium] = useState([""]);
  const [edition, setEdition] = useState([""]);
  const [numeration, setNumeration] = useState([""]);
  const [publisher, setPublisher] = useState([""]);
  const [standardIdentifier, setStandarIdentifier] = useState([""]);
  const [availability, setAvailability] = useState([""]);
  const { metadata, chosenForm } = useContext(MetadataContext);
  useEffect(() => {
    if (!metadata) return;
    if (chosenForm && chosenForm !== "serial-contribution" && chosenForm !== "") return;
    setSerialContributionCitation((prev) => ({
      ...prev,
      titleOfTheContribution: metadata.title || prev.titleOfTheContribution,
      year: metadata.year || prev.year,
      titleOfTheHostSerial: metadata.websiteTitle || metadata.title || prev.titleOfTheHostSerial,
      publisher: metadata.publisher || prev.publisher,
      place: metadata.place || prev.place,
      dateOfPublication: metadata.dateOfPublication || prev.dateOfPublication,
      numeration: metadata.volume || prev.numeration,
      rangeOfPageNumbers: metadata.pages || prev.rangeOfPageNumbers,
      availabilityAndAccess: metadata.url || metadata.doi || prev.availabilityAndAccess,
    }));
    if (metadata.authors && metadata.authors.length > 0) {
      const newFields = metadata.authors.map((a) => [a.firstName || "", a.lastName || ""]);
      setFormFields(newFields.length ? newFields : [["", ""]]);
    }
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
      <ToastContainer />
      <div className="serial">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Label>
              <b>Name of Creator(s)</b>
            </Form.Label>
            {formFields.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formLname">
                    {/* <Form.Label>Last Name</Form.Label> */}
                    <Form.Select>
                      <option value>Choose...</option>
                      <option>Author</option>
                                                                               
                      <option>Editor</option>
                                                                                                                                    
                      <option>Reviewer</option>
                                                                                
                      <option>Translator</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formFname">
                    {/* <Form.Label>Last Name</Form.Label> */}
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
                value={serialContributionCitation.year}
                name="year"
                type="text"
                placeholder="Enter Year"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formContribution">
              <Form.Label>Title of the contribution</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.titleOfTheContribution}
                name="titleOfTheContribution"
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formAdditional">
              <Form.Label>Additional General Information</Form.Label>
              <Form.Select
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.additionalGeneralInformation}
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
              <Form.Label>Title of the host Journal</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.titleOfTheHostSerial}
                name="titleOfTheHostSerial"
                type="text"
                placeholder="Enter Title "
              />
            </Form.Group>
          </Row>

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
          <Row className="mb-3">
            <Form.Label>Publisher</Form.Label>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Select
              
              >
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
          <Row className="mb-3">
            <Form.Label>Numeration (of volume)</Form.Label>
            {numeration.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Select>
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
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formRange">
              <Form.Label>Range of page number(s) </Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.rangeOfPageNumbers}
                name="rangeOfPageNumbers"
                type="text"
                placeholder="Enter Range "
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formCitation">
              <Form.Label>Date of citation</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialContributionCitation.dateOfCitation}
                name="dateOfCitation"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Label>Standard Identifier</Form.Label>
            {standardIdentifier.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formIdentifier">
                    <Form.Select>
                      <option value>Choose...</option>
                      <option>ISSN</option>
                      <option>eISSN</option>
                                                            
                      <option>DOI</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formRange">
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
                      name="standardIdentifier"
                      type="text"
                      placeholder="Enter Standard Identifier "
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
                    <Form.Select
                      onChange={(e) => onChanging(e)}
                      value={serialContributionCitation.availabilityAndAccess}
                      name="availabilityAndAccess"
                    
                    >
                      <option value>Choose...</option>
                      <option>DOI</option>
                      <option>URI</option>
                      <option>URL</option>
                                          
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formRange">
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
                      name="availabilityAndAccess"
                      type="text"
                      placeholder="Enter Availability And Access "
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
                value={serialContributionCitation.location}
                name="location"
                type="text"
                placeholder="Enter Location"
              />
            </Form.Group>
          </Row>

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
                {
                  serialContributionCitation.year === "" ? "": (<>
                [{serialContributionCitation.year}]{". "}
                  </>)
                }
                {
                serialContributionCitation.titleOfTheContribution === "" ? "" : (<>
                {serialContributionCitation.titleOfTheContribution}{". "}
                </>)
                }
                {
                  serialContributionCitation.additionalGeneralInformation === "" ? "" : (<>
                    {serialContributionCitation.additionalGeneralInformation}{". "}
                  </>)
                }
                {
                  serialContributionCitation.titleOfTheHostSerial === "" ? "" : (<>
                    In:{" "}
                    <span className="title">{serialContributionCitation.titleOfTheHostSerial}</span>{". "}
                  </>)
                }
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
                {
                serialContributionCitation.subsidiaryTitles === "" ? "" : (<>
                <span className="title">{serialContributionCitation.subsidiaryTitles}</span>{". "}
                </>)
                }
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
                {
                  serialContributionCitation.place === "" ? "" : (<>
                    {serialContributionCitation.place}{": "}
                  </>)
                }
                {
                  serialContributionCitation.publisher === "" ? "" : (<>
                    {serialContributionCitation.publisher}{", "}
                  </>)
                }
                {
                  serialContributionCitation.dateOfPublication === "" ? "" : (<>
                    {serialContributionCitation.dateOfPublication}{". "}
                  </>)
                }
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
                {
                  serialContributionCitation.rangeOfPageNumbers === "" ? "" : (<>
                    {"pp. "}{serialContributionCitation.rangeOfPageNumbers}{", "}
                  </>)
                }
                {
                  serialContributionCitation.dateOfCitation === "" ? "" : (<>
                  [viewed {serialContributionCitation.dateOfCitation}]{". "}
                  </>)
                 }
                 {standardIdentifier.length <= 1 &&
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
                )} {availability.length <= 1 &&
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
                {
                  serialContributionCitation.location === "" ? "" : (<>
                 At: [
          {serialContributionCitation.location}]{". "}
                  </>)
                }
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
                {serialContributionCitation.year === "" ? (
                  ""
                ) : (
                  <>
                  {" "}
                    {"("}
                    {serialContributionCitation.year}

                  </>
                )}
                {serialContributionCitation.rangeOfPageNumbers === "" ? "" : ", "}
                {serialContributionCitation.rangeOfPageNumbers}
                {serialContributionCitation.rangeOfPageNumbers!= ""|| serialContributionCitation.year != ""? ")":""}
                {")"}
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
                {serialContributionCitation.year === "" ? (
                  ""
                ) : (
                  <>
                    {serialContributionCitation.year}
                  </>
                )}
                {serialContributionCitation.rangeOfPageNumbers === "" ? "" : ", "}
                {serialContributionCitation.rangeOfPageNumbers}
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
