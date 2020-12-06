## **Map Demo**

This React Native app demonstrates basic usage of core React Native features, Redux, persistence, and the Google Places and Directions APIs.

### Instructions
* Clone the repository
* Add a .env file to the project root with the following entry:
`MAPS_API_KEY='your_api_key_here'`
* Note that the account for which the Google Maps API key is generated will need to have billing enabled and the relevant APIs allowed.
* `yarn install`
* For iOS, `cd ios && pod install`
* To run on iOS:
    * Plug in your device, if desired
    * `yarn ios --simulator="your_simulator_name"` or `yarn ios --device="your_device_name"`
* To run on Android:
    * Either open an AVD or plug in a physical device
    * `yarn android`

### Features
Origin and destination points may be entered on the default Map tab using the form inputs. Up to five autocompleted suggestions appear above the inputs as you type, and may be selected to populate the active field. Inputs may be swapped using the button provided.

Pressing the enter button causes markers to appear at the selected points on the map. Time and distance information appear in place of the inputs. This view may be exited in order to enter another route.

The History tab displays a list of prior searches. This data is persisted when the app is closed. The list may be cleared using the button provided.
