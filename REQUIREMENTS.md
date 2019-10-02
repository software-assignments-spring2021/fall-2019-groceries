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

### End-User Personas

#### Enrique Goldman
- Place of Birth: Vancouver, Canada
- Age: 48
- Occupation: Investment Banker, JPMorgan Chase
- Residence: Manhattan, New York
- Life story: Comes from a wealthy family, and has always been truly focused on his career. Studied at Columbia University, and is now an Investment Banker at JPMorgan. Has two children, but due to his recent divorce, has half custody. Very rarely does he see his children, due to always being so caught up in work. Has never step foot in a Supermarket, his wife was always the one to do the groceries. However, he still doesn't have the time or patience to even go to a Supermarket.
- Solution: Provide a simple way to provide groceries at his doorstep, without ever having to step foot in a local market. So simple that with just a simple text message, he can get his groceries delivered to his front door. 

#### Lucas Alberto Seijas
- Place of Birth: Caracas, Venezuela
- Age: 22
- Occupation: Student at University of Miami
- Residence: Brickell, Miami
- Life story: Born and raised in Venezuela, had to migrate the country in 2017 by himself, due to political issues. A working student on a tight budget, and has to find a way to cover all his monthly needs with his monthly earnings. Has never been a fan of going to the grocery store, especially alone. Therefore, has been trying to rely on third party delivery services, but truly can't afford all the additional costs and fees. 
- Solution: Provide a simple and affordable way to purchase groceries without the extra shipping costs. Amazon offers free shipping to all orders of $35 or more. However, Lucas does not always know what he wants, so he can't afford to pay shipping for every small order. So the solution we are offering is a simple way to add items to your cart, and once your shipping reaches the $35 threshold, will instantly place the order, and deliver it to his doorstep. 

#### Carla Casillas
- Place of Birth: Barcelona, Spain
- Age: 32
- Occupation: Single Mom, Nurse
- Residence: Brooklyn, New York
- Life story: Carla is a hardworking single mom, that has never received any monetary help from anyone. Had a boyfriend for several months, until she was pregnant with twins. The day she gave birth, was the last day she had seen her boyfriend. It was her job to raise her two kids, while still be able to maintain her job as a nurse at her local hospital. She rarely has time for hobbies or anything else that isn't, taking care of her children, or going to work. Also has the tendency to have her mind all over the place. When she needs something from the supermarket, she writes them down in a sticky note, which tends to get lost easily.
- Solution: Provide an affordable and efficient way to provide groceries to her doorstep, with a single text message. Whenever she needs something in particular, instead of reminding herself, she can simply add the object in her virtual cart with a simple message. Once her cart reaches the $35 threshold, the order will be placed and shipped to her house in hours. 


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

## User Cases Part 2
![User Case diagram 1](https://user-images.githubusercontent.com/35755459/66063862-41587900-e512-11e9-99cd-ef2800145006.png)
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
## User Cases Part 2
![User Case diagram 2](https://user-images.githubusercontent.com/35755459/66063444-5e407c80-e511-11e9-9c9d-969a8b0783e8.png)

## Domain Model

![DomainModels](https://user-images.githubusercontent.com/43123370/66007821-deb79c80-e481-11e9-8f05-e5ff2475fe32.png)
