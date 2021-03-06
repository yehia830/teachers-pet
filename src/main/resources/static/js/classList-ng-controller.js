angular.module('TeachersPetApp', [])
   .controller('ClassListController', function($scope, $http, $window) {

        $scope.getTeacherWhoIsLoggedIn = function(teacherId) {
            console.log("In getTeacherWhoIsLoggedIn method in ng1 controller")
            $http.post("/getTeacherWhoIsLoggedIn.json", teacherId)
                .then(
                    function successCallback(response) {
                        console.log("Response: ");
                        console.log(response.data);
                        $scope.teacherWhoIsLoggedIn = response.data.teacher;
                        $scope.allCourses = response.data.courses;
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });

        };

        $scope.logout = function() {
            $window.location.href = '/';
        }


        $scope.addClass = function(newClassName, newClassSubject, newClassGradeLevel) {
            console.log("In addClass function in classList-ng-controller");

            var newClassInfo = {
                name: newClassName,
                subject: newClassSubject,
                gradeLevel: newClassGradeLevel,
                teacher: $scope.teacherWhoIsLoggedIn
            }

            $http.post("/addclass.json", newClassInfo)
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.allCourses = response.data;
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };

        $scope.deleteClass = function(course) {
            console.log("In deleteClass function in classList-ng-controller");

            $http.post("/deleteClass.json", course)
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.allCourses = response.data;
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };

        $scope.getCurrentEmailInfo = function() {
            console.log("In getCurrentEmailInfo function in classList-ng-controller");

            $http.post("/getCurrentEmailInfo.json", $scope.teacherWhoIsLoggedIn)
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.highAverage = response.data.highAverage;
                        $scope.emailSignature = response.data.emailSignature;
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };

        $scope.setNewHighAverageAmount = function(newHighAverage) {
            console.log("In setNewHighAverageAmount function in classList-ng-controller");

            $http.post("/setNewHighAverageAmount.json", newHighAverage)
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.highAverage = response.data;
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };

        $scope.setNewEmailSignature = function(newEmailSignature) {
            console.log("In setNewEmailSignature function in classList-ng-controller");

            var newEmailSignatureStringContainer = {
                message: newEmailSignature
            }

            $http.post("/setNewEmailSignature.json", newEmailSignatureStringContainer)
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.emailSignature = response.data.message;
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };

        $scope.resetEmailSignature = function() {
            console.log("In resetEmailSignature function in classList-ng-controller");

            $http.post("/resetEmailSignature.json", $scope.teacherWhoIsLoggedIn)
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.emailSignature = response.data.message;
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };

        $scope.graph = function(courseId){
                        console.log("In graph function in ng controller");
                        // go to new window
                        $scope.currentClassid = courseId;

                        $window.location.href = '/graph?courseId=' + courseId;


        };


        $scope.gradebook = function(courseId) {
            console.log("In gradebook function in ng controller");
            // go to new window
            $scope.currentClassid = courseId;

//            $window.location.href = '/gradebook?courseId=' + courseId;
            $window.location.href = '/gradebook?courseId=' + courseId;
        };


   });