import { createRoot } from 'react-dom/client';
import init from './init.jsx';

const render = async () => {
  const vdom = await init();
  const root = createRoot(document.querySelector('#root'));
  root.render(vdom);
};

render();
