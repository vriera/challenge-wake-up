# Use the Nginx image from Docker Hub
FROM nginx:latest

# Copy the built React app into the Nginx HTML directory
COPY frontend/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]