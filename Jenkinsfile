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
                withCredentials([usernamePassword(credentialsId:'', passwordVariable:'ip', usernameVariable:'user')]){
                    sh """
                        ssh $user@$ip "./deploy.sh ${GIT_COMMIT}"
                    """
                }
                emailext(
                    body: """
                        Job: ${JOB_NAME}${BUILD_DISPLAY_NAME} Has been Deployed Please\n check if https://weatherinsight.space/ is online
                    """,
                    subject: "[JENKINS] Deployment Notification (${JOB_NAME}${BUILD_DISPLAY_NAME})",
                    to: 'pierre-yves.jezegou@ensta-bretagne.org'
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
