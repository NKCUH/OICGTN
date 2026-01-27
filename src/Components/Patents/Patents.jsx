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
  const { metadata, chosenForm } = useContext(MetadataContext);
  useEffect(() => {
    if (!metadata) return;
    if (chosenForm && chosenForm !== "patent" && chosenForm !== "") return;
    setPatentsCitation((prev) => ({
      ...prev,
      titleOfTheInformationSource: metadata.title || prev.titleOfTheInformationSource,
      dateOfIssuance: metadata.dateOfPublication || prev.dateOfIssuance,
      patentNumber: metadata.patentNumber || prev.patentNumber,
      persistentIdentifiers: metadata.doi || metadata.url || prev.persistentIdentifiers,
      publisher: metadata.publisher || prev.publisher,
    }));

    if (metadata.authors && metadata.authors.length > 0) {
      const newFields = metadata.authors.map((a) => [a.firstName || "", a.lastName || ""]);
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
            <Form.Label>Name of Creator(s)</Form.Label>
            {/* <p></p> */}
            {formFields.map((item, index) => {
              return (
                <Row key={index} className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    {/* <Form.Label>First Name</Form.Label> */}
                    <Form.Control
                      onChange={(event) => handleFormChange(event, index)}
                      value={item[0]}
                      name="firstName"
                      type="text"
                      placeholder="Enter First Name"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    {/* <Form.Label>Last Name</Form.Label> */}
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
                  {/* <button onClick={removeOne}>Remove</button> */}
                </Row>
              );
            })}
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Patent application country</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.patientApplicationCountry}
                name="patientApplicationCountry"
                type="text"
                placeholder="Enter Country"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Label>
              Standard Identifiers of creaters' public identities
            </Form.Label>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>Orcid Id</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.standardIdentifiersOfCreator}
                name="standardIdentifiersOfCreator"
                type="text"
                placeholder="Enter Standard Identifiers Of Creator"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Title of the information resource</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.titleOfTheInformationSource}
                name="titleOfTheInformationSource"
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Series Title</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.seriesTitle}
                name="seriesTitle"
                type="text"
                placeholder="Enter Series Title"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Subsidiary creator</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.subsidiaryCreator}
                name="subsidiaryCreator"
                type="text"
                placeholder="Enter Subsidiary creator"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date Of Application</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.dateOfApplication}
                name="dateOfApplication"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date Of Issuance</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.dateOfIssuance}
                name="dateOfIssuance"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Patent Number</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.patentNumber}
                name="patentNumber"
                type="text"
                placeholder="Enter Patent Number"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label>Persistent Identifiers</Form.Label>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>URL</option>
                <option>URI</option>
                <option>DOI</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.persistentIdentifiers}
                name="persistentIdentifiers"
                type="text"
                placeholder="Enter Item Persistent Identifiers"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Item Attributes</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.itemAttributes}
                name="itemAttributes"
                type="text"
                placeholder="Enter Item Attributes"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date of Citation</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.dateOfCitation}
                name="dateOfCitation"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Location</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.location}
                name="location"
                type="text"
                placeholder="Enter Location"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Relationships</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={patentsCitation.relationships}
                name="relationships"
                type="text"
                placeholder="Enter Relationships"
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
            <h2>Your Resulted Citation</h2>
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
                    {patentsCitation.titleOfTheInformationSource}
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
                {patentsCitation.dateOfIssuance === "" ? (
                  ""
                ) : (
                  <>
                    {patentsCitation.dateOfIssuance}
                    {". "}
                  </>
                )}
                {patentsCitation.patentNumber === "" ? (
                  ""
                ) : (
                  <>
                    {patentsCitation.patentNumber}
                    {". "}
                  </>
                )}
                {patentsCitation.persistentIdentifiers === "" ? (
                  ""
                ) : (
                  <>
                    Available from: [{patentsCitation.persistentIdentifiers}]
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
                    return (
                      <span key={index}>
                        {item[0].replace(/^./, (char) => char.toUpperCase())}
                        {item[0] === "" || item[0] === undefined ? "" : " "}
                        {item[1].replace(/^./, (char) => char.toUpperCase())}
                        {item[1] === "" || item[1] === undefined ? "" : ""}
                      </span>
                    );
                  })}
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
                  })}{")"}
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

export default PatentsForm;
