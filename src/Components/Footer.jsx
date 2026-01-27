import React from "react";
import "../index.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiOutlineMail, AiFillGithub } from "react-icons/ai";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function Footer() {
  const data = [
    [
      "Sourav Sharma",
      "https://www.instagram.com/_sourav7050_/",
      "https://www.linkedin.com/in/sourav-sharma-1514441a0/",
      "ss4094061@gmail.com",
      "https://github.com/Sourav-Sharma-191940",
    ],
    [
      "Abhishek Rao",
      "https://www.instagram.com/__me_abhishek_rao/",
      "https://www.linkedin.com/in/abhishek-rao-16b6218b/",
      "arao8732@gmail.com",
      "https://github.com/Abhishek-Rao-191882",
    ],
    [
      "Sourabh Saraswat",
      "https://www.instagram.com/ssaraswat/",
      "https://www.linkedin.com/in/sourabh-saraswat-1681b61a5/",
      "saraswatsourabh5@gmail.com",
      "https://github.com/SourabhSaraswat-191939",
    ],
  ];
  return (
    <div
      className="text-white d-flex flex-column align-items-center mt-5 pt-3"
      style={{ backgroundColor: "#192F59" }}
    >
      <span style={{fontSize:"130%"}}>Planning, Content, Design and Development By</span>
      <div
      className="footer-row"
        style={{
          backgroundColor: "#192F59",
          display: "flex",
          width: "100%"
        }}
      >
        <div className="footer-left" style={{flex:"3", borderLeft:"solid white 2px", paddingLeft:"5%"}}>
        
        <p style={{fontSize:"130%"}}><b>Naresh Kumar</b></p><a href="https://orcid.org/0000-0002-8539-2730"> https://orcid.org/0000-0002-8539-2730 </a>
        <p></p>
        {/* <p><b>Prof. Madhusudhan Margam</b></p><a href="http://atfi.dlis.du.ac.in/drmadhusudhan.php"> http://atfi.dlis.du.ac.in/drmadhusudhan.php </a> */}
        </div>
         <div className="footer-right" style={{flex:"3", borderLeft:"solid white 2px", paddingLeft:"5%"}}>
          <div className="text-center" style={{fontSize:"130%"}}><p><b>Prof. Madhusudhan Margam</b></p></div>
          <div className="d-flex justify-content-around" id="developersName">
          <a href="http://atfi.dlis.du.ac.in/drmadhusudhan.php"> http://atfi.dlis.du.ac.in/drmadhusudhan.php </a>
            {/* {data.map((person, i) => (
              <div className="p-5 developer" key={i}>
                <b>{person[0]}</b>
                <br />
                <center>
                  <a target="_blank" href={person[1]}>
                    <FaInstagram className="m-1" />
                  </a>
                  <a target="_blank" href={person[2]}>
                    <FaLinkedin className="m-1" />
                  </a>

                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip id="button-tooltip">{person[3]}</Tooltip>}
                  >
                    <a href={"mailto:" + person[3]}>
                      <AiOutlineMail className="m-1" />
                    </a>
                  </OverlayTrigger>
                  <a target="_blank" href={person[4]}>
                    <AiFillGithub className="m-1" />
                  </a>
                </center>
              </div>
            ))} */}
          </div>
        </div>
       </div> 
    {/* //   <div className="mb-3">All Rights are reserved @ByteCodeLearners</div> */}
     </div>
  );
}
