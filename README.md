# Crop Yield Prediction System

A full-stack application for predicting crop yields using machine learning, built with Next.js frontend and FastAPI backend.

## Features

- 🔐 Firebase Authentication (Email/Password & Google Sign-in)
- 🏡 Farm Management System
- 🤖 ML-powered Crop Yield Predictions
- 📊 Prediction History and Analytics
- 🌤️ Real-time Weather Integration
- 📱 Responsive Design

## Project Structure

\`\`\`
crop-yield-prediction/
├── frontend/              # Next.js React application
├── backend/              # FastAPI Python backend
│   ├── ml_models/       # Trained ML models
│   └── requirements.txt
├── database/            # Firestore configuration
└── README.md
\`\`\`

## Local Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Firebase project with Firestore enabled
- OpenWeatherMap API key (optional)

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Create virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Create `.env` file from `.env.example` and add your Firebase credentials

5. Add your Firebase service account JSON file as `firebase-service-account.json`

6. Create `ml_models` directory and add your trained model files:
\`\`\`bash
mkdir ml_models
# Copy your yield_model.pkl and label_encoder.pkl files here
\`\`\`

7. Run the backend:
\`\`\`bash
uvicorn main:app --reload
\`\`\`

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create `.env.local` file from `.env.local.example` and add your Firebase config

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Frontend will be available at `http://localhost:3000`

## Firebase Configuration

### Firestore Security Rules

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User's farms
      match /farms/{farmId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // User's predictions
      match /predictions/{predictionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
\`\`\`

## API Endpoints

- `POST /api/predict` - Make crop yield prediction
- `POST /api/add-farm` - Add new farm
- `GET /api/get-farms` - Get user's farms
- `GET /api/get-predictions` - Get prediction history
- `POST /api/update-profile` - Update user profile

## ML Model Integration

The system uses a pre-trained CatBoost regression model for yield prediction. The model expects the following features:

- Crop type (encoded)
- Farm area (hectares)
- Soil nutrients (N, P, K)
- Weather data (temperature, humidity, rainfall)
- Fertilizer and pesticide usage

## Environment Variables

See `.env.example` files for required environment variables.

## Security

- Firebase ID token verification for all API requests
- Firestore security rules restrict access to user's own data
- Environment variables for sensitive configuration
- CORS configuration for frontend-backend communication

## Development

- Frontend: React with TypeScript, Tailwind CSS, shadcn/ui components
- Backend: FastAPI with Pydantic models, Firebase Admin SDK
- Database: Firestore with structured collections
- ML: CatBoost regression model with scikit-learn preprocessing

## License

MIT License
# SIH4
