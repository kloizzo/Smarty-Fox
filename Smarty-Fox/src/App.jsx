import React, { useState, useEffect } from 'react';
import Fox from './components/mascot/Fox.jsx';
import ChatBox from './components/chat/ChatBox.jsx';
import './styles.css';
import logo from './assets/sf-logo.png';
import meatballMan from './assets/meatball.png';
import normal from './assets/default_fox.json';

function App() {
  const [secret, setSecret] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [grow, setGrow] = useState(10);

  const [fox, setFox] = useState(normal);

  useEffect(() => {
    if (secret === 'activate') {
      setShowImage(true);

      const stepSize = (100 - 10) / 100;

      const increaseSize = () => {
        if (grow + stepSize < 100) {
          setGrow((prevWidth) => prevWidth + stepSize);
          requestAnimationFrame(increaseSize);
        } else {
          setGrow(100);
        }
      };
      requestAnimationFrame(increaseSize);
    }
  }, [secret, grow, fox]);

  return (
    <div className='container max-w-full h-screen flex flex-col'>
      <div className="navbar backdrop-filter backdrop-blur-md border-b-2">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-5 h-15 w-15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>TBD</a></li>
              <li><a>TBD</a></li>
              <li><a>TBD</a></li>
            </ul>
          </div>
        </div>
        <img src={logo} className="navbar-center w-2/12" />
        <div className="navbar-end">
        </div>
      </div>
      <div className="flex flex-1 justify-center mb-20 mt-10 max-h-full overflow-y-auto">
        {showImage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black bg-opacity-50">
            <img
              src={meatballMan}
              style={{width:`${grow}vh`}}
              className={`transition-all duration-0`}
            />
          </div>
        )}
        <Fox fox={fox} setFox={setFox}/>
        <ChatBox setSecret={setSecret} setFox={setFox} fox={fox}/>
      </div>
    </div >
  );
}

export default App;