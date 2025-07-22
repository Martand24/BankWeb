## Overview

This API provides endpoints for a comprehensive fraud detection system with admin panel functionality. It handles payment processing, fraud detection, admin reviews, customer management, and transaction monitoring using advanced ML models and graph neural networks.

## Authentication

> **Note:** Currently, no authentication is required. In production, implement proper authentication middleware.

## Admin Panel Endpoints

### 1. Get Admin Statistics

**`GET /admin/stats`**

Get high-level statistics for the admin dashboard.

#### Response

```json
{
  "total_transaction_volume": 125430.50,
  "successful_transactions": 1247,
  "pending_admin_reviews": 23,
  "overall_fraud_rate": 3.2
}
```


#### Response Fields

| Field | Type | Description |
| :-- | :-- | :-- |
| `total_transaction_volume` | `float` | Total value of all successful transactions |
| `successful_transactions` | `int` | Count of completed transactions |
| `pending_admin_reviews` | `int` | Count of transactions awaiting admin review |
| `overall_fraud_rate` | `float` | Percentage of fraudulent transactions |

#### Use Case

Display key metrics on the admin dashboard main page.

### 2. Get Pending Transactions

**`GET /admin/pending_transactions`**

Retrieve all transactions pending admin review.

#### Response

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "customer_id": "CUST_001",
    "merchant_id": "MERCH_123",
    "amount": 1250.00,
    "fraud_probability": 0.75,
    "status": "pending",
    "timestamp": "2025-01-15T14:30:00Z"
  },
  {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "customer_id": "CUST_002",
    "merchant_id": "MERCH_456",
    "amount": 850.50,
    "fraud_probability": 0.68,
    "status": "pending",
    "timestamp": "2025-01-15T14:25:00Z"
  }
]
```


#### Response Fields

| Field | Type | Description |
| :-- | :-- | :-- |
| `id` | `UUID` | Unique transaction identifier |
| `customer_id` | `string` | Customer identifier |
| `merchant_id` | `string` | Merchant identifier |
| `amount` | `float` | Transaction amount |
| `fraud_probability` | `float` | Fraud probability score (0.0 to 1.0) |
| `status` | `string` | Transaction status |
| `timestamp` | `datetime` | Transaction timestamp |

#### Use Case

Display a list of transactions requiring admin review with sorting and filtering options.

### 3. Review Transaction (Admin Action)

**`POST /admin/review_transaction`**

Admin approves or rejects a pending transaction.

#### Request Body

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "action": "approve"
}
```


#### Request Fields

| Field | Type | Description |
| :-- | :-- | :-- |
| `id` | `UUID` | Transaction ID to review |
| `action` | `string` | Either "approve" or "reject" |

#### Response

```json
{
  "message": "Transaction 123e4567-e89b-12d3-a456-426614174000 has been approved."
}
```


#### Status Codes

| Code | Description |
| :-- | :-- |
| `200` | Success |
| `404` | Transaction not found or not in pending state |
| `422` | Invalid request data |

#### Use Case

Allow admins to approve or reject flagged transactions from the review interface.

## Transaction Management Endpoints

### 4. Process Payment

**`POST /process_payment`**

Process a new payment transaction through fraud detection.

#### Request Body

```json
{
  "customer_id": "CUST_001",
  "merchant_id": "MERCH_123",
  "amount": 150.75,
  "tflite_score": 0.85
}
```


#### Request Fields

| Field | Type | Description |
| :-- | :-- | :-- |
| `customer_id` | `string` | Customer identifier |
| `merchant_id` | `string` | Merchant identifier |
| `amount` | `float` | Transaction amount |
| `tflite_score` | `float` | TensorFlow Lite model score (0.0 to 1.0) |

#### Response

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "customer_id": "CUST_001",
  "merchant_id": "MERCH_123",
  "amount": 150.75,
  "fraud_probability": 0.25,
  "status": "paid",
  "timestamp": "2025-01-15T14:30:00Z"
}
```


#### Possible Status Values

| Status | Description |
| :-- | :-- |
| `paid` | Transaction successful (fraud probability < 0.40) |
| `pending` | Requires admin review (fraud probability ≥ 0.40) |

#### Use Case

Process payments and determine if they need admin review based on fraud probability.

### 5. User Transaction Action

**`POST /transactions/user_action`**

Handle user confirmation or cancellation of approved transactions.

#### Request Body

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "action": "confirm"
}
```


#### Request Fields

| Field | Type | Description |
| :-- | :-- | :-- |
| `id` | `UUID` | Transaction ID |
| `action` | `string` | Either "confirm" or "cancel" |

#### Response

```json
{
  "message": "User action recorded."
}
```


#### Status Codes

| Code | Description |
| :-- | :-- |
| `200` | Success |
| `404` | Transaction not found or not awaiting user action |

#### Use Case

Allow users to confirm or cancel transactions that were approved by admin.

### 6. Get Transaction Logs

**`GET /transactions/logs/{customer_id}`**

Retrieve transaction history for a specific customer.

#### Path Parameters

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `customer_id` | `string` | Customer identifier |

