# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set build-time environment variable
ARG NEXT_PUBLIC_API_ENDPOINT
ENV NEXT_PUBLIC_API_ENDPOINT=${NEXT_PUBLIC_API_ENDPOINT}
RUN echo "NEXT_PUBLIC_API_ENDPOINT=${NEXT_PUBLIC_API_ENDPOINT}"

ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}
RUN echo "NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}"

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 80

# Command to run the application
CMD ["npm", "start", "--", "-p", "80"]
