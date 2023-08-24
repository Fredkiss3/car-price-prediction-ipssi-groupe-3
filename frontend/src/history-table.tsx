import * as React from "react";
import { EyeIcon } from "@heroicons/react/solid";
import {
  Card,
  Title,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
  Color,
  List,
  ListItem,
} from "@tremor/react";
import { Dialog, Transition } from "@headlessui/react";

const colors: { [key: string]: Color } = {
  "Ready for dispatch": "gray",
  Cancelled: "rose",
  Shipped: "emerald",
};

const transactions = [
  {
    transactionID: "#123456",
    user: "Lena Mayer",
    item: "Under Armour Shorts",
    status: "Ready for dispatch",
    amount: "$ 49.90",
    link: "#",
  },
  {
    transactionID: "#234567",
    user: "Max Smith",
    item: "Book - Wealth of Nations",
    status: "Ready for dispatch",
    amount: "$ 19.90",
    link: "#",
  },
  {
    transactionID: "#345678",
    user: "Anna Stone",
    item: "Garmin Forerunner 945",
    status: "Cancelled",
    amount: "$ 499.90",
    link: "#",
  },
  {
    transactionID: "#4567890",
    user: "Truls Cumbersome",
    item: "Running Backpack",
    status: "Shipped",
    amount: "$ 89.90",
    link: "#",
  },
  {
    transactionID: "#5678901",
    user: "Peter Pikser",
    item: "Rolex Submariner Replica",
    status: "Cancelled",
    amount: "$ 299.90",
    link: "#",
  },
  {
    transactionID: "#6789012",
    user: "Phlipp Forest",
    item: "On Clouds Shoes",
    status: "Ready for dispatch",
    amount: "$ 290.90",
    link: "#",
  },
  {
    transactionID: "#78901234",
    user: "Mara Pacemaker",
    item: "Ortovox Backpack 40l",
    status: "Shipped",
    amount: "$ 150.00",
    link: "#",
  },
  {
    transactionID: "#89012345",
    user: "Sev Major",
    item: "Oakley Jawbreaker",
    status: "Ready for dispatch",
    amount: "$ 190.90",
    link: "#",
  },
];

export function HistoryTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  return (
    <>
      <Card>
        <Flex justifyContent="start" className="space-x-2">
          <Title>Tableau d'estimations</Title>
          <Badge color="gray">8</Badge>
        </Flex>
        <Text className="mt-2">
          Détail de toutes les estimations effectuées
        </Text>

        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Date d'estimation</TableHeaderCell>
              <TableHeaderCell>Marque</TableHeaderCell>
              <TableHeaderCell>Modèle</TableHeaderCell>
              <TableHeaderCell>Kilométrage</TableHeaderCell>
              <TableHeaderCell>Nombre de places</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Estimation
              </TableHeaderCell>
              <TableHeaderCell>Fiche récapitulative</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {[
              transactions[0],
              transactions[1],
              transactions[3],
              transactions[4],
            ].map((item) => (
              <TableRow key={item.transactionID}>
                <TableCell>{item.transactionID}</TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell>
                  <Badge color={colors[item.status]} size="xs">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">{item.amount}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="xs"
                    variant="secondary"
                    color="gray"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <div className="inline-flex items-center gap-2">
                      <span>voir détails</span> <EyeIcon className="h-4 w-4" />
                    </div>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Transition appear show={isDialogOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsDialogOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                                    p-6 text-left align-middle shadow-tremor transition-all rounded-xl"
                >
                  <div className="flex items-start justify-between">
                    <Text className="text-base text-gray-700 font-medium">
                      Fiche détaillée
                    </Text>
                  </div>

                  <div className="relative mt-4 h-[450px] overflow-y-scroll">
                    <Title className="mt-8">Caractéristiques</Title>
                    <List className="mt-2">
                      <ListItem>
                        <Text>Marque</Text>
                        <Text>
                          <span className="font-bold">Mercedes</span>
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text>Modèle</Text>
                        <Text>
                          <span className="font-bold">Benz Q</span>
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text>Nombre de places</Text>
                        <Text>
                          <span className="font-bold">2</span>
                        </Text>
                      </ListItem>
                    </List>
                  </div>

                  <Button
                    className="mt-2 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Fermer
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
