class MyVolumioPlanCardDirective {
  constructor() {
    'ngInject';
    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/myvolumio/components/shareds/plan-card/myvolumio-plan-card.html',
      controller: MyVolumioPlanCardController,
      controllerAs: 'myVolumioPlanCardController',
      scope: {
        product: '=',
        subscribe: '=',
        subscribeCallback: "&",
        cancellation: '=',
        cancellationCallback: '&',
        changeSubscription: '=',
        changeSubscriptionCallback: '&'
      }
    };
    return directive;
  }
}

class MyVolumioPlanCardController {
  constructor($rootScope, $scope, $state, authService, modalService) {
    'ngInject';
    this.$scope = $scope;
    this.$state = $state;
    this.authService = authService;
    this.modalService = modalService;

    this.product = this.$scope.product;
    this.isDefaultBehaviour = true;
    this.activateSubscribe = this.$scope.subscribe;
    this.subscribeCallback = this.$scope.subscribeCallback;
    this.activateCancellation = this.$scope.cancellation;
    this.cancellationCallback = this.$scope.cancellationCallback;
    this.activateChangeSubscription = this.$scope.changeSubscription;
    this.changeSubscriptionCallback = this.$scope.changeSubscriptionCallback;

    this.user = null;

    this.init();
  }

  init() {
    this.setConfiguration();
    this.authInit();
  }

  setConfiguration() {
    if (this.activateSubscribe === true || this.activateCancellation === true || this.activateChangeSubscription === true) {
      this.isDefaultBehaviour = false;
    }
  }

  authInit() {
    this.$scope.$watch(() => this.authService.user, (user) => {
      this.user = user;
    });
  }

  //auth section
  logIn() {
    this.$state.go('myvolumio.login');
  }

  signUp() {
    this.$state.go('myvolumio.signup');
  }

  goToProfile() {
    this.$state.go('myvolumio.profile');
  }

  logOut() {
    this.authService.logOut();
  }

  isUserFilledWithMandatory() {
    return this.authService.isUserFilledWithMandatory();
  }

  subscribe(plan) {
    this.$state.go('myvolumio.subscribe', { 'plan': plan });
  }

  goToChangePlan(plan) {
    this.$state.go('myvolumio.change-subscription', { 'plan': plan });
  }

  downgradeToFree() {
    this.$state.go('myvolumio.cancel-subscription');
  }

  subscriptionCallback(subscribing) {
    this.subscribeCallback({ subscribing: subscribing });
  }

  doDowngrade() {
    this.cancellationCallback();
  }

  changePlan() {
    this.changeSubscriptionCallback();
  }

}

export default MyVolumioPlanCardDirective;