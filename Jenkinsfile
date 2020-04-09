pipeline{
    agent any

    stages{
        stage('Preparation du WorkSpace'){
            steps{
                sh "./Setup_environement.sh"
            }
        }

        stage('Testing...'){
            steps{
                sh "./run_tests.sh"
            }
        }

        stage('Deploying...'){
            when{
                branch 'master'
            }
            steps{
                sh """
                    ssh jezegoup@192.168.0.245 "./deploy.sh ${GIT_COMMIT}"
                """
                emailext(
                    body: '''
                        Job: ${JOB_NAME}${BUILD_NAME} Has been Depoyed Pleese\n check if <a href="https://weatherinsight.space/">https://weatherinsight.space/</a> is online
                    ''',
                    subject: '[JENKINS] Deployement Notification',
                    to: 'salydu29@gmail.com'
                )
            }
        }

    }
    post{
        success{
            junit allowEmptyResults: true, testResults: 'tests/results/*.xml'
            sh "tar -cvf Build-${BUILD_DISPLAY_NAME}.tar.gz *"
            archiveArtifacts allowEmptyArchive: true, artifacts: '*.tar.gz', fingerprint: true
            cleanWs()
        }
    }

}

def notify(status) {

}