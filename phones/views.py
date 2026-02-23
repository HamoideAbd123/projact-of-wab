from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Phone
from .serializers import PhoneSerializer

class PhoneListView(generics.ListAPIView):
    serializer_class = PhoneSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['brand', 'price']
    search_fields = ['name', 'brand', 'processor']
    ordering_fields = ['price', 'created_at']

    def get_queryset(self):
        brand = self.kwargs.get('brand')
        if brand:
            return Phone.objects.filter(brand__iexact=brand)
        return Phone.objects.all()

class PhoneDetailView(generics.RetrieveAPIView):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer

class ComparePhonesView(generics.ListAPIView):
    serializer_class = PhoneSerializer

    def get_queryset(self):
        ids = self.request.query_params.get('ids', '')
        if ids:
            id_list = [int(x) for x in ids.split(',') if x.isdigit()]
            return Phone.objects.filter(id__in=id_list)
        return Phone.objects.none()
