import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {  
  const [data, setData] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_API_KEY = process.env.NASA_API_KEY;
      console.log('key',NASA_API_KEY);
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_API_KEY}`;
      const today = (new Date()).toDateString();
      const localKey = `NASA-${today}`;
      if(localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log('Fetched from cache today');
        return;
      }
      localStorage.clear();
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        console.log('Fetched from API today');
      }catch(err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (<Main data={data}></Main>): (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      { showModal && 
        (
          <SideBar data={data} handleToggleModal={handleToggleModal}></SideBar>
        ) 
      }
      <Footer data={data} handleToggleModal={handleToggleModal}></Footer>
    </>
  )
}

export default App
