### Backend (Server)

## It looks different from the structure tree in the normal Nest js, is there a reason for this?

In a typical nest js, domain services are put directly into the src folder. I thought that if the services grew a lot, you could see a disorganized look when you expanded the src folder. Therefore, I think it's neat to have domains that handle purely business logic in services, and data model and infrastructure-related code in src.

## You used a library called Typia, why did you use it?

Typia is a library that allows you to do type checking at runtime. You can type check the data that you send to the server by making API calls to the server, or more strictly, you can type check the types that the server passes back to you. I think this library allows you to create strict type control at runtime, which makes unit testing more meaningful.

## When you say that unit tests are more meaningful, please explain in more detail how they are different from traditional unit tests.

The difference between a typical unit test and the one I created is in the Validator decorator. In typical code, libraries like class-validator attach a decorator to the Dto so that if the wrong type of data is sent from the real server, the middleware stops it. This is great, but it can only be verified when the real server is running. In a normal test environment, I have no way of knowing if that code will work, so I write my test code based on a prediction of what I expect to happen.

I use Typia for this because I think that my test code should be able to get the same direct result of the real server behavior. If the real server spits out an error [blabla] when I send it some data, I think that when I run the same data through my test code, I should get the same error. I'm not predicting that it will come out that way, it just should.

So I created a decorator using typia that behaves the same as a class-validator, and I wrote it so that I could use it in my test code as well. The result is that I can test more strictly and at the same time write defensive code that covers more edge cases up front.

## Out of all the packages, only server is using devcontainer, why?

Well, the server is the most critical part of all the packages, so I wanted to build a strict environment with Docker from the beginning to make sure that it would run the same in production later on. I need to know that the infrastructure is okay before I can write code with any confidence.

## Why did you choose to use Postgresql?

Now that I think about it, I mostly used PostgreSQL automatically. It's a DB with strong ACID, and I think elephants are cute.
