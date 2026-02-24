from rest_framework import serializers
from .models import Phone, PhoneImage


class PhoneImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneImage
        fields = ["id", "image_url"]


class PhoneSerializer(serializers.ModelSerializer):
    images = PhoneImageSerializer(many=True, read_only=True)

    class Meta:
        model = Phone
        fields = [
            "id",
            "name",
            "brand",
            "processor",
            "ram",
            "storage",
            "camera",
            "battery",
            "display",
            "price",
            "image_url",
            "description",
            "images",
            "created_at",
            "updated_at",
        ]
