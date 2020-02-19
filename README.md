# Text Crawler App

This repository contains the code for a web application for extracting from a list of ebooks the phrases that
contain a word entered by the user.

## Build

To build the project and create the production bundle the following command is used from the `frontend` folder:  
```bash
ng build --prod
```

The production code has then to be moved to the backend directory. This can be done either manually
or by running the following two npm scripts from the `frontend` folder:  
```bash
npm run-script clean-dirs  
npm run-script copy-material
```

At this point `backend/templates/index.html` has to be modified with the correct paths of the static files,
again this can be done either manually or by running the following command from the `backend` folder:  
```bash
python3 src_mod.py
```

Finally, the app is run from the `backend` folder with:  
```bash
python3 app.py
```

## Usage

Enter a word in the input field and then click on the start button. You can see the list of ebooks by clicking on the Ebooks button.

## Ebooks

In order to make the app work, ebooks in txt format (or more generally text files) have to be added to `backend/ebooks`.
This has to be done manually before the app is run.
