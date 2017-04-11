import { Meteor } from 'meteor/meteor';
import {Questions} from '/models/questions.js';

Template.feedback.helpers({
  myTitle:function() {
    return "Feedback App";
  },
  questions:function() {
    return Questions.find({});
  },
  checkType:function(type)
  {
    return type == "mcq";
  }
});

Template.feedback.onCreated(function() {
  Meteor.subscribe('getQuestions');
});

Template.feedback.events({
  "submit #feedbackForm":function(event,instance) {
    event.preventDefault();
    const formData = $("#feedbackForm").serializeArray();
    Meteor.call("addAnswers",formData,function(error,result){
      if(result)
      {
        alert("Thank you for your feedback!");
        $('#feedbackForm').trigger('reset');
      }
    });
  },
});
