# Sentimo

## <ins>**About Sentimo** &nbsp;</ins>
- **Sentimo is a web-application in which the user can write their daily diary on the basis of experiences and emotions.**

- **Our application would recognise the emotion of the user who has either typed notes in his diary or has recorded their own speech and entered in the diary. (under progress)** 

- **Further, Sentimo would recommend certain movies of the best fit genre, based on the user's emotions.**

## Git instructions
`No need to fork for the contributors, directly clone the repo`
### git clone 
> https://github.com/dakshgupta2002/sentimo.git

`Now you need to add a origin to look at this repository`
### git remote add origin 
> https://github.com/dakshgupta2002/sentimo.git

`You can now directly pull and push to various branches`  

`after cloning install the dependencies and run the servers`

## CLIENT 
___
1)  `cd client`   
2)  `npm install`   
3)  `npm start`  

## SERVER - Deployed over Amazon EC2 Linux Machine Image (Mumbai) 
___
1) `cd server`  
2) `npm install`   
3) `npm run start` 

**Make sure to work in your own branch**

### Use the protocol **Name_\<Functionality\>**
### git checkout -b dakshgupta_setup  

`keep making small commits with relevant messages`
 To make your final push to the repo:
### git pull origin main 
  `To keep your branch ahead of the main branch, so you dont miss on other updates`

### git push origin dakshgupta_setup (and wait for review and merge)
`if you are confident in your work, you can also push directly to main`
 
 ## PYTHON
 ___
 ### To install the Python dependencies 
 `pip install -r requirements.txt`
 
 ### Install NLTK resource
 `import nltk`

 `nltk.download('omw-1.4')`
