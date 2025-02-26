# BWF Tournament Results

A site to view real-life results from BWF (Badminton World Federation) tournaments.

I did not like the UX of BWF's redesigned tournament result platform so I decided to create a more user-friendly one myself.

## Features

As of 22.2.2025 the site has the following features:
- Tournament calendar with search functionality
- Match results
- Brackets & standings
- Entry lists 

## Running locally

**Clone the repository**
```bash
 git clone https://github.com/jaakkomaenpaa/bwf-tournaments.git
 ```

### Server

***

**Navigate to server**
```bash 
cd server
```

**Install dependencies**
```bash 
pip install -r requirements.txt
```

**Add environment variables**

In the server root, add .env file with  
```bash 
AUTH_TOKEN=
API_URL=
```
where auth token is your token to the BWF website, and api url is the BWF API URL ending with /api. 

These can be found on the Network tab of Chrome DevTools by inspecting an xhr request starting with *vue-* on https://bwfbadminton.com/calendar/, for example.

**Run server**
```bash 
python src/main.py
```

### Client

***

**Navigate to client**
```bash 
cd client
```

**Install dependencies**
```bash 
npm install
```

**Add environment variables**

In the client root, add .env file  
```bash 
VITE_API_URL=
```
with the url where your server runs.

**Run application**
```bash 
npm run dev
```
