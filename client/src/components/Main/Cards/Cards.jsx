import React from 'react';
import style from './Cards.module.css';
import Card from '../Card/Card';

function Cards() {
  return (
    <div className={style.container}>
      Cards component
      <Card />
    </div>
  )
}

export default Cards;