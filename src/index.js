import ReactDOM from 'react-dom';
import init from './init.jsx'

const render = async () => {
  const vdom = await init();
  ReactDOM.render(
    vdom, document.querySelector('#root'),
  );
};

render();