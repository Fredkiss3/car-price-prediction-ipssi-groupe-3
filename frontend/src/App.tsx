import * as React from "react";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Button,
} from "@tremor/react";
import { MainForm } from "./main-form";

export function App() {
  return (
    <main className="px-12 py-12">
      <h1 className="text-xl">
        <span className="uppercase text-rose font-semibold text-rose-500">
          Rentcaraï
        </span>
        &nbsp;Estimator
      </h1>
      <Text className="text-lg">
        Estimez le prix du marché avant de vendre prochain car
      </Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Estimateur</Tab>
          <Tab>Historique</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-6">
              <MainForm />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div className="h-96" />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
