import { Button, GroupBox, Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow, Window, WindowContent, WindowHeader } from "react95";
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
      <Window style={{ minWidth: 800 }}>
        <WindowHeader>automobiles.xls</WindowHeader>
        <WindowContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>License</TableHeadCell>
                <TableHeadCell>Make</TableHeadCell>
                <TableHeadCell>Model</TableHeadCell>
                <TableHeadCell>Year</TableHeadCell>
                <TableHeadCell>Details</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map(car => <CarRow key={car.make + car.model} car={car} showDetails={showDetails} />)}
            </TableBody>
          </Table>
        </WindowContent>
      </Window>
      {<Modal onClose={() => setOpen(false)} car={car!} open={open} />}
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
    <TableDataCell>
      <Button onClick={() => showDetails(car)}>Details</Button>
    </TableDataCell>
  </TableRow>
}

type ModalProps = { onClose: () => void, car: Car, open: boolean };

function Modal({ onClose, car, open }: ModalProps) {
  return <dialog className="cardetails" open={open} style={{ width: 400, maxHeight: "90vh", overflow: "auto", padding: 0, borderWidth: 0 }}>
    <Window style={{ width: "100%", height: "100%" }}>
      <WindowHeader>{car.make}</WindowHeader>
      <WindowContent>
        <GroupBox label="License plate" className="licensePlate">
          {car.licensePlate}
        </GroupBox>
        <GroupBox label="Make" className="make">
          {car.make}
        </GroupBox>
        <GroupBox label="Model" className="model">
          {car.model}
        </GroupBox>
        <GroupBox label="Year" className="year">
          {car.year}
        </GroupBox>
        <GroupBox label="Mileage" className="mileage">
          {car.mileage}
        </GroupBox>
        <GroupBox label="Owner" className="owner">
          {car.owner}
        </GroupBox>
        <GroupBox label="Fuel type" className="fuelType">
          {car.fuelType}
        </GroupBox>
        <GroupBox label="Color" className="color">
          {car.color}
        </GroupBox>
        <GroupBox label="Street legal" className="streetLegal">
          {car.streetLegal ? 'yes' : 'no'}
        </GroupBox>
        <GroupBox label="Note" className="note">
          {car.note}
        </GroupBox>

        <Button onClick={onClose} style={{ marginTop: 10 }}>Close</Button>
      </WindowContent>
    </Window>
  </dialog>
}