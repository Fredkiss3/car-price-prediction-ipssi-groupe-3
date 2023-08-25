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
  consumption: number;
  gearbox: string;
  ratedHorsePower: number;

  origin: string;
  powerDIN: number;
  year: number;
};

function usePrediction(input: FormFields) {
  return useQuery({
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
  const [consumption, setConsumption] = React.useState(1);
  const [gearbox, setGearbox] = React.useState("1");
  const [ratedHorsePower, setRatedHorsePower] = React.useState(10);

  // avancé
  const [origin, setOrigin] = React.useState("1");
  const [powerDIN, setPowerDIN] = React.useState(10);
  const [year, setYear] = React.useState(new Date().getFullYear());

  const { data, isInitialLoading } = usePrediction({
    consumption,
    gearbox,
    ratedHorsePower,
    powerDIN,
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
          <SelectItem value="0">Automatique</SelectItem>
          <SelectItem value="1">Manuelle</SelectItem>
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

        {/* <div className="flex flex-col gap-2 w-full items-stretch">
          <label htmlFor="mileage">kilométrage (km)</label>
          <NumberInput
            value={mileage}
            enableStepper={false}
            onValueChange={setMileage}
            id="mileage"
            name="mileage"
            placeholder="kilométrage (km)"
          />
        </div> */}

        <fieldset className="flex flex-col items-stretch w-full mt-4">
          <label htmlFor="origin">Origine</label>
          <Select id="origin" value={origin} onValueChange={setOrigin}>
            <SelectItem value="0">France</SelectItem>
            <SelectItem value="1">Importé</SelectItem>
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

        <Button loading={isInitialLoading}>Estimer</Button>
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
