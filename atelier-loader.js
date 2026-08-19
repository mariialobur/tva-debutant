if(!document.querySelector('link[data-atelier-practice]')){
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='./atelier-practice.css?v=1.0.0';
  link.dataset.atelierPractice='1';
  document.head.appendChild(link);
}
import './atelier-practice.js';
import './atelier-fiscal-note.js';