#### Response

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "customer_id": "CUST_001",
    "merchant_id": "MERCH_123",
    "amount": 150.75,
    "fraud_probability": 0.25,
    "status": "paid",
    "timestamp": "2025-01-15T14:30:00Z"
  }
]
```


#### Use Case

Display customer transaction history in admin panel or customer profile.

## Customer Management Endpoints

### 7. Get Customer Details

**`GET /customers/{customer_id}`**

Retrieve detailed information about a customer.

#### Path Parameters

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `customer_id` | `string` | Customer identifier |

#### Response

```json
{
  "id": "CUST_001",
  "balance": 1250.50,
  "transaction_count": 45,
  "total_spent": 15430.75,
  "last_updated": "2025-01-15T14:30:00"
}
```


#### Response Fields

| Field | Type | Description |
| :-- | :-- | :-- |
| `id` | `string` | Customer identifier |
| `balance` | `float` | Current account balance |
| `transaction_count` | `int` | Total number of paid transactions |
| `total_spent` | `float` | Total amount spent |
| `last_updated` | `datetime` | Last update timestamp |

#### Use Case

Display customer profile information in admin panel.

### 8. Update Customer Balance

**`POST /customers/{customer_id}/balance`**

Update customer account balance (topup, debit, credit).

#### Path Parameters

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `customer_id` | `string` | Customer identifier |

#### Request Body

```json
{
  "amount": 500.00,
  "type": "topup",
  "description": "Account top-up via admin"
}
```


#### Request Fields

| Field | Type | Description |
| :-- | :-- | :-- |
| `amount` | `float` | Transaction amount |
| `type` | `string` | One of "topup", "debit", "credit" |
| `description` | `string` | Transaction description (optional) |

#### Response

```json
{
  "customer_id": "CUST_001",
  "previous_balance": 750.50,
  "new_balance": 1250.50,
  "transaction_id": "123e4567-e89b-12d3-a456-426614174000",
  "type": "topup",
  "amount": 500.00
}
```


#### Use Case

Allow admins to manually adjust customer balances.

### 9. Get Customer Statistics

**`GET /customers/{customer_id}/stats`**

Get detailed statistics for a customer.

#### Path Parameters

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `customer_id` | `string` | Customer identifier |

#### Response

```json
{
  "customer_id": "CUST_001",
  "total_spent": 15430.75,
  "monthly_totals": [
    {
      "month": "2025-01",
      "total": 2430.50
    },
    {
      "month": "2024-12",
      "total": 1850.25
    }
  ],
  "top_merchants": [
    {
      "merchant_id": "MERCH_123",
      "count": 12,
      "amount": 3450.75
    }
  ]
}
```


#### Response Fields

| Field | Type | Description |
| :-- | :-- | :-- |
| `customer_id` | `string` | Customer identifier |
| `total_spent` | `float` | Total amount spent |
| `monthly_totals` | `array` | Monthly spending totals for last 6 months |
| `top_merchants` | `array` | Top 5 merchants by spending amount |

#### Use Case

Display customer spending patterns and analytics.

## System Endpoints

### 10. Health Check

**`GET /health`**

Check system health status.

#### Response

```json
{
  "status": "healthy"
}
```


#### Status Codes

| Code | Description |
| :-- | :-- |
| `200` | System is healthy |
| `500` | System is unhealthy |

#### Use Case

Monitor system status and display alerts if services are down.

## Reference

### Status Code Reference

| Code | Meaning |
| :-- | :-- |
| 200 | Success |
| 404 | Resource not found |
| 422 | Validation error |
| 500 | Internal server error |

### Transaction Status Values

| Status | Description |
| :-- | :-- |
| `paid` | Successfully completed transaction |
| `pending` | Awaiting admin review |
| `awaiting-user-confirmation` | Admin approved, awaiting user action |
| `fraud` | Marked as fraudulent by admin |
| `cancelled` | Cancelled by user |
| `balance-topup` | Balance top-up transaction |
| `balance-debit` | Balance debit transaction |

## Admin Panel Implementation Guide

### Dashboard Components

1. **Statistics Cards**: Use `/admin/stats` for key metrics
2. **Pending Reviews Table**: Use `/admin/pending_transactions` with action buttons
3. **Customer Search**: Use `/customers/{customer_id}` for customer lookup
4. **Transaction History**: Use `/transactions/logs/{customer_id}`

### Recommended Frontend Features

1. **Real-time Updates**: Poll `/admin/stats` and `/admin/pending_transactions` every 30 seconds
2. **Bulk Actions**: Allow selecting multiple pending transactions for batch processing
3. **Filtering**: Add filters for date range, amount range, and fraud probability
4. **Customer Management**: Integrate customer details and balance management
5. **Charts**: Use customer stats data for spending pattern visualizations

### Error Handling

Always check response status codes and display appropriate error messages to users.

### Sample Integration Code

#### JavaScript/React Example

```javascript
// Fetch admin statistics
const fetchAdminStats = async () => {
  try {
    const response = await fetch('http://localhost:8000/admin/stats');
    const data = await response.json();
    setStats(data);
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};

// Review transaction
const reviewTransaction = async (transactionId, action) => {
  try {
    const response = await fetch('http://localhost:8000/admin/review_transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: transactionId,
        action: action
      })
    });
    
    if (response.ok) {
      // Refresh pending transactions list
      fetchPendingTransactions();
    }
  } catch (error) {
    console.error('Error reviewing transaction:', error);
  }
};
```


