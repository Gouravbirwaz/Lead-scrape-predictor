from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import io
import numpy as np

model = joblib.load("lead_scoring_pipeline.pkl")
label_encoder = joblib.load("label_encoder.pkl")
FEATURE_COLUMNS = joblib.load("feature_columns.pkl")

app = FastAPI(
    title="ML-Powered Lead Scoring API",
    description="Scores lead quality based on structured CRM lead data",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class LeadRequest(BaseModel): 
    data: dict

class PredictionResponse(BaseModel):
    prediction: str
    quality_score: float
    accepted: bool
    prediction_confidence: float
    features_used: list[str]

@app.get("/")
def root():
    return {"message": "✅ Lead Scoring API is up and running!"}

@app.post("/predict", response_model=PredictionResponse)
def predict_single(lead: LeadRequest):
    try:
        df = pd.DataFrame([lead.data])
        
        df = df.reindex(columns=FEATURE_COLUMNS, fill_value=np.nan) 
        decision_scores = model.decision_function(df)[0]
        predicted_class_idx = np.argmax(decision_scores) 
        
        prediction = model.predict(df)
        label = label_encoder.inverse_transform(prediction)[0]

        quality_score = 0.0
        accepted = False
        prediction_confidence_val = 0.0
        
        if label == 'High':
            quality_score = 0.9 
            accepted = True
            prediction_confidence_val = 0.95 
        elif label == 'Medium':
            quality_score = 0.7
            accepted = True 
            prediction_confidence_val = 0.8
        else:
            quality_score = 0.3
            accepted = False
            prediction_confidence_val = 0.7

        features_used_list = list(lead.data.keys())[:4] 

        return {
            "prediction": label,
            "quality_score": quality_score,
            "accepted": accepted,
            "prediction_confidence": prediction_confidence_val,
            "features_used": features_used_list
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")

@app.post("/predict_csv")
async def predict_csv(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
        df = df.reindex(columns=FEATURE_COLUMNS, fill_value=np.nan) 
        predictions = model.predict(df)
        labels = label_encoder.inverse_transform(predictions)
        return {"predictions": labels.tolist()}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"CSV error: {str(e)}")
