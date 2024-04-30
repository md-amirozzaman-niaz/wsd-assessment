# Use the official Node.js image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY . .

# Install dependencies
RUN npm install


# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["npm", "run","dev"]
