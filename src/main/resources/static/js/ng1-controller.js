angular.module('TeachersPetApp', [])
   .controller('SampleController', function($scope, $http, $window) {


        $scope.home = function() {
            $scope.loginContainer = null;
        };


        $scope.login = function(loginEmail, loginPassword) {
            console.log("In login function in ng controller");

            var emailAndPass = {
                email: loginEmail,
                password: loginPassword
            }

            $http.post("/login.json", emailAndPass)
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.loginContainer = response.data;
//                        loginContainerHolder = $scope.loginContainer;
//                        console.log("LOGIN CONTAINER HOLDER:");
//                        console.log(loginContainerHolder);
                        if ($scope.loginContainer.errorMessage == null) {
                            $scope.loginSuccessful = true;
                            $scope.teacherWhoIsLoggedIn = $scope.loginContainer.teacher;
                            console.log("User who is logged in: " + $scope.teacherWhoIsLoggedIn.firstName + ", id: " + $scope.teacherWhoIsLoggedIn.id);
                            $scope.allCourses = $scope.loginContainer.courseArrayList;
//                            $scope.loggedInBoolean = true;
//                            setTeacher($scope.)
                            $window.location.href = '/classList?teacherId=' + $scope.teacherWhoIsLoggedIn.id;

                        } else {
                            $scope.loginSuccessful = false;
//                            $scope.loggedInBoolean = true;
                        }
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };


        $scope.register = function(registerFirstName, registerLastName, registerEmail, registerPassword, registerSchool) {
                    console.log("In register function in ng controller");

                    var newUserInfo = {
                        firstName: registerFirstName,
                        lastName: registerLastName,
                        email: registerEmail,
                        password: registerPassword,
                        school: registerSchool
                    }

                    $http.post("/register.json", newUserInfo)
                        .then(
                            function successCallback(response) {
                                console.log(response.data);
                                console.log("Adding data to scope");
                                $scope.loginContainer = response.data;
                                loginContainerHolder = $scope.loginContainer;
                                if ($scope.loginContainer.errorMessage == null) {
                                    $scope.teacherWhoIsLoggedIn = $scope.loginContainer.teacher;
                                    console.log("User who is logged in: " + $scope.teacherWhoIsLoggedIn.firstName + ", id: " + $scope.teacherWhoIsLoggedIn.id);
                                    $scope.loginSuccessful = true;
//                                    $scope.loggedInBoolean = true;
                                    $window.location.href = '/classList?teacherId=' + $scope.teacherWhoIsLoggedIn.id;
                                } else {
                                    $scope.loginSuccessful = false;
//                                    $scope.loggedInBoolean = true;
                                }
                            },
                            function errorCallback(response) {
                                console.log("Unable to get data...");
                            });
                };


   });