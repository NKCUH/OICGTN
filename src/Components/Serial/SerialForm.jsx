import React, { useRef, useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Copy from "../Copy/Copy";
import "./SerialForm.css";
import { toast } from "react-toastify";
import { MetadataContext } from "../../context/MetadataContext";

const SerialForm = ({type}) => {
  const [serialCitation, setSerialCitation] = useState({
    titleOfTheSerial: "",
    mediumDesignation: "",
    year: "",
    subsidiaryTitles: "",
    edition: "",
    place: "",
    publisher: "",
    dateOfPublication: "",
    // numeration: "",
    dateOfCitation: "",
    standardIdentifier: "",
    availabilityAndAccess: "",
    location: "",
    // eLink: ""
  });
    const copytext = (e) => {
      navigator.clipboard.writeText(e.target.innerText);
      toast.success("Copied to Clipboard");
    }
  const ref = useRef()
  const [result, setResult] = useState(false);
  const [medium, setMedium] = useState([""]);
  const [numeration, setNumeration] = useState([""]);

  const { metadata } = useContext(MetadataContext);
  useEffect(() => {
    if (!metadata) return;
    setSerialCitation((prev) => ({
      ...prev,
      titleOfTheSerial: metadata.title || prev.titleOfTheSerial,
      year: metadata.year || prev.year,
      publisher: metadata.publisher || prev.publisher,
      dateOfPublication: prev.dateOfPublication,
      availabilityAndAccess: metadata.url || metadata.doi || prev.availabilityAndAccess,
    }));

    if (metadata.authors && metadata.authors.length > 0) {
      // for serials we won't map authors to separate fields, but could later
    }

    if (metadata.isbn || metadata.doi) {
      setSerialCitation((prev) => ({ ...prev, standardIdentifier: metadata.isbn || metadata.doi }));
    }
  }, [metadata]);

  const onChanging = (e) => {
    const name = e.target.name;
    setSerialCitation({ ...serialCitation, [name]: e.target.value });
  };

  const handleInputChange = (event, UseStateName, stateName, index) => {
    let data = [...stateName];
    data[index] = event.target.value;
    UseStateName(data);
  };

  const addField = (UseStateName, stateName, obj)=>{
    UseStateName([...stateName, obj])
  };
  const removeField = (UseStateName, stateName, index)=>{
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
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Title of the Journal</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialCitation.titleOfTheSerial}
                name="titleOfTheSerial"
                type="text"
                placeholder="Enter title of the Journal"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Subsidiary Title</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialCitation.subsidiaryTitles}
                name="subsidiaryTitles"
                type="text"
                placeholder="Enter title of the subsidiary"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label>Medium Designation</Form.Label>
            {medium.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Select defaultValue="Choose...">
                      <option>Choose...</option>
                      <option>Online</option>
                      <option>Database Online</option>
                      
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control
                      onChange={(event) => handleInputChange(event, setMedium, medium, index)}
                      value={item}
                      name="mediumD"
                      type="text"
                      placeholder="Enter Medium Designation"
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
                      <Button className="addbutton md:!mt-0 !mt-2 " onClick={()=>addField(setMedium, medium, "")}>
                        ADD
                      </Button>
                    </div>
                  )}
                </Row>
              );
            })}
          </Row>

          <Row className="mb-3">
            <Form.Label>Edition</Form.Label>
            <Form.Group as={Col} controlId="formGridState">
              {/* <Form.Label>Edition</Form.Label> */}
              <Form.Select
                // onChange={(e) => onChanging(e)}
                // value={serialCitation.edition}
                // name="edition"
                defaultValue="Choose..."
              >
                <option>Choose...</option>
                <option>Edition</option>
                <option>Version</option>
                <option>Revised Edition</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              {/* <Form.Label>Medium</Form.Label> */}
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialCitation.edition}
                name="edition"
                type="text"
                placeholder="Enter Edition"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Year</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialCitation.year}
                name="year"
                type="text"
                placeholder="Enter Year"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Place</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialCitation.place}
                name="place"
                type="text"
                placeholder="Enter Place"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date of Publication</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialCitation.dateOfPublication}
                name="dateOfPublication"
                type="text"
                placeholder="Enter Place"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label>Publisher</Form.Label>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Select
                defaultValue="Choose..."
              >
                <option>Choose...</option>
                <option>Publisher</option>
                            
                                             
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                onChange={(e) => onChanging(e)}
                name="publisher"
                value={serialCitation.publisher}
                type="text"
                placeholder="Enter Publisher"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label>Numeration</Form.Label>
            {numeration.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Select
                      name="numeration"
                      defaultValue="Choose..."
                    >
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
                        className="addbutton md:!mt-0 !mt-2 "
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
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date of Citation</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                name="dateOfCitation"
                value={serialCitation.dateOfCitation}
                type="text"
                placeholder="Enter Place"
              />
            </Form.Group>
            {/* {type?<Form.Group as={Col} controlId="formLink">
              <Form.Label>Link</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={serialCitation.eLink}
                name="eLink"
                type="text"
                placeholder="Enter Link of the E-Journal"
              />
            </Form.Group>: null} */}
          </Row>

          <Row className="mb-3">
          <Form.Label>Standard Identifier</Form.Label>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Select
                // onChange={(e) => onChanging(e)}
                // name="standardIdentifier"
                // value={serialCitation.standardIdentifier}
                defaultValue="Choose..."
              >
                <option>Choose...</option>
                <option>ISSN</option>
                <option>eISSN</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Control
              onChange={(e) => onChanging(e)}
              name="standardIdentifier"
              value={serialCitation.standardIdentifier}
              type="text"
              placeholder="Enter the Standard Identifier"
            />
          </Form.Group>
        </Row>
        <Row>
            <Form.Label>Availibility and Access</Form.Label>
            <Form.Group as={Col} controlId="formGridState">              
              <Form.Select
                // onChange={(e) => onChanging(e)}
                // value={serialCitation.availabilityAndAccess}
                // name="availabilityAndAccess"
                defaultValue="Choose..."
              >
                <option>Choose...</option>
                <option>DOI</option>
                <option>URI</option>
                <option>URL</option>
                                                
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Control
              onChange={(e) => onChanging(e)}
              value={serialCitation.availabilityAndAccess}
              name="availabilityAndAccess"
              type="text"
              placeholder="Enter the Availability And Access"
            />
          </Form.Group>
          </Row>
          {type ? null:<Row className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Control
              onChange={(e) => onChanging(e)}
              name="location"
              value={serialCitation.location}
              type="text"
              placeholder="Enter the availability location"
            />
          </Form.Group>
          </Row>}

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
          <center>

          <div id="output">
              <div ref={ref} id="outputResult">
              {
                serialCitation.titleOfTheSerial === "" ? "" : (<>
                <span className="title">{serialCitation.titleOfTheSerial}</span>{". "}
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
                  serialCitation.year === "" ? "" : (<>
                    [{serialCitation.year}]{". "}
                  </>)
                }
                {
                  serialCitation.subsidiaryTitles === "" ? "" : (<>
                    <span className="title"> {serialCitation.subsidiaryTitles}</span>{". "}
                  </>)
                }
                {
                  serialCitation.edition === "" ? "":(<>
                 {serialCitation.edition}{". "}
                  </>)
                }
                {serialCitation.place === "" ? "": (<>
                  {serialCitation.place}{": "}
                </>)}
                {serialCitation.publisher === "" ? "" : (<>
                 {serialCitation.publisher}{", "}
                </>)}
                
                {
                  serialCitation.dateOfPublication === "" ? "" :(<>
                    {serialCitation.dateOfPublication}{". "}
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
                { serialCitation.dateOfCitation === "" ? "" : (<>
                  [viewed {serialCitation.dateOfCitation}]{". "}  
                </>)}
                {serialCitation.standardIdentifier === "" ? "" : (<>
                  ISSN {serialCitation.standardIdentifier}{". "}
                </>)}
                {
                  serialCitation.availabilityAndAccess === "" ? "" : (<>
                    Available from:{" "}
                {serialCitation.availabilityAndAccess}{". "}
                  </>)
                }
                {
                  serialCitation.location === "" ? "" : (<>
                   At: [{serialCitation.location}]{"."}
                  </>)
                }
                {/* {serialCitation.eLink === ""? "": `[${serialCitation.eLink}]`} */}
              </div>
              <Copy refs={ref} />
              <div className="md:flex  gap-10 mx-10">

              <span className="text-gray-400 w-24">Narrative</span>
              <p onClick={(e) =>{copytext(e)}} className="text-blue-500 cursor-pointer">
                {serialCitation.titleOfTheSerial === "" ? "" : serialCitation.titleOfTheSerial}
                {serialCitation.year === "" ? (
                  ""
                ) : (
                  <>
                  {" "}
                  {"("}
                    {serialCitation.year}
                    {")"}
                  </>
                )}
              </p>
            </div>
              <div className="md:flex  gap-10 mx-10">

              <span className="text-gray-400 w-24">Parenthetical</span>
              <p onClick={(e) =>{copytext(e)}} className="text-blue-500 cursor-pointer">
                {"("}
                {serialCitation.titleOfTheSerial === "" ? "" : serialCitation.titleOfTheSerial}
                {" "}
                {serialCitation.year === "" ? (
                  ""
                ) : (
                  <>
                    {serialCitation.year}
                  </>
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

export default SerialForm;
