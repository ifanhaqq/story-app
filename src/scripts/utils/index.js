import { Workbox } from "workbox-window";

export function showFormattedDate(date, locale = "en-US", options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function setupSkipToContent(element, mainContent) {
  element.addEventListener("click", () => mainContent.focus());
}

export function transitionHelper({ skipTransition = false, updateDOM }) {
  if (skipTransition || !document.startViewTransition) {
    const readMoreBtn = document.querySelector(".story-item__read-more");
    readMoreBtn.addEventListener("click", () => {
      const thumbnail = document.querySelector("story-item__image");
      thumbnail.style.viewTransitionName = "story-image";

      const transition = document.startViewTransition(() => {
        updateDOM();
      });

      transition.finished.then(() => {
        thumbnail.style.viewTransitionName = "";
      });
    });
    const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {
      const thumbnail = document.querySelector("story-item__image");
      thumbnail.style.viewTransitionName = "";
    });
    return {
      ready: Promise.reject(Error("View transitions unsupported")),
      updateCallbackDone,
      finished: updateCallbackDone,
    };
  }
  return document.startViewTransition(updateDOM);
}

export function convertBlobToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Ref: https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 */
export function convertBase64ToBlob(
  base64Data,
  contentType = "",
  sliceSize = 512
) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export function convertBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function isServiceWorkerAvailable() {
  return "serviceWorker" in navigator;
}

export async function registerServiceWorker() {
  // if (!isServiceWorkerAvailable()) {
  //   console.log('Service Worker API unsupported');
  //   return;
  // }

  // try {
  //   const registration = await navigator.serviceWorker.register('/sw.bundle.js', { type: 'module'});
  //   console.log('Service worker telah terpasang', registration);
  // } catch (error) {
  //   console.log('Failed to install service worker:', error);
  // }

  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js");

    wb.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        console.log("Service worker updated");
      } else {
        console.log("Service worker installed for the first time");
      }
    });

    wb.addEventListener("activated", (event) => {
      if (!event.isUpdate) {
        console.log("Service worker activated");
      }
    });

    wb.register();
  }
}
