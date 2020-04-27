# Coral

Coral is a site built by [Nico Anderberg](https://nicowashere.com) and [Ben Borgers](https://benborgers.com) over two days for LexHack 2020. 

The site is live at [https://coralreef.netlify.com](https://coralreef.netlify.com). 

## Overview

Coral is an online community that lets students get answers to questions about schoolwork. 

During this COVID-19 pandemic, students are interacting less with their teachers, and often feel less comfortable asking their teachers for help because their teachers are less accessible. Coral is a space where students can ask their peers for reliable help and explanations. 

Anyone can browse questions, and logged-in users can create questions and answer questions, adding text and images. 

By default, a newly written answer is not publicly viewable under the question. The answer must be promoted to being the "best answer" by a moderator. Each question can only have up to one best answer at a time — this avoids the answer section below a question becoming an incoherent and inaccurate mess. 

Moderators have additional options in the UI to mark an answer as the best answer for a given question: 

![](https://i.imgur.com/LcLUf1f.png)

## Tech

Coral is built using [React](https://reactjs.org) and [Gatsby](https://gatsbyjs.org). It doesn't require a server, instead using [Firebase](https://firebase.google.com) to save images and user data. 