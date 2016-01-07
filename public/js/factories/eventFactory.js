angular.module('eventsInfoFactory', [])
  .factory('Eventstored', function($http) {
    //posts events to database
    var eventData = function(dibEvent) {
      return $http({
        method: 'POST',
        url: '/api/events/booked',
        data: {
          dibEvent: dibEvent
        }
      }).then(function(responseObj) {
        getData();
        return responseObj;
      });
    };

    //retrieves events
    var getData = function() {
      return $http({
        method: 'GET',
        url: '/api/events/events'
      });
    };

    var getAllData = function() {
      return $http({
        method: 'GET',
        url: '/api/events/allevents'
      });
    };

    var formatData = function(events) {
      var eventsCollection = events.data,
        eventDates,
        formattedDate,
        eventTimes;
      console.log("FORMAT DATA IN EVENTFACTORY.JS", events);

      eventsCollection.forEach(function(event) {
        eventDates = event.eventDate;
        eventEndDates = event.eventEndDate;
        formattedDate = moment(eventDates).format("dddd, MMMM Do YYYY");
        formattedTime = moment(eventDates).format('h:mmA');
        event.eventDate = formattedDate;
        event.eventEndDate = moment(eventEndDates).format("dddd, MMMM Do YYYY");
        event.eventTime = formattedTime;
        event.eventEndTime = moment(eventEndDates).format('h:mmA');
      });

      return eventsCollection;
    };

    var getAllEventData;

    return {
      eventData: eventData,
      getData: getData,
      formatData: formatData,
      getAllData: getAllData
    };
  });