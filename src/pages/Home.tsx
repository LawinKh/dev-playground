import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonChip,
} from "@ionic/react";
import { heart, heartOutline, menu, add, timeOutline, flame, restaurant, search } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import cap from "../assets/icons/Battery.svg";
import cellularConnection from "../assets/icons/Cellular-Connection.svg";
import wifi from "../assets/icons/Wifi.svg";
import { buildApiUrl } from "../config/api";
import "./Home.css";

const Homepage: React.FC = () => {
  const history = useHistory();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // NO API KEY HERE! It's in .env
  
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      // Using buildApiUrl which gets the API key from .env
      const url = buildApiUrl('/recipes/random', { number: 5 });
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.recipes) {
        const formattedRecipes = data.recipes.map((recipe: any) => {
          const calories = recipe.nutrition?.nutrients?.find(
            (n: any) => n.name === "Calories"
          );
          
          return {
            id: recipe.id,
            title: recipe.title,
            liked: false,
            time: `${recipe.readyInMinutes || 30} min`,
            calories: `${Math.round(calories?.amount || 250)} kcal`,
            icon: restaurant,
            image: recipe.image
          };
        });
        setRecipes(formattedRecipes);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  const toggleLike = (id: number) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, liked: !recipe.liked } : recipe
    ));
  };

  const goToSearch = () => {
    history.push('/search');
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

      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear">
            <IonIcon icon={menu} />
          </IonButton>
          <IonTitle>My Recipes</IonTitle>
          <IonButton slot="end" fill="clear" onClick={goToSearch}>
            <IonIcon icon={search} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <div className="explore-section">
          <h2>Explore more recipes</h2>
          <IonButton fill="clear" onClick={goToSearch}>
            Explore
          </IonButton>
        </div>

        <IonGrid>
          <IonRow>
            {loading ? (
              <IonCol size="12">
                <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '2rem' }}>
                  Loading delicious recipes...
                </p>
              </IonCol>
            ) : recipes.length > 0 ? (
              recipes.map((recipe: any) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={recipe.id}>
                  <IonCard>
                    <div className="card-image-container">
                      {recipe.image ? (
                        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                      ) : (
                        <div className="recipe-placeholder">
                          <IonIcon icon={recipe.icon} className="recipe-type-icon" />
                        </div>
                      )}
                      <IonIcon
                        icon={recipe.liked ? heart : heartOutline}
                        className="like-icon"
                        color={recipe.liked ? "danger" : "medium"}
                        onClick={() => toggleLike(recipe.id)}
                      />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle>{recipe.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div className="recipe-info">
                        <IonChip outline color="primary">
                          <IonIcon icon={timeOutline} />
                          <span>{recipe.time}</span>
                        </IonChip>
                        <IonChip outline color="warning">
                          <IonIcon icon={flame} />
                          <span>{recipe.calories}</span>
                        </IonChip>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))
            ) : (
              <IonCol size="12">
                <p style={{ textAlign: 'center' }}>No recipes found. Try again!</p>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;

