from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.forms import WidgetForm
from api.models import CarBrand, CarModel
from django.db.models import Q, Min
from rest_framework import status

from api.serializers import CarBrandSerializer, CarModelSerializer


class CarBrandListView(APIView):
    def get(self, request: Request):
        name_filter = request.query_params.get('name', '')
        brands = CarBrandSerializer(CarBrand.objects.filter(Q(name__icontains=name_filter)), many=True)

        return Response({
            "data": {
                "brands": brands.data
            }
        })


class CarModelListView(APIView):
    def get(self, request: Request):
        name_filter = request.query_params.get('name', '')
        brand_id_filter = request.query_params.get('brand_id')
        brand_id = None

        if brand_id_filter is not None:
            try:
                brand_id = int(brand_id_filter)
            except Exception as e:
                return Response({
                    "error": "brand_id query params should be a valid number"
                }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        filter = Q(name__icontains=name_filter)
        if brand_id is not None:
            filter = filter & Q(brand_id=int(brand_id))

        models = CarModelSerializer(CarModel.objects.filter(filter), many=True)

        return Response({
            "data": {
                "brands": models.data
            }
        })


class PredictionView(APIView):
    def post(self, request: Request):
        form = WidgetForm(request.data)
        if form.is_valid():
            # TODO : Call API
            return Response({"data": 15_000})
        else:
            return Response(
                {
                    'error': form.errors
                },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
