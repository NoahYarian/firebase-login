var FIREBASE_URL = 'https://login-page-test.firebaseio.com';
var fb = new Firebase(FIREBASE_URL);

var $onLoggedOut = $('.onLoggedOut');
var $onLoggedIn = $('.onLoggedIn');
var $login = $(".login");
var $register = $(".register");
var $resetPassword = $(".resetPassword");

var $email = $('.onLoggedOut input[type="email"]');
var $password = $('.onLoggedOut input[type="password"]');


// toggleContentBasedOnLogin();

// $(".login button").click(function () {
//   $register.removeClass("hidden");
//   $login.addClass("hidden");
// });

// $(".register input[type='button']").click(function () {
//   $register.addClass("hidden");
//   $login.removeClass("hidden");
//   event.preventDefault();
// });


$(".onLoggedIn button").click(function () {
  fb.unauth();
  // toggleContentBasedOnLogin();
});

$(".onLoggedOut form").submit(function () {
  fb.authWithPassword({
    email: $email.val(),
    password: $password.val()
  }, function (err, authData) {
    if (err) {
      alert(err.toString());
    } else {
      // toggleContentBasedOnLogin();
      $email.val('');
      $password.val('');
      $.ajax({
        method: 'PUT',
        url: `${FIREBASE_URL}/users/${authData.uid}/profile.json`,
        data: JSON.stringify(authData),
        success: function () {
          console.log('It works!');
        }
      })
      $('.onLoggedIn h1').text(`Hello ${authData.password.email}`);
    }
  });
  debugger;
  event.preventDefault();
});

$register.click(function () {
  fb.createUser({
    email: $email.val(),
    password: $password.val()
  }, function (err, authData) {
    if (err) {
      alert(err.toString());
    } else {
      fb.authWithPassword({
        email: $email.val(),
        password: $password.val()
      }, function (err, authData) {
        if (err) {
          alert(err.toString());
        } else {
          // toggleContentBasedOnLogin();
          $email.val('');
          $password.val('');
          alert('Welcome ' + authData.password.email);
        }
      });
    }
  });
  event.preventDefault();
})

// $(".register").submit(function () {
//   var $email = $('.register input[type="email"]');
//   var $password = $('.register input[type="password"]');
//   var $passwordConfirm = $('.confirm');

//   if ($password.val() !== $passwordConfirm.val()) {
//     alert("Passwords do not match");
//   } else {
//     fb.createUser({
//       email: $email.val(),
//       password: $password.val()
//     }, function (err, authData) {
//       if (err) {
//         alert(err.toString());
//       } else {
//         fb.authWithPassword({
//           email: $email.val(),
//           password: $password.val()
//         }, function (err, authData) {
//           if (err) {
//             alert(err.toString());
//           } else {
//             toggleContentBasedOnLogin();
//             $email.val('');
//             $password.val('');
//             alert('Welcome ' + authData.password.email);
//           }
//         });
//       }
//     });
//     event.preventDefault();
//   }
// });

// function toggleContentBasedOnLogin() {
//   var authData = fb.getAuth();
//   if (authData) {
//     $onLoggedOut.addClass("hidden");
//     $onLoggedIn.removeClass("hidden");
//   } else {
//     $onLoggedOut.removeClass("hidden");
//     $login.removeClass("hidden");
//     $register.addClass("hidden");
//     $onLoggedIn.addClass("hidden");
//   }
// }
