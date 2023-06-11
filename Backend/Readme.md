# JeevAyush (Smart India Hackathon 2022 Finalist)

Backend code for Android application: https://github.com/dylan-007/JeevAyush - to locate nearby AYUSH hospitals (Hospitals offering services like Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homeopathy) based on users location and symptoms.

Features:

* Services provider seeking to register themselves on the app can do so by filling the registeration form.
* Admin panel of the app will approve the hospitals.
* Registered hopsitals (ones approved by admin) are displayed on the map based on users location.
* User can filter the search by searching for the service provider based on distance or by the symptoms he/she is feeling (this is taken care by a trained classifier ML model).
* On clicking the service provider, details related to them are displayed.User can see the details of all services provider near his/her location.
* User can click on the hopsital/service provider to book an appointment with, in which case the particular hospital is notified about the user.


## User Journey 1: Admin Interface ##

Functionalities:
* Admin can view list of all hospitals that want to register themselves. 
* Can accept / reject request based on the information and documents submitted by these service provider.


## User Journey 2: Consumer Panel ##
Functionalities:
* After fetching the current location of the consumer nearby service providers are displayed on the app ,more information is displayed when a particular hospital is clicked. 
* Can view list of hospitals and a important information pertaining to them. 
* On clicking the hospitals user can find a page to book an appointment.


## User Journey 3: Service Provider Interface ##
Functionalities:
* Service providers can fill the registeration form to get themselves registered. 
* They can view list of patients who intend to book an appointment with them. 
* On clicking particular user all information is displayed.


## Technology Stack ##
<p>Frontend: Android Studio, Java, XML </p>

<p>Backend:  NodeJs , ExpressJs </p>

<p>Database: Firebase, MongoDB </p>
<p>ML: SciKit Learn </p>
<p>Cloud: Amazon Web Service </p>
