photoGallery.controller('HomeController', ['$scope', '$state', function($scope, $state) {
    this.message = 'Welcome to the Photo Gallery';
}]);

//别名：ctrPhoto
photoGallery.controller('PhotosController', ['$scope', '$state', function($scope, $state) {
    this.photos = [{
            id: 0,
            title: 'Photo 1',
            description: 'description for photo 1',
            imageName: 'image1.jpg',
            comments: [
                { name: 'user1', comment: 'Nice' },
                { name: 'User2', comment: 'Very good' }
            ]
        },
        {
            id: 1,
            title: 'Photo 2',
            description: 'description for photo 2',
            imageName: 'image2.jpg',
            comments: [
                { name: 'user2', comment: 'Nice' },
                { name: 'User1', comment: 'Very good' }
            ]
        },
        {
            id: 2,
            title: 'Photo 3',
            description: 'description for photo 3',
            imageName: 'image3.jpg',
            comments: [
                { name: 'user1', comment: 'Nice' }
            ]
        },
        {
            id: 3,
            title: 'Photo 4',
            description: 'description for photo 4',
            imageName: 'image4.jpg',
            comments: [
                { name: 'user1', comment: 'Nice' },
                { name: 'User2', comment: 'Very good' },
                { name: 'User3', comment: 'So so' }
            ]
        }
    ];

    //给子state下controller中的photos赋值
    this.pullData = function() {
        $scope.$$childTail.ctrlPhotosList.photos = this.photos;
    }
}]);

//别名：ctrPhotoList
photoGallery.controller('PhotosListController', ['$scope', '$state', function($scope, $state) {
    this.reading = false;
    this.photos = new Array();

    this.init = function() {
        this.reading = true;
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.ctrlPhotosList.getData();
            });
        }, 1500);
    }

    this.getData = function() {

        //调用父state中controller中的方法
        $scope.$parent.ctrlPhotos.pullData();

        /*this.photos = $scope.$parent.ctrPhoto.photos;*/
        this.reading = false;

    }
}]);


//别名：ctrPhotoDetail
photoGallery.controller('PhotosDetailController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
    var id = null;
    this.photo = null;
    this.viewObj = null
    this.init = function() {
        id = parseInt($stateParams.id);
        this.photo = $scope.ctrlPhotos.photos[id];
        this.viewObj = JSON.parse(sessionStorage.getItem($stateParams.id));
    }
}]);


photoGallery.controller('PhotosCommentController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {
        var id, skip, limit = null;
        this.comments = new Array();

        this.init = function() {
            id = parseInt($stateParams.id);
            var photo = $scope.ctrlPhotos.photos[id];


            if ($stateParams.skip) {
                skip = parseInt($stateParams.skip);
            } else {
                skip = 0;
            }

            if ($stateParams.limit) {
                limit = parseInt($stateParams.limit);
            } else {
                limit = photo.comments.length;
            }

            this.comments = photo.comments.slice(skip, limit);

        }
    }
]);


photoGallery.controller('RootController', ['$scope', '$state', '$rootScope',
    function($scope, $state, $rootScope) {
        $rootScope.accessLog = new Array();

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                if (toState.data.required && !$rootScope.user) {
                    event.preventDefault();
                    $state.go('content.login');
                }
            });

        $rootScope.$on('$stateNotFound',
            function(event, unfoundState, fromState, fromParams) {
                event.preventDefault();
                $state.go('content.notfound');
            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $rootScope.accessLog.push({
                    user: $rootScope.user,
                    from: fromState.name,
                    to: toState.name,
                    date: new Date()
                });
            });

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                event.preventDefault();
                $state.go('content.error', { error: error });
            });
    }
]);