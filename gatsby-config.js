module.exports = {
  plugins: [
    "gatsby-plugin-emotion",
    "@rhysforyou/gatsby-plugin-react-helmet-async",
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
            apiKey: "AIzaSyAsGBaAF5OmLUgqLP30NgUiFQdO9HYRbYE",
            authDomain: "coral-c8106.firebaseapp.com",
            databaseURL: "https://coral-c8106.firebaseio.com",
            projectId: "coral-c8106",
            storageBucket: "coral-c8106.appspot.com",
            messagingSenderId: "892949417441",
            appId: "1:892949417441:web:5cbf276f79f176347cd6a0",
        }
      }
    },
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: {
        prefixes: ["/question/*"]
      }
    },
    "gatsby-plugin-netlify"
  ]
}