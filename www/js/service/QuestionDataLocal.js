angular.module('imagequizz').factory('QuestionDataLocal',
    function () {
        var service = {
            findAll: function () {
                var questions = localStorage.getItem('questions');
                if(!questions) {
                    questions = [];
                    localStorage.setItem('questions',JSON.stringify(questions));
                } else {
                    questions = JSON.parse(questions);
                }
                return questions;
            },
            findById: function (id) {
                var questions = this.findAll();
                for (var i = 0; i < questions.length;i++){
                    if(questions[i].id == id){
                        return questions[i];
                    }
                }
            },
            delete: function (id) {
                var questions = this.findAll();
                for (var i = 0; i < questions.length; i++){
                    if(questions[i].id == id){
                        questions.splice(i,1);
                        break;
                    }
                }
                localStorage.setItem('questions',JSON.stringify(questions));
            },
            persist: function (question) {
                var questions = this.findAll();
                questions.push(question);
                localStorage.setItem('questions',JSON.stringify(questions));
            },
            update: function (question) {
                var questions = this.findAll();
                for (var i = 0; i < questions.length; i++){
                    if(questions[i].id == question.id){
                        questions[i] = question;
                        break;
                    }
                }
                localStorage.setItem('questions',JSON.stringify(questions));
            }
        };
        return service;
    });