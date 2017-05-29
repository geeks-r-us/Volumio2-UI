class BluetoothPluginController {
  constructor($scope, socketService, mockService, $log, $translate) {
    'ngInject';
    this.socketService = socketService;
    this.$scope = $scope;
    this.$log = $log;
    this.$translate = $translate;
    //this.wirelessNetworks = mockService.get('bluetoothDevices');
    this.init();
  }

  init() {
    this.registerListner();
    this.initService();
  }

  refreshBluetoothDevices() {
    this.socketService.emit('getBluetoothDevices', '');
  }

  registerListner() {
    this.socketService.on('pushBluetoothDevices', (data) => {
      this.$log.debug('pushBluetoothDevices', data);
      this.bluetooth = data;
    });
    this.$scope.$on('$destroy', () => {
      this.socketService.off('pushBluetoothDevices');
    });
  }

  initService() {
    this.socketService.emit('getBluetoothDevices');
  }

  connectDevice(mac) {
    this.socketService.emit('connectBluetoothDevice', mac);
    refreshBluetoothDevices();
  }

  disconnectDevice(mac) {
    this.socketService.emit('disconnectBluetoothDevice', mac);
    refreshBluetoothDevices();
  }
}

export default BluetoothPluginController;
