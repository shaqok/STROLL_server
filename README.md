
<p align="center"> 
<img width="324" alt="스크린샷 2020-01-22 오후 8 52 07" src="https://user-images.githubusercontent.com/54742523/72894310-5a559600-3d5e-11ea-93b5-4f2bc0a4ab4e.png">
  
###
###

## Stroll: Share your favorite places to walk or ride, and find new places to stroll!

[- Stroll-client](https://github.com/shaqok/STROLL_client)
  
## Setup
To run this project, install it locally using npm:

```
$ npm install
$ npm start

create .env file and environment variables inside according to .env.example
```
## Directory structure

```
├── App.js
├── Root.js
├── component
│   ├── AddTrail
│   │   ├── AddTrail.css
│   │   ├── Info_Map.js
│   │   └── Info_Trail_Input.js
│   ├── Login
│   │   ├── LoginInfo.css
│   │   └── LoginInfo.js
│   ├── Main
│   │   ├── Map.js
│   │   ├── ThemeList.js
│   │   ├── ThemeListElement.js
│   │   ├── TrailList.js
│   │   ├── TrailListElement.js
│   │   └── mypage.css
│   ├── Signup
│   │   ├── SignUpInfo.css
│   │   └── SignUpInfo.js
│   └── TrailInfo
│       ├── CommentList.js
│       ├── CommentListElement.js
│       ├── Info_Map.js
│       ├── Info_Trail.js
│       ├── Photozone.js
│       ├── RecentReview.js
│       ├── navermap.png
│       └── style.css
├── index.css
├── index.js
└── pages
    ├── addTrail.js
    ├── login.js
    ├── mypage.js
    ├── signup.js
    └── trailinfo.js

```
  
## Contents

- **Find Walking trails**  
  Based on the current location, you can find walking trails.  
  You can also choose a theme (e.g. Lake View) that you prefer and filter the trails.

- **Add Walking trails**  
  If you can't find one around your current location or if you want to share your favorite places, you can add a new trail using the Add Trail button.
  

## Usage

- Sign up  
  If you want to use STROLL. you need to sign up first.  
  You can simply sign up using email.
  
![Screen-Recording-2020-01-24-at-7 08 02-PM](https://user-images.githubusercontent.com/54762756/73061594-df1aee00-3edd-11ea-950b-c95713967d04.gif)

- Sign in  
  When membership is complete, you can log in and you can use the STROLL.  
  
- STROLL Main  
  You can Find all the walking trails around you in main page.  
  Or you can also find walking trails based on the themes below.
  We basically support four themes.
  - With pet
  - Lake view
  - Night view
  - beach view

![Screen-Recording-2020-01-24-at-7 27 08-PM](https://user-images.githubusercontent.com/54762756/73062594-23a78900-3ee0-11ea-85f5-2e1c3ba526e5.gif)

- Add a walking trail  
  You can add a walking trail:  
  Take five dots, fill in the information for this trail, and press the button.  
  That's it! now you can find the walking trail you just added.
  
![Screen-Recording-2020-01-24-at-7 37 12-PM](https://user-images.githubusercontent.com/54762756/73063112-5e5df100-3ee1-11ea-9db2-f72ed7abc901.gif)
  
#
  
[**enjoy your stroll with STROLL !**](http://stroll1.s3-website.ap-northeast-2.amazonaws.com/)

