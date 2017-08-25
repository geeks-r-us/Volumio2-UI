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
    this.socketService.emit('callMethod', {
      "endpoint" : "audio_interface/bluetooth_controller", 
      "method" : "getBluetoothDevices", 
      "data" : {}
    });
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
    this.refreshBluetoothDevices();
  }

  connectDevice(mac) {
    this.socketService.emit("callMethod", {
      "endpoint" : "audio_interface/bluetooth_controller", 
      "method" : "connectBluetoothDevice",
      "data" : {mac}
    }); 
    this.refreshBluetoothDevices();
  }

  disconnectDevice(mac) {
    this.socketService.emit("callMethod", {
      "endpoint" : "audio_interface/bluetooth_controller", 
      "method" : "disconnectBluetoothDevice",
      "data" : {mac}
    }); 
    this.refreshBluetoothDevices();
  }
}

export default BluetoothPluginController;
