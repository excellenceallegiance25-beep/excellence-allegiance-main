@echo off
echo Testing OTP System (Console Version)...
echo.

echo Sending OTP request...
curl -X POST http://localhost:5000/api/auth/send-otp ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"pujaparosaha9382@gmail.com\",\"name\":\"EAPL TECHHUB\"}"

echo.
echo.
echo Check your backend server console for OTP!
echo Also check response above for OTP.
pause