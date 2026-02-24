import logging

from django.db.models import Case, IntegerField, Value, When
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters
from rest_framework import filters, generics
from rest_framework.exceptions import ValidationError

from .models import Phone
from .serializers import PhoneSerializer

logger = logging.getLogger("phones")


class PhoneFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")

    class Meta:
        model = Phone
        fields = ["brand", "price_min", "price_max"]


class PhoneListView(generics.ListAPIView):
    queryset = Phone.objects.all().prefetch_related("images")
    serializer_class = PhoneSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = PhoneFilter
    search_fields = ["name", "brand", "processor"]
    ordering_fields = ["price", "created_at", "name"]
    ordering = ["-created_at"]

    def get_queryset(self):
        brand = self.kwargs.get("brand")
        if brand:
            return self.queryset.filter(brand__iexact=brand)
        return self.queryset


class PhoneDetailView(generics.RetrieveAPIView):
    queryset = Phone.objects.all().prefetch_related("images")
    serializer_class = PhoneSerializer


class ComparePhonesView(generics.ListAPIView):
    queryset = Phone.objects.all().prefetch_related("images")
    serializer_class = PhoneSerializer
    pagination_class = None
    MAX_COMPARE_COUNT = 4

    def get_queryset(self):
        ids = self.request.query_params.get("ids", "").strip()
        if not ids:
            return Phone.objects.none()

        parsed_ids = []
        invalid_tokens = []
        for token in ids.split(","):
            token = token.strip()
            if not token:
                continue
            if token.isdigit():
                parsed_ids.append(int(token))
            else:
                invalid_tokens.append(token)

        if invalid_tokens:
            raise ValidationError({"ids": f"Invalid id values: {', '.join(invalid_tokens)}"})

        unique_ids = list(dict.fromkeys(parsed_ids))
        if not unique_ids:
            raise ValidationError({"ids": "At least one valid phone id is required."})
        if len(unique_ids) > self.MAX_COMPARE_COUNT:
            raise ValidationError({"ids": f"You can compare up to {self.MAX_COMPARE_COUNT} phones at a time."})

        ordering = Case(
            *[When(id=value, then=Value(index)) for index, value in enumerate(unique_ids)],
            output_field=IntegerField(),
        )
        queryset = self.queryset.filter(id__in=unique_ids).order_by(ordering)
        logger.info("compare_request ids=%s", unique_ids)
        return queryset
