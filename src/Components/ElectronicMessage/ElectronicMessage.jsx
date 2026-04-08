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
    dateOfCitation: "",
    availabilityAndAccess: "",
    otherInformation: "",
  });
  const ref = useRef();
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

    const firstInitial = safeFirst
      ? `${safeFirst.charAt(0).toUpperCase()}.`
      : "";
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
  const [creatorTypes, setCreatorTypes] = useState([""]);

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
            <Form.Label column sm={3} className="fw-bold">
              Name of Creator(s)
            </Form.Label>
            <Col sm={9}>
              {formFields.map((item, index) => {
                return (
                  <Row key={index} className="mb-3 align-items-center">
                    <Form.Group as={Col} controlId="formLname">
                      <Form.Select
                        value={creatorTypes[index] || ""}
                        onChange={(event) => handleCreatorTypeChange(event, index)}
                      >
                        <option>---Select Type ---</option>
                        <option>Author</option>
                        <option>Editor</option>
                        <option>Reviewer</option>
                        <option>Translator</option>
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
                      <Col className="col-sm-1">
                        <Button
                          className="removebutton md:!mt-0 !mt-2"
                          onClick={() => removeCreatorField(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    ) : (
                      <></>
                    )}
                    {formFields.length - 1 === index && (
                      <Col className="col-sm-1">
                        <Button
                          variant="link"
                          className="ps-0 text-decoration-none"
                          onClick={addCreatorField}
                        >
                          Add another Creator
                        </Button>
                      </Col>
                    )}
                  </Row>
                );
              })}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>Title of The Message</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.titleOfTheMessage}
                name="titleOfTheMessage"
                type="text"
                placeholder="Enter Title"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>E-mail/Message Board/Online</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.titleOfTheHostMessageSystem}
                name="titleOfTheHostMessageSystem"
                type="text"
                placeholder="Enter Title"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>Year</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.year}
                name="year"
                type="text"
                placeholder="Enter Year"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}><b>URL</b></Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={electronicCitation.availabilityAndAccess}
                name="availabilityAndAccess"
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
            <h2>Your Resulted Citation :- </h2>
          </center>
          <br />
          {/* SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]
          . Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume)
          , Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location]. */}

          <center>
            <div id="output">
              <p ref={ref} id="outputResult">
                {formatAuthors(formFields, "reference")}
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
                    Available from: {electronicCitation.availabilityAndAccess}
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
                  {formatAuthors(formFields, "inText")}
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
                  {"("}
                  {formatAuthors(formFields, "inText")}
                  {electronicCitation.year === "" ? (
                    ""
                  ) : (
                    <> {electronicCitation.year}</>
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
