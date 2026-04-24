import { useRef, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./BookForm.css";
import Copy from "../Copy/Copy";
import { MetadataContext } from "../../context/MetadataContext";

const BooksForm = ({ type }) => {
  const [booksCitation, setBooksCitation] = useState({
    // creatorName: [{ firstName: "", lastName: "" }],
    year: "",
    titleOfTheItem: "",
    place: "",
    publisher: "",
    edition: "",
    url: "",
    dateOfCitation: "",
    seriesTitleAndNumber: "",
    standardIdentifier: "",
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
        return normalizedAuthors.join(" and ");
      }
      if (normalizedAuthors.length > 2) {
        return `${normalizedAuthors.slice(0, -1).join(", ")} and ${normalizedAuthors[normalizedAuthors.length - 1]}`;
      }
      return normalizedAuthors.join(", ");
    }

    if (mode === "reference") {
      if (normalizedAuthors.length === 2) {
        return normalizedAuthors.join(" and ");
      }
      if (normalizedAuthors.length > 2) {
        return `${normalizedAuthors.slice(0, -1).join(", ")} and ${normalizedAuthors[normalizedAuthors.length - 1]}`;
      }
      return normalizedAuthors.join("");
    }

    return normalizedAuthors.join("");
  };

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    if (event.target.name === "firstName") data[index][0] = event.target.value;
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
  const [publisher, setPublisher] = useState([""]);
  const [standardIdentifier, setStandarIdentifier] = useState([""]);
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

  // listen for metadata selections from global search and autofill
  const { metadata, chosenForm } = useContext(MetadataContext);
  useEffect(() => {
    if (!metadata) return;
    // only autofill if chosenForm is empty or matches 'book' or 'ebook'
    if (
      chosenForm &&
      !["book", "ebook", "book-contribution"].includes(chosenForm)
    )
      return;
    // map common fields into the form
    setBooksCitation((prev) => ({
      ...prev,
      titleOfTheItem: metadata.title || prev.titleOfTheItem,
      year:
        metadata.year && metadata.year.toString
          ? metadata.year
          : metadata.year || prev.year,
      publisher: metadata.publisher || prev.publisher,
      place: metadata.place || prev.place,
      edition: metadata.edition || prev.edition,
      url: metadata.url || prev.url,
      seriesTitleAndNumber: metadata.series || prev.seriesTitleAndNumber,
    }));

    // authors -> formFields using mapped author objects if present
    if (metadata.authors && metadata.authors.length > 0) {
      const newFields = metadata.authors.map((a) => [
        a.firstName || "",
        a.lastName || "",
      ]);
      setFormFields(newFields.length ? newFields : [["", ""]]);
      setCreatorTypes(newFields.map(() => ""));
    }

    // publisher array state
    if (metadata.publisher) setPublisher([metadata.publisher].flat());

    // standard identifier (ISBN/DOI)
    if (metadata.isbn || metadata.doi) {
      setStandarIdentifier([metadata.isbn || metadata.doi]);
    }
  }, [metadata, chosenForm]);

  // useEffect(()=>{
  // },[formFields])

  return (
    <>
      <ToastContainer />
      <div className="bookform mx-auto max-w-4xl px-4">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setResult(true);
          }}
          className="max-w-3xl mx-auto"
        >
          <Form.Group as={Row} className="mb-3 align-items-start">
            <Form.Label column sm={3} className="fw-bold text-start">
              Name of Creator(s)
            </Form.Label>
            <Col sm={9}>
              {/* <span className="text-warning">* Description of the heading.</span> */}
              {formFields.map((item, index) => {
                return (
                  <Row key={index} className="mt-2 align-items-center">
                    <Form.Group as={Col} md={3} controlId="formLname">
                      <Form.Select
                        value={creatorTypes[index] || ""}
                        onChange={(event) =>
                          handleCreatorTypeChange(event, index)
                        }
                      >
                        <option>---Select Type ---</option>
                        <option>Author</option>
                        <option>Editor</option>
                        <option>Translator</option>
                        <option>Organisation</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md={4} controlId="formFname">
                      <Form.Control
                        onChange={(event) => handleFormChange(event, index)}
                        value={item[0]}
                        name="firstName"
                        type="text"
                        placeholder="Enter First Name"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md={4} controlId="formLname">
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

          <Form.Group as={Row} className="mb-3 align-items-center" controlId="formTitle">
            <Form.Label column sm={3} className="fw-bold text-start">
              Title
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.titleOfTheItem}
                name="titleOfTheItem"
                type="text"
                placeholder="Enter Title"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 align-items-center" controlId="formYear">
            <Form.Label column sm={3} className="fw-bold text-start">
              Date of Publication (Year)
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.year}
                name="year"
                type="text"
                placeholder="Enter Year"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 align-items-center" controlId="formEdition">
            <Form.Label column sm={3} className="fw-bold text-start">
              Edition
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.edition}
                name="edition"
                type="text"
                placeholder="Enter Edition"
              />
            </Col>
          </Form.Group>
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
          <Form.Group as={Row} className="my-3 align-items-center" controlId="formPlace">
            <Form.Label column sm={3} className="fw-bold text-start">
              Place
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                onChange={(e) => onChanging(e)}
                value={booksCitation.place}
                name="place"
                type="text"
                placeholder="Enter Place"
              />
            </Col>
          </Form.Group>
          {publisher.map((item, index) => {
            const inputColSize = publisher.length !== 1 ? 6 : 9;
            return (
              <Form.Group
                as={Row}
                key={index}
                className="mt-1 align-items-center"
                controlId="formPublisher"
              >
                {index === 0 ? (
                  <Form.Label column sm={3} className="fw-bold text-start">
                    Publisher
                  </Form.Label>
                ) : (
                  <Col sm={3}></Col>
                )}
                <Col sm={inputColSize}>
                  <Form.Control
                    onChange={(event) =>
                      handleInputChange(
                        event,
                        setPublisher,
                        publisher,
                        index,
                      )
                    }
                    value={item}
                    name="publisher"
                    type="text"
                    placeholder="Enter Publisher"
                  />
                </Col>
                {publisher.length !== 1 ? (
                  <Col sm={3}>
                    <Button
                      className="removebutton"
                      onClick={() => removeField(setPublisher, publisher, index)}
                    >
                      Remove
                    </Button>
                  </Col>
                ) : null}
              </Form.Group>
            );
          })}
          {type === "e" && (
            <Form.Group as={Row} className="mb-3 align-items-center" controlId="formURL">
              <Form.Label column sm={3} className="fw-bold text-start">
                URL
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onChange={(e) => onChanging(e)}
                  value={booksCitation.url}
                  name="url"
                  type="text"
                  placeholder="Enter URL"
                />
              </Col>
            </Form.Group>
          )}

          <Row className="mb-3">
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
        <div id="outputBox" className="!w-full md:w-full ">
          <center>
            <h2 style={{textAlign: "center"}}>Your Resulted Citation</h2>
          </center>
          <br />
          {/* SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]
          . Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume)
          , Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location]. */}

          <div style={{ textAlign: "left" }}>
            <div id="output">
              <p ref={ref} id="outputResult">
                {formatAuthors(formFields, "reference")}
                {booksCitation.year === "" ? (
                  ""
                ) : (
                  <>
                    [{booksCitation.year}]{". "}
                  </>
                )}
                {booksCitation.titleOfTheItem === "" ? (
                  ""
                ) : (
                  <>
                    <span className="title">{booksCitation.titleOfTheItem}</span>
                    {". "}
                  </>
                )}
                 {booksCitation.edition === "" ? (
                  ""
                ) : (
                  <>
                    {booksCitation.edition}
                    {". "}
                  </>
                )}
                {booksCitation.place === "" ? "" : <>{booksCitation.place}: </>}
                {publisher.length <= 1 &&
                (publisher[0] === "" || publisher[0] === undefined) ? (
                  ""
                ) : (
                  <>
                    {publisher.map((item, index) => {
                      return (
                        <span key={index}>
                          {publisher[index]}
                          {index < publisher.length - 1 && ". "}
                        </span>
                      );
                    })}
                    {". "}
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
                {booksCitation.url === "" ? (
                  ""
                ) : (
                  <>
                    Available from: {booksCitation.url}{". "}
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
                  {booksCitation.year === "" ? (
                    ""
                  ) : (
                    <>
                      {" "}
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
                  {"("}
                  {formatAuthors(formFields, "inText")}
                  {booksCitation.year === "" ? (
                    ""
                  ) : (
                    <>
                      {" "}
                      {booksCitation.year}
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
          </div>
        </div>
      )}
    </>
  );
};

BooksForm.propTypes = {
  type: PropTypes.string,
};

export default BooksForm;
