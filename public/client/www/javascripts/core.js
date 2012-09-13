(function( $ ) {
  var Core = Core || {};
  Core = {
    init: function () {
      document.addEventListener('deviceready', function() { Core.report('deviceready'); }, false);
      Core.api.submit('connect', {}, {
        onSuccess : function() {
console.log(1);
          Core.report('serverready');
        },
        onError : function(a, b) {
console.log(2, a, b);
        },
        onDenied : function() {
console.log(3);
        },
        onComplete : function() {
console.log(4);
        }
      });
    },

    report: function(id) {
console.log(id)
      document.querySelector('#' + id + ' .pending').className += ' hide';
      var completeElem = document.querySelector('#' + id + ' .complete');
      completeElem.className = completeElem.className.split('hide').join('');
    },

    api: {
      submit: function( ajax_url, ajax_data, callback ){
        var auth_token = '';
        if( Core.auth.isAuthenticated() ) {
          auth_token = Core.auth.authToken.get();
        }

        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: "http://www.localhost.dev:3000/" + ajax_url,
          cache: false,
          //data: ajax_data,
          data: 'auth_token='+ auth_token + '&' + ajax_data,
          success: function(data) {
            if(typeof callback.onSuccess == 'function'){
              callback.onSuccess.call(this, data);
            }
          },
          error: function(data,status){
            if(typeof callback.onError == 'function'){
              if(data.status == '403') {
                return callback.onDenied.call(this, data);
              }
              callback.onError.call(this, data);
            }
          },
          complete: function(data){
            if(typeof callback.onComplete == 'function'){
              callback.onComplete.call(this, data);
            }
          },
          denied: function(data){
            if(typeof callback.onDenied == 'function'){
              callback.onDenied.call(this, data);
            }
          }
        });
      }
    }
  };

  $( Core.init );

  window.Core = Core;

})(jQuery);