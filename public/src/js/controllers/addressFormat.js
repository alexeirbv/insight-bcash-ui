'use strict';

angular.module('insight.addressFormat').controller('AddressFormatController',
    function($scope, $rootScope, $route) {
        var formats = [{
                name: 'CashAddr',
                convert: bchaddr.toLegacyAddress
            },
            {
                name: 'Legacy',
                convert: bchaddr.toLegacyAddress
            },
            {
                name: 'Copay',
                convert: bchaddr.toBitpayAddress
            }
        ];
        $scope.formats = formats;
        $rootScope.formatAddress = function(address) {
            try {
                address = $rootScope.addressFormat.convert(address);
            } catch (e) {}
            return address;
        };
        $rootScope.toLegacyAddress = function(address) {
            try {
                address = bchaddr.toLegacyAddress(address);
            } catch (e) {}
            return address;
        };
        $rootScope.addressFormat = formats[0];

        if (localStorage.getItem('insight-addressFormat')) {
            $rootScope.addressFormat = formats.find(function(x) {
                return x.name == localStorage.getItem('insight-addressFormat');
            });
        }

        $scope.setAddressFormat = function(addressFormat) {
            $rootScope.addressFormat = addressFormat;
            localStorage.setItem('insight-addressFormat', addressFormat.name);
            $route.reload();
        };
    });