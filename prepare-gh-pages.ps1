# Script to prepare GitHub Pages deployment
# Usage: .\prepare-gh-pages.ps1

Write-Host "=== Preparing GitHub Pages deployment ===" -ForegroundColor Cyan
Write-Host ""

# Build project
Write-Host "1. Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix errors first." -ForegroundColor Red
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host ""

# Check dist/index.html
Write-Host "2. Checking dist/index.html..." -ForegroundColor Yellow
$distIndex = Get-Content "dist\index.html" -Raw
if ($distIndex -match "/src/main.tsx") {
    Write-Host "ERROR: dist/index.html still contains /src/main.tsx!" -ForegroundColor Red
    exit 1
} else {
    Write-Host "dist/index.html looks correct" -ForegroundColor Green
}

if ($distIndex -match "/greeting-animation-art/assets/") {
    Write-Host "Base path is correct in dist/index.html" -ForegroundColor Green
}

Write-Host ""

# Check .nojekyll file
Write-Host "3. Checking .nojekyll file..." -ForegroundColor Yellow
if (Test-Path "dist\.nojekyll") {
    Write-Host ".nojekyll exists in dist/" -ForegroundColor Green
} else {
    Write-Host "Creating .nojekyll in dist/..." -ForegroundColor Yellow
    New-Item -Path "dist\.nojekyll" -ItemType File -Force | Out-Null
    Write-Host "Created .nojekyll" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "METHOD 1: Use GitHub Actions (Recommended)" -ForegroundColor Yellow
Write-Host "1. Push code to GitHub:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Prepare for GitHub Pages'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Go to Settings -> Pages:" -ForegroundColor White
Write-Host "   https://github.com/luongisdev/greeting-animation-art/settings/pages" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Select 'GitHub Actions' as Source" -ForegroundColor White
Write-Host ""
Write-Host "METHOD 2: Manual deploy to gh-pages branch" -ForegroundColor Yellow
Write-Host "Run these commands:" -ForegroundColor White
Write-Host ""
Write-Host '   git checkout --orphan gh-pages' -ForegroundColor Gray
Write-Host '   git rm -rf .' -ForegroundColor Gray
Write-Host '   Copy-Item -Path "dist\*" -Destination "." -Recurse -Force' -ForegroundColor Gray
Write-Host '   git add .' -ForegroundColor Gray
Write-Host '   git commit -m "Deploy to GitHub Pages"' -ForegroundColor Gray
Write-Host '   git push origin gh-pages' -ForegroundColor Gray
Write-Host '   git checkout main' -ForegroundColor Gray
Write-Host ""
Write-Host "See QUICK_FIX.md for more details!" -ForegroundColor Cyan
