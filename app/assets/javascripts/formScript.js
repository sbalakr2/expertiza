jQuery(document).ready(function($) {

  var fieldMap = {"Scale": "radio-group", "Dropdown": "select", "Checkbox": "checkbox",
                  "TextArea" : "textarea", "TextField": "text", "SectionHeader" : "header",
                  "Criterion": "criterion"};

  var questionsData = $('.questions_class').data().questions;
  var length = questionsData.length;
  //console.log(length);
  //console.log(questionsData);

  var defaultFields = [];
  for(var i=0; i<length; i++){
       var obj = {};
       var type = fieldMap[questionsData[i].type];
       obj["type"] = type;
       obj["label"] = questionsData[i].txt;
       //obj["id"] = questionsData[i].questionnaire_id;
       obj["order"] = questionsData[i].seq;

       switch(type){
          case "criterion": {
              break;
          }
          case "text":{
              obj["maxlength"] = questionsData[i].size;
              break;
          }
          case "textarea":{
              var rc = questionsData[i].size.split(', ');
              //obj["maxlength"] = rc[0] * rc[1];
              obj["values"] = ""; 
              break;
          }
          case "select":{
              var options = questionsData[i].alternatives ? questionsData[i].alternatives.split("|") : [];
              var vals = [];
              for(var j=0; j<options.length; j++){
                  var valObj = {};
                  valObj["label"] = options[j];
                  valObj["value"] = options[j];
                  vals.push(valObj);
              }
              obj["values"] = vals;
              break;
          }
          case "checkbox":{
              
              break;
          }
          case "radio-group":{
              obj["multiple"] = true;
              var values = [{
                  label: questionsData[i]["min_label"],
                  value: questionsData[i]["min_label"]
                }, {
                  label: "Disagree",
                  value: "Disagree"
                }, 
                {
                  label: "Neutral",
                  value: "Neutral"
                }, 
                {
                  label: "Agree",
                  value: "Agree"
                }, 
                {
                  label: questionsData[i]["max_label"],
                  value: questionsData[i]["max_label"]
                }];
              obj["values"] = values;
              break;
          }
          default: break;
      } // end of switch
      defaultFields.push(obj);
  } // end of for 

  //console.log(defaultFields);

   const fbOptions = {
        subtypes: {
          text: ['datetime']
        },
        typeUserEvents: {
          checkbox: {
            onadd: function(fld) {
              $("#question_type").val("Checkbox");
              //$("#addQuestionBtn").trigger('click');
            }
          },
          select:{
            onadd: function(fld) {
              $("#question_type").val("Dropdown");
            // $("#addQuestionBtn").trigger('click');
            }
          },
          text: {
            onadd: function(fld) {
              $("#question_type").val("TextField");
              //$("#addQuestionBtn").trigger('click');
            }
          },
          textarea: {
            onadd: function(fld) {
              $("#question_type").val("TextArea");
              //$("#addQuestionBtn").trigger('click');
            }
          }
        },
        onSave: function(formData) {
          toggleEdit();
          $('.render-wrap').formRender({formData});
          window.sessionStorage.setItem('formData', JSON.stringify(formData));
        },
        sortableControls: { 
          enable: false
        },
        stickyControls: { 
          enable: true
        },
        disableFields: ['autocomplete', 'button', 'paragraph', 'number', 
        'date', 'file', 'hidden', 'checkbox-group'],
        defaultFields: defaultFields,
        editOnAdd: true
      };

  let formData = window.sessionStorage.getItem('formData');
  let editing = true;

  if (formData) {
    fbOptions.formData = JSON.parse(formData);
  }

  /**
   * Toggles the edit mode for the demo
   * @return {Boolean} editMode
   */
  function toggleEdit() {
    document.body.classList.toggle('form-rendered', editing);
    return editing = !editing;
  }

  const formBuilder = $('.build-wrap')
                      .formBuilder(fbOptions)
                      .data('formBuilder');

  document.getElementById('edit-form').onclick = function() {
    toggleEdit();
  };

  $('#get-data').hide();
  console.log($('.form-actions.btn-group'));
  $('.form-actions.btn-group').hide();

 /* document.getElementById('get-data').onclick = function() {
    console.log(formBuilder.actions.getData());
  };*/
   
});
