## Table of contents
1. [Intro](#intro)
1. [Your tasks](#your-tasks)
1. [Design mocks](#design-mocks)
1. [Backend](#backend)
1. [Running the project](#running-the-project)
1. [Submitting](#submitting)
1. [Evaluation](#evaluation)


## Intro

Your goal is to build a simple application that mimics [Beyond Pricing](http://beyondpricing.com).

This app will be used by the owner of a property (apartment, house). The main goal of the app is to let the user review the prices of his listings.

The 2 pages the application will have are:

1. Dashboard page - displays a list of all the user's listings with a link to the calendar
1. Calendar page - displays a listing's calendar that contains all the dates and their information


The core concept of Beyond Pricing is a `Listing` - for example, an apartment on Airbnb or HomeAway.

The `Listing` entity carries a certain number of information about the property (title, picture, etc) and has a `Calendar` to carry prices and availability information.

A `Calendar` is just a list of dates with added information about each date.

Additionally, in Beyond Pricing, we have the concept of a "Base Price" integer. When we predict a price for a day, we think of it as a multiple of the base price. E.g. a price of $150 for a specific day is a 1.5x multiple on the base price of $100.

In addition to the base price, we use factors to fluctuate the prices per day.

The 2 factors for this challenge are:

1. Seasonality
1. Day Of Week

For instance, given a base price of 100 and the following factors:
- `seasonal=0.20` (=20% increase)
- `dayOfWeek=0.10` (=10% increase)

The price for that day will be 130.


## Your tasks

1. Build the listings page
    - Fetch the data from the `/listings` endpoint
    - Show all the metadata supplied by the API for each listing
    - Create a link from each listing to the calendar page

1. Build the calendar page
    - Fetch the data from the `/calendar/:listingId` endpoint
    - Display the data as a calendar view: for each day, display its calculated price using the base price and the factors
    - When hovering over a date, show its `isBlocked` status and the price breakdown (factors) in a popover
    - Add a textbox with the listing's base price that the user can edit
        - Preview the base price in the calendar days as the user types the new price
        - POST the new base price to `/calendar/:listingId`
        - Update the UI with the new base price for every day
        - If you want 3rd party library to render the calendar, we think that [ember-power-calendar](https://github.com/cibernox/ember-power-calendar) or [react-calendar](https://github.com/wojtekmaj/react-calendar) could help.

### Design mocks

Check the `media` folder.
We added these design mocks to help you understand what the UI could look like.
Please note - it's ok to have the style look close to the mocks, please don't spend time to make it pixel perfect

### Backend

We built a small backend server that you can interact with and fetch the needed data.
All of these APIs are fully functional, and have been verified to return correct data without error codes.

- GET `http://localhost:1024/listings`

  Returns a list of listings. Listing structure:
    ```
    id -  [int] unique id
    title - [string] The name that represent this listing
    picture - [string] URL that points to the listing's picture
    health - [float] A float between 0 and 1 to represent how good the pricing for this listing is, higher is better.
    currency - [string] E.g.: "USD" or "EUR"
    beds - [int] Number of beds
    ```

- GET `http://localhost:1024/calendar/:listingId`

  Returns Calendar's dates. Date structure:
    ```
    date - [string] ISO date, e.g.: 2020-01-01
    isBlocked - [boolean] True if the day is blocked
    factors - [object] the price factors for that day:
        seasonal - [float] factor related to the seasonality
        dayOfWeek - [float] factor related to the day of the week
    ```

- POST `http://localhost:1024/calendar/:listingId`

  Updates base price of `:listingId` listing.
    ```
    basePrice - [int] the new base price
    ```
  Example:

  `curl -X POST http://localhost:1024/calendar/1 -H "Content-Type: application/json" --data '{"basePrice": 100}'`


## Running the project

* Open it up in your terminal and run `npm install`

* Run `npm run server` to start the backend for this app. Visit [http://localhost:1024/listings](http://localhost:1024/listings) to make sure it works.

* We expect you to add the `npm start` command that runs the frontend application.

## Submitting

1. Make sure all your changes are committed to `git`.

   ```bash
   $ git status
   On branch master
   nothing to commit, working directory clean
   ```

1. Create a zip archive of your project named `"code-challenge-dashboard-[YOUR NAME].zip"`. Make sure to include the `.git` folder as well.

1. Email us `code-challenge-dashboard-[YOUR NAME].zip`.


## Evaluation

Your work will be evaluated based on the following criteria:

* Correctness: The features you implement work correctly.
  There are no errors in the console. It's not easy to make your code break.
* Completeness: Every feature is implemented.
* Cleanliness and ease of use: Your code is easy to understand and extend.
* Usage of best practices code like polymorphism, extension vs modification, usage of constants, good variable naming, separation of concerns, small modules/classes.
* Human-readability is considered. Consider consistent code style, explanatory variable names, and include code doc when necessary.  Think of future devs!
* Use code doc to comment functions when appropriate.  Explaining their parameters, return values, and human-readable descriptions of the functions' purpose. _Why_ does this function exist?
* Proper error handling

:exclamation: **Important:** Your app **MUST** start successfully.

Feel free to use any frontend framework and add any dependencies or 3rd party libraries to this project.
