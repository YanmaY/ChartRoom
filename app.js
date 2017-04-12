var photoGallery = angular.module('photoGallery', ['ui.router']);

photoGallery.config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider 负责处理在状态配置中指定的url路由方式之外的 url 请求的路由方式。
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('content', {
            url: '/',
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
                "body@content": { templateUrl: 'partials/home.html' }
            }
        })
        .state('content.photos', {
            url: 'photos',
            views: {
                "body@content": { templateUrl: 'partials/photos.html' }
            }
        })
        .state('content.photos.list', {
            url: '/list',
            templateUrl: 'partials/photosList.html'
        })
        .state('content.photos.detail', {
            url: '/detail',
            templateUrl: 'partials/photosDetail.html'
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