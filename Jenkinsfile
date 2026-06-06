pipeline {
    agent any
    environment {
        PORT = "3000"
        MONGO_URI = "mongodb://mongo:27017/testdb"
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/MayankRaj72004/jenkins-practical', branch: 'main'
            }
        }
        stage('Build Docker Images'){
            steps {
                bat 'docker compose -p demo-cicd build'
            }
        }
        stage('Push to DockerHub'){
            steps{
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]) {
                    bat 'echo %DOCKERHUB_PASS% | docker login -u %DOCKERHUB_USER% -p %DOCKERHUB_PASS%'
                    
                    bat 'docker tag demo-cicd-frontend %DOCKERHUB_USER%/frontend:latest'
                    bat 'docker tag demo-cicd-backend %DOCKERHUB_USER%/backend:latest'

                    bat 'docker push %DOCKERHUB_USER%/frontend:latest'
                    bat 'docker push %DOCKERHUB_USER%/backend:latest'
                }
                
            }
        }
        stage('Deploy Application'){
            steps {
                bat 'docker compose down'
                bat 'docker compose up -d'
            }
        }
        stage('Verify Deployment'){
            steps {
                bat 'docker ps'
            }
        }
    }
    post {
    success {
        echo 'CI/CD Pipeline Executed Successfully'
    }
    failure {
        echo 'CI/CD Pipeline Failed'
    }
    always {
        bat 'docker images'
    }
}
}

