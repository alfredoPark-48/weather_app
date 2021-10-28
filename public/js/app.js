'use strict';

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const iconContainer = document.querySelector('#icon');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = '';
  messageTwo.textContent = '';

  const location = search.value;

  if (!location) {
    messageOne.textContent = 'Must submit a valid location!';
  } else {
    fetch(`/weather?address=${location}`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        if (data.err) {
          messageOne.textContent = data.err;
        } else {
          if (iconContainer.hasChildNodes()) {
            iconContainer.removeChild(iconContainer.lastElementChild);
          }

          const icon = document.createElement('img');
          icon.src = data.forecast.icon;
          icon.setAttribute('class', 'icon');
          iconContainer.appendChild(icon);

          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast.description;
        }
      });
    });
  }

  // console.log(location);
});
