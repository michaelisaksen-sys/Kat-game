#!/bin/bash
# Script to save background image

echo "Background Image Setup"
echo "======================"
echo ""
echo "Please save your Ghibli-style background image to:"
echo "  /home/user/Kat-game/public/background.jpg"
echo ""
echo "Current status of background file:"
ls -lh public/background.jpg 2>/dev/null || echo "  File does not exist or is a placeholder"
echo ""
echo "After saving the image, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:5173 in your browser"
