@echo off
title Push Little Star Playhouse to GitHub
echo ========================================================
echo Little Star Playhouse - GitHub Deployment Helper
echo ========================================================
echo.
echo Adding all project files, images, logos and favicons...
git add .
git commit -m "Upload official logo, favicon, posters and images"
echo.
echo Pushing to GitHub repository...
echo (If prompted, please click 'Sign in with your browser' to authorize)
echo.
git push origin main
echo.
echo ========================================================
echo Deployment command finished!
echo Check https://www.littlestarplayhouse.com.np in 1-2 minutes.
echo ========================================================
pause
