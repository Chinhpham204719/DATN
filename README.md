# EcoGuard Monitor
Building a real-time monitoring and assessment system for climate and air quality over time.

## Getting Started

### Prerequisites
Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-mern-project.git

2. Install server and client dependencies:
npm install

### Configuration
1. Create a .env file in the root directory of the server and set the following environment variables:
PORT=3001
MONGO_URI=mongodb://localhost:27017/your-database-name
SECRET_KEY=your-secret-key

### Running
1. Back in the root directory of the project, start the server:
npm start
2. Open a new terminal window, navigate to the client directory, and start the client:
cd client
npm start
3. Open your browser and go to http://localhost:3000 to view the MERN website.

## Features

- Through the user's browser, the system determines the current location of the user and displays that location on a map.
- The system utilizes the user's IP address to retrieve air quality data, providing information and alerts based on this data.
- Users can choose to add a device to the system to receive data from that device. After successfully adding the device, users can view detailed data received by the device and its location

## Contact

For any questions or feedback, please contact [chinhpham.204719@gmail.com].


