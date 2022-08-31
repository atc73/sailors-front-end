import { useState, useEffect } from 'react';
import styles from './App.module.scss';
import SailorForm from './sailorForm';
import SailorList from './sailorList';

const App = () => {
  // état qui contient la liste des marins enregistrés
  const [sailorList, setSailorList] = useState([]);

  // état pour le prénom et le nom du formulaire
  const [sailorToAdd, setSailorToAdd] = useState({
    firstName: '',
    lastName: '',
  });

  // Fonction asynchrone qui obtient la liste des tous les marins
  const fetchData = async () => {
    try {
      let response = await fetch(process.env.REACT_APP_BACK_END);
      let data = await response.json();
      setSailorList(data);
    } catch (error) {
      alert(error);
    }
  };

  // Fonction asynchrone qui ajoute un marin
  const postData = async () => {
    try {
      await fetch(process.env.REACT_APP_BACK_END, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sailorToAdd),
      });
      fetchData();
    } catch (error) {
      alert(error);
    }
  };

  // Fonction asynchrone qui supprime un marin en fonction de son id
  const deleteData = async (id) => {
    try {
      await fetch(process.env.REACT_APP_BACK_END + `/${id}`, {
        method: 'delete',
      });
      fetchData();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Déclenche la fonction qui ajoute un marin et réinitialise l'état du marin à ajouter
  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    setSailorToAdd({
      firstName: '',
      lastName: '',
    });
  };

  // Déclenche la fonction qui supprime un marin
  const handleDelete = (itemId) => {
    deleteData(itemId);
  };

  return (
    <div className={styles.appContainer}>
      {/* Formulaire pour ajouter un marin */}
      <SailorForm
        sailorToAdd={sailorToAdd}
        setSailorToAdd={setSailorToAdd}
        handleSubmit={handleSubmit}
      />

      {/* Liste de tous les marins enregistrés */}
      <SailorList sailorList={sailorList} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
