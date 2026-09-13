# Client Product & Service Photos Guide

This folder (`frontend/assets/products/`) holds the images displayed by the AI Chatbot when visitors ask about products, services, or catalog deliverables.

---

## 📁 How This Works (Simple, Non-Technical Guide)

When a customer on the website asks questions like:
- *"Can you show me your products?"*
- *"Show me your pricing & packages"*
- *"What does service X look like?"*

The AI assistant automatically calls the `show_media` tool and renders a rich visual card containing the product title, specs, pricing, and **the image saved in this folder**.

---

## 📸 Step-by-Step: Adding Product / Service Photos

### Step 1: Save Your Images Here
1. Take your client's product photos, service banners, or deliverable graphics.
2. Save them inside this folder: `frontend/assets/products/`.
3. Supported image formats:
   - `.jpg` / `.jpeg`
   - `.png` (ideal for transparent backgrounds)
   - `.webp` (best for ultra-fast loading)
   - `.svg` (clean vector graphics/icons)

### Step 2: Recommended Image Specs
- **Dimensions**: `600 x 400 pixels` (aspect ratio 3:2 or 16:9 works best)
- **File Size**: Under `500 KB` per image for instant mobile loading

### Step 3: Map Image in `chatbot.config.json`
Open `chatbot.config.json` in the root folder, locate the `"catalog"` array, and set the `"image"` property to point to your image file:

```json
{
  "id": "prod_1",
  "key": "custom_package",
  "title": "Premium Business Package",
  "badge": "Best Value",
  "price": "$1,499",
  "turnaround": "3–5 days",
  "image": "assets/products/my-product.jpg",
  "features": [
    "Feature 1 description",
    "Feature 2 description",
    "Feature 3 description"
  ],
  "primaryAction": "Order Package",
  "promptText": "I would like to order the Premium Business Package"
}
```

That's it! When the chatbot is running, it will automatically display your custom image right inside the chat bubble and voice preview!
