@echo off
echo ========================================
echo Starting PrimePick E-commerce
echo ========================================
echo.

:: Check if MongoDB is running
echo Checking MongoDB...
sc query MongoDB > nul 2>&1
if %errorlevel%==0 (
    echo MongoDB is already running
) else (
    echo Starting MongoDB...
    net start MongoDB 2>nul || (
        echo MongoDB service not found. Starting mongod directly...
        start /min cmd /c mongod
    )
)

timeout /t 3 > nul

:: Start Backend
echo.
echo Starting Backend Server on port 5000...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)
start cmd /k "npm run dev"

:: Wait for backend to start
echo Waiting for backend to initialize...
timeout /t 5 > nul

:: Seed database
echo.
echo Checking database seed...
start cmd /c "npm run seed"

:: Start Frontend
echo.
echo Starting Frontend on port 3000...
cd ../frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)
start cmd /k "npm run dev"

echo.
echo ========================================
echo Application Starting...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Wait 10 seconds for all services to start
echo ========================================
timeout /t 10
start http://localhost:3000