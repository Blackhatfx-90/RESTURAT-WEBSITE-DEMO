import os
import json
import urllib.request

dishes = {
    "Dal Makhani": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Dal_Makhani.jpg",
    "Kadhai Paneer": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Shahi_Paneer.jpg",
    "Veg Pulao": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Pilaf_Rice.jpg",
    "Veg Biryani": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Vegetable_biryani.jpg",
    "Mix Veg": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Mixed_Vegetables.jpg",
    "Dal Fry": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Dal_Tadka.jpg",
    "Jeera Rice": "https://upload.wikimedia.org/wikipedia/commons/9/91/Jeera_Rice.jpg",
    "Sada Thali": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Indian_Vegetarian_Thali.jpg",
    "Deluxe Thali": "https://upload.wikimedia.org/wikipedia/commons/f/fa/North_Indian_Thali.jpg",
    "Premium Thali": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Gujarati_Thali.jpg",
    "Maharaja Thali": "https://upload.wikimedia.org/wikipedia/commons/8/87/Rajasthani_Thali.jpg",
    "Samose": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Samosa_in_plate.jpg",
    "Chai": "https://upload.wikimedia.org/wikipedia/commons/0/04/Masala_Chai.JPG",
    "Bread Pakoda": "https://upload.wikimedia.org/wikipedia/commons/7/70/Bread_Pakora.jpg",
    "Patties": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Vegetable_patties.jpg",
    "Gulab Jamun": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Gulab_jamun_%28Indian_sweet%29.jpg",
    "Rasgulle": "https://upload.wikimedia.org/wikipedia/commons/4/48/Rasgulla_02.jpg",
    "Chene Wale Rasgulle": "https://upload.wikimedia.org/wikipedia/commons/0/06/Rasgulla_Macro.jpg",
    "Rasmalai": "https://upload.wikimedia.org/wikipedia/commons/0/07/Rasmalai_Indian_Sweet.jpg",
    "Pastry": "https://upload.wikimedia.org/wikipedia/commons/a/af/Chocolate_Pastry.jpg",
    "Cake": "https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg"
}

os.makedirs("images", exist_ok=True)

# Replace with high quality unsplash images for missing or bad links
images = {
    "Dal Makhani": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
    "Kadhai Paneer": "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=500&q=80",
    "Veg Pulao": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
    "Veg Biryani": "https://images.unsplash.com/photo-1563379926898-05f452556048?auto=format&fit=crop&w=500&q=80",
    "Mix Veg": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    "Dal Fry": "https://images.unsplash.com/photo-1585937421606-22a3a52e9ab7?auto=format&fit=crop&w=500&q=80",
    "Jeera Rice": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=500&q=80",
    "Sada Thali": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=500&q=80",
    "Deluxe Thali": "https://images.unsplash.com/photo-1585937421606-22a3a52e9ab7?auto=format&fit=crop&w=500&q=80",
    "Premium Thali": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80",
    "Maharaja Thali": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    "Samose": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    "Chai": "https://images.unsplash.com/photo-1579899387431-7299b0c79f94?auto=format&fit=crop&w=500&q=80",
    "Bread Pakoda": "https://images.unsplash.com/photo-1626779836371-34e8fa6b6e4e?auto=format&fit=crop&w=500&q=80",
    "Patties": "https://images.unsplash.com/photo-1604085572504-a3f28d8b671a?auto=format&fit=crop&w=500&q=80",
    "Gulab Jamun": "https://images.unsplash.com/photo-1593504049359-715339e163be?auto=format&fit=crop&w=500&q=80",
    "Rasgulle": "https://images.unsplash.com/photo-1593504049359-715339e163be?auto=format&fit=crop&w=500&q=80",
    "Chene Wale Rasgulle": "https://images.unsplash.com/photo-1593504049359-715339e163be?auto=format&fit=crop&w=500&q=80",
    "Rasmalai": "https://images.unsplash.com/photo-1593504049359-715339e163be?auto=format&fit=crop&w=500&q=80",
    "Pastry": "https://images.unsplash.com/photo-1578985545062-69928b1ea38f?auto=format&fit=crop&w=500&q=80",
    "Cake": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=500&q=80"
}

with open("image_urls.json", "w") as f:
    json.dump(images, f)
print("Done")
