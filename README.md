# How this repo was initialized
npx create-next-app --example with-tailwindcss table-tennis-robot-web

# How to run dev server
npm run dev

# How to kill dev server
fuser -n tcp -k 3000              // linux
lsof -nti:3000 | xargs kill -9    // macos

# Deploying
It is needed to use heroku because:
- espruino with nodemcu cannot use https, request fallbacks to http instead
- netlify and vercel force http -> https redirection, so we can't get to the resource
- heroku doesn't care, it allows http access to the server

package.json start script has extra port parameter for heroku only:
```
"start": "next start -p $PORT" // PORT is heroku internal env var
```
If heroku needs to be swapped, script should be reverted to "next start" (default)