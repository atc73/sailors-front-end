import {useState, useEffect} from 'react'
import styles from './App.module.scss';
import SailorForm from './sailorForm';
import SailorList from './sailorList';

const App = () => {

  const [sailorList, setSailorList] = useState([])
  const [sailorToAdd, setSailorToAdd] = useState({
    firstName: '',
    lastName: ''
  });

  const fetchData = async () => {
    try {
        let response = await fetch('https://sailors-back-end-heroku.herokuapp.com/sailors');
        let data = await response.json();
        setSailorList(data);
    } catch (error) {
        alert(error)
    }
  }

const postData = async () => {
  try {
    await fetch(process.env.REACT_APP_BACK_END, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sailorToAdd),
    });
    fetchData()
  } catch (error) {
    alert(error)
  }
}

const deleteData = async (id) => {
  try {
    await fetch(process.env.REACT_APP_BACK_END +`/${id}`, {
      method: "delete"
    });
    fetchData()
  } catch (error) {
    alert(error)
  }
}
  
useEffect(() => {
  fetchData();
}, [])

const handleSubmit = (e) => {
  e.preventDefault()
  postData()
  setSailorToAdd({
    firstName: '',
    lastName: ''
  })
}

const handleDelete = (itemId) => {
  deleteData(itemId)
}


  return (
    <div className={styles.appContainer}>
      <SailorForm sailorToAdd={sailorToAdd} setSailorToAdd={setSailorToAdd} handleSubmit={handleSubmit} />
      <SailorList sailorList={sailorList} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
