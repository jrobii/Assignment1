# GitHub Repository
A Github repository was used to ensure that code could be versioned and stored somewhere else rather than locally.
The repository was kept clean and was regularly committed to when new code was implemented that was working. The repository holds code for the angular and server (node) applications.

# Data Structure
### Back-End
Data on the back end is stored in serialised JSON files. One called users.json that holds the user information and gcd.json that stores the groups and channel data. Each json file is essentially a big array as that was the most efficient way to store and fetch multiple users and groups respetively.

**users.json**
- id - a unique number that identifies each user.
- username - the users username.
- email - the email for the user.
- password - the password for authentication.
- role - the role of the user.

**gcd.json**
- id - a unique number that identifies the group.
- name - the name of the group.
- admins - an array of user id's that are admins of the group.
- assis - an array of user id's that are assistants of the group.
- users - an array of user id's that have access to the group.
- channels - an array of channel objects that belong to this group.
1. name - name of the channel (within the channels array).
2. users - array of users that can access the channel (within the channels array).

### Front-End
Data is fetched from the back-end through HTTP Post Requests. Data is also sent to the back-end through objects containing the relevant data.
The data for the front-end recieved from the back end is stored in local variables such as arrays to hold the group/user data or simple variables that are used to 2-way bind forms to grab entered information.
The logged in users information is stored in local storage of the browser and is cleared when they log out.

