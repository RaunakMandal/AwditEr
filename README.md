# AwditEr
Simple React Native Application to Store Audited data in Local Storage and Role based access

## App Setup
1. Download the .apk file from the drive link [Drive Link](https://drive.google.com/drive/folders/1DYZhxkxdlkV_pEnAWA0eEueJSmOWRX18?usp=sharing)
2. Install the APK on your device and follow the below steps.

### Setup with React Native
1. Clone the repository
2. Run `npm install` in the root directory
3. `cd ios` and then run `pod install`
4. Come back to root directory and run `npm run android` or `npm run ios`

## Flow
1. User signs in with credentials and role.
2. Auditor creates a new audit.
3. Viewer can only see the previous audits and audit rules.
4. Admin can view existing audits, delete audits, and see audit rules.

### Login credentials
Auditor and Viewer: auditor@example.com<br />
Viewer: viewer@example.com<br />
Admin: admin@example.com<br />
Only Auditor: auditor2@example.com<br />

Password: `123456`

## Architecture
This application uses Local storage for persistence and React Context for universal state management.<br />
Persistence was required to store user login credentials between app openings and context is for all the in-app state.<br />
I have used a permission based access control where a user can have multiple access levels and they are matched when logging the user in and also for different tasks. This can later also be integrated on each API call, actions, etc.<br />
I have also used a local DB to store user data, and definitely some constant variables to store the user details.