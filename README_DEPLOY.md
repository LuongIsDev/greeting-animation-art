# Hướng dẫn Deploy lên GitHub Pages

## Vấn đề hiện tại

GitHub Pages đang serve file `index.html` từ root thay vì từ thư mục `dist/`. 
File `index.html` ở root có script tag `/src/main.tsx` chỉ dùng cho development, không phải cho production.

## Giải pháp

### Cách 1: Sử dụng GitHub Actions (Khuyên dùng - Tự động)

1. Workflow đã được tạo trong `.github/workflows/deploy.yml`
2. Push code lên GitHub:
   ```bash
   git add .
   git commit -m "Fix deployment"
   git push origin main
   ```
3. Vào Settings → Pages trong repository
4. Chọn "GitHub Actions" làm source
5. Workflow sẽ tự động chạy và deploy

### Cách 2: Deploy thủ công lên branch gh-pages

1. Build project:
   ```bash
   npm run build
   ```

2. Copy nội dung `dist/` lên branch `gh-pages`:
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r dist/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   git checkout main
   ```

3. Vào Settings → Pages trong repository
4. Chọn branch `gh-pages` và folder `/ (root)`

### Cách 3: Sử dụng thư mục docs

1. Build project:
   ```bash
   npm run build
   ```

2. Copy thư mục dist thành docs:
   ```bash
   cp -r dist docs
   ```

3. Commit và push:
   ```bash
   git add docs
   git commit -m "Add docs for GitHub Pages"
   git push origin main
   ```

4. Vào Settings → Pages trong repository
5. Chọn branch `main` và folder `/docs`

## Lưu ý quan trọng

- ✅ File `.nojekyll` đã có trong `public/` và sẽ được copy vào `dist/`
- ✅ `vite.config.ts` đã có `base: "/greeting-animation-art/"`
- ✅ `BrowserRouter` đã có `basename="/greeting-animation-art"`
- ⚠️ **KHÔNG** deploy file `index.html` từ root - chỉ deploy từ `dist/`

## Kiểm tra sau khi deploy

Sau khi deploy, truy cập: `https://luongisdev.github.io/greeting-animation-art/`

Nếu vẫn thấy lỗi 404 cho `/src/main.tsx`, có nghĩa là GitHub Pages vẫn đang serve file từ root.
Hãy kiểm tra lại cấu hình trong Settings → Pages.

