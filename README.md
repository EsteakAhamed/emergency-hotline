1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

getElementById returns one element with the given id.
getElementByClassName returns all elements within the class name.

querySelector returns the first element that matches a CSS selector.
querySelectorAll returns a nodelist of all element that matches the CSS selector.

2. How do you create and insert a new element into the DOM?

Create - document.createElement("tag)
Add - element.textContent = "Emon";
Insert - parent.appendChild(element)

3. What is Event Bubbling and how does it work?

Event bubbling means that when an event occurs on an element, it first runs on that element, then bubbles up to its ancestors.

Clicking a button inside a div will first trigger the button’s event, then the div’s, then the body.

4. What is Event Delegation in JavaScript? Why is it useful?

Attaching a single event listener to a parent element instead of multiple children, and using event bubbling to handle events from children.

Improves perfomance.
Fewer event listeners.
Works for dynamically added elements.


5. What is the difference between preventDefault() and stopPropagation() methods?

preventDefault() stops browser’s default behavior.
stopPropagation() stops event bubbling.
