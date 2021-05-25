# Mendix implementation of [Sentry](https://sentry.io) (version 0.5)

## Implemented parts of the platform

 - Mendix Native client (using Sentry 2.4.3)
     - Redirection of client logs -as in the normal Log actions you can already use in nanoflows
     - Uncatched errors
     - Breadcrumbs (using Javascript action)
     - User correlation (Javascript action)
     - Tags (Javascript action) 
	 - Performance
	- Mendix Runtime (using Sentry 4.3.0)
     - Redirection of Mendix logging to Sentry (including Mendix runtime version, model revision, hostname and lognode)
     - Performance (including nested transactions)

## Mendix Native

The implementation on the Mendix Native domain consists of the following component:
 - The Mendix Module (Sentry) containing a widget and Javascript actions
 - The Sentry library included in the Mendix Native Template

The implementation of Sentry is implemented quite early as a static initialization inside the widget source.

### Installation instructions

#### Preparations

Collect the following values from the Sentry UI:

 - **DSN**: Settings > sentry > project > Client Keys (DSN) (e.g. http://XXXXXXXXXXXXX@sentryhost.westeurope.cloudapp.azure.com:9000/3)

 - **Environment** to target (e.g. dev/test/prod/...)\

#### Mendix Native Template
Assuming you already have your Mendix Native project locally, execute the following commands with the command line in the project's directory.

```
npm install --save @sentry/react-native@2.4.3
npx sentry-wizard -i reactNative -p ios android --skip-connect
```

**Note**: the *--skip-connect* part is included for on-premise environments. If you're leveraging sentry.io, you can leave this part.

#### Mendix Model
Perform the following steps:
- Import the module into the project (e.g. from the App Store)
- Alter the *SentryConfig* constant (read the *Documentation* field!) and apply the data which was collected at the preparations
- Include the Sentry widget on your homepages (e.g. for both the Anonymous and User homepage)
- Apply the Sentry actions within your model where they suit the best.

### Debugging

If everything is configured correct, all will magically work and messages will arrive on your Sentry host. If this is not the case, take the following steps:
- Set the `debug` attribute in the JSON object of the `NativeConfig` to true.
- Attach your device to a development environment.
- Inspect the log messages with e.g. Logcat of Android Studio.


### Development
#### Dependency management
Seen all components (native template, widget and Javascript actions) need to be aware of the Sentry API, they require the Node modules in all parts. It is recommended to pin the version and upgrade all components at the same time. My preferred order is:
- Upgrade the Native Template

- Upgrade the widget (in `widgets.src/js`)

- Copy the overlapping modules of `javascriptsource/reactnativebackgroundgeolocation/actions/node_modules` and `widgets.src/js/node_modules` from the `widgets.src` to the `javascriptactions`

It's not pretty, but it works.



## Mendix Runtime



### Installation instructions

- Model
  - Attach the AfterStartup microflow to the after startup sequence.
  - Make the snippet `Sentry.Web_Configuration` available in the application for configuration.
  - Connect the `Administrator` module role to a project role.
- Configure the environments through the added snippet.
- Restart the application if configuration is completed.



# Upgrade instructions

## From 0.4 to 0.5

Make sure that sentry-4.3.0.jar is the only sentry-X.jar in the userlib folder of your Mendix project.

## From 0.3 to 0.4

None.

## From 0.2 to 0.3

- Re-read the installation instructions. The majority of instructions are new.

## From 0.1 to 0.2

- The constant `Sentry.SentryConfig` has been renamed to `Sentry.NativeConfig`
- The actions for Mendix Native have been prefixed with `Native_` (e.g. from `AddTag` to `Native_AddTag`)




