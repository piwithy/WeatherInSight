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
                        Job: ${JOB_NAME}${BUILD_DISPLAY_NAME} Has been Deployed Please\n check if https://weatherinsight.space/is online
                    ''',
                    subject: "[JENKINS] Deployment Notification (${JOB_NAME}${BUILD_DISPLAY_NAME})",
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