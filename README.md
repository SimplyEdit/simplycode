# Simply Code

This project allows coding in a structured environment to create apps following the Simply App Architecture.

## Installation
The codebase runs on Apache+PHP

# Simply App Architecture

## RPC API layer
Server stores data. It has an API to access it.
Raw API component speaks to the server.
Data API exposes the endpoints in javascript.
Combined, they provide CRUD-L for the data on the server.

### Raw API
This component is responsible for communicating with the server.
It knows things like where the server is, what authentication to use.
Maps cleanly on a protocol level - in the cast of a REST API, this will expose functions for get, post, put, delete.
Handles encoding and decoding of data for calls.

### Data API
The data API component has knowledge of what information is available on the server, and is responsible for fetching and storing that information.

Makes use of the Raw API component for communication with the server.

Maps endpoints on the server API for us to use. Exposes functions like 'getServers'.

## App API layer
The App API layer consists of Actions, Commands and Routes.

### Actions
This component can be seen as the internal API for the app.
Has no knowledge of the DOM.
Has no knowledge of the server API.
Data API to store/fetch information.
Changes the app State.
Is triggered by code (usually a command or a  route).

### Commands
Is a component that is triggered by a user action. Usually triggered in the DOM, for example a user clicking a button.
Can access DOM elements, is aware of a DOM structure.
Can show UI notifications.
Makes use of Actions to change editor State.

### Routes
Is triggered by a user action. Usually by navigating to a URL.
Translates a URL to a combination that fetches data with a page.
Makes use of Actions to fetch data.
Sets the Page template to display the data with.

## App state
Keeps track of data.
Knows what the current Page template is.

## Designing the app

### Page templates
This component provides the HTML structure for a page. Consists of a combination of Design components.
Or just plain HTML, CSS and JS.
Uses SimplyEdit markup in the HTML to render data and attach Commands.

### Design components
A combination of HTML, CSS and JS to make up a custom HTML component.
Uses SimplyEdit markup in the HTML to render data and attach Commands.

## Utilities
Transformers, sorters and data sources

### Transformers
These components bridge the data to the user.
Renders data into something that can be displayed in an HTML element for the user.
Extracts data from an HTML element back into the data structure.
data-simply-transformer is set on a data-simply-field

### Sorters
Used by Actions to sort data before it goes in the app State.

### Data sources
Used for read-only data sets.
Not the main subject of the page.
data-simply-data is set on a data-simply-list.
