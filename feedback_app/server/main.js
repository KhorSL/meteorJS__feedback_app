import { Meteor } from 'meteor/meteor';
import { Questions } from '../models/questions.js';

Meteor.startup(() => {

  Meteor.methods({
    'addAnswers':function(formData) {
      try {
        for(let i = 0, len = formData.length; i < len ; i++)
        {
          let answer = formData[i].value;
          const qid = new Meteor.Collection.ObjectID(formData[i].name);
          Questions.update({_id: qid}, {$push: { result: answer }});
        }
        return true;
      } catch (e) {
        return new Meteor.Error(e);
      }
    },
  });


  Meteor.publish('getQuestions', function() {
    return Questions.find({});
  });


});
