from django.db import models


class Phone(models.Model):
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    processor = models.CharField(max_length=200)
    ram = models.CharField(max_length=50) # e.g. "8GB"
    storage = models.CharField(max_length=50) # e.g. "128GB"
    camera = models.CharField(max_length=200)
    battery = models.CharField(max_length=100)
    display = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(max_length=500, blank=True) # Main/Thumbnail image
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["brand"]),
            models.Index(fields=["price"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.brand} {self.name}"

class PhoneImage(models.Model):
    phone = models.ForeignKey(Phone, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.phone.name}"
