import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle
import os

# Create a synthetic dataset for Kidney Disease Risk (Tabular)
# Features: Age, Blood Pressure, Serum Creatinine, albumin, sugar, hemoglobin
def train_tabular_model():
    print("Training Tabular Model...")
    np.random.seed(42)
    n_samples = 1000
    
    data = {
        'age': np.random.randint(20, 90, n_samples),
        'blood_pressure': np.random.randint(60, 180, n_samples),
        'creatinine': np.random.uniform(0.5, 15.0, n_samples),
        'albumin': np.random.randint(0, 6, n_samples),
        'sugar': np.random.randint(0, 6, n_samples),
        'hemoglobin': np.random.uniform(3, 18, n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Simple logic for risk score
    score = (df['creatinine'] * 2) + (df['blood_pressure'] / 20) + (df['albumin'] * 3) - (df['hemoglobin'])
    df['risk'] = pd.cut(score, bins=[-np.inf, 10, 25, np.inf], labels=[0, 1, 2]).astype(int)
    # 0: Low, 1: Medium, 2: High

    X = df.drop('risk', axis=1)
    y = df['risk']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    with open('risk_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    print("Tabular model saved as risk_model.pkl")

def create_mock_image_model():
    # Since training a real CNN requires a large dataset and GPU, 
    # we'll save a script that simulates a model structure.
    # For this demo, we'll use a simple approach or a pre-trained structure if needed.
    # But to keep it "real working" without 2GB of weights, 
    # we'll use a simple function in the app, or save a tiny model.
    import tensorflow as tf
    from tensorflow.keras import layers, models

    print("Creating Image classification model structure...")
    model = models.Sequential([
        layers.Input(shape=(150, 150, 3)),
        layers.Conv2D(32, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(4, activation='softmax') # Normal, Cyst, Tumor, Stone
    ])
    
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    model.save('kidney_image_model.h5')
    print("Image model structure saved as kidney_image_model.h5")

if __name__ == "__main__":
    train_tabular_model()
    create_mock_image_model()
