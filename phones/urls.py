from django.urls import path
from .views import PhoneListView, PhoneDetailView, ComparePhonesView

urlpatterns = [
    path('', PhoneListView.as_view(), name='phone-list'),
    path('samsung/', PhoneListView.as_view(), {'brand': 'Samsung'}, name='phone-samsung-list'),
    path('<int:pk>/', PhoneDetailView.as_view(), name='phone-detail'),
    path('compare/', ComparePhonesView.as_view(), name='phone-compare'),
]
