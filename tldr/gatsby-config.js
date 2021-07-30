module.exports = {
  siteMetadata: {
    title: `Enonic ❤️ Gatsby`,
    description: `Easily fetch data from Enonic XP via Headless API and render it with Gatsby`,
    author: `@alansemenov`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-enonic`,
      options: {
        api: 'http://localhost:8080/site/hmdb/draft/hmdb/api',
        refetchInterval: 10,
        pages: [{
          query: require.resolve('./src/queries/getMovies'),
          list: {
            url: '/movies',
            template: require.resolve('./src/templates/list'),
            title: 'Movies'
          },
          details: {
            template: require.resolve('./src/templates/movie'),
            key: 'name',
            title: 'displayName'
          }
        },
        {
          query: require.resolve('./src/queries/getPersons'),
          list: {
            url: '/persons',
            template: require.resolve('./src/templates/list'),
            title: 'Persons'
          },
          details: {
            template: require.resolve('./src/templates/person'),
            key: 'name',
            title: 'displayName'
          }
        }]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter for Enonic XP`,
        short_name: `Gatsby Starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // This (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // NB! Doesn't work in `gatsby develop` mode
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/movies/*`, `/persons/*`],
      },
    },
  ],
};
