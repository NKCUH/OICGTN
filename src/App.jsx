import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Serial from './Pages/serial';
import Header from './Components/Navbar';
import { MetadataProvider } from './context/MetadataContext';
import SerialContributions from './Pages/serialContributions';
import Patents from './Pages/patents';
import ElectronicMessages from './Pages/electronicMessages';
import Websites from './Pages/websites';
import Book from './Pages/bookMonograph.jsx';
import ContributionWithinBook from './Pages/contributionWithinBook';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Example from './Pages/example';
import Footer from './Components/Footer.jsx'
import EBook from './Pages/E-bookMonograph.jsx';
import ESerial from './Pages/E-seria.jsx';
// import Contact from './Components/Contact/Contact.jsx';
import Faq from './Components/FAQ/Faq.jsx';
import Pdf from './Components/pdf/Pdf.jsx';
import Guide from './Components/Guide/Guide.jsx';
import Chatbot from './Components/Chatbot/Chatbot';
const App = () =>{
  return (
    <div className="App min-h-screen h-screen flex flex-col">
    <MetadataProvider>
      <Header/>
    <div className='flex-grow'>


      <Routes base>
          <Route path='/' element={<Home />} />
          <Route path='/serial' element={<Serial />} />
          <Route path='/E-serial' element={<ESerial />} />
          <Route path='/serial-contributions' element={<SerialContributions />} />
          <Route path='/patents' element={<Patents />} />
          <Route path='/electronic-messages' element={<ElectronicMessages />} />
          <Route path='/websites' element={<Websites />} />
          <Route path='/book-and-monograph' element={<Book />} />
          <Route path='/E-book-and-monograph' element={<EBook />} />
          <Route path='/contribution-within-book' element={<ContributionWithinBook />} />
          <Route path='/example' element={<Example />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/pdf' element={<Pdf />} />
          {/* <Route path='/contact' element={<Contact />} /> */}
          <Route path='/Guide' element={<Guide />} />
          <Route path='/FAQ' element={<Faq />} />
      </Routes>
    </div>
      <Footer/>
      <Chatbot />
    </MetadataProvider>
    </div>
  );
}

export default App;
