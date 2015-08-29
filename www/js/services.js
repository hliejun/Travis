angular.module('starter.services', [])

.factory('Contacts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var contacts = [{
    contact_id: 0,
    contact_name: 'Professor X',
    contact_picture: 'http://static.comicvine.com/uploads/original/12/129116/4372263-5321356645-Profe.jpg',
    contact_gender: 'male',
    contact_address: 'Hines Road',
    contact_tel_no: '79320130',
    contact_mobile: '9024123',
    contact_desc: 'Bald and handsome'
  }];

  return {
    all: function() {
      return contacts;
    },
    remove: function(contact) {
      contacts.splice(contacts.indexOf(contact), 1);
    },
    get: function(contactId) {
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].contact_id === parseInt(contactId)) {
          return contacts[i];
        }
      }
      return null;
    }
  };
});
