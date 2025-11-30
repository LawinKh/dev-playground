import React from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import cap from "../assets/icons/Battery.svg";
import cellularConnection from "../assets/icons/Cellular-Connection.svg";
import wifi from "../assets/icons/Wifi.svg";
import pizza21 from "../assets/images/pizza2-1.png";
import "./Welcome.css";

export const Welcome: React.FC = () => {
  const history = useHistory();

  const handleGetStarted = () => {
    history.push("/home");
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

      <IonContent fullscreen className="welcome-content">
        <div className="welcome">
          <h1 className="app-title">Yummify</h1>

          <img className="pizza" alt="Pizza" src={pizza21} />

          <IonButton 
            expand="block" 
            size="large"
            className="get-started-button"
            onClick={handleGetStarted}
          >
            Get Started
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};