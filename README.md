# How this repo was initialized
npx create-next-app --example with-tailwindcss table-tennis-robot-web

# How to run dev server
npm run dev

# How to kill dev server
fuser -n tcp -k 3000              // linux
lsof -nti:3000 | xargs kill -9    // macos

