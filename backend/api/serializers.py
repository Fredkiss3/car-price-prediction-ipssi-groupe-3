from rest_framework import serializers
from api.models import CarBrand, CarModel


class CarBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarBrand
        fields = (
            'name',
        )


class CarModelSerializer(serializers.ModelSerializer):
    brand = CarBrandSerializer(read_only=True)

    class Meta:
        model = CarModel
        fields = (
            'name',
            'brand'
        )


