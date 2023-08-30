# Feromone - Bug Tracker

<p align="center">
  <img src="https://github.com/miranamer/Feromone/assets/91673777/585f5ed1-bcbb-4d69-9fbd-f6cd5da10419">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white">
  <img src="https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white">
  <img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
</p>



<h1>Demo Vid</h1>



https://github.com/miranamer/Feromone/assets/91673777/3a6f1802-997e-44df-9718-bf3ab9892255


<h1>What Is Feromone?</h1>
<p>Feromone is a full stack bug tracking application written in TypeScript with React for the front-end and styled with Tailwind CSS and Chakra UI. The back-end uses GraphQL w/ Apollo Client and MongoDB for the DB. Feromone allows
you to track bugs in your applications/projects based on their severity.</p>

<h1>Who Was Feromone Built For?</h1>
<p>Feromone was built for a client - a freelance programmer, to allow them to keep track of their bugs via a clean,  minimalistic bug tracker that has dark mode included. The version
pushed to GitHub has some key features missing that are only available in the client's version. They wanted to have some features that allowed them to keep track of what bugs came from which 
clients and what projects. A future feature will be added to the GitHub version that allows the separation of bugs into different 'Projects'. This allows different bugs to be tracked based on the project at hand.</p>

<h1>Why The Name Feromone?</h1>
<p>Well, <i>Pheromones</i> are actually chemicals released by organisms (Humans, Ants, Bees, etc...) and have an effect on nearby organisms. As pheromones are used by Ant species to <i>track</i> each other, 
I thought it would make sense to call this bug-tracking application 'Feromone' as a nod to the behaviour of Ants and the way they communicate with each other and find their way back home. Just as the Ants can track other bugs, we too 
can track our pesky bugs.</p>

<h1>The Stack</h1>



![graphql (1)](https://github.com/miranamer/Feromone/assets/91673777/227fb197-5be4-4350-b35c-a617511daa12)




<h1>Features Available</h1>

| Feature | Description | Only Available In Client's Version? |
|     ---      |     ---        |      ---      |
| Ability To Add Bugs   | Allows You To Add Bugs With Details (Title, Desc, Severity, Patched?, Comments, Vulnerable Tech) | No |
| Add Severity Level  | Most Severe -> Least: Code Red, Extreme, Very High, High, Medium, Low | No |
| Add Patched? Flag | Based On Whether or Not The Bug Has Been Patched | No |
| Add Comments | Comments On Bugs (e.g. Status Update, Assignment of Bug To Dev(s) | No |
| Sort By Severity | Only Shows Bugs of Selected Severity Level | No |
| Sort Most Severe To Least (default sorting) | Default Sorting of Most Severe To Least | No |
| Sort By Patched | Only Show Patched Bugs | No |
| View Bug On New Page w/ Comments | Open Bug On Its Page | No |
| Add Vulnerable Technologies Affected | Any Features or Technologies The Bug Affects | No |
| Add Bugs To Kanban Board | Show Which Bugs Are Being Worked On | Yes |
| User Auth w/ Firebase | Allows Accounts To Be Made For Devs and Clients | Yes |
| Allow Clients To Add Bugs | Clients Can Add A Bug And Devs Can Investigate It | Yes |
| Add Client Feedback On Bugs | Clients Can Add Feedback And Update Bugs | Yes |
