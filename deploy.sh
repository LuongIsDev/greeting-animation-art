#!/bin/bash

# Build the project
npm run build

# Create .nojekyll file in dist
touch dist/.nojekyll

# If deploying to gh-pages branch
# git checkout gh-pages
# git rm -rf .
# cp -r dist/* .
# git add .
# git commit -m "Deploy to GitHub Pages"
# git push origin gh-pages
# git checkout main

echo "Build completed. Contents are in dist/ folder."
echo "To deploy to GitHub Pages:"
echo "1. Copy contents of dist/ to gh-pages branch, OR"
echo "2. Configure GitHub Pages to serve from /docs folder (copy dist to docs), OR"
echo "3. Use GitHub Actions workflow to deploy automatically"

