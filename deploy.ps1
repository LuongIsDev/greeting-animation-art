# Script deploy lên GitHub Pages cho Windows
# Sử dụng: .\deploy.ps1

Write-Host "Building project..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`nBuild completed successfully!" -ForegroundColor Green
Write-Host "`nNội dung build đã được tạo trong thư mục dist/" -ForegroundColor Yellow
Write-Host "`nBây giờ bạn cần:" -ForegroundColor Cyan
Write-Host "1. Vào repository trên GitHub" -ForegroundColor White
Write-Host "2. Settings → Pages" -ForegroundColor White
Write-Host "3. Source: Chọn 'GitHub Actions' (nếu đã có workflow)" -ForegroundColor White
Write-Host "   HOẶC" -ForegroundColor Yellow
Write-Host "4. Tạo branch gh-pages và copy nội dung dist/ lên đó" -ForegroundColor White
Write-Host "`nXem README_DEPLOY.md để biết chi tiết" -ForegroundColor Cyan

