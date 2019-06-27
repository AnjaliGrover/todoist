(function (window, angular) {
    var app = angular.module("todoist", [])
    app.controller("todoistController", ['$scope', '$http', function ($scope, $http) {
        $scope.showAddProject = false;
        $scope.addNewProject = addNewProject;
        $scope.addProject = addProject;
        $scope.hideNewProject = hideNewProject;
        $scope.showAddTask = false;
        $scope.addNewTask = addNewTask;
        $scope.hideNewTask = hideNewTask;
        $scope.addTask = addTask;
        $scope.deleteTask = deleteTask;
        $scope.deleteProject = deleteProject;
        $scope.showInputBox = showInputBox;
        $scope.showEditBox = showEditBox;
        $scope.IsVisible = false;
        $scope.View = false;
        $scope.hideEditBox = hideEditBox;
        $scope.hideInputBox = hideInputBox
        $scope.updateProject = updateProject;
        $scope.updateTask = updateTask;
        $scope.Visible = false;
        $scope.showOptions = showOptions;

        //Project Routes


        //Add project
        $scope.newProject = {
            Title: "",
        };
        var data = $scope.newProject;

        function addProject() {
            $http.post("http://localhost:8082/project", data).then(function (response) {
                    $http.get("http://localhost:8082/projects").then(function (result) {
                        $scope.projects = result.data;
                    }, function (err) {
                        console.log(err)
                    });
                })
                .catch(function (error) {});

        };
        //Button Functionality
        function addNewProject() {
            $scope.showAddProject = true;
        }

        function hideNewProject() {
            $scope.showAddProject = false;
        }

        //Print Project
        $http.get("http://localhost:8082/projects").then(function (result) {
            $scope.projects = result.data;
        }, function (err) {
            console.log(err)
        });
        //Delete Project
        function deleteProject(item) {
            $http.delete("http://localhost:8082/project?_id=" + item._id).then(function (response) {
                alert("Project is Deleted Successfully");
                var index = $scope.projects.indexOf(item);
                $scope.projects.splice(index, 1);

            }, function errorCallback(response) {

                alert("Error while deleting the Project! Please Try Again!");

            });

        };
        //Button functionality
        function showInputBox() {
            $scope.IsVisible = true;
        }

        function hideInputBox() {
            $scope.IsVisible = false;
        }
        // Edit/Update Project 
        $scope.updateProj = {
            Title: "",
        };
        var projData = $scope.updateProj;


        function updateProject(item) {
            $http.put("http://localhost:8082/project?_id=" + item._id, projData).then(function (response) {
                    $http.get("http://localhost:8082/projects").then(function (result) {
                        $scope.projects = result.data;
                    }, function (err) {
                        console.log(err)
                    });
                })
                .catch(function (error) {});


        };

        //Task Routes


        //Task buttons Functionality

        function addNewTask() {
            $scope.showAddTask = true;
        }

        function hideNewTask() {
            $scope.showAddTask = false;
        }

        //Button functionality
        function showEditBox() {
            $scope.View = true;
        }

        function hideEditBox() {
            $scope.View = false;
        }

        //Post/Add task 
        $scope.newTask = {
            Title: "",
            DueDate: "",
        };
        var taskData = $scope.newTask;

        function addTask() {
            $http.post("http://localhost:8082/task", taskData).then(function (response) {
                    $http.get("http://localhost:8082/tasks").then(function (result) {
                        $scope.tasks = result.data;

                    }, function (err) {
                        console.log(err)
                    })
                })
                .catch(function (error) {});

        };

        // Print Task 
        $http.get("http://localhost:8082/tasks").then(function (result) {
            $scope.tasks = result.data;
            $scope.tasks.length;
        }, function (err) {
            console.log(err)
        })

        //Delete Task
        function deleteTask(task) {
            $http.delete("http://localhost:8082/tasks?_id=" + task._id).then(function (response) {
                alert("Task is deleted Successfully");
                var index = $scope.tasks.indexOf(task);
                $scope.tasks.splice(index, 1);
            }, function errorCallback(response) {
                alert("Error while deleting the Task! Please Try Again!");
            });

        };
        // Edit/Update Task
        $scope.updateTodo = {
            Title: "",
            DueDate: "",
        };
        var todoData = $scope.updateTodo;


        function updateTask(task) {
            $http.put("http://localhost:8082/tasks?_id=" + task._id, todoData).then(function (response) {
                    $http.get("http://localhost:8082/tasks").then(function (result) {
                        $scope.tasks = result.data;

                    }, function (err) {
                        console.log(err)
                    })
                })
                .catch(function (error) {});
        };

        function showOptions(item_id) {
            $scope.showOptionsForId = item_id;
            $scope.Visible = false;
        }

        function hideShowOptions() {
            $scope.Visible = false;
        }

    }]);

})(window, angular);