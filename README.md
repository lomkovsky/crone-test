# Elephantstock.com

### About us:

Our brand, elephantstock.com, is a high traffic ecommerce platform for wall art
and print on demand. We offer a wide range of artworks from artists and stock
photos, and we are proud to receive excellent user reviews. Our factory is
located in Texas, HQ are in Tel Aviv, but most of the team works remotely, from
all over the Globe. We are a tech-savvy company, and we manage our entire
operation in proprietary back office applications. Our ERP includes order and
partner management systems, customer service tools, factory management systems,
product and catalog management systems, analytics tools, CMS, CRM and more.

### Technical task

The technical task aims to be as close as possible with our company's dataset and
daily challenges for our team. Now... Imagine a special company: "Dynamic
Prices Ltd". It was founded about 15 years ago, at the beginning of the year 2005. 
The company has a unique selling strategy: Daily dynamic prices for all the products!
Each night, a special cron job runs and changes the price of each
product variant. Each product has four different variants: S, M, L, XL. 
The company has more than 1 million orders. The stakeholder team wishes to improve sales
this year, and for that it must gather insights about the company's historic sales.
The company wants to know which products have the best performance, and more specifically, 
which variants out of those products are the most "successful". 
The insights should come in a form of a report for each product variant in the past 30 days, 90 days, 180
days and 365 days. The report must contain two import aggregation fileds:

- cashFlow. This field represents the sum of prices.
- sales. This field represents the amount of placed orders.

The output format of the report must be JSON. 

The entire dataset of the company is available to you -
Please execute the following command on your local machine to generate it:

```
npm run download-dynamic-prices
```

The command "downloads" all orders to your local machine. Each row has the
following attributes:

- productId
- variant. The variants can be: S, M, L, XL.
- order meta data. The object contains the order date and the dynamic price.

Note: If you're not familiar with `jsonl` as a format please visit:
[https://jsonlines.org/examples](https://jsonlines.org/examples).

The final goal of having this insightful report is achievable ONLY by "killing" 3 mystical creatures.

#### Creature 1: The parser

You need to build a parser. The parser must extract and save these 1,000,000+
records in mongodb collection(s).

Hint: Each product id occurs multiple times in the report.

#### Creature 2: The aggregator

You need to build a cron job if you want to kill this creature. The cron job
accumulates product variant orders in the past 30 days, 90 days, 180 days and
365 days.

#### Creature 3: REST API Call

The stakeholder teams wants to know the best selling product variants in the
last 30 days, 90 days, 180 days and 365 days. The output format must be:

```
{
  "bestSellers": {
    "30days": {
      "S": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "M": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "L": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "XL": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      }
    },
    "90days": {
      "S": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "M": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "L": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "XL": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      }
    },
    "180days": {
      "S": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "M": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "L": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "XL": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      }
    },
    "365days": {
      "S": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "M": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "L": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      },
      "XL": {
        "productId": "???",
        "cashFlow": "...",
        "sales": "..."
      }
    }
  }
}
```
### Instruction for solution

You need local instance of mongo DB for test the solution 
Connection path can be edited in the .env file

For run the parser

```
npm run parse
```

It fill DB by the orders

For ran application 
```
npm run start:local
```
The cron job will executing every 5 minuets and generate the new report 

For getting latest report use http://localhost:3007/reports/latest-report route

Helper routes
For count orders in db use GET http://localhost:3007/countOrders route
For manually generate report use GET http://localhost:3007/generateReport route


