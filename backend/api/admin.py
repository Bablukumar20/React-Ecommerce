from django.contrib import admin
from .models import (
    Product,
    Category,
    Cart,
    CartItem,
    Wishlist,
    Order,
    OrderItem,
    Address,
    UserProfile
)

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Wishlist)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Address)
admin.site.register(UserProfile)