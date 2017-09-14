/**
 * Created by Relvin on 9/13/2017.
 * Controller for the values view
 */
(function () {
  'use strict';

  angular.module('hooplaAngularTest')
    .controller('ValuesCtrl',['$q','$state','$stateParams','Root','Metric', 'Values', 'Users', function ($q,$state,$stateParams, Root,Metric,Values, Users) {
      var vm = this;

      vm.save = function(value){
          var url = value.value.href? value.value.href : vm.metric.href + '/values',
              method = value.value.href? 'PUT': 'POST';

          Values.save(url, method,value,vm.metric).then(function valueSaved(response){
            value.value.href = response.data.href;
            value.edit = false;
          },function errorWhileSaving(response){console.log('There was an error while saving the value', response)})
      };

      vm.edit = function(index)
      {
        var value = vm.values[index];
        if(!value.edit)
        {
          value.edit = true;
        }
      };

      vm.cancelEdit = function(index,e)
      {
        e.preventDefault();
        e.stopPropagation();
        var value = vm.values[index];
        value.edit = false;

      };

      function activate()
      {
        var url = $stateParams.metricUrl;

        if(!url)
        {
          $state.go('metrics')
        }

        function metricSuccess(response)
        {
          var valuesLink = '',
              promises;

          vm.metric = response.data;

          vm.metric.links.forEach(function(link){
              if(link.rel === 'list_metric_values')
              {
                valuesLink = link.href;
              }
          });

          Users.get().then(function usersSuccess(response){
            vm.users = response.data;
           promises =  vm.users.map(function(user){
              return Values.get(valuesLink,user.href).then(function(res){
                user.edit = false;
                user.value = res.data[0]
              },function(res){console.log('Error getting value of user', res)})
            });

            $q.all(promises).then(function(){
              vm.values = vm.users
            })
            //Values.get()
          },function usersError(){
            console.log('ERROR FETCHING Users', response);
          })

        }

        function metricError(response) {
          console.log('ERROR FETCHING METRIC VALUES', response);
        }

        //get metric first
        Metric.get(url).then(metricSuccess,metricError);
      }

      activate();

    }]);
})();
