import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';

import PageNotFound from './pages/PageNotFound';
import ProductDetails from './pages/ProductDetails';
import Signup from './pages/Signup';
import ConfigAccount from './pages/ConfigAccount';
import Carrinho from './pages/Carrinho';
import CompletePurchase from './pages/CompletePurchase';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={Login} path='/login' />
        <Route component={Signup} path='/signup' />
        <Route component={ProductDetails} path='/productDetails/:id' />
        <Route component={ConfigAccount} path='/configAccount/:id' />
        <Route component={Carrinho} path='/carrinho' exact />
        <Route component={CompletePurchase} path='/carrinho/finalizar-compra' exact />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}