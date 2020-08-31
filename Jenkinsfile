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
         sh 'cp -r node_modules /home/acetylen/plantswife/production/backend'
      }
    }

    stage('run') {
      steps {
        sh 'pm2 ps'
        sh 'pm2 stop plantswife-backend || exit 0'
        sh 'pm2 delete plantswife-backend || exit 0'
        sh 'PORT=3069 pm2 start /home/acetylen/plantswife/production/backend/dist/main.js --name plantswife-backend'
      }
    }

  }
}
