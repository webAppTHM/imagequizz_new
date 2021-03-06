/**
 *
 *  Der QuestionController ist für die Anzeige einer gewählten Frage zuständig, die dann auch vom QuizzModus benutzt wird.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
angular.module('imagequizz').controller('QuestionController',
    function ($ionicPopup, $scope, QuestionData, $stateParams, $document, $timeout, $ionicNavBarDelegate, $state, $ionicHistory) {
        $timeout(function () {
            $ionicNavBarDelegate.title("Frage");
        }, 750);

        $scope.actHight = $document.innerHeight;
        //Frage für die Anzeige Vorbereiten
        $scope.questions = QuestionData.findAll();
        //$scope.question = null;
        for (var i = 0; i < $scope.questions.length; i++) {
            if($scope.questions[i].id == $stateParams.id){
                $scope.question = $scope.questions[i];
                break;
            }
        }

        /**
         * Informationstext zur angezeigten Frage
         */
        this.toggleInfo = function () {
            var popup = $ionicPopup.alert({
                title: 'Information',
                template: $scope.question.infoText
            });
            $timeout(function () {
                popup.close();
            }, 2500);
        };
        /**
         * Prüft die gegebene Antwort auf Korrektheit
         * @param answer die zu überprüfende Antwort
         */
        this.testAnswer = function (answer) {
            var correctAnswer = '';
            //var count = 0;
            //var result;

            $scope.question.options.forEach(function (option) {
                if (option['answer'] == true) {
                    correctAnswer = option['option'];
                }
            });

            if (answer === correctAnswer) {
                $scope.question.options.forEach(function (option) {
                    if (option['option'] == answer) {
                        $scope.rightAnswer = option['option'];
                        return;
                    }
                });
                //result = 'Korrekte Antwort';
            } else {
                $scope.question.options.forEach(function (option) {
                    if (option['option'] == answer) {
                        $scope.wrongAnswer = answer;
                    }
                    if (option['answer'] == true) {
                        $scope.rightAnswer = option['option'];
                    }
                });
                //result = 'Leider Falsch';
            }
            $timeout(function () {
                $ionicHistory.goBack();
            }, 2000)
        };
    }
);
