@echo off
echo Starting JPL Bidding Platform...
echo.
echo Starting Backend Server...
start "JPL Backend" cmd /k "cd backend && npm install && npm start"
echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend...
start "JPL Frontend" cmd /k "cd frontend && npm install && npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
pause
