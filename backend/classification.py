# train_and_export.py
"""
1. Preprocesses data
2. Trains a SVC model with full pipeline
3. Saves the pipeline and label encoder for API use
"""

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix
import seaborn as sn
import joblib

# Load data
data_set = pd.read_csv(r"C:\Users\Acer\Desktop\intern\dataset\Lead Scoring.csv")
data_set.dropna(inplace=True)

# Split features and target
x_data = data_set.drop(columns=["Lead Quality", "Prospect ID", "Lead Number"], errors='ignore')
y_data = data_set["Lead Quality"]

# Identify column types
x_numerical_columns = x_data.select_dtypes(include=["int64", "float64"]).columns.tolist()
x_categorical_columns = x_data.select_dtypes(include=["object"]).columns.tolist()

# Preprocessors
y_encoder = LabelEncoder()
y_encoded = y_encoder.fit_transform(y_data)

transformer = ColumnTransformer(
    transformers=[
        ("scaler", StandardScaler(), x_numerical_columns),
        ("encoder", OneHotEncoder(handle_unknown="ignore"), x_categorical_columns)
    ]
)

# Create full pipeline
full_pipeline = Pipeline([
    ("preprocessing", transformer),
    ("classifier", SVC(kernel='poly', C=1.0, gamma='scale', random_state=42))
])

# Train
x_train, x_test, y_train, y_test = train_test_split(x_data, y_encoded, test_size=0.2, random_state=42)
full_pipeline.fit(x_train, y_train)

# Evaluate
y_pred = full_pipeline.predict(x_test)
print("Accuracy:", round(accuracy_score(y_test, y_pred), 2))

cm = confusion_matrix(y_test, y_pred)
sn.heatmap(cm, annot=True)

# Save
joblib.dump(full_pipeline, "lead_scoring_pipeline.pkl")
joblib.dump(y_encoder, "label_encoder.pkl")

# Save column names for FastAPI
FEATURE_COLUMNS = x_data.columns.tolist()
joblib.dump(FEATURE_COLUMNS, "feature_columns.pkl")
