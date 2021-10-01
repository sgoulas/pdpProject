## 1 September 2021

I further improved the test coverage by leveraging the `rerender` function exposed by react testing library's `render` method to test that the `ImageWithFallback` component rerenders as expected. Furthermore, upon inspecting the jest snapshot I found out that the text of the `describe` function gets prepended to the text of each `it` function. That means that I should remove the `suite` word from my `describe`s in order to have my test ouputs resemble more natural language.
