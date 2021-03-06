/**
 * Created by shashank on 11/08/15.
 */
(function () {
    'use strict';

    angular
        .module('webapp.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http']

    function Authentication($cookies, $http) {
        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout,
            register: register,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };
        return Authentication;

        function register(email, password, username) {
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccessFn);

            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(email, password);
            }

            function registerErrorFn(data, status, headers, config) {
                console.error('Registration Failed');
            }
        }

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                'email': email,
                'password': password
            }).then(loginSuccessFn, loginErrorFn);

            function loginSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount(data.data);

                window.location = '/';
            }

            function loginErrorFn(data, status, headers, config) {
                console.error('Login Failed!');
            }
        }

        function logout() {
            return $http.post('/api/v1/auth/logout/')
                .then(logoutSuccessFn, logoutErrorFn);

            function logoutSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();

                window.location = '/';
            }

            function logoutErrorFn(data, status, headers, config) {
                console.log('Logout Error!');
            }
        }

        function getAuthenticatedAccount() {
            if(!$cookies.authenticatedAccount) {
                return
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }

    }
})();