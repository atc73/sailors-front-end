import {useState, useEffect} from 'react'
import styles from './App.module.scss';
import SailorForm from './sailorForm';
import SailorList from './sailorList';

const App = () => {

  const [sailorList, setSailorList] = useState([])
  const [isError, setIsError] = useState(false);
  const [sailorToAdd, setSailorToAdd] = useState({
    firstName: '',
    lastName: ''
  });

  const fetchData = async () => {
    try {
        let response = await fetch('https://sailors-back-end-heroku.herokuapp.com/sailors');
        if (response.status === 200) {
            let data = await response.json();
            setSailorList(data);
        } else {
            throw 'Error fetching users list'
        }
    } catch (error) {
        setIsError(true)
    }
  }

const postData = async () => {
  try {
    const response = await fetch(`https://sailors-back-end-heroku.herokuapp.com/sailors`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sailorToAdd),
    });
    fetchData()
  } catch (error) {
    throw 'Error fetching users list'
  }
}

const deleteData = async (id) => {
  try {
    const response = await fetch(`https://sailors-back-end-heroku.herokuapp.com/sailors/${id}`, {
      method: "delete"
    });
    fetchData()
  } catch (error) {
    throw 'Error fetching users list'
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
      {isError ? <h3> Une erreur est survenue. Rechargez la page.</h3> : <SailorList sailorList={sailorList} handleDelete={handleDelete} />
      }
    </div>
  );
}

export default App;
