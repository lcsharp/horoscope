# horoscope
The sample sentences were taken from http://old.seattletimes.com/html/horoscopes/, Sunday, September 25, 2016 edition.

Steps to run the code on IBM Bluemix:
1. Create a directory called 'horoscope_(your initials)' somewhere on your computer.

2. Download or clone the code from this repository into the directory.

3. Go to the following page and make sure you have installed both Bluemix and CL command line interfaces.
   - https://console.ng.bluemix.net/docs/starters/upload_app.html

4. Login to Bluemix by entering the following command into your terminal and then entering your credentials.
   - bluemix login -a https://api.ng.bluemix.net API endpoint: https://api.ng.bluemix.net (where ng is your region)

5. In your terminal, navigate to the directory where you downloaded the files.

6. Enter the command $ cf push app_name -m 512m (where app_name is whatever you named the folder in step 1).

7. Watch your terminal through the upload, build, and start processes until you see that the app has started.

8. Go to https://console.ng.bluemix.net and log into your account and click "Dashboard" from the classic view.

9. Observe that the app is there and running. If necessary click the gear and give the app a route.

10. On the app icon click the box with an arrow protruding on the bottom right next to the star to open a browser.

11. A new tab will open and the app should be running there.