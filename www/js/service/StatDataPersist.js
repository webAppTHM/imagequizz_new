angular.module('imagequizz').factory('StatDataPersist',
    function ($firebase, FIREBASE_URL) {

        var rootRef = new Firebase(FIREBASE_URL);
        //var statRef = rootRef.child('statistic');
        //Angular Fire wrapper
        //var statRefAngular = $firebase(statRef);

        if(!localStorage.getItem('userid')){
            localStorage.setItem('userid', rootRef.push().key());
        }

        var statRefAngular = $firebase(rootRef.child(localStorage.getItem('userid')).child('statistic'));

        var service = {
            findAll: function () {
                return statRefAngular.$asArray();
            },
            findById: function (id) {
                return this.findAll().$getRecord(id);
            },
            delete: function (id) {
                var stats = this.findAll();
                for (var i = 0; i < stats.length; i++) {
                    if(stats[i].questionID == id){
                        stats.$remove(this.findById(stats[i].$id));
                    }
                }
                //this.findAll().$remove(this.findById(id));
            },
            persist: function (stat) {
                this.findAll().$add(stat);
            },
            update: function (stat) {
                this.findAll().$save(stat);
            },
            setUID: function (userid) {
                statRefAngular = $firebase(rootRef.child(userid).child('statistic'));
            }
        };
        return service;
    });