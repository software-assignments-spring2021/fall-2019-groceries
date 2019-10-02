## Non-Functional Requirements

### Implementation Constraints
 - The "frontend" will be the Telegram messenger
 - The backend must be implemented in NodeJS and interact with the Telegram API
 - The database must be MongoDB

### Speed 
 - **"Throughput"**: The app must be able to process 100 incoming user requests/second
 - **"Latency"**: A user request must take no longer than 30 seconds to execute a user request
 
### Size 
 - The database must occupy no more than 10TB of disk space
 - The app must utilize no more than 64GB of memory
 - The app must utilize no more than 16 physical CPU cores

### Reliability 
 - The app must have no less than 98% uptime
 - The app must not place erroneous orders on behalf of users
 - Users must approve every order
 
### Robustness
 - The app must be able to restart within 5 minutes upon encountering a system failure

### Portability
 - The application must be abe to run on a Linux (Ubuntu/Debian) server
 - Any user utilizing the app must be able to do so on any Telegram client

### Security
 - The app must not have access to unencrypted user credentials

## Functional Requirements

### Use Cases

```
Title: Add Item To Cart
Actor: Customer
	
Scenario: Customer texts the bot to add an item and quantity thereof to the cart. If an alias
exists, the bot will use the alias. If not, the bot will search for the top 5-10 matches
and send them to the user for the user to decide. If it is not found, the user will ask for
more options. Upon successfully adding an item to the cart, the bot will also ask the user
if it would like to create a new alias for that item.
```

***

```
Title: View/Edit Item Aliases
Actor: Customer

Scenario: Customer wants to be able to add an item to buy, but referring to that item with an alias. 
For example, if the user wants to buy "frozen blueberries," there are a number of different products on 
Amazon that may reasonably correspond to "frozen blueberries." Therefore, the user must be able to add 
and update aliases for items so that they can text the bot "N alias" instead of having to manually find the 
item and add the corresponding quantities to a physical cart.
```

***

```
Title: View/Edit Items In Cart
Actor: Customer

Scenario: Customer asks for a list of items in the cart. The bot responds with a numbered lists of items 
and their corresponding prices and quantities. The user can then edit quantities for each of the numbered 
items, remove any or all of the numbered items, or add more items to the cart.
```

***

```
Title: View/Edit Preferred Delivery Times
Actor: Customer

Scenario: User gets/sets their time preferences via text. Time preferences can include top choices as well 
as times that are entirely unacceptable. Time preferences can be even more granular based on day. For 
example, 1-2pm is ok on Monday, Tuesday, and Wednesday, but not on Thursday or Friday.
```

***

```
Title: View/Edit Subtotal Trigger Quantity
Actor: Customer

Scenario: User gets/sets the minimum cart subtotal that must accumulate before the bot executes the order.
```

***

```
Title: One-Shot Order
Actor: Customer

Scenario: User sends bot item(s) to order and execute immediately (after confirmation from the bot).
```

***

```
Title: Authorize Order
Actor: Bot/Customer

Scenario: When an order is ready to be sent, the bot will first confirm the order details with the user 
(items, quantities, and desired delivery time), and only order upon ack from the user.
```

***

```
Title: Cancel Order In-Flight
Actor: Customer

Scenario: User texts "cancel active order" to bot and bot attempts to cancel order if possible. If it is 
not possible, the bot notifies the user and gives them the ability to get in touch with Amazon customer 
support.
```

***

```
Title: Get Order Status Update (Pull)
Actor: Bot/Customer

Scenario: User asks bot for order status, and bot replies with most recent or history of updates pertaining 
to order.
```

***

```
Title: Get Order Status Update (Push)
Actor: Bot/Customer

Scenario: Bot automatically sends order status updates upon receiving them from Amazon. The user can also 
control which (if any) updates they want to receive on a puish basis.
```

***

```
Title: View Past Purchases
Actor: Customer

Scenario: Customer asks bot for past orders, and bot responds with details of old orders.
```


## Domain Model

![DomainModels](https://user-images.githubusercontent.com/43123370/66007821-deb79c80-e481-11e9-8f05-e5ff2475fe32.png)
