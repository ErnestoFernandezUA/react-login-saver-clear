import ReactDOM from 'react-dom/client';
import { 
  HashRouter, 
} from 'react-router-dom';
import { App } from './App';

const Root = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Root />);
