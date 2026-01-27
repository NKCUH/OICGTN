import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
// import "./home.css";

const HomeComponent = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" w-full flex rounded-xl bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmiRVA2I0_-T4tHiuN3mSjGGpisRkKwv1jA&s')] bg-no-repeat bg-cover bg-center pb-10 home-container">
      <div class=" pt-24 h-3/4 relative w-full my-5">
  <div class="p-5 text-center w-3/4 mx-auto bg-[#efefef] bg-body-tertiary rounded-3">
   
    <h1 class="text-body-emphasis">Online Indian Bibliographic Citation Generation Tool</h1>
    <h2 class="text-body-emphasis">Enlightning Academicians</h2>
    <br />
    <br/>
    <div className="mb-3">
          <Dropdown className="d-inline drop">
            <Dropdown.Toggle
              className="bg-transparent border-0"
              style={{ fontSize: "18px" }}
            >
              Books
            </Dropdown.Toggle>
            <Dropdown.Menu>
            
              <Dropdown.Item onClick={() => navigate("/Book-and-monograph")}>Books
              </Dropdown.Item>
              <Dropdown.Item className="bg-grey" onClick={() => navigate("/E-Book-and-monograph")}>
                E-Books
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/contribution-within-book")}>
              Book Contribution
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="d-inline drop">
            <Dropdown.Toggle
              className="bg-transparent border-0"
              style={{ fontSize: "18px" }}
            >
              Journal
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/serial")}>Journal
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/E-serial")}>
                E-Journal
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/serial-contributions")}>
              Journal Contribution
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="d-inline drop">
            <Dropdown.Toggle
              className="bg-transparent border-0"
              style={{ fontSize: "18px" }}
            >
              Show More
            </Dropdown.Toggle>
            <Dropdown.Menu>
              
              <Dropdown.Item onClick={() => navigate("/websites")}>
              Websites
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/electronic-messages")}>
                Electronic Messages
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/patents")}>
                Patents
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
        </div>
   
  </div>
</div>
</div>
<div class="col-lg-7 text-center w-full flex justify-center items-center bg-white flex-col p-4 text-lg-start">
        <h5 class="display-4 fw-bold text-4xl text-body-emphasis mb-3">About Online Indian Bibliographic Citation Generation Tool</h5>
        <p class="col-lg-10 fs-4">The Online Indian Bibliographic Citation Generation Tool is based on
          3rd revision of information and documentation – guidelines for
          bibliographic references and citations to information resources issued
          by the International Organization for Standardization (ISO) which is
          adopted by Bureau of Indian Standards. Through this citation tool,
          citations or reference entries may be generated for different
          resources like books, serials, websites and patents in the format as
          specified in the Indian Bibliographic Reference Style.</p>
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
