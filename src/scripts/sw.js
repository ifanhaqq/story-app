import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";
import { CONFIG } from "./config";

const setupPrecaching = () => {
  try {
    let manifest = self.__WB_MANIFEST;

    if (process.env.NODE_ENV === "development") {
      // console.warn("Running in development mode with fallback manifest");
      manifest = [{ url: "/", revision: "dev" }];
    }

    if (!manifest) {
      // console.warn("No precache manifest found");
      manifest = [];
    }

    if (!Array.isArray(manifest)) {
      throw new Error(`Expected manifest to be array, got ${typeof manifest}`);
    }

    // console.log("Precaching manifest:", manifest);
    precacheAndRoute(manifest);
  } catch (e) {
    // console.error("Precaching failed:", e);
  }
};

setupPrecaching();

// Cache first

registerRoute(
  ({ url }) => {
    return (
      url.origin === "https://fonts.googleapis.com" ||
      url.origin === "https://fonts.gstatic.com"
    );
  },
  new CacheFirst({
    cacheName: "google-fonts",
  })
);

registerRoute(
  ({ url }) => {
    return (
      url.origin === "https://cdnjs.cloudflare.com" ||
      url.origin.includes("fontawesome")
    );
  },
  new CacheFirst({
    cacheName: "fontawesome",
  })
);

registerRoute(
  ({ url }) => {
    return url.origin === "https://ui-avatars.com";
  },
  new CacheFirst({
    cacheName: "avatars-api",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Network first
registerRoute(
  ({ request, url }) => {
    const baseUrl = new URL(CONFIG.BASE_URL);
    return baseUrl.origin === url.origin && request.destination !== "image";
  },
  new NetworkFirst({
    cacheName: "story-api",
  })
);

// Stale while revalidate
registerRoute(
  ({ request, url }) => {
    const baseUrl = new URL(CONFIG.BASE_URL);
    return baseUrl.origin === url.origin && request.destination === "image";
  },
  new StaleWhileRevalidate({
    cacheName: "story-api-images",
  })
);

registerRoute(
  ({ url }) => {
    return url.origin.includes("maptiler");
  },
  new CacheFirst({
    cacheName: "maptiler-api",
  })
);

self.addEventListener("push", (event) => {
  // console.log("Service worker pushing...");

  async function chainPromise() {
    const data = await event.data.json();
    await self.registration.showNotification(data.title, {
      body: data.options.body,
    });
  }

  event.waitUntil(chainPromise());
});
