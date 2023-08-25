import * as React from "react";
import {
  Button,
  Card,
  Metric,
  Select,
  SelectItem,
  NumberInput,
  Text,
} from "@tremor/react";
import AsyncSelect from "react-select/async";
import { useQuery } from "@tanstack/react-query";

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

type FormFields = {
  brand_id: number;
  model_id: number | null;
  consumption: number;
  gearbox: string;
  ratedHorsePower: number;
  mileage: number;
  origin: string;
  powerDIN: number;
  year: number;
};

function usePrediction(input: FormFields) {
  return useQuery({
    enabled: input.brand_id !== 0 && input.model_id !== null,
    queryKey: ["ESTIMATIONS", input],
    queryFn: async ({ signal }) => {
      return await fetch(`http://localhost:8000/api/predict/`, {
        method: "POST",
        body: JSON.stringify(input),
        signal,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }).then(
        (r) =>
          r.json() as Promise<{
            data: {
              prediction: number;
            };
          }>
      );
    },
  });
}

export function MainForm() {
  const [brand_id, setBrandId] = React.useState(0);
  const [model_id, setModelId] = React.useState<number | null>(null);
  const [consumption, setConsumption] = React.useState(1);
  const [gearbox, setGearbox] = React.useState("1");
  const [ratedHorsePower, setRatedHorsePower] = React.useState(10);
  const [mileage, setMileage] = React.useState(1);

  // avancé
  const [origin, setOrigin] = React.useState("1");
  const [powerDIN, setPowerDIN] = React.useState(10);
  const [year, setYear] = React.useState(new Date().getFullYear());

  const { data, isInitialLoading } = usePrediction({
    brand_id,
    model_id,
    consumption,
    gearbox,
    ratedHorsePower,
    powerDIN,
    mileage,
    year,
    origin,
  });

  return (
    <form
      className="grid sm:grid-cols-5 md:grid-cols-4 gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-4 items-start col-span-3 md:col-span-2">
        <div className="flex flex-col gap-2 w-full items-stretch">
          <label htmlFor="brand">Marque</label>

          <AsyncSelect
            cacheOptions
            onChange={(value) => {
              setBrandId(value?.value ?? 0);
              setModelId(null);
            }}
            required
            loadOptions={async (name: string) => {
              const result = await fetch(
                `http://localhost:8000/api/brands/?name=${name}`
              )
                .then((r) => r.json())
                .then((data) =>
                  (
                    data as {
                      data: {
                        brands: Array<{ name: string; id: number }>;
                      };
                    }
                  ).data.brands.map((brand) => ({
                    value: brand.id,
                    label: brand.name,
                  }))
                );

              return result;
            }}
            defaultOptions
          />
        </div>

        <div className="flex flex-col gap-2 w-full items-stretch">
          <label htmlFor="model">Modèle</label>

          <AsyncSelect
            cacheOptions
            required
            isDisabled={brand_id === 0}
            onChange={(value) => setModelId(value?.value ?? null)}
            loadOptions={async (name: string) => {
              const result = await fetch(
                `http://localhost:8000/api/models/?name=${name}&brand_id=${brand_id}`
              )
                .then((r) => r.json())
                .then((data) =>
                  (
                    data as {
                      data: {
                        models: Array<{ name: string; id: number }>;
                      };
                    }
                  ).data.models.map((brand) => ({
                    value: brand.id,
                    label: brand.name,
                  }))
                );

              return result;
            }}
            defaultOptions
          />
        </div>

        <div className="flex flex-col gap-2 w-full items-stretch">
          <label htmlFor="consumption">Consommation (L/Km)</label>
          <NumberInput
            value={consumption}
            onValueChange={setConsumption}
            enableStepper={false}
            id="consumption"
            required
            name="consumption"
            placeholder="Consommation (L/Km)"
          />
        </div>

        <label htmlFor="gearbox">Boite</label>
        <Select id="gearbox" value={gearbox} onValueChange={setGearbox}>
          <SelectItem value="1">Automatique</SelectItem>
          <SelectItem value="2">Manuelle</SelectItem>
        </Select>

        <div className="flex flex-col gap-2 w-full items-stretch">
          <label htmlFor="ratedHorsePower">Puissance fiscale (chevaux)</label>
          <NumberInput
            enableStepper={false}
            value={ratedHorsePower}
            onValueChange={setRatedHorsePower}
            id="ratedHorsePower"
            name="ratedHorsePower"
            placeholder="Puissance fiscale"
          />
        </div>

        <div className="flex flex-col gap-2 w-full items-stretch">
          <label htmlFor="mileage">kilométrage (km)</label>
          <NumberInput
            value={mileage}
            enableStepper={false}
            onValueChange={setMileage}
            id="mileage"
            name="mileage"
            placeholder="kilométrage (km)"
          />
        </div>

        <details className="w-full">
          <summary>Avancé</summary>

          <fieldset className="flex flex-col items-stretch w-full mt-4">
            <label htmlFor="origin">Origine</label>
            <Select id="origin" value={origin} onValueChange={setOrigin}>
              <SelectItem value="1">France</SelectItem>
              <SelectItem value="2">Importé</SelectItem>
            </Select>

            <div className="flex flex-col gap-2 w-full items-stretch">
              <label htmlFor="year">Année</label>
              <NumberInput
                value={year}
                enableStepper={false}
                onValueChange={setYear}
                id="year"
                name="year"
                placeholder="Année"
              />
            </div>

            <div className="flex flex-col gap-2 w-full items-stretch">
              <label htmlFor="noOfPlaces">Puissance réelle (chevaux)</label>
              <NumberInput
                value={powerDIN}
                enableStepper={false}
                onValueChange={setPowerDIN}
                id="powerDIN"
                name="powerDIN"
                placeholder="Puissance réelle"
              />
            </div>
          </fieldset>
        </details>
        <Button
          loading={isInitialLoading}
          disabled={brand_id === 0 || model_id === null}
        >
          Estimer
        </Button>
      </div>

      <div className="col-span-2">
        <Card>
          <Text>Estimation</Text>
          <Metric>
            {data?.data?.prediction
              ? formatNumberToEuros(data.data.prediction)
              : "-"}
          </Metric>
        </Card>
      </div>
    </form>
  );
}
