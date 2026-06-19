@echo off
echo Starting RenalAI Full-Stack Application...

:: Start Backend in a new window
start cmd /k "cd backend && echo Checking AI Models... && python train_model.py && echo Starting API... && python app.py"

:: Start Frontend in current window
cd frontend
echo Starting Frontend Dashboard...
npm run dev
