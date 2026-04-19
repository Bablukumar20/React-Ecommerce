from django.urls import path
from . import views

urlpatterns = [

    # PRODUCTS
    path('products/', views.product_list),
    path('products/<int:pk>/', views.get_product),
    path('products/create/', views.create_product),
    path('products/update/<int:pk>/', views.update_product),
    path('products/delete/<int:pk>/', views.delete_product),

    # CATEGORY
    path('categories/', views.category_list),

    # CART
    path('cart/', views.get_cart),
    path('cart/add/', views.add_to_cart),
    path('cart/remove/', views.remove_cart_item),

    # WISHLIST
    path('wishlist/', views.get_wishlist),
    path('wishlist/add/', views.add_wishlist),

    # ORDERS
    path('order/create/', views.create_order),
    path('orders/', views.order_history),
]