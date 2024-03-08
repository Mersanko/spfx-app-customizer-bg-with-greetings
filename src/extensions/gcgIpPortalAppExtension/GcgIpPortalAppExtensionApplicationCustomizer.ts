import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
// import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GcgIpPortalAppExtensionApplicationCustomizerStrings';

const LOG_SOURCE: string = 'GcgIpPortalAppExtensionApplicationCustomizer';
require('../../customCss/greetings.css')
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGcgIpPortalAppExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GcgIpPortalAppExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IGcgIpPortalAppExtensionApplicationCustomizerProperties> {


  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const getGreetingByTime = (data: [number, number, string][], currentTime: number): string | null => {
      for (let i = 0; i < data.length; i++) {
        if (currentTime >= data[i][0] && currentTime <= data[i][1]) {
          return data[i][2];
        }
      }
      return null; // Return null if no greeting is found for the current time
    };



    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    const data: [number, number, string][] = [
      [0, 4, "Good evening"],
      [5, 11, "Good morning"],
      [12, 17, "Good afternoon"],
      [18, 24, "Good night"],
    ];

    const currentTime: number = new Date().getHours();
    const greeting: string | null = getGreetingByTime(data, currentTime);


    const spanElement = document.getElementsByClassName("fontColorThemePrimary")[0] ?? null;


    if (spanElement) {
      // Change the text inside the span
      spanElement.textContent = `Hi ${escape((this.context.pageContext.user.displayName).split(" ", 1)[0])}, ${greeting}! \n Welcome to GCG Intellectual Property Portal`;
    }


    // Get the div element with data-automation-id="CanvasZone"
    const canvasZoneChild = document.querySelector('div[class*="_c_50a7110f"]')
    const canvasZone = canvasZoneChild ? canvasZoneChild.parentElement : null;
    // Check if the element exists before applying styles
    if (canvasZone instanceof HTMLElement) {
      // Apply CSS styles to the div element
      canvasZone.style.backgroundImage = "url('https://jgsoffice.sharepoint.com/:i:/r/sites/GCGIPPortal/Shared%20Documents/Official%20logo%20%26%20landing%20page/GCGIPPortalbackground6.png?csf=1&web=1&e=fA4I4y')";
      canvasZone.style.backgroundSize = "contain";
      canvasZone.style.backgroundPosition = "center center";

      canvasZone.style.backgroundColor = "rgba(255, 255, 255, 0.5)"; // Adjust the last value (opacity) as needed
      // You can add more styling here
    }

    return Promise.resolve();
  }
}
