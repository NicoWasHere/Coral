const fs = require("fs")
const firebase = require("firebase")
require("firebase/firestore")
const { SitemapStream, streamToPromise } = require("sitemap")

exports.onPostBuild = () => new Promise(resolve => {
  const sitemap = new SitemapStream({ hostname: "https://coralreef.netlify.app" })

  const app = firebase.initializeApp({
    apiKey: "AIzaSyAsGBaAF5OmLUgqLP30NgUiFQdO9HYRbYE",
    authDomain: "coral-c8106.firebaseapp.com",
    databaseURL: "https://coral-c8106.firebaseio.com",
    projectId: "coral-c8106",
    storageBucket: "coral-c8106.appspot.com",
    messagingSenderId: "892949417441",
    appId: "1:892949417441:web:5cbf276f79f176347cd6a0",
    measurementId: "G-26ZNKFWYHE"
  })

  const db = app.firestore()

  db.collection("questions").get()
    .then(snapshot => {
      streamToPromise(sitemap)
        .then(res => {
          fs.writeFileSync("./public/sitemap.xml", res.toString())
          resolve()
        })

      snapshot.forEach(doc => {
        sitemap.write({ url: `/question/${doc.id}`, changefreq: "weekly", priority: 0.7 })
      })

      sitemap.end()
    })
})