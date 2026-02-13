import React, { useState, useContext } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import Carousel from "react-bootstrap/Carousel";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { MetadataContext } from "../../context/MetadataContext";
import { mapToFormMetadata } from "../../api/metadataMapper";
import { toast, ToastContainer } from "react-toastify";
import "./home.css";
import Slider from "../Slider/slider";
const HomeComponent = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
  
  const { applyMetadata } = useContext(MetadataContext);

  const handleFileChange = async (e) => {
      if (e.target.files && e.target.files[0]) {
        const pdfFile = e.target.files[0];
        setFile(pdfFile);

        // Read the file as an ArrayBuffer
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {
          const arrayBuffer = event.target.result;

          try {
            // pdfjs expects either a URL, an object with {data: Uint8Array}, or typed array
            const data = new Uint8Array(arrayBuffer);
            // Load the PDF using pdfjsLib
            const loadingTask = pdfjsLib.getDocument({ data });
            const pdfDoc = await loadingTask.promise;

            // Get document metadata
            const meta = await pdfDoc.getMetadata(); // { info, metadata }
            const metaData = meta && meta.info ? meta.info : {};

            // Extract first-page text to help detection
            let firstPageText = "";
            try {
              const page = await pdfDoc.getPage(1);
              const content = await page.getTextContent();
              firstPageText = content.items.map((i) => i.str).join(" ");
            } catch (err) {
              // ignore page extraction errors
            }

            // Build a minimal normalized item for mapping
            const item = {
              title: metaData.Title || metaData.title || metaData.Name || metaData.name || "",
              authors: metaData.Author ? [metaData.Author] : metaData.Creator ? [metaData.Creator] : [],
              doi: null,
              isbn: null,
              publisher: metaData.Producer || metaData.Publisher || metaData.producer || metaData.publisher || null,
              year: metaData.CreationDate ? metaData.CreationDate.slice(2,6) : (metaData.Year || null),
              url: null,
              raw: metaData,
            };

            // Search extracted text for DOI/ISBN/ISSN
            const txt = ((firstPageText || "") + " " + JSON.stringify(metaData || {})).toLowerCase();
            const doiMatch = txt.match(/10\.\d{4,}\/\S+/);
            if (doiMatch) item.doi = doiMatch[0];
            const isbnMatch = txt.match(/(?:isbn(?:-1[03])?:? )?([0-9Xx\- ]{10,17})/i);
            if (isbnMatch) item.isbn = isbnMatch[1].replace(/[^0-9Xx]/g, "");
            const issnMatch = txt.match(/issn[:\s]*([0-9Xx\-]{8,9})/i);
            if (issnMatch) item.issn = issnMatch[1];

            // Try to extract volume/issue/pages and journal title from first page text
            try {
              // pages like 406-416
              const pagesMatch = firstPageText.match(/(\d{1,4})\s*[-–—]\s*(\d{1,4})/);
              if (pagesMatch) {
                item.raw = { ...(item.raw || {}), pages: pagesMatch[1] + '-' + pagesMatch[2] };
              }
              // volume(issue) patterns: Vol.72(4) or Volume 72, No.4
              const volIssueMatch = firstPageText.match(/vol(?:ume)?\.?\s*[:\.]?\s*(\d{1,4})(?:\s*[(),\s]+\s*(?:no\.?\s*)?(\d{1,4}))?/i)
                || firstPageText.match(/(\d{1,4})\s*\(\s*(\d{1,4})\s*\)/);
              if (volIssueMatch) {
                const v = volIssueMatch[1];
                const iss = volIssueMatch[2] || null;
                item.raw = { ...(item.raw || {}), volume: v, issue: iss };
              }
              // Try to grab journal title before 'Vol' or 'Volume' occurrence
              const titleBeforeVol = firstPageText.match(/^(.*?)\s+(?=vol(?:ume)?\.?\s*[:\.]?\s*\d)/i);
              if (titleBeforeVol && titleBeforeVol[1]) {
                const jt = titleBeforeVol[1].trim();
                if (jt.length > 3) item.raw = { ...(item.raw || {}), containerTitle: jt };
              } else {
                // fallback: look for lines that look like journal name (all caps or Title Case and short)
                const maybe = firstPageText.split(/[\n\r\.\-]{1,}/).map(s=>s.trim()).find(s=>s && s.length>3 && s.length<60 && /[A-Z][a-z]/.test(s));
                if (maybe) item.raw = { ...(item.raw || {}), containerTitle: maybe };
              }
            } catch (err) {
              // non-fatal
            }

            // Map to form metadata
            const mapped = mapToFormMetadata(item);

            // Heuristic to detect form type
            const combined = (mapped.title || "") + " " + (firstPageText || "") + " " + JSON.stringify(metaData || {});
            const lc = combined.toLowerCase();
            let chosenForm = null;
            // If DOI or typical journal signals -> treat as journal contribution (article)
            if (mapped.doi || /journal|volume|issue|pp\.|pages|abstract/.test(lc) || (item.issn)) {
              chosenForm = "serial-contribution";
            } else if (mapped.isbn) {
              chosenForm = "book";
            } else if (/patent|application number|publication number/.test(lc)) {
              chosenForm = "patent";
            } else if (/website|http|www\.|url:|doi:/.test(lc) && !mapped.isbn) {
              chosenForm = "website";
            } else {
              // fallback: if text contains 'chapter' or 'in:' then book contribution
              if (/chapter|in:|in\sof|proceedings|conference|chapter in/.test(lc)) chosenForm = "book-contribution";
              else chosenForm = "book";
            }

            // Apply metadata to context and navigate to the chosen form
            try {
              // use MetadataContext applyMetadata if available
              if (applyMetadata) {
                applyMetadata(mapped, null, chosenForm);
                // navigate to the appropriate route
                const routeFor = (form) => {
                  switch (form) {
                    case "book": return "/book-and-monograph";
                    case "ebook": return "/E-book-and-monograph";
                    case "book-contribution": return "/contribution-within-book";
                    case "journal":
                    case "serial": return "/serial";
                    case "serial-contribution": return "/serial-contributions";
                    case "website": return "/websites";
                    case "patent": return "/patents";
                    case "electronic-message": return "/electronic-messages";
                    default: return "/";
                  }
                };
                toast.info(`Detected ${chosenForm.replace(/-/g, ' ')} — opening form`);
                navigate(routeFor(chosenForm), { state: { metaData: metaData } });
                return;
              }
            } catch (err) {
              console.warn("applyMetadata not available", err);
            }

            // If applyMetadata not used, fallback to navigate to pdf view
            navigate("/pdf", { state: { metaData } });
          } catch (error) {
            console.error("Error loading PDF:", error);
            // Fallback: navigate with empty metadata so UI doesn't break
            navigate("/pdf", { state: { metaData: {} } });
          }
        };

        fileReader.readAsArrayBuffer(pdfFile);
      }
    };
    return (
      <>
        {/* Modernized Slider & Video Section */}
        <div className="grid grid-cols-1 gap-6 md:px-6 md:py-6 w-full">
          <div className="w-full">
            <Slider />
          </div>
        </div>

    {/* <div className=" w-full flex justify-center h-[800px] items-end rounded-lg bg-no-repeat bg-cover bg-center"> */}
    <div className="rounded-lg mt-20 justify-around gap-4 md:flex-row flex-col flex w-full md:px-10">
      <div className="w-full rounded-lg bg-blue-100 flex p-2 items-center flex-col">
        <h3 className="mt-4 font-bold font-sans fs-1 text-[#2986ea]">Cite a Book</h3>
        <p className="col-lg-10 fs-5 text-center">Generate a Citation for a book of your choice, just by entering some details!</p>
      
        <div className="flex flex-col gap-3 h-full justify-center">
        <button onClick={() => navigate("/Book-and-monograph")} className="btn1">Book</button>
        <button onClick={() => navigate("/E-Book-and-monograph")} className="btn1">E-Book</button>
        <button onClick={() => navigate("/contribution-within-book")} className="btn1">Book Contribution</button>
        </div>
      </div>
    
      <div className="w-full flex rounded-lg items-center font-sans p-2 flex-col bg-green-100">
       <h3 className="mt-4 font-bold font-oswald fs-1 text-[#28A745]">Cite a Journal</h3>
      <p className="col-lg-10 fs-5 text-center">Generate a Citation for a Journal of your choice, just by entering some details!</p>
      <div className="flex flex-col  gap-3 h-full justify-center">
        <button onClick={() => navigate("/serial")} className="btn2">Journal</button>
        <button onClick={() => navigate("/E-serial")} className="btn2">E-Journal</button>
        <button onClick={() => navigate("/serial-contributions")} className="btn2">Journal Contribution</button>
        </div>
      </div>
      <div className="w-full  rounded-lg flex font-sans items-center p-2 flex-col bg-purple-100">
      <h3 className="mt-4 font-bold font-sans fs-1 text-center text-[#9C27B0]">You can also Cite</h3>
      <p className="col-lg-10 fs-5 text-center">Generate a Citation for any one of the following, just by entering some details!</p>
      <div className="flex flex-col gap-3 h-full justify-center">
        <button onClick={() => navigate("/websites")} className="btn3">Websites</button>
        <button onClick={() => navigate("/electronic-messages")} className="btn3">Electronic Messages</button>
        <button onClick={() => navigate("/patents")} className="btn3">Patents</button>
        </div>
      </div>
    </div>
    <div className='flex w-full justify-center items-center'>

        <label className='bg-blue-500 hover:bg-blue-600 transition-all duration-300 mt-2 cursor-pointer flex justify-center items-center p-2 text-white font-bold rounded-md' htmlFor="file">
        <svg className="w-6 h-5 mt-1 mr-3  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
        Upload a PDF
        <input
        type="file"
        id='file'
        className='hidden'
        onChange={handleFileChange}
        accept="application/pdf"
        />
        </label>
        </div>

    {/* </div> */}

    <div className="w-70 mt-10 md:ml-20 md:mr-20 rounded-lg flex font-sans justify-center items-center flex-col bg-gray-200">
      <h3 className="mt-4 md:p-0 p-2 font-bold text-center font-sans ">About Online Indian Bibliographic Citation Generation Tool</h3>
      <p className="col-lg-10 md:p-0 p-2 fs-5">The Online Indian Citation Generation Tool (OICGT) is a web-based application developed by Mr. Naresh Kumar and Prof. Margam Madhusudhan and released in 2026 (Kumar & Madhusudhan, 2026). OICGT enables users to generate citations and reference entries for a wide range of information resources, including books, serial publications, websites, and patents, in accordance with the Indian Bibliographic Reference Style. By streamlining the citation process, the tool supports accuracy, consistency, and improved academic productivity..</p>
     
      </div>
      

      
       

        {/* <Carousel slide={false}>
          <Carousel.Item>
            <img
              className="d-block w-100 "
              height={400}
              src="https://library.cuh.ac.in/slider/2s.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height={400}
              src="https://library.cuh.ac.in/slider/1s.JPG"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height={400}
              src="https://scontent.fixc8-2.fna.fbcdn.net/v/t39.30808-6/299891449_457153836425563_1044794192960032723_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=QkXBcifwfvQAX8BzFAB&_nc_ht=scontent.fixc8-2.fna&oh=00_AfDNH2Pyzt6SPpn5C4dFl4GukL4tXoVLR-QUQ7has_rh5g&oe=6374132B"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <center>
          <h4 className="mt-4" style={{ color: "#192F59", fontWeight: "bold" }}>
            Welcome to Pandit Deendayal Upadhyaya Central Library !
          </h4>
        </center>
        <p style={{ textAlign: "justify" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <div className="row mt-5">
          <div className="col-4"></div>
          <div className="col-8">
            <center>
              <h4 style={{ color: "#192F59", fontWeight: "bold" }}>Our Team</h4>
            </center>
          </div>

          <div className="col-md-4 col-sm-12">
            <img
              className="d-block w-100"
              src="https://library.cuh.ac.in/wp-content/uploads/2022/07/176337553_4246511138716802_7792510552990791432_n.jpg"
              alt="Naresh Kumar"
            />
          </div>
          <div
            className="col-8 border border-dark"
            style={{ boxShadow: "10px 10px #192F59" }}
          >
            <p className="px-5 py-3" style={{ textAlign: "justify" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>*/}
      
    </>
  );
};

export default HomeComponent;
