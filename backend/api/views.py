from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Product,
    Category,
    Cart,
    CartItem,
    Wishlist,
    Order,
    OrderItem
)

from .serializers import (
    ProductSerializer,
    CategorySerializer,
    CartSerializer,
    WishlistSerializer,
    OrderSerializer
)


# ================= PRODUCTS =================

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['POST'])
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['PUT'])
def update_product(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['DELETE'])
def delete_product(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response({"message": "Deleted"})


# ================= CATEGORY =================

@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# ================= CART =================

from django.contrib.auth.models import User


@api_view(['POST'])
def add_to_cart(request):
    user = User.objects.first()   # temp demo user

    product_id = request.data['product_id']

    cart, created = Cart.objects.get_or_create(user=user)

    product = Product.objects.get(id=product_id)

    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        item.quantity += 1
        item.save()

    return Response({"message": "Added to cart"})


@api_view(['GET'])
def get_cart(request):
    user = User.objects.first()   # temp demo user

    cart, created = Cart.objects.get_or_create(user=user)

    serializer = CartSerializer(cart)

    return Response(serializer.data)


@api_view(['POST'])
def remove_cart_item(request):
    item_id = request.data['item_id']

    CartItem.objects.get(id=item_id).delete()

    return Response({"message": "Removed"})

# ================= WISHLIST =================

@api_view(['POST'])
def add_wishlist(request):
    user = request.user
    product_id = request.data['product_id']

    product = Product.objects.get(id=product_id)

    Wishlist.objects.get_or_create(
        user=user,
        product=product
    )

    return Response({"message": "Wishlist Added"})


@api_view(['GET'])
def get_wishlist(request):
    items = Wishlist.objects.filter(user=request.user)
    serializer = WishlistSerializer(items, many=True)
    return Response(serializer.data)


# ================= ORDER =================

@api_view(['POST'])
def create_order(request):
    user = request.user
    total_price = request.data['total_price']

    order = Order.objects.create(
        user=user,
        total_price=total_price
    )

    return Response({"message": "Order Placed", "order_id": order.id})


@api_view(['GET'])
def order_history(request):
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)