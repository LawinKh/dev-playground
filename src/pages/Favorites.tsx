import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
} from "@ionic/react";
import { arrowBack, heart } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import cap from "../assets/icons/Battery.svg";
import cellularConnection from "../assets/icons/Cellular-Connection.svg";
import wifi from "../assets/icons/Wifi.svg";
import "./Favorites.css";

interface FavoriteRecipe {
  id: number;
  title: string;
  image: string;
}

export const Favorites: React.FC = () => {
  const history = useHistory();
  
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([
    {
      id: 1,
      title: "Egg and Avocado Toast",
      image: "https://spoonacular.com/recipeImages/715538-312x231.jpg"
    },
    {
      id: 2,
      title: "Fruit pastry",
      image: "https://spoonacular.com/recipeImages/716627-312x231.jpg"
    },
    {
      id: 3,
      title: "Waffles with Berries",
      image: "https://spoonacular.com/recipeImages/664147-312x231.jpg"
    }
  ]);

  const handleBack = () => {
    history.goBack();
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <IonPage>
      <div className="status-bar">
        <div className="iphone-x-status-bars">
          <div className="time-style">
            <div className="time">{currentTime}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <img className="cellular-connection" alt="Cellular connection" src={cellularConnection} />
            <img className="wifi" alt="Wifi" src={wifi} />
            <div className="battery">
              <div className="border" />
              <img className="cap" alt="Cap" src={cap} />
              <div className="capacity" />
            </div>
          </div>
        </div>
      </div>

      <IonContent fullscreen className="favorites-content">
        <div className="favorites-page">
          <IonButton 
            fill="clear" 
            className="back-button"
            onClick={handleBack}
          >
            <IonIcon icon={arrowBack} className="back-icon" />
          </IonButton>

          <div className="favorites-header">
            <h1 className="favorites-title">Favorites</h1>
          </div>

          <IonList className="favorites-list">
            {favorites.map((recipe) => (
              <IonItem key={recipe.id} className="favorite-item" lines="none">
                <div className="favorite-item-content">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="favorite-image"
                  />
                  <div className="favorite-info">
                    <h2 className="favorite-name">{recipe.title}</h2>
                  </div>
                  <IonIcon
                    icon={heart}
                    className="favorite-heart-icon"
                    onClick={() => removeFavorite(recipe.id)}
                  />
                </div>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
