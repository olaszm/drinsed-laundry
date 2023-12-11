## Project setup

Install [nvm](https://github.com/nvm-sh/nvm)

```
nvm install 16
```

Change to version `v16.20.2`

```
nvm use 16
```

Install dependencies 

```
npm install

```

### Environment variables

Create a `.env` file in the root dir

Set the following env vars

```
VUE_APP_URL=<api-url> # http://localhost:3000/
VUE_APP_PK_STRIPE_KEY=<stripe-public-key>
VUE_APP_GETADDRESS_KEY=<getaddress-api-key>
```

[GetAddress API](https://getaddress.io/)


### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```