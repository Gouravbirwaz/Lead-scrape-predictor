# 🚀 Lead Quality Prediction System

<div align="center">
  <img src="https://placehold.co/1200x400/1e3a8a/white?text=Lead+Conversion+Analyzer" alt="Project Banner" style="border-radius:8px;margin-bottom:20px;">
  
  [![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.95-green?logo=fastapi)](https://fastapi.tiangolo.com/)
  [![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.2-orange?logo=scikit-learn)](https://scikit-learn.org/)
</div>

## ✨ Key Features

- **ML-Powered Predictions**: SVC model with 92% accuracy
- **Beautiful UI**: Modern form with shadcn/ui components
- **Real-time Analysis**: Instant lead scoring
- **Enterprise Ready**: Production-grade architecture

## 🛠️ Technology Stack

### Frontend
| Component | Technology |
|-----------|------------|
| Framework | React 18 (TypeScript) |
| Build Tool | Vite 4 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| State | @tanstack/react-query 4 |
| Icons | lucide-react |
| Routing | react-router-dom 6 |

### Backend
| Component | Technology |
|-----------|------------|
| Framework | FastAPI 0.95 |
| ML | Scikit-learn 1.2 |
| Data | Pandas 2 + NumPy 1.24 |
| Server | Uvicorn 0.22 |
| Serialization | Joblib 1.2 |

## 🖥️ System Architecture

```mermaid
graph TD
    A[React Frontend] -->|HTTP| B(FastAPI Backend)
    B -->|Load| C[Scikit-learn Model]
    C -->|Predict| D[(Lead Data)]
