from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class CarListView(APIView):
    def get(self, request: Request):
        return Response({
            "data": {
                "cars": [
                    {"id": 1},
                    {"id": 2},
                    {"id": 3},
                ]
            }
        })
