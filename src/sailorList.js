import React from 'react'
import styles from './sailorList.module.scss'

const SailorList = (props) => {
  return (
    <div className={styles.sailorListContainer}>
      {props.sailorList.map((item) => {
        return (
        <div className={styles.sailorCard} key={item._id}>
          <div className={styles.deleteSailor} onClick={()=> props.handleDelete(item._id)}>X</div>
          <div className={styles.sailorDetails}>{item.firstName} - {item.lastName}</div>
        </div>
        )
      })}
    </div>
  )
}

export default SailorList