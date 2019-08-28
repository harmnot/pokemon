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
      sh 'docker tag pokemon ip-4000/pokemon'
      sh 'docker push ip-4000/pokemon'
      sh 'docker rmi -f pokemon ip-4000/pokemon'
      }
    }
  }
  catch (err) {
    throw err
  }
}
