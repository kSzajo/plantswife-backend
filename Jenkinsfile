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
          script {
                      try {
                            sh 'pm2 stop plantswife-backend'
                            sh 'pm2 delete plantswife-backend'
                      } catch (err) {
                          echo err.getMessage()
                      }
                  }


        sh 'PORT=3069 pm2 start /home/acetylen/plantswife/production/backend/dist/main.js --name plantswife-backend'
      }
    }

  }
}
