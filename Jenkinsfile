pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'whoami'
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage('copy') {
      steps {
         sh 'pwd'
         sh 'rm -fr /home/acetylen/plantswife/production/backend/*'
         sh 'cp -r dist /home/acetylen/plantswife/production/backend'
      }
    }

    stage('run') {
      steps {
        sh 'pm2 start /home/acetylen/plantswife/production/backend/dist --name plantswife-backend main.js'
      }
    }

  }
}
