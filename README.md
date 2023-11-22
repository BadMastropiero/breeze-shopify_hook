# Breeze Shopify Hook

This is a serverless function that should be triggered whenever a new order is placed on a Shopify store.

It performs additional calculations and update a separate inventory system,
is deployed to AWS Lambda using the Serverless framework, and gracefully handles errors and duplicated requests.

## Quick start

Clone the repo and run:

```bash
npm i install serverless -g
```

Have configured serverless and aws
credentials([this](https://stackify.com/aws-lambda-with-node-js-a-complete-getting-started-guide/) can be used as a step-by-step guide)

```bash
npm i install
```

## Deploy

```bash
npm run deploy
```

## Testing

```bash
yarn test
```

## TODO

- [ ] Implement error retries with exponential backoff.
