import { Outlet, RootRoute, Router } from "@tanstack/react-router";
import { indexRoute } from "./pages/Index";
import { newTaskRoute } from "./pages/NewTaks";

export const rootRoute = new RootRoute({
    component: Root,
});

export const router = new Router({
    routeTree: rootRoute.addChildren([indexRoute, newTaskRoute]),
});

export function Root() {
    return <Outlet />;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