# REST API
| Route | Parameters | Return Values | Purpose |
|-------|------------|---------------|----------|
|/api/auth| Username, Password | The found user is returned with a valid parameter otherwise only a false valid parameter is returned | This routes purpose is to check the users entered credentials to see if it matches a known user.|
|/api/createuser| Username, Email, Password, Role | This route returns the new issue with a true ok parameter, otherwise a valid false parameter is returned. | This routes purpose is for the angular app to request to create a user. It checks the already created users to see if the user exists, if it does an error occurs, if not it is added to the json file.|
|/api/deleteuser| ID | The user with the matching ID is returned with a true ok parameter. If not found the a false ok parameter is returned. | This routes purpose is for the Angular app to request to delete a user. It checks to ensure the user exists and if it does delete the user from the JSON. If the user doesn't exist an error occurs.|
|/api/getusers | NIL | This route returns all of the users found in the json file | This routes purpose is to show the s-admins or g-admins all of the user information.|
|/api/creategroup| User, GroupName | This route returns the group information of the new group if successful with an ok parameter. An false ok parameter is returned if the creation is unsuccessful| The purpose of this route is for the angular app to create a group. It checks if the group already exists, if it does an error occures. If not the group is added tp the json file. It also checks to ensure that the logged in user has permission to create a new group.|
|/api/getgroups|NIL|This route returns all of the groups and their information|This routes purpose for the s-admin or g-admin or assistants to see the group information.|
|/api/deletegroup|User, Name|This route returns the group information with an ok true parameter if successful otherwise an ok false parameter is returned.| This routes purpose is for the angular app to request to delete a group. If the group exists it will be removed, if it does not then an error will occur. It also checks to ensure that the logged in user has permission to delete a group.|
|/api/addusertogroup| User, GroupName, Username | This route returns the user information of the user that was added to a group with an true ok parameter if successful. If not successful an false ok parameter is returned.| The purpose of this route is for the angular app to request to add a user to a group. It checks to ensure that the group and user exist and that the user is not already in the group. If any of those occur an error will happen. It also checks that the logged in user has permission to add a user to the group.|
|/api/deleteuserfromgroup| User, Group Name, Username | This route returns the user information of the user that was deleted from a group with an true ok parameter if successful. If not successful an false ok parameter is returned. | The purpose of this route is for the angular app to request to remove a user from a group. It checks to ensure that the group and user exist and that the user is already in the group. If any of those occur an error will happen. It also checks that the logged in user has permission to remove a user from the group.|
|/api/addgroupadmin|Name, Username | This route returns the user information of the user that has been added as an admin of the group with a true ok parameter if successful. If not successful a false ok parameter is returned. | The purpose of this route is for the Angular app to request to add a user as a group admin. It checks to ensure that the user is not already a group admin, if they are an error will occur.|
|/api/addgroupassis|User, GroupName, Username | This route returns the user information of the user that has been added as an assis of the group with a true ok parameter if successful. If not successful a false ok parameter is returned.| The purpose of this route is for the Angular app to request to add a user as a group assis. It checks to ensure that the user is not already a group assis, if they are an error will occur. It also checks to make sure the logged in user has permissions to add an assis to the group.|
|/api/delgroupadmin|GroupName, Username | This route returns the user information of the user that has been removed as an admin of the group with a true ok parameter if successful. If not successful a false ok parameter is returned. | The purpose of this route is for the Angular app to request to remove a user as a group admin. It checks to ensure that the user is already a group admin, if they are an error will occur.|
|/api/delgroupassis|User, GroupName, Username| This route returns the user information of the user that has been removed as an assis of the group with a true ok parameter if successful. If not successful a false ok parameter is returned.|The purpose of this route is for the Angular app to request to remove a user as a group assis. It checks to ensure that the user is already a group assis, if they are an error will occur. It also checks to make sure the logged in user has permissions to add an assis to the group.|
|/api/getusersgroups| ID | This route returns all of the groups the user has been added to.| The purpose of this route is for the angular app to request all of the current logged in users groups.|
|/api/createchannel|User, GroupName, ChannelName | This route returns the channel object of the newly created channel plus a true ok parameter if successful. If unsuccessful a false ok parameter is returned.| The purpose of this route is for the Angular app to request to create a channel within a group. It checks the group exists and the channel does not already exist. If any of those are false an error will occur. It also checks to make sure the logged in user has permission to create a channel within that group. |
|/api/deletechannel|User, GroupName, ChannelName | This route returns the channel object of the deleted channel plus a true ok parameter if successful. If unsuccessful a false ok parameter is returned. | The purpose of this route is for the Angular app to request to delete a channel within a group. It checks the group exists and the channel does exist. If any of those are false an error will occur. It also checks to make sure the logged in user has permission to remove a channel within that group.|
|/api/addusertochannel|User, GroupName, ChannelName, Username | This route returns the user object of the user that has been added to a channel with a true ok parameter if successful. If not successful a false ok parameter is returned. | The purpose of this route is for the Angular app to request a user be added to a channel within a group. It checks if the group, channel and user exist as well as if the user is not already in the channel. If any of these are false then an error will occur. It also checks to make sure the logged in user has permission to add a user to a channel within that group.|
|/api/deluserfromchannel|User, GroupName, ChannelName, Username | This route returns the user object of the user that has been removed from a channel with a true ok parameter if successful. If not successful a false ok parameter is returned. | The purpose of this route is for the Angular app to request a user be removed from a channel within a group. It checks if the group, channel and user exist as well as if the user is already in the channel. If any of these are false then an error will occur. It also checks to make sure the logged in user has permission to remove a user from a channel within that group.|

# Angular Architecture

### Components
**Admin Component**
In the admin component this is used for the user administration. It holds the forms that allow for adding and deleting a user, adding and remvoving a user from a group and adding and removing users from channels within groups. Only s-admins, g-admins and group assis can access this component.

**Channel Admin Component**
In the channel admin component this is used for administration of the channls. This contains the forms and functions that are used to add and remove channels.

**Chat Component**
This is the main page of the chat app. So far this only contains the list of the groups and channels the user has been added to.

**Group Admin Component**
The Group Admin component handles the administration of the groups. It has the forms and functions for adding and removing a group, adding and removing group admins and adding and removing group assistants.

**Login Component**
Handles the authentication of users and shows the login form to the user.

### Services
Services have been used because they add a level of reusability into the code. The requests can be made from the components, but I decided to split them up so i can see different aspects of my project better and to clear up my code.

**Channel Service**
The channel service is the service that handles the post requests for the channel related functions and returning of the respective data.

**Group Service**
The group service is the service that handles the post requests for the group related functions and returning of the respective data.

**Login Service**
The login service is the service that handles the authentication of the user.

**User Service** 
The user service handles the the post requests for the user related functionality and also returns the respective data.

### Models
**User Model**
The User model has been created so that we can define what a user should be and this makes it easier when handling a user.