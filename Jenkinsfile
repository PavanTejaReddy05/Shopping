pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "Pavantejareddy05/shopping-app"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install frontend dependencies
                    sh 'npm install'
                    // Install backend dependencies
                    sh 'pip install -r requirements.txt'
                }
            }
        }
        stage('Run Tests') {
            steps {
                // Add your test commands here, e.g., npm test or pytest
                sh 'echo "Running tests..."'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh 'docker push ${DOCKER_IMAGE}:${DOCKER_TAG}'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Run deployment commands (if needed)
                    sh 'docker run -d -p 8000:8000 ${DOCKER_IMAGE}:${DOCKER_TAG}'
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
