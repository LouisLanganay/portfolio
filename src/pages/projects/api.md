# 🌐 Why an API?

This API has been developed to support the services provided by **Coodo.xyz**, and it offers a range of routes to allow you to manage polls and users.
With this API, you can easily create, edit, delete, and retrieve polls and users through a series of HTTP requests.

Coodo.xyz API is designed to bring together [discord bot](coodo.xyz---discord-bot) and [dashboard](coodo.xyz---dashboard), making it easier to:

- Implement new features seamlessly.
- Avoid duplicating code across different parts of your project.

&nbsp;

| Before API | After API |
| -- | -- |
| ![Before API](https://i.ibb.co/fXQghCx/intro-pourquoi-1.png) | ![After API](https://i.ibb.co/r7Mhz8m/intro-pourquoi-2.png) |

&nbsp;

&nbsp;

# 📋 Schema

Schema of how the API works:

<img src="https://i.ibb.co/w7jc3QD/return-values-schema.png" alt="Schema of how the API works" style="width: 80%;" />

&nbsp;

&nbsp;

&nbsp;

# 🚦 Rate Limit

<img src="https://i.ibb.co/qd2fXbn/rate-limit.png" alt="Rate Limit for API requests" style="width: 80%;" />

&nbsp;

# 🤖 Testing

&nbsp;

On this repository we using Github Actions to test our API in local.

This is an example of a test run by Postman:
```js
pm.test("Body content", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.eql("Not Found");
});

pm.test("Response status code is 404", function () {
    pm.expect(pm.response.code).to.equal(404);
});
```

&nbsp;

And this is the result of all tests:
```shell
┌─────────────────────────┬────────────────────┬────────────────────┐
│                         │           executed │             failed │
├─────────────────────────┼────────────────────┼────────────────────┤
│            test-scripts │                235 │                  0 │
├─────────────────────────┴────────────────────┴────────────────────┤
│ total run duration: 3.1s                                          │
├───────────────────────────────────────────────────────────────────┤
│ average response time: 173ms [min: 10ms, max: 561ms, s.d.: 138ms] │
└───────────────────────────────────────────────────────────────────┘
```

&nbsp;

> [!NOTE]
> Check API status on vps on our [status page](http://status.coodo.xyz/).

&nbsp;

# 📚 API Documentation
All the documentation is availible on GitBook: [Click here](https://api-doc.coodo.xyz).
