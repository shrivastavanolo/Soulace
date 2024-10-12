import './App.css';
import React from 'react';
import Abacus from './components/abacus';
import Blogs2 from './components/blogs2';
import Cantunsee from './components/cantunsee';
import Games from './components/games';
import Hanoi from './components/hanoi';
import Home from './components/home';
import Parentlanding from './components/parent-landing';
import Quiz from './components/quiz';
import Report from './components/report';
import Report2 from './components/report2';
import Rubix from './components/rubix';
import Schools from './components/school';
import School2 from './components/school2';
import Studentlanding from './components/student-landing';
import Tips2 from './components/tips2';
import Doubts from './components/videos';
import ScrollToTop from './components/scroll';


import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <div className="App" style={{margin:0, padding:0}}>
      <ScrollToTop />
      <Routes>
      <Route path="/" exact element={<Home/>}></Route>
      <Route path="/student" exact element={<Studentlanding/>}></Route>
      <Route path="/parent" exact element={<Parentlanding/>}></Route>
      <Route path="/abacus" element={<Abacus />} />
      <Route path="/blogs2" element={<Blogs2 />} />
      <Route path="/cant" element={<Cantunsee />} />
      <Route path="/games" element={<Games />} />
      <Route path="/tower" element={<Hanoi />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/report" element={<Report />} />
      <Route path="/report2" element={<Report2 />} />
      <Route path="/rubix" element={<Rubix />} />
      <Route path="/school" element={<Schools />} />
      <Route path="/school2" element={<School2 />} />
      <Route path="/tips2" element={<Tips2 />} />
      <Route path="/doubts" element={<Doubts />} />
      </Routes>
    </div>
  );
}

export default App;
