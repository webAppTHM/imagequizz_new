/**
 *
 *  Der QuestionListController ist zuständig für die Anzeige der jeweiligen Fragen einer Kategorie. 
 *  Aus dieser Ansicht kommt man dann zu jeder einzelnen Fragenansicht.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
angular.module('imagequizz').controller('QuestionListController',
    function ($scope, $state, $stateParams, $rootScope, $ionicPopup, QuestionData, StatData) {
        //Referenz auf den Controller
        $scope.self = this;
        //Kategorie für die Anzeige Vorbereiten
        $scope.questions = QuestionData.findAll();
        /*Statistiken vorher holen oder mit einer warte Methode versehen*/
        this.stats = StatData.findAll();
        $scope.questionList = [];
        for (var i = 0; i < $scope.questions.length; i++) {
            if($scope.questions[i].category == $stateParams.id){
                $scope.questionList.push($scope.questions[i]);
            }
        }

        /**
         * Wechselt beim klick auf den "Zurück-Pfeil" den View auf die ModuleList
         */
        this.goToModuleList = function () {
            $state.go('tabs.home');
        };

        /**
         * Startet das Quizz und prüft ob noch nicht gelernte Karten vorhanden sind.
         */
        this.startQuizzMode = function () {
            var learnedQuestionCounter = 0;
            this.stats.forEach(function (stat) {
                $scope.questionList.forEach(function (question) {
                    if(stat.questionID === question.id){
                        if(stat.actRightSeries >= 6){
                            learnedQuestionCounter++;
                        }
                    } 
                })
            });
            if(learnedQuestionCounter === $scope.questionList.length){
                var popup = $ionicPopup.confirm({
                    title: 'Du hast alle Fragen gelernt!',
                    template: 'Soll der Lern-Zähler zurückgesetzt werden?',
                    cancelText: 'Nein',
                    okText: 'Ja'
                });
                popup.then(function (res) {
                    if (res) {
                        $scope.self.resetStat();
                        $state.go('question_view_quizz', {id: $stateParams.id});
                    }
                });
            } else {
                $state.go('question_view_quizz', {id: $stateParams.id});
            }
        };
        /**
         * Zurücksetzten der Statistik (aktuell serie-richtig = 0)
         */
        this.resetStat = function () {
            this.stats.forEach(function (stat) {
                $scope.questionList.forEach(function (question) {
                    if(stat.questionID === question.id){
                        stat.actRightSeries = 0;
                        StatData.update(stat);
                    }
                })
            });
        }
    } );
