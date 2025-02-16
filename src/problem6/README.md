# Question 1 #
## API Module Specification: Live Scoreboard ##

### Overview
This API module is responsible for handling user scores and maintaining a live scoreboard for a website. It allows users to increase their scores through an action, updates the scoreboard in real-time, and ensures security against unauthorized score modifications.

### Features
1. Update user scores via API request.
2. Retrieve the top 10 users with the highest scores.
3. Live update of the scoreboard.
4. Security mechanisms to prevent unauthorized score increases.

### API Endpoints
1. Update User Score
- Endpoint: POST user/update-score
- Description: Updates the user's score when they complete an action.

**Request**:
{
  "userId": "12345",
  "score": 50,
  "actionName": "action of the activity"
}

**Response**:
{
  "success": true,
  "newScore": 150
}



2. Get Top 10 Users
- Endpoint: GET /leaderboard
- Description: Get the top 10 users with the highest scores.

**Response**:
{
  "message": "OK",
  "success": true,
  "data": [
    { "userId": "123", "score": 500 },
    { "userId": "456", "score": 450 },
    { "userId": "789", "score": 400 }
  ]
}



3. Get User Activity History
- Endpoint: GET /user/{userId}/activities
- Description: Returns a list of activities that have generated points for the user..

**Request**:
{
  "param: "userId"
  "query": {
    page: 1
    itemPerpage: 10
  }
}

**Response**:
{
  message: "OK",
  "userId": "12345",
  "data": [
    { "timestamp": "2025-02-05T10:00:00Z", "action": "completed_challenge", "points": 50 },
    { "timestamp": "2025-02-04T15:30:00Z", "action": "daily_login", "points": 10 }
  ]
}



# Question 3 #
- Real-Time Updates for Top 10 Users: WebSockets
- Security Considerations:
 + Use JWT authentication for API requests.
 + Verify request payload with HMAC signature.
- Implement rate limiting to avoid abuse.
- Use Redis for caching leaderboard data to enhance performance.

- Future Improvements
 + Introduce user levels and badges based on scores.
 + Implement periodic score resets for seasonal leaderboards.
 + Add analytics to track score trends.
