var photoGallery = angular.module('photoGallery', ['ui.router']);

photoGallery.config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider 负责处理在状态配置中指定的url路由方式之外的 url 请求的路由方式。
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('content', {
            url: '/',
            abstract: true,
            data: {
                user: "user",
                password: "1234"
            },
            views: {
                "": { templateUrl: 'partials/content.html' },
                "header@content": {
                    templateUrl: 'partials/header.html',
                    controller: function($scope, $rootScope, $state) {
                        $scope.logoff = function() {
                            $rootScope.user = null;
                        }
                    }
                }
            }
        })
        .state('content.login', {
            url: 'login',
            data: {
                loginError: 'User or password incorrect.'
            },
            views: {
                "body@content": {
                    templateUrl: 'partials/login.html',
                    controller: function($scope, $rootScope, $state) {
                        $scope.login = function(user, password, valid) {
                            if (!valid) {
                                return;
                            }

                            if ($state.current.data.user === user && $state.current.data.password === password) {
                                $rootScope.user = {
                                    name: $state.current.data.user
                                }

                                // Or Inherited

                                /*$rootScope.user = {
                                    name: $state.$current.parent.data.user
                                };*/

                                $state.go('content.home');
                            } else {
                                $scope.message = $state.current.data.loginError;
                            }

                        }
                    }
                }
            }

        })
        .state('content.home', {
            url: 'home',
            views: {
                "body@content": {
                    templateUrl: 'partials/home.html',
                    controller: 'HomeController',
                    controllerAs: 'ctrlHome'
                }
            }
        })
        .state('content.photos', {
            url: 'photos',
            abstract: true,
            views: {
                "body@content": {
                    templateUrl: 'partials/photos.html',
                    controller: 'PhotosController',
                    controllerAs: 'ctrlPhotos'
                }
            }
        })
        .state('content.photos.list', {
            url: '/list',
            templateUrl: 'partials/photosList.html',
            controller: 'PhotosListController',
            controllerAs: 'ctrlPhotosList'
        })
        .state('content.photos.detail', {
            url: '/detail/:id',
            templateUrl: 'partials/photosDetail.html',
            controller: 'PhotosDetailController',
            controllerAs: 'ctrlPhotosDetail',
            resolve: {
                viewing: function($stateParams) {
                    return {
                        photoId: $stateParams.id
                    }
                }
            },
            onEnter: function(viewing) {
                var photo = JSON.parse(sessionStorage.getItem(viewing.photoId));
                if (!photo)
                    photo = {
                        views: 1,
                        viewing: 1
                    }
                else {
                    photo.views += 1;
                    photo.viewing += 1
                }
                sessionStorage.setItem(viewing.photoId, JSON.stringify(photo));
            },
            onExit: function(viewing) {
                var photo = JSON.parse(sessionStorage.getItem(viewing.photoId));
                photo.viewing -= 1;
                sessionStorage.setItem(viewing.photoId, JSON.stringify(photo));
            }

        })
        .state('content.photos.detail.comment', {
            url: '/comment?skip&limit',
            templateUrl: 'partials/photosDetailComment.html',
            controller: 'PhotosCommentController',
            controllerAs: 'ctrlPhotosComment'
        })
        .state('content.about', {
            url: 'about',
            views: {
                "body@content": { templateUrl: 'partials/about.html' }
            }
        })

})