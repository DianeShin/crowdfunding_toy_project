# Toy project - crowdfunding website
This is a full-stack project making a website where you can upload crowdfunding projects.

## Tech stack
<ul>
  <li>frontend : React</li>
  <li>backend : Spring boot with Maven</li>
  <li>database : postgreSQL</li>
</ul>

## Features
<ul>
  <li>Customer</li>
  <ul>
    <li>See projects</li>
    <li>Comment on projects</li>
    <li>Interact with project owners</li>
  </ul>
  <li>Project owner</li>
  <ul>
    <li>Upload project description</li>
    <li>Set goal for projects</li>
    <li>Set reward options</li>    
  </ul>
  <li>Administrator</li>
  <ul>
    <li>Approve new projects</li>
    <li>Review malicious projects and remove</li>    
  </ul>
</ul>

## Timeline - To be updated
- [X] 30/07/2023 : Design overall project
- [X] 31/07/2023 : Setup project
- [X] 31/07/2023 : Create Individual on backend
- [X] 31/07/2023 : Implement account selection screen on frontend
- [X] 01/08/2023 : Design database for project
- [X] 01/08/2023 : Modify Individual to Account on backend
- [X] 01/08/2023 : Implement login logic for Accounts
- [X] 01/08/2023 : Implement login for Individuals/Project owners on frontend
- [X] 02/08/2023 : Implement getAccountById on frontend/backend
- [X] 02/08/2023 : Create Post on backend
- [X] 02/08/2023 : Implement project post display after individual login on frontend
- [ ] Create Post/Comments on backend
- [ ] Create chat function on backend
- [ ] Create frontend by wireframe

## Design
[Check here](https://www.figma.com/file/yn4m2ThcUjPmhrz855Voor/Untitled?type=design&node-id=0%3A1&mode=design&t=4pgaDM5SX3EfIeDg-1 "Go to Figma")

## Front-end configuration
```
npm i react-router-dom
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
```
## Troubleshooting
1. Unable to access lob stream error while implementing login: fixed by adding @Transactional to AccountService.
## Learned
<ul>
    <li>CSS animations</li>
    <li>Image transaction</li>
</ul>
