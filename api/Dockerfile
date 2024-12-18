# Use the official Python image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# Expose the Flask app port
EXPOSE 8000

# Command to run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]
