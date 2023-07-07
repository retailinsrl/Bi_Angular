pipeline {

   agent none

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
                sh 'ng build'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy...'
                sh 'pm2 start "ng serve --host dev.retailin.it --port 8000" --name "Angular Bi App"'
            }
        }

        stage('Clean') {
            steps {
                echo 'Deploy...'
                sh 'sudo rm -rf /var/www/html/dev.retailin.it/public_html/qdt/dist/'
                sh 'sudo mv dist/* /var/www/html/dev.retailin.it/public_html'
            }
        }
  
    }
}
