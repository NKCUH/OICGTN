import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import "./pdf.css";
import CitContainer from "../Container";
import Copy from "../Copy/Copy";

const Pdf = ({ type }) => {
  const location = useLocation();
  const { metaData } = location.state || {};

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const currentDate = `${day}-${month}-${year}`;

  const datePart = metaData?.CreationDate?.slice(2, 10);
  const yearCreated = datePart?.slice(0, 4); // Extract year: "2010"
  const monthCreated = datePart?.slice(4, 6); // Extract month: "07"
  const dayCreated = datePart?.slice(6, 8);

  const DateCreated = datePart
    ? `${dayCreated}-${monthCreated}-${yearCreated}`
    : "";

  const [booksCitation, setBooksCitation] = useState({
    // creatorName: [{ firstName: "", lastName: "" }],
    year:
      metaData?.year ||
      metaData?.Year ||
      metaData?.CreationDate?.slice(2, 6) ||
      "",
    titleOfTheItem:
      metaData?.Title ||
      metaData?.title ||
      metaData?.name ||
      metaData?.Name ||
      "",
    mediumDesignation: "",
    mapSeriesDesignation: "",
    scale: "",
    subsidiaryTitles: "",
    edition: "",
    subsidiaryCreator: "",
    place: "",
    publisher: "",
    dateOfPublication: DateCreated ? DateCreated : "",
    dateOfUpdate: "",
    dateOfCitation: currentDate ? currentDate : "",
    seriesTitleAndNumber: "",
    standardIdentifier: "ISBN ",
    availiabilityAndAccess: "",
    location: "",
    // eLink:""
  });
  const ref = useRef();
  const [result, setResult] = useState(false);

  const onChanging = (e) => {
    const name = e.target.name;
    setBooksCitation({ ...booksCitation, [name]: e.target.value });
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
  const copytext = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    toast.success("Copied to Clipboard");
  };

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

  const [formFields, setFormFields] = useState([
    [
      metaData.Author?.split(" ")[0] ||
        metaData.author?.split(" ")[0] ||
        metaData.Creator?.split(" ")[0] ||
        metaData.creator?.split(" ")[0],
      metaData.Author?.split(" ")[1] ||
        metaData.author?.split(" ")[1] ||
        metaData.Creator?.split(" ")[1] ||
        metaData.creator?.split(" ")[1],
    ],
  ]);
  const [medium, setMedium] = useState([""]);
  const [edition, setEdition] = useState([""]);
  const [publisher, setPublisher] = useState([""]);
  const [standardIdentifier, setStandarIdentifier] = useState([""]);
  const [availability, setAvailability] = useState([""]);

  const addField = (UseStateName, stateName, obj) => {
    UseStateName([...stateName, obj]);
  };
  const removeField = (UseStateName, stateName, index) => {
    stateName.splice(index, 1);
    UseStateName([...stateName]);
  };


  return (
    <CitContainer title="Reference">
      <ToastContainer />
      <div className="bookform">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setResult(true);
          }}
        >
          <Row className="mb-3">
            <Form.Label>
              <b>Name of Creator(s)</b>
            </Form.Label>
            {/* <span className="text-warning">* Description of the heading.</span> */}
            {formFields.map((item, index) => {
              return (
                <Row key={index} className="mt-2">
                  <Form.Group as={Col} controlId="formLname">
                    <Form.Select
                      name="lastName"
                      defaultValue={
                        metaData.Author || metaData.author ? "Author" : null
                      }
                    >
                      <option>---Select Type ---</option>
                      <option>Author</option>
                      <option>Editor</option>
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
                value={booksCitation.year}
                name="year"
                type="text"
                placeholder="Enter Year"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formTitle">
              <Form.Label>Title of the Items</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.titleOfTheItem}
                name="titleOfTheItem"
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
                      <option>Print</option>
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
          {/* <Row classNamr="mb-3">
            <Form.Group as={Col} controlId="formMap">
              <Form.Label>Map series designation</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.mapSeriesDesignation}
                name="mapSeriesDesignation"
                type="text"
                placeholder="Enter Map Series"
              />
            </Form.Group>
          </Row> */}

          <Row className="my-3">
            {/* <Form.Group as={Col} controlId="formScale">
              <Form.Label>Scale</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.scale}
                name="scale"
                type="text"
                placeholder="Enter Scale"
              />
            </Form.Group> */}

            <Form.Group as={Col} controlId="formTitle">
              <Form.Label>Subsidiary Titles</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.subsidiaryTitles}
                name="subsidiaryTitles"
                type="text"
                placeholder="Enter Title    "
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
                      <option>Level</option>
                      <option>Update</option>
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
          {/* <Row className="my-3">
            <Form.Group as={Col} controlId="formCreatore">
              <Form.Label>Subsidiary Creator</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.subsidiaryCreator}
                name="subsidiaryCreator"
                type="text"
                placeholder="Enter Creator    "
              />
            </Form.Group>
          </Row> */}
          <Row className="my-3">
            <Form.Group as={Col} controlId="formPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.place}
                name="place"
                type="text"
                placeholder="Enter Place"
              />
            </Form.Group>
            {/* {type?<Form.Group as={Col} controlId="formLink">
              <Form.Label>Link</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.eLink}
                name="eLink"
                type="text"
                placeholder="Enter Link of the E-Book"
              />
            </Form.Group>: null} */}
            <Row className="mb-3">
              <Form.Label>Publisher</Form.Label>
              {publisher.map((item, index) => {
                return (
                  <Row key={index} className="mt-2">
                    <Form.Group as={Col} controlId="formPlace">
                      <Form.Select defaultValue="Choose...">
                        <option>---Select Publisher---</option>
                        <option>Publisher</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formPublisher">
                      <Form.Control
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            setPublisher,
                            publisher,
                            index
                          )
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
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPublication">
              <Form.Label>Date of Publication</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.dateOfPublication}
                name="dateOfPublication"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
            {/* <Form.Group as={Col} controlId="formUpdate">
              <Form.Label>Date of update/revision</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.dateOfUpdate}
                name="dateOfUpdate"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group> */}
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formCitation">
              <Form.Label>Date of citation</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.dateOfCitation}
                name="dateOfCitation"
                type="text"
                placeholder="Enter Date"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formPlace">
              <Form.Label>Series title and number</Form.Label>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.seriesTitleAndNumber}
                name="seriesTitleAndNumber"
                type="text"
                placeholder="Enter Series Title And Number"
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
                      <option>ISBN</option>
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

            <Row className="mb-3">
              {/* <Form.Label>Standard Identifier</Form.Label> */}
              <Form.Label>Availability and access</Form.Label>
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
          </Row>
          {type ? null : (
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={booksCitation.location}
                  name="location"
                  type="text"
                  placeholder="Enter Location"
                />
              </Form.Group>
            </Row>
          )}
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
                {booksCitation.year === "" ? (
                  ""
                ) : (
                  <>
                    [{booksCitation.year}]{". "}
                  </>
                )}
                <span className="title">{booksCitation.titleOfTheItem}</span>{" "}
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
                {booksCitation.subsidiaryTitles === "" ? (
                  ""
                ) : (
                  <>
                    <span className="title">
                      {booksCitation.subsidiaryTitles}
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
                {booksCitation.place === "" ? "" : <>{booksCitation.place}: </>}
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
                {booksCitation.dateOfPublication === "" ? (
                  ""
                ) : (
                  <>
                    {booksCitation.dateOfPublication}
                    {", "}
                  </>
                )}
                {booksCitation.dateOfCitation === "" ? (
                  ""
                ) : (
                  <>
                    [viewed {booksCitation.dateOfCitation}]{". "}{" "}
                  </>
                )}
                {booksCitation.seriesTitleAndNumber === "" ? (
                  ""
                ) : (
                  <>
                    {booksCitation.seriesTitleAndNumber}
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
                {booksCitation.location === "" ? (
                  ""
                ) : (
                  <>At:[{booksCitation.location}].</>
                )}
                {/* {booksCitation.eLink === ""? "": `[${booksCitation.eLink}]`} */}
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
                  {booksCitation.year === "" ? (
                    ""
                  ) : (
                    <>
                      {"("}
                      {booksCitation.year}
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
                        {item[1] === "" || item[1] === undefined ? "" : " "}
                      </span>
                    );
                  })}
                  {booksCitation.year === "" ? (
                    ""
                  ) : (
                    <>
                      {booksCitation.year}
                      {")"}
                    </>
                  )}
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
    </CitContainer>
  );
};

export default Pdf;
