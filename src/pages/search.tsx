import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
} from "@ionic/react";
import { arrowBack, search as searchIcon, timeOutline, flame } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import cap from "../assets/icons/Battery.svg";
import cellularConnection from "../assets/icons/Cellular-Connection.svg";
import wifi from "../assets/icons/Wifi.svg";
import prepFoodImage from "../assets/images/prep_food.jpg";
import { buildApiUrl } from "../config/api";
import "./search.css";

export const Search: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [recipeDetails, setRecipeDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleBack = () => {
    history.goBack();
  };

  const handleRecipeClick = async (recipeId: number) => {
    setLoadingDetails(true);
    setSelectedRecipe(recipeId);

    try {
      const url = buildApiUrl(`/recipes/${recipeId}/information`, {});
      const response = await fetch(url);
      const data = await response.json();
      setRecipeDetails(data);
      setLoadingDetails(false);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setLoadingDetails(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null);
    setRecipeDetails(null);
  };

  const handleSearch = async (value: string) => {
    if (!value || value.trim().length === 0) {
      setRecipes([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const url = buildApiUrl('/recipes/complexSearch', {
        query: value,
        number: 10,
        addRecipeInformation: true
      });
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        const formattedRecipes = data.results.map((recipe: any) => ({
          id: recipe.id,
          title: recipe.title,
          time: `${recipe.readyInMinutes || 30} min`,
          calories: `${Math.round(recipe.nutrition?.nutrients?.[0]?.amount || 250)} kcal`,
          image: recipe.image
        }));
        setRecipes(formattedRecipes);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e: CustomEvent) => {
    const value = e.detail.value || "";
    setSearchText(value);
    
    // Auto-search when user types (after debounce)
    if (value && value.trim().length > 2) {
      handleSearch(value);
    } else if (value.trim().length === 0) {
      setRecipes([]);
      setSearched(false);
    }
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
          <div className="status-icons-group">
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

      <IonContent fullscreen className="search-content">
        <div className="search-page">
          <IonButton 
            fill="clear" 
            className="back-button"
            onClick={handleBack}
          >
            <IonIcon icon={arrowBack} className="back-icon" />
          </IonButton>

          <div className="search-header">
            <h1 className="search-title">Search Recipes</h1>
          </div>

          <p className="discover-text">
            Discover recipes from our global database. Search by name or main ingredient.
          </p>

          <div className="search-image-container">
            <img src={prepFoodImage} alt="Food preparation" className="search-bg-image" />
            
            <div className="search-bar-wrapper">
              <div className="searchbar-container">
                <IonSearchbar
                  value={searchText}
                  onIonInput={handleSearchChange}
                  placeholder="e.g. Chocolate brownies"
                  className="custom-searchbar"
                  debounce={800}
                  showClearButton="focus"
                />
                <IonIcon icon={searchIcon} className="search-icon-end" />
              </div>
            </div>
          </div>

          <div className="recipes-found">
            <p>{loading ? "Searching..." : `${recipes.length} Recipes Found`}</p>
          </div>

          <IonGrid>
            <IonRow>
              {searched && !loading && recipes.length === 0 ? (
                <IonCol size="12">
                  <p className="search-results-empty">
                    No recipes found. Try a different search term.
                  </p>
                </IonCol>
              ) : (
                recipes.map((recipe) => (
                  <IonCol size="12" sizeMd="6" sizeLg="4" key={recipe.id}>
                    <IonCard button onClick={() => handleRecipeClick(recipe.id)}>
                      <img src={recipe.image} alt={recipe.title} className="search-result-image" />
                      <IonCardHeader>
                        <IonCardTitle>{recipe.title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <div className="search-result-chips">
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
              )}
            </IonRow>
          </IonGrid>
        </div>

        {/* Recipe Details Modal */}
        {selectedRecipe && (
          <div className="recipe-details-modal">
            <div className="recipe-details-content">
              <IonButton 
                fill="clear" 
                className="close-button"
                onClick={handleCloseDetails}
              >
                <IonIcon icon={arrowBack} />
              </IonButton>

              {loadingDetails ? (
                <div className="loading-details">
                  <p>Loading recipe details...</p>
                </div>
              ) : recipeDetails ? (
                <div className="recipe-details-scroll">
                  <img src={recipeDetails.image} alt={recipeDetails.title} className="recipe-detail-image" />
                  
                  <div className="recipe-detail-header">
                    <h2>{recipeDetails.title}</h2>
                    <div className="recipe-meta">
                      <IonChip color="primary">
                        <IonIcon icon={timeOutline} />
                        <span>{recipeDetails.readyInMinutes} min</span>
                      </IonChip>
                      <IonChip color="success">
                        <span>Servings: {recipeDetails.servings}</span>
                      </IonChip>
                    </div>
                  </div>

                  <div className="recipe-section">
                    <h3>Ingredients</h3>
                    <ul>
                      {recipeDetails.extendedIngredients?.map((ingredient: any, index: number) => (
                        <li key={index}>{ingredient.original}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="recipe-section">
                    <h3>Instructions</h3>
                    {recipeDetails.analyzedInstructions?.[0]?.steps ? (
                      <ol>
                        {recipeDetails.analyzedInstructions[0].steps.map((step: any) => (
                          <li key={step.number}>{step.step}</li>
                        ))}
                      </ol>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions || 'No instructions available.' }} />
                    )}
                  </div>

                  {recipeDetails.summary && (
                    <div className="recipe-section">
                      <h3>Summary</h3>
                      <div dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Search;
