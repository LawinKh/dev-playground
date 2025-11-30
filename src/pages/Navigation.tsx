import React from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { home, search, add, heart, person, restaurant } from "ionicons/icons";
import "./Navigation.css";

export const Navigation: React.FC = () => {
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Navigation</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="navigation-content">
        <div className="navigation-container">
          <h2 className="navigation-title">Yummify</h2>
          <p className="navigation-subtitle">Navigate to any page</p>

          <IonList className="navigation-list">
            <IonItem button onClick={() => navigateTo('/welcome')} className="nav-item">
              <IonIcon icon={restaurant} slot="start" className="nav-icon" />
              <IonLabel>
                <h2>Welcome</h2>
                <p>Get started with Yummify</p>
              </IonLabel>
            </IonItem>

            <IonItem button onClick={() => navigateTo('/home')} className="nav-item">
              <IonIcon icon={home} slot="start" className="nav-icon" />
              <IonLabel>
                <h2>Home</h2>
                <p>View your recipe collection</p>
              </IonLabel>
            </IonItem>

            <IonItem button onClick={() => navigateTo('/search')} className="nav-item">
              <IonIcon icon={search} slot="start" className="nav-icon" />
              <IonLabel>
                <h2>Search Recipes</h2>
                <p>Discover recipes from our global database</p>
              </IonLabel>
            </IonItem>

            <IonItem button className="nav-item disabled">
              <IonIcon icon={add} slot="start" className="nav-icon" />
              <IonLabel>
                <h2>Add Recipe</h2>
                <p>Create your own recipe (Coming soon)</p>
              </IonLabel>
            </IonItem>

            <IonItem button className="nav-item disabled">
              <IonIcon icon={heart} slot="start" className="nav-icon" />
              <IonLabel>
                <h2>Favorites</h2>
                <p>View your liked recipes (Coming soon)</p>
              </IonLabel>
            </IonItem>

            <IonItem button className="nav-item disabled">
              <IonIcon icon={person} slot="start" className="nav-icon" />
              <IonLabel>
                <h2>Profile</h2>
                <p>Manage your account (Coming soon)</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Navigation;