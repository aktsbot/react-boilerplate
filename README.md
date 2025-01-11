# React boilerplate

This is the companion frontend for the [express sql api boilerplate repo](https://github.com/aktsbot/express-sql-api-boilerplate).

## Dev

```sh
$ cp .env .env.local # make changes to .local file
$ npm i
$ npm run dev
```

Visit [http://localhost:5173](http://localhost:5173/) to see the view the application.

## Deployment

I usually deploy on VMs, so the `contrib` folder has an nginx config for
serving the built react app.

There are github actions for checking PRs and deploying the app to the server
in the `.github` folder. This requires the presence of a `dev` branch and the
VMs ssh details set in the GH project's settings > secrets > actions section.
