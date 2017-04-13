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
    this.init = function() {
        id = parseInt($stateParams.id);
        this.photo = $scope.ctrlPhotos.photos[id];

    }
}]);