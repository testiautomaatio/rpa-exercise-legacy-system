import { Button, Checkbox, GroupBox, NumberInput, Tab, TabBody, Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow, Tabs, TextInput, Window, WindowContent, WindowHeader } from "react95";
import type { Route } from "./+types/dashboard";
import cars from "../../data/cars.json";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Demo database" },
  ];
}

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>(cars[0]);

  const showDetails = (car: Car) => {
    setCar(car);
    setOpen(true);
  };

  return (
    <>
      <Window >
        <WindowHeader>
          Final_CarSheet_v5_(ignore_others).xls
        </WindowHeader>
        <WindowContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>License</TableHeadCell>
                <TableHeadCell>Make</TableHeadCell>
                <TableHeadCell>Model</TableHeadCell>
                <TableHeadCell>Year</TableHeadCell>
                <TableHeadCell></TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map(car => <CarRow key={car.licensePlate} car={car} showDetails={showDetails} />)}
            </TableBody>
          </Table>
        </WindowContent>
      </Window>
      {<Modal onClose={() => setOpen(false)} car={car!} open={open} key={car.licensePlate} />}
    </>
  );
}

type Car = typeof cars[0];

function CarRow({ car, showDetails }: { car: Car, showDetails: (car: Car) => void }) {
  return <TableRow>
    <TableDataCell>{car.licensePlate}</TableDataCell>
    <TableDataCell>{car.make}</TableDataCell>
    <TableDataCell>{car.model}</TableDataCell>
    <TableDataCell>{car.year}</TableDataCell>
    <TableDataCell style={{ textAlign: "center" }}>
      <Button onClick={() => showDetails(car)}>Details</Button>
    </TableDataCell>
  </TableRow>
}

type ModalProps = { onClose: () => void, car: Car, open: boolean };

function Modal({ onClose, car, open }: ModalProps) {
  const [activeTab, setActiveTab] = useState(0);

  return <dialog className="cardetails" open={open} style={{ width: 550, overflow: "auto", padding: 0, borderWidth: 0 }}>
    <Window style={{ width: "100%", height: "100%" }}>
      <WindowHeader>{car.make}_{car.model}.xls</WindowHeader>
      <WindowContent>
        <Tabs value={activeTab} onChange={id => setActiveTab(id)}>
          <Tab value={0}>
            General
          </Tab>
          <Tab value={1}>
            Usage
          </Tab>
        </Tabs>
        <TabBody style={{ minHeight: 500, display: "flex", flexDirection: "column", gap: 5, marginBottom: 10 }}>

          {activeTab === 0 && <>
            <GroupBox label="License plate" className="licensePlate">
              {car.licensePlate}
            </GroupBox>
            <GroupBox label="Make" className="make">
              {car.make}
            </GroupBox>
            <GroupBox label="Model" className="model">
              {car.model}
            </GroupBox>
            <GroupBox label="VIN" className="vin">
              <span style={{ color: "darkred" }}>{car.vin}</span>
            </GroupBox>
            <GroupBox label="Year" className="year">
              {car.year}
            </GroupBox>
            <GroupBox label="Color" className="color">
              {car.color}
            </GroupBox>
          </>}

          {activeTab === 1 && <>
            <GroupBox label="Mileage" className="mileage">
              <NumberInput defaultValue={car.mileage} min={0} max={1000000} step={1000} />
            </GroupBox>
            <GroupBox label="Owner" className="owner">
              {car.owner}
            </GroupBox>
            <GroupBox label="Fuel type" className="fuelType">
              {car.fuelType}
            </GroupBox>
            <GroupBox label="Street legal" className="streetLegal">
              <Checkbox checked={car.streetLegal} label={car.streetLegal ? 'yes' : 'no'} disabled />
            </GroupBox>
            <GroupBox label="Note" className="note">
              <TextInput defaultValue={car.note} multiline />
            </GroupBox>
          </>}
        </TabBody>

        <Button onClick={onClose}>Close</Button>
      </WindowContent>
    </Window>
  </dialog >
}