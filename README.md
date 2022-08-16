# Moraine-App

### Installation guide
Run the following commands for backend APIs:
1. Download the Moraine-DB.gz file and import using command `mongorestore --gzip --archive=Moraine-DB.gz` it because it contains the users information. Password for all users is same `password12345`.
  a) davepol@gmail.com - Registrar.
  b) macp@gmail.com - Advisor.
  c) mikel@gmail.com - Student.
2. `npm i` or `npm install`
3. `npm run dev`

Server will run on port `7000`

### NOTE:
Regarding emails, I've added the functionality and it is working fine when we use correct credentials in the `.env` file. For now, I've deleted my test credentials.
