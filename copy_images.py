import os
import shutil

src_dir = os.path.expanduser("~/.gemini/antigravity/brain/589b88d3-26b2-48e4-a1f6-cd19e6c63efa/")
dst_dir = "images/"

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

files = {
    "paneer_tikka_1777952105958.png": "paneer_tikka.png",
    "veg_samosa_1777952129504.png": "veg_samosa.png",
    "dal_makhani_1777952146738.png": "dal_makhani.png",
    "veg_biryani_1777952164630.png": "veg_biryani.png",
    "garlic_naan_1777952179686.png": "garlic_naan.png",
    "gulab_jamun_1777952196329.png": "gulab_jamun.png",
    "veg_thali_1777952211335.png": "veg_thali.png"
}

for src_name, dst_name in files.items():
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    try:
        shutil.copy2(src_path, dst_path)
        print(f"✅ Copied {dst_name}")
    except Exception as e:
        print(f"❌ Failed to copy {src_name}: {e}")

print("\nDone! Now open index.html and the images should load correctly.")
