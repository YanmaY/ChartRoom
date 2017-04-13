var photoGallery = angular.module('photoGallery', ['ui.router']);

photoGallery.config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider 负责处理在状态配置中指定的url路由方式之外的 url 请求的路由方式。
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('content', {
            url: '/',
            abstract: true,
            views: {
                "": {
                    templateUrl: 'partials/content.html'
                },
                "header@content": { templateUrl: 'partials/header.html' }
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
            controllerAs: 'ctrlPhotosDetail'
        })
        .state('content.photos.detail.comment', {
            url: '/comment',
            templateUrl: 'partials/photosDetailComment.html'
        })
        .state('content.about', {
            url: 'about',
            views: {
                "body@content": { templateUrl: 'partials/about.html' }
            }
        })

})