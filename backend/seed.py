import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from api.models import Category, Product

# Categories
category_names = [
    "Laptop",
    "Phone",
    "Camera",
    "Tablet",
    "Accessories",
    "Clothing",
    "Footwear",
    "Home"
]

for name in category_names:
    Category.objects.get_or_create(name=name)

products = [
    {
        "name": "MacBook Air M4",
        "category": "Laptop",
        "price": 119990,
        "old_price": 139990,
        "image": "https://m.media-amazon.com/images/I/71CjP9jmqZL._SL1500_.jpg",
        "description": "Ultra-thin Apple laptop.",
        "brand": "Apple",
        "stock": 10,
        "rating": 4.9
    },
    {
        "name": "Dell XPS 13",
        "category": "Laptop",
        "price": 99990,
        "old_price": 119990,
        "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        "description": "Premium ultrabook.",
        "brand": "Dell",
        "stock": 8,
        "rating": 4.7
    },
    {
        "name": "HP Pavilion x360",
        "category": "Laptop",
        "price": 69990,
        "old_price": 79990,
        "image": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
        "description": "Convertible laptop.",
        "brand": "HP",
        "stock": 12,
        "rating": 4.5
    },
    {
        "name": "iPhone 17 Pro Max",
        "category": "Phone",
        "price": 79990,
        "old_price": 89990,
        "image": "https://m.media-amazon.com/images/I/618vU2qKXQL._SL1500_.jpg",
        "description": "Apple flagship phone.",
        "brand": "Apple",
        "stock": 15,
        "rating": 4.9
    },
    {
        "name": "Samsung Galaxy S24 Ultra",
        "category": "Phone",
        "price": 129999,
        "old_price": 139999,
        "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505",
        "description": "Samsung premium phone.",
        "brand": "Samsung",
        "stock": 9,
        "rating": 4.8
    },
    {
        "name": "OnePlus 12",
        "category": "Phone",
        "price": 64999,
        "old_price": 74999,
        "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        "description": "Fast flagship phone.",
        "brand": "OnePlus",
        "stock": 20,
        "rating": 4.6
    },
    {
        "name": "Sony Alpha A7 III",
        "category": "Camera",
        "price": 120990,
        "old_price": 135000,
        "image": "https://m.media-amazon.com/images/I/71VnF6UiESL._SL1500_.jpg",
        "description": "Professional camera.",
        "brand": "Sony",
        "stock": 5,
        "rating": 4.9
    },
    {
        "name": "Canon EOS DSLR",
        "category": "Camera",
        "price": 60990,
        "old_price": 70990,
        "image": "https://m.media-amazon.com/images/I/81LskAU5h1L._SX679_.jpg",
        "description": "Beginner DSLR.",
        "brand": "Canon",
        "stock": 7,
        "rating": 4.5
    },
    {
        "name": "iPad Pro M4",
        "category": "Tablet",
        "price": 54990,
        "old_price": 64990,
        "image": "https://m.media-amazon.com/images/I/719uQ7BLfrL._SX679_.jpg",
        "description": "Powerful tablet.",
        "brand": "Apple",
        "stock": 11,
        "rating": 4.8
    },
    {
        "name": "Galaxy Tab S9",
        "category": "Tablet",
        "price": 64999,
        "old_price": 74999,
        "image": "https://images.unsplash.com/photo-1589739900243-4b52cd9dd743",
        "description": "Samsung tablet.",
        "brand": "Samsung",
        "stock": 9,
        "rating": 4.7
    },
]

for item in products:
    category = Category.objects.get(name=item["category"])

    Product.objects.get_or_create(
        name=item["name"],
        defaults={
            "category": category,
            "price": item["price"],
            "old_price": item["old_price"],
            "image": item["image"],
            "description": item["description"],
            "brand": item["brand"],
            "stock": item["stock"],
            "rating": item["rating"],
        }
    )

print("Products Added Successfully ✅")