import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { arrowBack, star, starOutline, camera } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import cap from "../assets/icons/Battery.svg";
import cellularConnection from "../assets/icons/Cellular-Connection.svg";
import wifi from "../assets/icons/Wifi.svg";
import "./Add_recipe.css";

export const AddRecipe: React.FC = () => {
  const history = useHistory();
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState(3);
  const [prepTime, setPrepTime] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleBack = () => {
    history.goBack();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateRecipe = () => {
    console.log({
      recipeName,
      ingredients,
      instructions,
      difficulty,
      prepTime,
      image: selectedImage,
    });
    // Add your recipe creation logic here
    alert("Recipe created successfully!");
  };

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <IonPage>
      <div className="status-bar">
        <div className="iphone-x-status-bars">
          <div className="time-style">
            <div className="time">{currentTime}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img
              className="cellular-connection"
              alt="Cellular connection"
              src={cellularConnection}
            />
            <img className="wifi" alt="Wifi" src={wifi} />
            <div className="battery">
              <div className="border" />
              <img className="cap" alt="Cap" src={cap} />
              <div className="capacity" />
            </div>
          </div>
        </div>
      </div>

      <IonContent fullscreen className="add-recipe-content">
        <div className="add-recipe-page">
          <IonButton
            fill="clear"
            className="back-button"
            onClick={handleBack}
          >
            <IonIcon icon={arrowBack} className="back-icon" />
          </IonButton>

          <div className="page-header">
            <h1 className="page-title">Add Recipe</h1>
          </div>

          <div className="form-container">
            <IonItem className="input-item">
              <IonInput
                value={recipeName}
                placeholder="Recipe name"
                onIonInput={(e) => setRecipeName(e.detail.value!)}
                className="custom-input"
              />
            </IonItem>

            <IonItem className="input-item">
              <IonInput
                value={ingredients}
                placeholder="Ingredients"
                onIonInput={(e) => setIngredients(e.detail.value!)}
                className="custom-input"
              />
            </IonItem>

            <IonItem className="textarea-item">
              <IonTextarea
                value={instructions}
                placeholder="Instructions"
                onIonInput={(e) => setInstructions(e.detail.value!)}
                rows={6}
                className="custom-textarea"
              />
            </IonItem>

            <div className="difficulty-section">
              <IonLabel className="section-label">Difficulty:</IonLabel>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IonIcon
                    key={star}
                    icon={star <= difficulty ? starOutline : starOutline}
                    className={`star ${star <= difficulty ? "active" : ""}`}
                    onClick={() => setDifficulty(star)}
                  />
                ))}
              </div>
            </div>

            <div className="prep-time-section">
              <IonLabel className="section-label">Prep time:</IonLabel>
              <div className="prep-time-input-wrapper">
                <IonInput
                  type="number"
                  value={prepTime}
                  onIonInput={(e) => setPrepTime(e.detail.value!)}
                  className="prep-time-input"
                  min="0"
                />
                <span className="minutes-label">minutes</span>
              </div>
            </div>

            <div className="upload-section">
              <label htmlFor="photo-upload" className="upload-label">
                <IonIcon icon={camera} className="camera-icon" />
                <span className="upload-text">Upload a photo</span>
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="image-preview"
                />
              )}
            </div>

            <IonButton
              expand="block"
              className="create-recipe-button"
              onClick={handleCreateRecipe}
            >
              Create Recipe
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddRecipe;
