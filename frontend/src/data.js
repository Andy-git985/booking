import andre from './assets/images/andre-reis-_XD3D9pH83k-unsplash.jpg';
import obi from './assets/images/obi-pixel7propix--sRVfY0f2d8-unsplash.jpg';
import salah from './assets/images/salah-regouane-Z2WfmQC-sVk-unsplash.jpg';
import haircut from './assets/images/hair-spies-ClilMdu189E-unsplash.jpg';
import beard from './assets/images/allef-vinicius-IvQeAVeJULw-unsplash.jpg';
import shave from './assets/images/christoffer-engstrom-1ouGlRChSbY-unsplash.jpg';

export const links = [
  { id: 1, name: 'Home', path: '/', loggedIn: true },
  { id: 2, name: 'Reserve Class', path: '/reserve', loggedIn: true },
  { id: 3, name: 'Add Class', path: '/add', loggedIn: true },
  { id: 4, name: 'Register', path: '/user/register', loggedIn: false },
  { id: 5, name: 'Login', path: '/user/login', loggedIn: false },
  { id: 6, name: 'Profile', path: '/user/profile', loggedIn: true },
];

export const roles = [
  { id: 1, title: 'Client', data: 'client' },
  { id: 2, title: 'Admin', data: 'admin' },
];

export const times = [
  { id: 1, time: '09:00:00-05:00' },
  { id: 2, time: '10:00:00-05:00' },
  { id: 3, time: '11:00:00-05:00' },
  // { id: 4, time: '12:00:00-05:00' },
  // { id: 5, time: '13:00:00-05:00' },
  // { id: 6, time: '14:00:00-05:00' },
  // { id: 7, time: '15:00:00-05:00' },
  // { id: 8, time: '16:00:00-05:00' },
  // { id: 9, time: '17:00:00-05:00' },
  // { id: 10, time: '18:00:00-05:00' },
  // { id: 11, time: '19:00:00-05:00' },
];

export const services = [
  {
    id: 1,
    name: 'Haircut',
    image: haircut,
    description: `Experience the best in men's grooming with our expert haircut service. Our skilled barbers will give you a precision cut that is tailored to your unique style and preferences. We use only the finest quality tools and products to ensure that your hair looks and feels amazing. Come visit us and leave feeling confident and refreshed!`,
  },
  {
    id: 2,
    name: 'Beard Trim',
    image: beard,
    description: `Transform your look with our professional beard trim service. Our experienced barbers will help you achieve the perfect style for your beard, whether you want a classic or modern look. We use top-quality tools and products to ensure that your beard is trimmed to perfection. Come visit us and leave with a fresh and polished look that is sure to turn heads.`,
  },
  {
    id: 3,
    name: 'Straight Razor Shave',
    image: shave,
    description: `Experience the ultimate in relaxation and grooming with our professional shave service. We take the time to ensure that your skin is properly prepared and moisturized, leaving you feeling refreshed and rejuvenated. Come visit us and indulge in the ultimate shave experience.`,
  },
];

export const employees = [
  {
    id: 1,
    name: 'Andre',
    image: andre,
    profile: `Andre has honed his skills and techniques to deliver top-notch grooming services.In his free time, Andre enjoys exploring the outdoors and staying active. He loves hiking, running, and playing sports, and is always up for a new adventure. When he's not outdoors, Andre enjoys reading books on history and watching classic films.`,
  },
  {
    id: 2,
    name: 'Obi',
    image: obi,
    profile: `Meet Obi, our skilled and talented barber who is dedicated to providing his clients with top-notch grooming services. He loves to travel and discover new cultures, and is always planning his next adventure. When he's not cooking or traveling, Obi enjoys playing basketball and staying active.`,
  },
  {
    id: 3,
    name: 'Salah',
    image: salah,
    profile: `With a natural talent for hair cutting and styling, Salah takes pride in helping his clients achieve the perfect look. In his free time, Salah enjoys painting and drawing, and is always exploring new artistic techniques and styles. He also loves listening to music and attending concerts, and is a big fan of classic rock and jazz.`,
  },
];
