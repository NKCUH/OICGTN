import React, { useState } from "react";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Copy from "../Copy/Copy";
import { toast } from "react-toastify";

const ElectronicMessage = () => {
  const [electronicCitation, setElectronicCitation] = useState({
    lastName: "",
    firstName: "",
    year: "",
    titleOfTheMessage: "",
    titleOfTheHostMessageSystem: "",
    mediumDesignation: "",
    dateMessageWasSent: "",
    timeMessageWasSent: "",
    dateOfCitation: "",
    availabilityAndAccess: "",
    otherInformation: "",
  });
  const ref = useRef();
  const copytext = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    toast.success("Copied to Clipboard");
  };

  const [result, setResult] = useState(false);
  const onChanging = (e) => {
    const name = e.target.name;
    setElectronicCitation({ ...electronicCitation, [name]: e.target.value });
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
  const [medium, setMedium] = useState([""]);
  const [availability, setAvailability] = useState([""]);

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
          <Form.Label>Name of Creator(s)</Form.Label>
          {formFields.map((item, index) => {
            return (
              <Row key={index} className="mb-3">
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
                      className="addbutton md:!mt-0 !mt-2 md:mx-5"
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
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Year</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.year}
                name="year"
                type="text"
                placeholder="Enter Year"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Title of The Message</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.titleOfTheMessage}
                name="titleOfTheMessage"
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Title of the host message system</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.titleOfTheHostMessageSystem}
                name="titleOfTheHostMessageSystem"
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Label>Medium Designation</Form.Label>
            {medium.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formDegination">
                    <Form.Select defaultValue="Choose...">
                      <option>---Select Medium Designation---</option>
                      <option>Online</option>
                      <option>Electronic mail</option>

                      <option>Message board</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formTitle">
                    <Form.Control
                      onChange={(event) =>
                        handleInputChange(event, setMedium, medium, index)
                      }
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
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date Message Was Sent</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.dateMessageWasSent}
                name="dateMessageWasSent"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Time Message Was Sent</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.timeMessageWasSent}
                name="timeMessageWasSent"
                type="text"
                placeholder="Enter Time"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date Of Citation</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.dateOfCitation}
                name="dateOfCitation"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label>Availability and access</Form.Label>
            <Form.Group as={Col} controlId="formAvailability">
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>DOI</option>
                <option>URI</option>
                <option>URL</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.availabilityAndAccess}
                name="availabilityAndAccess"
                type="text"
                placeholder="Enter Availability And Access"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Other Information</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.otherInformation}
                name="otherInformation"
                type="text"
                placeholder="Enter Other Information"
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
                {electronicCitation.year === "" ? (
                  ""
                ) : (
                  <>
                    [{electronicCitation.year}]{". "}
                  </>
                )}
                {electronicCitation.titleOfTheMessage === "" ? (
                  ""
                ) : (
                  <>
                    <span className="title">
                      {electronicCitation.titleOfTheMessage}
                      {". "}
                    </span>
                  </>
                )}
                {electronicCitation.titleOfTheHostMessageSystem === "" ? (
                  ""
                ) : (
                  <>
                    {/* <span className="title">{electronicCitation.titleOfTheMessage}{". "}</span> */}
                    {electronicCitation.titleOfTheHostMessageSystem}
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
                {electronicCitation.dateMessageWasSent === "" ? (
                  ""
                ) : (
                  <>
                    {electronicCitation.dateMessageWasSent}
                    {"; "}
                  </>
                )}
                {electronicCitation.timeMessageWasSent === "" ? (
                  ""
                ) : (
                  <>{electronicCitation.timeMessageWasSent} </>
                )}
                {electronicCitation.dateOfCitation === "" ? (
                  ""
                ) : (
                  <>
                    viewed [{electronicCitation.dateOfCitation}]{". "}{" "}
                  </>
                )}
                {electronicCitation.availabilityAndAccess === "" ? (
                  ""
                ) : (
                  <>
                    Available from: [{electronicCitation.availabilityAndAccess}]
                    {". "}
                  </>
                )}
                {electronicCitation.otherInformation === "" ? (
                  ""
                ) : (
                  <>
                    {electronicCitation.otherInformation}
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
                    return (
                      <span key={index}>
                        {item[0].replace(/^./, (char) => char.toUpperCase())}
                        {item[0] === "" || item[0] === undefined ? "" : " "}
                        {item[1].replace(/^./, (char) => char.toUpperCase())}
                        {item[1] === "" || item[1] === undefined ? "" : " "}
                      </span>
                    );
                  })}
                  {electronicCitation.year === "" ? (
                    ""
                  ) : (
                    <>
                    {" "}
                      {"("}
                      {electronicCitation.year}
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
                  {formFields.map((item, index) => {
                    return (
                      <span key={index}>
                        {"("}
                        {item[0].replace(/^./, (char) => char.toUpperCase())}
                        {item[0] === "" || item[0] === undefined ? "" : " "}
                        {item[1].replace(/^./, (char) => char.toUpperCase())}
                        {item[1] === "" || item[1] === undefined ? "" : ""}
                      </span>
                    );
                  })}
                  {electronicCitation.year === "" ? (
                    ""
                  ) : (
                    <>
                    {" "}
                    
                    {electronicCitation.year}</>
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

export default ElectronicMessage;
