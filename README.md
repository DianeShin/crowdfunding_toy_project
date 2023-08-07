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
- [X] 03/08/2023 : Fix post display on frontend
- [X] 03/08/2023 : Implement project complaint on frontend/backend
- [X] 03/08/2023 : Prevent multiple complaints being filed
- [X] 03/08/2023 : Enhance project list display
- [X] 03/08/2023 : Implement sign-out
- [X] 03/08/2023 : Implement navigation bar
- [X] 03/08/2023 : Implement Home Element
- [X] 03/08/2023 : Re-design project route
- [X] 03/08/2023 : Add header/footer
- [X] 03/08/2023 : Add logo
- [X] 03/08/2023 : Add login info display
- [X] 03/08/2023 : Enhance selective header/footer display
- [X] 04/08/2023 : Force user to log in to report
- [X] 04/08/2023 : Implement sign-up on frontend/backend
- [X] 04/08/2023 : Fix where f5 from acct creation doesn't put the header/footer back
- [X] 07/08/2023 : Implement project owner on backend
- [X] 07/08/2023 : Implement project display for project owner on frontend
- [X] 07/08/2023 : Modify project display layout
- [X] 07/08/2023 : Implement project upload on frontend/backend
- [X] 07/08/2023 : Create Administrator on backend
- [ ] Push login info into header properly
- [ ] Think about what info is exclusive in Account
- [ ] Implement comment function on frontend/backend
- [ ] Show reason of project abortion 
- [ ] Implement administrator frontend/backend
- [ ] Make it go to top of window when post clicked
- [ ] Implement pay logic
- [ ] Enhance post display
- [ ] Enhance money bar look
- [ ] Improve CreateIndividualAccount UI/UX and namings

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
2. Locating divs as I wish. I think I need more studying about it.

## Learned
<ul>
    <li>CSS animations</li>
    <li>Image transaction</li>
    <li>Image upload from React and processing via backend. Fixed by formData on frontend, MultipartFile on backend.</li>
</ul>
