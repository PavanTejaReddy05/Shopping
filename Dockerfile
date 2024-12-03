# Stage 1: Install dependencies and build the frontend
FROM node:18 AS frontend

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy all frontend files and build the frontend
COPY . .
RUN npm run build

# Stage 2: Setup the backend with Python
FROM python:3.10-slim AS backend

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY src ./src

# Expose the backend port
EXPOSE 8000

# Start the FastAPI app
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]

# Serve static files from the frontend
COPY --from=frontend /app/dist /app/frontend
