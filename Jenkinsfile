node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build Docker test'){
     sh 'docker build -t pokemon-test -f Dockerfile.test --no-cache .'
    }
    stage('Docker test'){
      sh 'docker run --rm pokemon-test'
    }
    stage('Clean Docker test'){
      sh 'docker rmi pokemon-test'
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
      sh 'docker build -t pokemon --no-cache .'
      sh 'docker rm pokemon -fc|| true'
      sh 'docker image rm employee || true'
      sh 'docker-compose down -v'
      sh 'docker-compose up'
      sh 'docker run -d -p 4000:4000 --name=pokemon -e DB_USERNAME=green -e DB_PASSWORD=yTOm8IvvAouNAiHf -e DB_NAME=pokemon pokemon'
      }
    }
  }
  catch (err) {
    throw err
  }
}
