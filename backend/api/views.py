from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.forms import WidgetForm
from rest_framework import status
import joblib

class PredictionView(APIView):
    def post(self, request: Request):
        form = WidgetForm(request.data)
        if form.is_valid():
            data = form.data
            model = joblib.load('./models/model_ia2.joblib')
            result = model.predict([
                [data["origin"],
                data["year"],
                data["gearbox"],
                data["ratedHorsePower"],
                data["powerDIN"],
                data["consumption"]]
            ])
            return Response({"data": {
                "prediction": result
            }})
        else:
            return Response(
                {
                    'error': form.errors
                },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
