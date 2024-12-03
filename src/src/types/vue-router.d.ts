import "vue-router";

declare module "vue-router" {
    interface RouteMeta {
        title?: (route?: RouteLocationRaw) => string;
        auth?: boolean | "block";
    }
}
