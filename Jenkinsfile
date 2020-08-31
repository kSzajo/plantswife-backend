pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }

    stage('copy') {
      steps {
    sh 'cp dist /home/acetylen/plantswife/production/backend'
      }
    }

    stage('run') {
      steps {
        sh 'pm2 /home/acetylen/plantswife/production/backend --name plantswife-backend main.js'
      }
    }

  }
}
