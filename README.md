## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Node.js (version 20.15.0 or higher)
* NPM (version 10.7.0 or higher)
* Visual Studio Code

### Installation

Below is an example of installing and setting up your app.

1. Clone and open the repository in visual studio code 
   ```sh
   git clone https://github.com/be-assessments/fusbir_assessment_1.git
   cd fusbir_assessment_1
   code .
   ```
2. Open terminal in visual studio code

3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the app locally
   ```sh
   npm run dev
   ```
## Usage

Use this following endpoints to add transactions get the balances and spend points

## API endpoints
### Add transactions: 
        /api/transactions
#### Method: POST       
#### Request Body:
        {
            "payer": "SHOPIFY",
            "points": 1000,
            "timestamp": "2024-07-02T14:00:00Z"
        }
#### Response:
        {
            "message": "Transaction added",
            "transaction": {
                "payer": "SHOPIFY",
                "points": 1000,
                "timestamp": "2024-07-02T14:00:00.000Z"
            }
        }
## Use the same endpoint to add transactions in bulk
        /api/transactions
#### Method: POST        
#### Request Body:
        {
            "transaction":[
                {
                    "payer": "SHOPIFY",
                    "points": 300,
                    "timestamp": "2024-06-30T11:00:00Z"
                }
                ...
            ]
        }
#### Response:
        {
            "message": "Transactions added",
            "transactions": [
                {
                    "payer": "SHOPIFY",
                    "points": 300,
                    "timestamp": "2024-07-02T14:00:00Z"
                }
            ]
        }
### Get the balances
        /api/balances
#### Method: GET        
#### Response:
        {
            "SHOPIFY": 10400,
            "EBAY": 200,
            "AMAZON": 8000,
            "DARAZ": 3500
        }
### Spend points
        /api/points/spend
#### Method: POST        
#### Request Body:
        {
            "points": 3500
        }
#### Response:
        [
            {
                "payer": "MICROSOFT",
                "points": -500
            },
            {
                "payer": "SHOPIFY",
                "points": -400
            },
            {
                "payer": "EBAY",
                "points": -200
            },
            {
                "payer": "AMAZON",
                "points": -2400
            }
        ]

