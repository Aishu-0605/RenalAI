# RenalAI: AI-Assisted Kidney Disease Detection

RenalAI is a professional medical platform designed for doctors to detect early kidney disease using AI. It analyzes both patient clinical data and CT scan images to provide a risk classification and diagnostic report.

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js & npm (for frontend)

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Train/Initialize the AI models:
   ```bash
   python train_model.py
   ```
4. Start the Flask API:
   ```bash
   python app.py
   ```
   The API will run on `http://localhost:5000`.

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:3000`.

## 🧠 AI Model Details
- **Tabular Risk Model**: A Random Forest Classifier trained on clinical parameters (creatinine, blood pressure, etc.).
- **Image Analysis Model**: A Convolutional Neural Network (CNN) designed to classify kidney CT scans into categories: Normal, Cyst, Tumor, or Stone.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Recharts, Framer Motion.
- **Backend**: Python Flask, Scikit-learn, TensorFlow/Keras, Pandas, NumPy.
- **Design**: Premium hospital dashboard theme with high-contrast medical aesthetics.
