# enonic-guillotine-gatsby-auth-test
Testing Enonic Headless authentication for graphQL API calls

## Description

This project is a full functional controller for graphQL API calls using a backend of Enonic XP (Guillotine Lib to create the graphQL schemas) and a front end of Gatsby.

It was pregenerated by the tutorial in the Enonic website and further enhanced for the specific use case of authenticated calls.

## Important Files

 - "/myporject/": Where the Enonic backedn lives;
 - "/tldr/": Where the Gatsby frontend lives;
 - "/myproject/src/main/resources/controllers/graphql2.js": Modified version of the premade graphql controller, in which I added the authentication protocols;
 - "/myproject/src/main/resources/site/site.xml": A new mapping for "/api2" was added for the new controller;
 - "/tldr/src/components/layout.js": This is where I tested most of the calls.

## Further details

 - Note that the query request expects user, password, query and variables from the request. It is a single authentication plus query request;
 - The request does not maintain session by the use of the "scope REQUEST" in the authLib from Enonic XP;
 - In my test calls I left a user and a password that will not work, for that you need to create a admin user in your Enonic users panel;
 - IMPORTANT: The Guillotine Lib API for executing graphQL queries differ from version to version (e.g. 5.0 expects three parameters "schema", "query" and "variables", while 5.1 only expects a single object containing "query" and "variables").
