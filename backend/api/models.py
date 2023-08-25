from django.db import models


class CarBrand(models.Model):
    """A Town"""
    name = models.CharField(max_length=255, verbose_name="nom de la marque", unique=True)

    def __str__(self):
        return self.name.upper()

    class Meta:
        verbose_name = "marque"


class CarModel(models.Model):
    """A Town"""
    name = models.CharField(max_length=255, verbose_name="nom du modèle", unique=True)
    brand = models.ForeignKey(to=CarBrand, on_delete=models.CASCADE, verbose_name="marque")

    def __str__(self):
        return self.name.capitalize()

    class Meta:
        verbose_name = "modèle"
        unique_together = [
            "brand",
            "name",
        ]

