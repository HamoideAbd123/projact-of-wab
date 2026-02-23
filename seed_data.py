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
