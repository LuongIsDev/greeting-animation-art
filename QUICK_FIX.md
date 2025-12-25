# 🔧 QUICK FIX - Khắc phục trang trắng trên GitHub Pages

## ❌ Vấn đề hiện tại

GitHub Pages đang serve file `index.html` từ **root repository** (có script `/src/main.tsx` cho development) thay vì từ **thư mục `dist/`** (đã build cho production).

## ✅ Giải pháp nhanh nhất

### Cách 1: Sử dụng GitHub Actions (Tự động - Khuyên dùng)

1. **Đảm bảo workflow đã có trong repository:**
   - File `.github/workflows/deploy.yml` đã được tạo
   - Nếu chưa có, push code lên GitHub

2. **Push code lên GitHub:**
   ```powershell
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **Bật GitHub Pages:**
   - Vào: https://github.com/luongisdev/greeting-animation-art/settings/pages
   - **Source**: Chọn **"GitHub Actions"**
   - Lưu và đợi workflow chạy (1-2 phút)

4. **Kiểm tra:**
   - Vào tab **Actions** trong repository
   - Xem workflow "Deploy to GitHub Pages" có chạy thành công không
   - Đợi 1-2 phút rồi truy cập: https://luongisdev.github.io/greeting-animation-art/

### Cách 2: Deploy thủ công lên branch gh-pages

1. **Build project:**
   ```powershell
   npm run build
   ```

2. **Tạo branch gh-pages và deploy:**
   ```powershell
   # Xóa branch cũ nếu có
   git branch -D gh-pages
   git push origin --delete gh-pages
   
   # Tạo branch mới từ dist
   git checkout --orphan gh-pages
   git rm -rf .
   Copy-Item -Path "dist\*" -Destination "." -Recurse -Force
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   git checkout main
   ```

3. **Cấu hình GitHub Pages:**
   - Vào: https://github.com/luongisdev/greeting-animation-art/settings/pages
   - **Source**: Chọn **"Deploy from a branch"**
   - **Branch**: Chọn `gh-pages` và folder `/ (root)`
   - Lưu

4. **Kiểm tra:**
   - Đợi 1-2 phút rồi truy cập: https://luongisdev.github.io/greeting-animation-art/

## 🔍 Cách kiểm tra file đang được serve

1. Truy cập: https://luongisdev.github.io/greeting-animation-art/
2. **Nhấn F12** để mở Developer Tools
3. Vào tab **Network**
4. Refresh trang (F5)
5. Tìm file `index.html` trong danh sách
6. Click vào file đó để xem nội dung

**Nếu đúng:**
- File sẽ có script tag: `<script src="/greeting-animation-art/assets/index-xxx.js">`
- **KHÔNG** có: `<script src="/src/main.tsx">`

**Nếu sai (hiện tại):**
- File sẽ có: `<script src="/src/main.tsx">` ← Đây là vấn đề!

## ⚠️ Lưu ý quan trọng

- ✅ File `dist/index.html` đã đúng (đã kiểm tra)
- ✅ File `.nojekyll` đã có trong `public/` và sẽ được copy vào `dist/`
- ✅ `vite.config.ts` đã có `base: "/greeting-animation-art/"`
- ✅ `BrowserRouter` đã có `basename="/greeting-animation-art"`
- ❌ **GitHub Pages đang serve từ root thay vì dist/** ← Cần fix!

## 🎯 Sau khi fix xong

Trang sẽ hoạt động tại: https://luongisdev.github.io/greeting-animation-art/

Lỗi `main.tsx:1 Failed to load resource` sẽ biến mất!

