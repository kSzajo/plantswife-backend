pipeline {
  agent any
  stages {
    stage('build') {
      steps {
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
        sh 'pm2 /home/acetylen/plantswife/production/backend --name plantswife-backend main.js'
      }
    }

  }
}
