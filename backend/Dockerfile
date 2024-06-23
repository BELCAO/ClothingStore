# Use a base image with JDK 17
FROM openjdk:19-jdk-slim

# Copy the JAR file from the host machine into the container
COPY target/backend-0.0.1-SNAPSHOT.jar backend-0.0.1-SNAPSHOT.jar

# Command to run the application
ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
