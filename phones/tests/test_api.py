from decimal import Decimal

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from phones.models import Phone


class TestPhoneApi(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.samsung = Phone.objects.create(
            name="Galaxy S24",
            brand="Samsung",
            processor="Snapdragon",
            ram="12GB",
            storage="256GB",
            camera="50MP",
            battery="5000mAh",
            display="6.8 OLED",
            price=Decimal("1099.00"),
            image_url="https://example.com/s24.jpg",
            description="Flagship Samsung phone",
        )
        cls.apple = Phone.objects.create(
            name="iPhone 15",
            brand="Apple",
            processor="A17",
            ram="8GB",
            storage="256GB",
            camera="48MP",
            battery="3274mAh",
            display="6.1 OLED",
            price=Decimal("999.00"),
            image_url="https://example.com/iphone.jpg",
            description="Flagship Apple phone",
        )
        cls.pixel = Phone.objects.create(
            name="Pixel 9",
            brand="Google",
            processor="Tensor",
            ram="12GB",
            storage="256GB",
            camera="50MP",
            battery="5000mAh",
            display="6.7 OLED",
            price=Decimal("899.00"),
            image_url="https://example.com/pixel.jpg",
            description="Google flagship phone",
        )

    def test_list_is_paginated(self):
        url = reverse("phone-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("results", response.data)
        self.assertEqual(response.data["count"], 3)

    def test_filter_by_brand(self):
        url = reverse("phone-list")
        response = self.client.get(url, {"brand": "Samsung"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["brand"], "Samsung")

    def test_filter_by_price_range(self):
        url = reverse("phone-list")
        response = self.client.get(url, {"price_min": "900", "price_max": "1000"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        names = {result["name"] for result in response.data["results"]}
        self.assertSetEqual(names, {"iPhone 15"})

    def test_compare_rejects_invalid_ids(self):
        url = reverse("phone-compare")
        response = self.client.get(url, {"ids": "1,abc"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("ids", response.data)

    def test_compare_preserves_requested_order(self):
        url = reverse("phone-compare")
        ids = f"{self.apple.id},{self.samsung.id},{self.pixel.id}"
        response = self.client.get(url, {"ids": ids})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_ids = [item["id"] for item in response.data]
        self.assertListEqual(returned_ids, [self.apple.id, self.samsung.id, self.pixel.id])
