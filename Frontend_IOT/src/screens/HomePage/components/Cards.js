import React from 'react';
import '../style.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>For a Cleaner Environment</h1>
      <h3>Protecting you anytime, anywhere</h3>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/home.jpg'
              text='Air quality for home'
              label='Home'
              to='https://www.urbancooling.com/blog/what-impacts-air-quality-in-your-house'
            />
            <CardItem
              src='images/travel.jpg'
              text='Air quality during travel'
              label='Travel'
              to='https://en.baochinhphu.vn/monre-takes-action-to-control-air-pollution-by-2025-11140678.html'
            />
            <CardItem
              src='images/office.jpg'
              text='Air quality for offices'
              label='Office'
              to='https://www.wsps.ca/resource-hub/articles/returning-to-work-5-tips-to-improve-your-office-indoor-air-quality'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/school.jpg'
              text='Air quality for schools'
              label='School'
              to='https://lynxac.com/indoor-air-quality-in-schools-let-our-children-breathe/'
            />
            <CardItem
              src='images/hospital.jpg'
              text='Air quality for hospitals'
              label='Hospitals'
              to='https://www.linkedin.com/pulse/importance-air-quality-hospital-patients-gemma-quinn/'
            />
            <CardItem
              src='images/mall.jpg'
              text='Air quality for malls'
              label='Malls'
              to='https://www.linkedin.com/pulse/importance-air-quality-hospital-patients-gemma-quinn/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;