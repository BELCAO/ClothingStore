# Stage 1: Build Stage
FROM node:19-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy all files to the working directory
COPY . .

# Install dependencies and build the app
RUN npm install && npm run build

# Stage 2: Production Stage
FROM node:19-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy package.json and node_modules from builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Copy the build output from builder stage
COPY --from=builder /app/build ./build

# Install serve to serve the built files
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Serve the built files
CMD ["serve", "-s", "build", "-l", "3000"]
