# hvt-svc-authoriser

Custom authentication and authorisation mechanism for all HVT API Gateway calls.

- Calls to HVT APIG trigger Lambda handler.
- This Lambda will return a policy document, either allowing or denying access to the wider service.

## Prerequisites

### Node JS

Check you have Node and NPM in your terminal:

```shell script
node --version
npm --version
```

**We strongly recommend [nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n) to manage your Node installations**. The project's `.nvmrc` (root directory) contains the recommended Node version.

You can find installation instructions on either of the GitHub links!

## Dependencies

```shell script
npm install
```

Note the project's `.npmrc` intentionally specifies `save-exact`. This means dependencies at runtime will be locked to the specific version present in `package.json`.

## Build

```shell script
npm run build
```

Output folder: `authoriser/` (Git-ignored)

To create the `authoriser` artefact, then run:
```shell script
npm run package
```

This will create an `authoriser.zip` file in the root of the project.

## Test

```shell script
npm test
```

This project only contains unit tests.

## Code quality

This project uses [oxlint](https://oxc.rs/docs/guide/usage/linter.htmls) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter.htmls) to enforce code quality and formatting. You can run these locally with:

```shell script
npm run lint
```
And

```shell script
npm run format
```

Additionally, these are executed as part of the pre-commit hook, so any code that does not meet the standards will be rejected at commit time.

## Environment Variables

### Local Invocation

To generate a test token, you'll need to create a `.env` file, that contains the following:

```bash
TENANT_ID=<value>
CLIENT_ID=<value>
CLIENT_SECRET=<value>
SCOPE=<value>
```

You can then run:

```bash
npm run generate-token
```

Which will create you a JWT token starting `eyJ0...`.


Then, we use the [serverless-offline](https://github.com/dherault/serverless-offline) package to run the lambda locally. A test function is initialised and protected by the lambda authoriser. Details of the configuration are in the serverless.yml file.


### Running

Run `npm start` to run the test function and lambda authoriser. 

```http request
POST http://localhost:3000/dev/testFunction
Authorization: Bearer <token>
```

```json
{
  "statusCode": 403,
  "error": "Forbidden",
  "message": "User is not authorized to access this resource"
}
```

If the token does allow access, the request will be allowed through to the test function and `"Test function successfully invoked. Access was granted."` is returned in the response.
