import django.forms as forms


class WidgetForm(forms.Form):
    # GEARBOXES_CHOICES = (
    #     ("0", "Automatique"),
    #     ("1", "Manuelle"),
    # )
    #
    # ORIGIN_CHOICES = (
    #     ("0", "France"),
    #     ("1", "Importé"),
    # )

    ratedHorsePower = forms.IntegerField(required=True, )
    powerDIN = forms.IntegerField(required=True, )
    consumption = forms.FloatField(required=True, )
    mileage = forms.IntegerField(min_value=1, initial=1, required=False)
    year = forms.IntegerField(min_value=1966, initial=1966, required=False)
    gearbox = forms.IntegerField(
        required=True,
    )
    origin = forms.IntegerField(
        required=True,
    )
