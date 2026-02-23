import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from phones.models import Phone, PhoneImage

def create_sample_data():
    phones = [
        {
            "name": "iPhone 15 Pro",
            "brand": "Apple",
            "processor": "A17 Pro",
            "ram": "8GB",
            "storage": "256GB",
            "camera": "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
            "battery": "3274 mAh",
            "display": "6.1-inch Super Retina XDR OLED",
            "price": 999.00,
            "image_url": "https://m.media-amazon.com/images/I/81Sig6biNGL._AC_SL1500_.jpg",
            "description": "The iPhone 15 Pro is the first iPhone to feature an aerospace‑grade titanium design, using the same alloy that spacecraft use for missions to Mars.",
            "gallery": [
                "https://m.media-amazon.com/images/I/81Sig6biNGL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/81dpx9fVd9L._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/81GfV7S2Y4L._AC_SL1500_.jpg"
            ]
        },
        {
            "name": "Galaxy S24 Ultra",
            "brand": "Samsung",
            "processor": "Snapdragon 8 Gen 3",
            "ram": "12GB",
            "storage": "512GB",
            "camera": "200MP Main, 12MP Ultra Wide, 50MP Telephoto, 10MP Telephoto",
            "battery": "5000 mAh",
            "display": "6.8-inch Dynamic LTPO AMOLED 2X",
            "price": 1299.00,
            "image_url": "https://m.media-amazon.com/images/I/71WjsZ8nEIL._AC_SL1500_.jpg",
            "description": "Galaxy AI is here. Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.",
            "gallery": [
                "https://m.media-amazon.com/images/I/71WjsZ8nEIL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71Yf5e6uRIL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71m6k-8v7hL._AC_SL1500_.jpg"
            ]
        },
        {
            "name": "Pixel 8 Pro",
            "brand": "Google",
            "processor": "Google Tensor G3",
            "ram": "12GB",
            "storage": "128GB",
            "camera": "50MP Main, 48MP Ultra Wide, 48MP Telephoto",
            "battery": "5050 mAh",
            "display": "6.7-inch LTPO OLED",
            "price": 999.00,
            "image_url": "https://m.media-amazon.com/images/I/71Yf03pG-DL._AC_SL1500_.jpg",
            "description": "The Pixel 8 Pro is the all-pro phone engineered by Google. It’s sleek, sophisticated, and has the most advanced Pixel Camera yet.",
            "gallery": [
                "https://m.media-amazon.com/images/I/71Yf03pG-DL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71K9XjB7z4L._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71+vCIBd8TL._AC_SL1500_.jpg"
            ]
        },
        {
            "name": "Xperia 1 V",
            "brand": "Sony",
            "processor": "Snapdragon 8 Gen 2",
            "ram": "12GB",
            "storage": "256GB",
            "camera": "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
            "battery": "5000 mAh",
            "display": "6.5-inch 4K HDR OLED",
            "price": 1399.00,
            "image_url": "https://m.media-amazon.com/images/I/51sh3hVv-NL._AC_SL1200_.jpg",
            "description": "Sony's flagship with a world-first Exmor T for mobile stacked pixel sensor and 4K HDR OLED display.",
            "gallery": ["https://m.media-amazon.com/images/I/51sh3hVv-NL._AC_SL1200_.jpg"]
        },
        {
            "name": "Razr+ (2023)",
            "brand": "Motorola",
            "processor": "Snapdragon 8+ Gen 1",
            "ram": "8GB",
            "storage": "256GB",
            "camera": "12MP Main, 13MP Ultra Wide",
            "battery": "3800 mAh",
            "display": "6.9-inch pOLED Main, 3.6-inch pOLED External",
            "price": 999.00,
            "image_url": "https://m.media-amazon.com/images/I/61kC85OdBhL._AC_SL1500_.jpg",
            "description": "Iconic flippable design with the largest external display on any flip phone.",
            "gallery": ["https://m.media-amazon.com/images/I/61kC85OdBhL._AC_SL1500_.jpg"]
        },
        {
            "name": "ROG Phone 7 Ultimate",
            "brand": "Asus",
            "processor": "Snapdragon 8 Gen 2",
            "ram": "16GB",
            "storage": "512GB",
            "camera": "50MP Main, 13MP Ultra Wide, 5MP Macro",
            "battery": "6000 mAh",
            "display": "6.78-inch Samsung AMOLED 165Hz",
            "price": 1399.00,
            "image_url": "https://m.media-amazon.com/images/I/61n9yXh09GL._AC_SL1500_.jpg",
            "description": "The ultimate gaming phone with AeroActive Portal and GameFX audio system.",
            "gallery": ["https://m.media-amazon.com/images/I/61n9yXh09GL._AC_SL1500_.jpg"]
        },
        {
            "name": "Phone (2)",
            "brand": "Nothing",
            "processor": "Snapdragon 8+ Gen 1",
            "ram": "12GB",
            "storage": "256GB",
            "camera": "50MP Main, 50MP Ultra Wide",
            "battery": "4700 mAh",
            "display": "6.7-inch LTPO OLED",
            "price": 599.00,
            "image_url": "https://m.media-amazon.com/images/I/71sh7r6c-hL._AC_SL1500_.jpg",
            "description": "A new perspective on smartphone design with the Glyph Interface and Nothing OS 2.0.",
            "gallery": ["https://m.media-amazon.com/images/I/71sh7r6c-hL._AC_SL1500_.jpg"]
        },
        {
            "name": "Find X6 Pro",
            "brand": "Oppo",
            "processor": "Snapdragon 8 Gen 2",
            "ram": "12GB",
            "storage": "256GB",
            "camera": "50MP Main (1-inch), 50MP UW, 50MP Tele",
            "battery": "5000 mAh",
            "display": "6.82-inch AMOLED 120Hz",
            "price": 899.00,
            "image_url": "https://m.media-amazon.com/images/I/61WvQeGf9hL._AC_SL1000_.jpg",
            "description": "Master photography with the three-main-camera system and Hasselblad collaboration.",
            "gallery": ["https://m.media-amazon.com/images/I/61WvQeGf9hL._AC_SL1000_.jpg"]
        },
        {
            "name": "X90 Pro+",
            "brand": "Vivo",
            "processor": "Snapdragon 8 Gen 2",
            "ram": "12GB",
            "storage": "256GB",
            "camera": "50MP Main (IMX989), 48MP UW, 50MP Port, 64MP Peri",
            "battery": "4700 mAh",
            "display": "6.78-inch Samsung E6 AMOLED",
            "price": 950.00,
            "image_url": "https://m.media-amazon.com/images/I/61oPptAnvML._AC_SL1000_.jpg",
            "description": "Pushing the boundaries of mobile imaging with ZEISS optics.",
            "gallery": ["https://m.media-amazon.com/images/I/61oPptAnvML._AC_SL1000_.jpg"]
        },
        {
            "name": "GT3",
            "brand": "Realme",
            "processor": "Snapdragon 8+ Gen 1",
            "ram": "16GB",
            "storage": "1TB",
            "camera": "50MP Main, 8MP UW, 2MP Micro",
            "battery": "4600 mAh (240W Charging)",
            "display": "6.74-inch AMOLED 144Hz",
            "price": 649.00,
            "image_url": "https://m.media-amazon.com/images/I/61YVb6K-A0L._AC_SL1500_.jpg",
            "description": "The world's fastest charging smartphone with 240W SUPERVOOC technology.",
            "gallery": ["https://m.media-amazon.com/images/I/61YVb6K-A0L._AC_SL1500_.jpg"]
        },
        {
            "name": "P60 Pro",
            "brand": "Huawei",
            "processor": "Snapdragon 8+ Gen 1 (4G)",
            "ram": "8GB",
            "storage": "256GB",
            "camera": "48MP Main, 13MP UW, 48MP Tele",
            "battery": "4815 mAh",
            "display": "6.67-inch LTPO OLED",
            "price": 1100.00,
            "image_url": "https://m.media-amazon.com/images/I/61dF1i-nKRL._AC_SL1000_.jpg",
            "description": "Elegant design with Rococo Pearl finish and XMAGE imaging technology.",
            "gallery": ["https://m.media-amazon.com/images/I/61dF1i-nKRL._AC_SL1000_.jpg"]
        },
        {
            "name": "Magic5 Pro",
            "brand": "Honor",
            "processor": "Snapdragon 8 Gen 2",
            "ram": "12GB",
            "storage": "512GB",
            "camera": "50MP Main, 50MP UW, 50MP Tele",
            "battery": "5100 mAh",
            "display": "6.81-inch LTPO OLED",
            "price": 1099.00,
            "image_url": "https://m.media-amazon.com/images/I/71Y0vG5eG8L._AC_SL1500_.jpg",
            "description": "Top-tier screen and camera performance with the Falcon Millimeter Capture.",
            "gallery": ["https://m.media-amazon.com/images/I/71Y0vG5eG8L._AC_SL1500_.jpg"]
        },
        {
            "name": "Axon 50 Ultra",
            "brand": "ZTE",
            "processor": "Snapdragon 8+ Gen 1",
            "ram": "12GB",
            "storage": "256GB",
            "camera": "64MP Main, 50MP UW, 50MP Tele",
            "battery": "5000 mAh",
            "display": "6.67-inch AMOLED 144Hz",
            "price": 799.00,
            "image_url": "https://m.media-amazon.com/images/I/61qJPr927kL._AC_SL1500_.jpg",
            "description": "Powerful performance with satellite communication support.",
            "gallery": ["https://m.media-amazon.com/images/I/61qJPr927kL._AC_SL1500_.jpg"]
        }
    ]

    for phone_data in phones:
        gallery_urls = phone_data.pop('gallery', [])
        phone, created = Phone.objects.update_or_create(
            name=phone_data['name'],
            defaults=phone_data
        )
        # Clear existing images and add new ones
        PhoneImage.objects.filter(phone=phone).delete()
        for url in gallery_urls:
            PhoneImage.objects.create(phone=phone, image_url=url)
            
        print(f"Updated {phone.name} with {len(gallery_urls)} images.")

if __name__ == "__main__":
    create_sample_data()
