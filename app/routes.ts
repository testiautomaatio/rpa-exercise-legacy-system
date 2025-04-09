import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    route("login.cgi", "routes/login.tsx"),
    route("dashboard.php", "routes/dashboard.tsx"),
] satisfies RouteConfig;
