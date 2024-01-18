import React from 'react';
import './cardStyle.css' 

const CardItem = ({ src, text, label, to }) => {
  return (
    <li className='cards__item'>
      <a href={to} target='_blank' rel='noopener noreferrer'>
        <div className='cards__item__div'>
          <figure className='cards__item__pic-wrap' data-category={label}>
            <img className='cards__item__img' alt='Travel Image' src={src} />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{text}</h5>
          </div>
        </div>
      </a>
    </li>
  );
};

export default CardItem;
