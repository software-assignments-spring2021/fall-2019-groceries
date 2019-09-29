## Use Cases

```
Title: View/Edit Item Aliases
Actor: Customer

Scenario: Customer wants to be able to add an item to buy, but referring to that item with an alias. 
For example, if the user wants to buy "frozen blueberries," there are a number of different products on 
Amazon that may reasonably correspond to "frozen blueberries." Therefore, the user must be able to add 
and update aliases for items so that they can text the bot "N alias" instead of having to manually find the 
item and add the corresponding quantities to a physical cart.
```

#### Questions:
 - Would you like to have aliases that are based on item and quantity?
 	- e.g. `SET ALIAS "week supply of avacados" = 5 "avacados"`
 - Would you like to have nested aliases?
 	- e.g. `SET ALIAS "week food" = 4 "apples", "week supply of avacados"`
 - Would you like to extend the concept of aliasing to one-shot orders as well?
 	- e.g. `SET ONE-SHOT ALIAS "week food" = 5 "avacados", 4 "apples", 2 "tabasco"`

```
Title: View/Edit Items In Cart
Actor: Customer

Scenario: Customer asks for a list of items in the cart. The bot responds with a numbered lists of items 
and their corresponding prices and quantities. The user can then edit quantities for each of the numbered 
items, remove any or all of the numbered items, or add more items to the cart.
```

#### Questions:
 - Would you ideally like another feature to be able to clear the cart? This would ostensibly be easier than removing items one at a time.
 - Proposed interface:
 	- User texts `VIEW CART`
 	- Bot responds: 
 
 		```
 		1) 5 avacados
 		2) 3 bananas
 		```
 	- If user wants to edit item, they could text 
 		- `Add 2 avacados`
 		- `Remove 1 banana`
 		- `Remove all`

```
Title: View/Edit Preferred Delivery Times
Actor: Customer

Scenario: User gets/sets their time preferences via text. Time preferences can include top choices as well 
as times that are entirely unacceptable. Time preferences can be even more granular based on day. For 
example, 1-2pm is ok on Monday, Tuesday, and Wednesday, but not on Thursday or Friday.
```

```
Title: View/Edit Subtotal Trigger Quantity
Actor: Customer

Scenario: User gets/sets the minimum cart subtotal that must accumulate before the bot executes the order.
```

```
Title: One-Shot Order
Actor: Customer

Scenario: User sends bot item(s) to order and execute immediately (after confirmation from the bot).
```

```
Title: Authorize Order
Actor: Bot/Customer

Scenario: When an order is ready to be sent, the bot will first confirm the order details with the user 
(items, quantities, and desired delivery time), and only order upon ack from the user.
```

#### Questions:
 - We will use OAuth to keep your credentials secure and so that we have no knowledge of them
 - What other security requirements would you like to see?

```
Title: Cancel Order In-Flight
Actor: Customer

Scenario: User texts "cancel active order" to bot and bot attempts to cancel order if possible. If it is 
not possible, the bot notifies the user and gives them the ability to get in touch with Amazon customer 
support.
```

```
Title: Get Order Status Update (Pull)
Actor: Bot/Customer

Scenario: User asks bot for order status, and bot replies with most recent or history of updates pertaining 
to order.
```

```
Title: Get Order Status Update (Push)
Actor: Bot/Customer

Scenario: Bot automatically sends order status updates upon receiving them from Amazon. The user can also 
control which (if any) updates they want to receive on a puish basis.
```

#### Questions:
 - What kinds of other order status updates would you like to have?

```
Title: View Past Purchases
Actor: Customer

Scenario: Customer asks bot for past orders, and bot responds with details of old orders.
```

#### Questions:
 - What would you like to see in your past purchase data?
 - Note that the purchase data will only give you data for orders that occured within the app.
 - The app will not give you data about other external Amazon orders.