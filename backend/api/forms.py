import django.forms as forms


class WidgetForm(forms.Form):
    GEARBOXES_CHOICES = (
        ("1", "Automatique"),
        ("2", "Manuelle"),
    )

    ORIGIN_CHOICES = (
        ("1", "France"),
        ("2", "Importé"),
    )

    brand = forms.CharField(required=True, )
    model = forms.CharField(required=True, )
    ratedHorsePower = forms.IntegerField(required=True, )
    powerDIN = forms.IntegerField(required=True, )
    consumption = forms.IntegerField(required=True, )
    mileage = forms.IntegerField(min_value=1, initial=1, required=False)
    year = forms.IntegerField(min_value=1966, initial=1966, required=False)
    gearbox = forms.ChoiceField(
        required=True,
        choices=GEARBOXES_CHOICES,
    )
    origin = forms.ChoiceField(
        required=True,
        choices=ORIGIN_CHOICES,
    )
