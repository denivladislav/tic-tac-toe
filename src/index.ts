import { createRoot } from 'react-dom/client';
import init from './init';

const render = async (): Promise<void> => {
  const vdom = await init();
  const root = createRoot(document.querySelector('#root')!);
  root.render(vdom);
};

render();
