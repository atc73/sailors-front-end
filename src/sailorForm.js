import React from 'react'
import styles from './sailorForm.module.scss'


const SailorForm = (props) => {
  return (
    <div className={styles.sailorFormContainer}>
        <form className={styles.sailorForm} onSubmit={props.handleSubmit}>
            <div className={styles.formSection}>
            <label>Prénom du matelot</label>
            <input type="text" value={props.sailorToAdd.firstName} onChange={(e) => props.setSailorToAdd({...props.sailorToAdd, firstName: e.target.value})} />
            </div>
            <div className={styles.formSection}>
            <label>Nom du matelot</label>
            <input type="text" value={props.sailorToAdd.lastName} onChange={(e) => props.setSailorToAdd({...props.sailorToAdd, lastName: e.target.value})} />
            </div>
            <button>Ajouter un marin</button>
        </form>
    </div>
  )
}

export default SailorForm