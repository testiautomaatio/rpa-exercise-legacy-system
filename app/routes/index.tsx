import { useNavigate } from "react-router";
import type { Route } from "./+types/index";
import { useEffect } from "react";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Welcome" },
    { name: "description", content: "Welcome to the demo app!" },
  ];
}

export default function Index() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/login.cgi");
  }, []);

  return <></>;
}
