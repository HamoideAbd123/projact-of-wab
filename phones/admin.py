from django.contrib import admin
from .models import Phone

@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'price', 'processor', 'ram', 'storage')
    list_filter = ('brand', 'ram', 'storage')
    search_fields = ('name', 'brand', 'description')
