import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { Welcome } from './pages/Welcome';
import Search from './pages/Search';
import Navigation from './pages/Navigation';
import AddRecipe from './pages/Add_recipe';
import Favorites from './pages/Favorites';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
        
        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/search">
          <Search />
        </Route>

        <Route exact path="/navigation">
          <Navigation />
        </Route>
        
        <Route exact path="/add-recipe">
          <AddRecipe />
        </Route>
        
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        
        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
