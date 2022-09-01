
## Calendar Plugin

A free & open source package to build clean & modular calendar component in your app.
## Demo:
https://calendar-plugin.vercel.app/

## Get Started

 -  Paste the following tags in the header

```
  <link rel="stylesheet" href="https://calendar-plugin.vercel.app/main.min.css">
  <script src="https://calendar-plugin.vercel.app/main.min.js"></script>
```
- Create an HTML tag and give it a unique id. Like:
```
    <div id="calendarId"></div>
```
- In the `<script>` tag (or your script file), create a new calendar instance by passing the `id` of the tag created above, in the constructor `Calendar`.
- Then call the `render` function of the newly created instance. Like:
```
    <script>
        const calendarInstance = new Calendar("calendarId");
        calendarInstance.render()
    </script>
```
There, you have it. A calendar component is created inside the tag with id=`"calendarId"`. You can toggle between month, week & day view and go to next/previous month/week/day.

- Example code:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
  <link rel="stylesheet" href="https://calendar-plugin.vercel.app/main.min.css">
  <script src="https://calendar-plugin.vercel.app/main.min.js"></script>
 
  <title>Document</title>
</head>
<body>
  <div id="calendarId"></div>

  <script>
    const calendarInstance = new Calendar("calendarId")
    calendarInstance.render()
  </script>
</body>
</html>
```


## Adding Plugins

### Events Plugin
If you want the calendar to be able to add,display & delete "events of the day",
then you need to call the `addEventsPluginToCalendar` function.

- Example: 
```
    const renderEvents = addEventsPluginToCalendar(calendarInstance, eventConfigs);
```
- The function takes 2 arguments:
   - The calendar instance ( required ).
   - Event configs ( optional ).
#### The calendar Instance 
- The newly created instance returned by the `Calendar` constructor.
- It is mandatory.
#### Event configs
- An object with the following properties: 
  
  - `eventsList` - The list of event objects. Each object must have the following properties:
    - `date` - The date of the event.
    - `time` - The start time of the event in 12hr format, ex- "12AM".
    - `id` - A unique id.
    - `title` - The event title.
  - `createNewEvent` - Function to create a new event and push it to the `eventsList` array. It recieves the event date and event time as arguments.
  - `deleteEvent` - Function to delete an event. It recieves the selected event as its argument.
  - `displayEventDetails` - Function to display the event. It recieves the selected event as its argument.
- These configurations are optional so if you don't provide them, then the plugin will handle the creation/display/deletion of the events itself with a locally persistent events list.
- The function `addEventsPluginToCalendar` returns another function `renderEvents`. It should be called everytime the config `eventsList` changes, if you have provided the configs.
- If you have not provided the configs, then no need to call the `renderEvents` function anywhere.

## Customising theme
You can change the colors of the calendar by modifying the following CSS variables.
- --cal-primary-color
- --cal-secondary-color
- --cal-event-color
- --cal-current-day-color
