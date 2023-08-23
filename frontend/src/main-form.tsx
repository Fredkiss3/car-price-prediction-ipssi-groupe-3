import * as React from "react";
import {
  Button,
  Card,
  Metric,
  MultiSelect,
  MultiSelectItem,
  NumberInput,
  Text,
  TextInput,
} from "@tremor/react";
import { SearchIcon } from "@heroicons/react/solid";

/**
 * Convertit un montant en centimes en un montant en euros et le formatter correctement
 * @param amount montant en centimes
 */
function formatNumberToEuros(amount: number): string {
  return amount.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function MainForm() {
  return (
    <form
      className="grid sm:grid-cols-5 md:grid-cols-4 gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-4 items-start col-span-3 md:col-span-2">
        <div className="flex flex-col gap-2 w-full items-stretch">
          <label className="text-gray-600 text-sm" htmlFor="brand">
            Marque
          </label>
          <TextInput
            icon={SearchIcon}
            name="brand"
            id="brand"
            placeholder="Ex: mercedes"
          />
        </div>

        <div className="flex flex-col gap-2 w-full items-stretch">
          <label className="text-gray-600 text-sm" htmlFor="model">
            Modèle
          </label>
          <TextInput
            icon={SearchIcon}
            name="model"
            id="model"
            placeholder="Ex: benz Q"
          />
        </div>

        <div className="flex flex-col gap-2 w-full items-stretch">
          <label className="text-gray-600 text-sm" htmlFor="city">
            Localisation
          </label>
          <TextInput
            icon={SearchIcon}
            id="city"
            name="city"
            placeholder="Ex: Rennes (35000)"
          />
        </div>

        <div className="flex flex-col gap-2 w-full items-stretch">
          <label className="text-gray-600 text-sm" htmlFor="km">
            kilométrage (km)
          </label>
          <NumberInput
            defaultValue={1}
            id="km"
            name="km"
            placeholder="kilométrage (km)"
          />
        </div>

        <div className="flex flex-col gap-2 w-full items-stretch">
          <label className="text-gray-600 text-sm" htmlFor="noOfPlaces">
            Nombre de places
          </label>
          <NumberInput
            defaultValue={3}
            id="noOfPlaces"
            name="noOfPlaces"
            placeholder="Nombre de places"
          />
        </div>

        <details className="w-full">
          <summary className="">Avancé</summary>
          <>
            <div className="flex flex-col gap-2 w-full items-stretch">
              <label className="text-gray-600 text-sm" htmlFor="equipements">
                Équipement
              </label>
              <MultiSelect className="relative z-20">
                <MultiSelectItem value="1">Porte chauffante</MultiSelectItem>
              </MultiSelect>
            </div>
          </>
        </details>

        <Button>Estimer</Button>
      </div>

      <div className="col-span-2">
        <Card>
          <Text>Estimation</Text>
          <Metric>{formatNumberToEuros(13_000)}</Metric>
        </Card>
      </div>
    </form>
  );
}
